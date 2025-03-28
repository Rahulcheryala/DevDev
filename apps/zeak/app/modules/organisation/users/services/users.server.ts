import { getSupabaseServiceRole } from '~/lib/supabase/client';
import type { Database, Json } from "@zeak/database";
import { redis } from "@zeak/redis";
import { redirect } from "@remix-run/node";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";
import logger from "~/lib/logger";
import type {
  CompanyPermission,
  EmployeeRow,
  EmployeeTypePermission,
  Module,
  Permission,
  User,
} from "~/modules/users";
import { getPermissionsByEmployeeType } from "~/modules/users";
import {
  deleteAuthAccount,
  sendInviteByEmail,
  sendMagicLink,
} from "~/services/auth/auth.server";
import { flash, requireAuthSession } from "~/services/session.server";
import type { Result } from "~/types";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import type { User as supabaseUser } from "@supabase/supabase-js"
import * as dotenv from "dotenv";
import { insertEmployeeJob } from '~/modules/resources';

dotenv.config();

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const createSupabaseUser = async (email: string, password: string) => {
  const newuserId = await supabaseAdmin.auth.admin
    .createUser({
      email: email,
      password: password,
      email_confirm: true,
    })
    .then(({ data }) => {
      return data.user?.id
    })
    .catch((e) => {
      throw e;
    });

  return newuserId
}

export const getUserId = async (email: string, password: string): Promise<string> => {
  const existingUserId = await supabaseAdmin.auth.admin
    .listUsers()
    .then(
      ({ data }) =>
        data.users.find((user: supabaseUser) => user?.email! === email)?.id,
    );

  if (existingUserId) return existingUserId;

  const newUserId = await createSupabaseUser(email, password)

  if (newUserId) return newUserId;

  throw new Error("Could not create or get user");
};

export async function addUserToCompany(
  client: SupabaseClient<Database>,
  userToCompany: {
    userId: string;
    companyId: string;
  },
) {
  const existingEntry = await client
    .from("userToCompany")
    .select("*")
    .eq("userId", userToCompany.userId)
    .eq("companyId", userToCompany.companyId)
    .maybeSingle();

  if (existingEntry.data) {
    logger.info(
      `User ${userToCompany.userId} is already added to company ${userToCompany.companyId}.`,
    );
    return { data: existingEntry.data, error: null };
  } else if (existingEntry.error) {
    logger.error(
      `Error checking existing user to company association: ${existingEntry.error.message}`,
    );
    return { data: null, error: existingEntry.error };
  }

  return client.from("userToCompany").insert(userToCompany);
}

export async function createEmployeeAccount(
  client: SupabaseClient<Database>,
  {
    email,
    firstName,
    lastName,
    employeeType,
    companyId,
    inviteUser,
    MFAEnabled,
    password
  }: {
    email: string;
    firstName: string;
    lastName: string;
    employeeType: string;
    companyId: string;
    inviteUser: string | undefined | null;
    MFAEnabled: string | undefined | null;
    password?: string | undefined | null;
  },
  inviteCallbackUrl: string,
): Promise<Result> {
  // TODO: convert to transaction and call this at the end of the transaction
  const employeeTypePermissions = await getPermissionsByEmployeeType(
    client,
    employeeType,
  );
  if (employeeTypePermissions.error)
    return error(
      employeeTypePermissions.error,
      "Failed to get employee type permissions",
    );

  const user = await getUserByEmail(email);

  if (user.data) {
    // TODO: user already exists -- send company invite
    await addUserToCompany(client, { userId: user.data.id, companyId });
    return error(
      null,
      "User already exists. Adding to team not implemented yet.",
    );
  } else {
    let userId: string = '';

    if (inviteUser === 'on') {
      const invitation = await sendInviteByEmail(
        email,
        undefined,
        inviteCallbackUrl,
      );

      if (invitation.error)
        return error(invitation.error.message, "Failed to send invitation email");

      userId = invitation.data.user.id;
    } else {
      userId = await getUserId(email, password ? password : 'zeak123!')
    }

    const insertUser = await createUser(client, {
      id: userId,
      email,
      firstName,
      lastName,
      avatarUrl: null,
      phno: '',
      address1: '',
      address2: '',
      zipCode: '',
      city: '',
      state: '',
      country: '',
      '2FAEnabled': MFAEnabled ? true : false,
      birthday: null
    });

    if (insertUser.error)
      return error(insertUser.error, "Failed to create a new user");

    if (!insertUser.data)
      return error(insertUser, "No data returned from create user");
    const supabaseAdmin = getSupabaseServiceRole();

    await insertEmployeeJob(supabaseAdmin, { id: userId, companyId })

    const permissions = makePermissionsFromEmployeeType(
      employeeTypePermissions,
    );

    const [createEmployee, userToCompany, claimsUpdate, permissionsUpdate] =
      await Promise.all([
        insertEmployee(client, {
          id: insertUser.data[0].id,
          employeeTypeId: employeeType,
          companyId,
        }),
        addUserToCompany(client, { userId, companyId }),
        setUserClaims(supabaseAdmin, userId, {
          role: "employee",
        }),
        setUserPermissions(supabaseAdmin, userId, permissions),
      ]);

    if (createEmployee.error) {
      await deleteAuthAccount(userId);
      return error(createEmployee.error, "Failed to create a employee account");
    }

    if (userToCompany.error) {
      await deleteAuthAccount(userId);
      return error(userToCompany.error, "Failed to add user to company");
    }

    if (claimsUpdate.error) {
      await deleteAuthAccount(userId);
      if (claimsUpdate.error) {
        return error(claimsUpdate.error, "Failed to udpate user claims");
      }
    }

    if (permissionsUpdate.error) {
      await deleteAuthAccount(userId);
      return error(
        permissionsUpdate.error,
        "Failed to update user permissions",
      );
    }

    return success("Employee account created");
  }
}

async function createUser(
  client: SupabaseClient<Database>,
  user: Omit<User, "fullName">,
) {
  const { data, error } = await insertUser(client, user);

  if (error) {
    await deleteAuthAccount(user.id);
  }

  return { data, error };
}

export async function deactivateUser(
  client: SupabaseClient<Database>,
  userId: string,
): Promise<Result> {
  const updateActiveStatus = await client
    .from("user")
    .update({ active: false, firstName: "Deactivate", lastName: "User" })
    .eq("id", userId);
  if (updateActiveStatus.error) {
    return error(updateActiveStatus.error, "Failed to deactivate user");
  }

  const randomPassword = crypto.randomBytes(20).toString("hex");
  const updatePassword = await resetPassword(userId, randomPassword);

  if (updatePassword.error) {
    return error(updatePassword.error, "Failed to deactivate user");
  }

  return success("Sucessfully deactivated user");
}

export async function getClaims(client: SupabaseClient<Database>, uid: string) {
  return client.rpc("get_claims", { uid });
}

export async function getCurrentUser(
  request: Request,
  client: SupabaseClient<Database>,
) {
  const { userId } = await requireAuthSession(request);

  const user = await getUser(client, userId);
  if (user?.error || user?.data === null) {
    throw redirect(
      path.to.authenticatedRoot,
      await flash(request, error(user.error, "Failed to get user")),
    );
  }

  return user.data;
}

export function getPermissionCacheKey(userId: string) {
  return `permissions:${userId}`;
}

export async function getUser(client: SupabaseClient<Database>, id: string) {
  return client
    .from("user")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single();
}

export async function getUserByEmail(email: string) {
  return getSupabaseServiceRole()
    .from("user")
    .select("*")
    .eq("email", email)
    .maybeSingle();
}

export async function getUserClaims(userId: string) {
  let claims: {
    permissions: Record<string, Permission>;
    role: string | null;
  } | null = null;

  try {
    claims = JSON.parse(
      (await redis.get(getPermissionCacheKey(userId))) || "null",
    );
  } finally {
    // if we don't have permissions from redis, get them from the database
    if (!claims) {
      // TODO: remove service role from here, and move it up a level
      const rawClaims = await getClaims(getSupabaseServiceRole(), userId);
      if (rawClaims.error || rawClaims.data === null) {
        logger.error(rawClaims);
        throw new Error("Failed to get claims");
      }

      // convert rawClaims to permissions
      claims = makePermissionsFromClaims(rawClaims.data as Json[]);

      // store claims in redis
      await redis.set(getPermissionCacheKey(userId), JSON.stringify(claims));

      if (!claims) {
        throw new Error("Failed to get claims");
      }
    }

    return claims;
  }
}

export async function getUserDefaults(
  client: SupabaseClient<Database>,
  userId: string,
  companyId: string,
) {
  return client
    .from("userDefaults")
    .select("*")
    .eq("userId", userId)
    .eq("companyId", companyId)
    .maybeSingle();
}

export async function insertEmployee(
  client: SupabaseClient<Database>,
  employee: EmployeeRow,
) {
  return client.from("employee").insert([employee]).select("*").single();
}

async function insertUser(
  client: SupabaseClient<Database>,
  user: Omit<User, "fullName" | "createdAt">,
) {
  return client.from("user").insert([user]).select("*");
}

function makePermissionsFromEmployeeType({
  data,
}: {
  data: {
    view: string[];
    create: string[];
    update: string[];
    delete: string[];
    module: string;
  }[];
}) {
  const permissions: Record<string, string[]> = {};

  data.forEach((permission) => {
    if (!permission.module) {
      throw new Error(
        `Permission module is missing for permission ${JSON.stringify(data)}`,
      );
    }

    const module = permission.module.toLowerCase();

    permissions[`${module}_view`] = permission.view;
    permissions[`${module}_create`] = permission.create;
    permissions[`${module}_update`] = permission.update;
    permissions[`${module}_delete`] = permission.delete;
  });

  return permissions;
}

export async function setup2FA(client: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabaseAdmin.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'userId',
  });

  if (error) return null;
  return data;
}

function isClaimPermission(key: string, value: unknown) {
  const action = key.split("_")[1];
  return (
    action !== undefined &&
    ["view", "create", "update", "delete"].includes(action) &&
    Array.isArray(value)
  );
}

export function makeEmptyPermissionsFromModules(data: Module[]) {
  return data.reduce<
    Record<string, { name: string; permission: CompanyPermission }>
  >((acc, m) => {
    if (m.name) {
      acc[m.name] = {
        name: m.name.toLowerCase(),
        permission: {
          view: false,
          create: false,
          update: false,
          delete: false,
        },
      };
    }
    return acc;
  }, {});
}

export function makeCompanyPermissionsFromClaims(
  claims: Json[] | null,
  companyId: string,
) {
  if (typeof claims !== "object" || claims === null) return null;
  let permissions: Record<string, CompanyPermission> = {};
  let role: string | null = null;

  Object.entries(claims).forEach(([key, value]) => {
    if (isClaimPermission(key, value)) {
      const [module, action] = key.split("_");
      if (!(module in permissions)) {
        permissions[module] = {
          view: false,
          create: false,
          update: false,
          delete: false,
        };
      }

      if (!Array.isArray(value)) {
        permissions[module] = {
          view: false,
          create: false,
          update: false,
          delete: false,
        };
      } else {
        switch (action) {
          case "view":
            permissions[module]["view"] =
              value.includes("0") || value.includes(companyId);
            break;
          case "create":
            permissions[module]["create"] =
              value.includes("0") || value.includes(companyId);
            break;
          case "update":
            permissions[module]["update"] =
              value.includes("0") || value.includes(companyId);
            break;
          case "delete":
            permissions[module]["delete"] =
              value.includes("0") || value.includes(companyId);
            break;
        }
      }
    }
  });

  if ("role" in claims) {
    role = claims["role"] as string;
  }

  return { permissions, role };
}

export function makePermissionsFromClaims(claims: Json[] | null) {
  if (typeof claims !== "object" || claims === null) return null;
  let permissions: Record<string, Permission> = {};
  let role: string | null = null;

  Object.entries(claims).forEach(([key, value]) => {
    if (isClaimPermission(key, value)) {
      const [module, action] = key.split("_");
      if (!(module in permissions)) {
        permissions[module] = {
          view: [],
          create: [],
          update: [],
          delete: [],
        };
      }

      switch (action) {
        case "view":
          permissions[module]["view"] = value as string[];
          break;
        case "create":
          permissions[module]["create"] = value as string[];
          break;
        case "update":
          permissions[module]["update"] = value as string[];
          break;
        case "delete":
          permissions[module]["delete"] = value as string[];
          break;
      }
    }
  });

  if ("role" in claims) {
    role = claims["role"] as string;
  }

  return { permissions, role };
}

export function makeCompanyPermissionsFromEmployeeType(
  data: EmployeeTypePermission[],
  companyId: string,
) {
  const result: Record<
    string,
    { name: string; permission: CompanyPermission }
  > = {};
  if (!data) return result;
  data.forEach((permission) => {
    if (!permission.module) {
      throw new Error(
        `Module is missing for permission ${JSON.stringify(permission)}`,
      );
    } else {
      result[permission.module] = {
        name: permission.module.toLowerCase(),
        permission: {
          view:
            permission.view.includes("0") ||
            permission.view.includes(companyId),
          create:
            permission.create.includes("0") ||
            permission.create.includes(companyId),
          update:
            permission.update.includes("0") ||
            permission.update.includes(companyId),
          delete:
            permission.delete.includes("0") ||
            permission.delete.includes(companyId),
        },
      };
    }
  });

  return result;
}

export async function resendInvite(
  client: SupabaseClient<Database>,
  userId: string,
): Promise<Result> {
  const user = await getUser(client, userId);
  if (user.error || !user.data) {
    return error(user.error, "Failed to get user");
  }

  const invite = await sendMagicLink(user.data.email);

  // const { data, error: inviteError } = await client.auth.admin.generateLink({
  //   type: 'invite',
  //   email: user.data.email
  // })

  if (invite.error) {
    return error(invite.error, "Failed to send invite");
  }

  return success("Succesfully sent invite");
}

export async function resetPassword(userId: string, password: string) {
  return getSupabaseServiceRole().auth.admin.updateUserById(userId, {
    password,
  });
}

async function setUserClaims(
  client: SupabaseClient<Database>,
  userId: string,
  claims: Record<string, string>,
) {
  const user = await client.auth.admin.getUserById(userId);
  if (user.error) return user;

  const currentClaims = user.data?.user.app_metadata ?? {};
  const newClaims = { ...currentClaims, ...claims };

  return client.auth.admin.updateUserById(userId, {
    app_metadata: newClaims,
  });
}

async function setUserPermissions(
  client: SupabaseClient<Database>,
  userId: string,
  permissions: Record<string, string[]>,
) {
  const user = await client
    .from("user")
    .select("permissions")
    .eq("id", userId)
    .single();
  if (user.error) return user;

  const currentPermissions = (user.data?.permissions ?? {}) as Record<
    string,
    string[]
  >;
  const newPermissions = { ...currentPermissions };

  Object.entries(permissions).forEach(([key, value]) => {
    if (key in newPermissions) {
      newPermissions[key] = [...newPermissions[key], ...value];
    } else {
      newPermissions[key] = value;
    }
  });

  return client
    .from("user")
    .update({ permissions: newPermissions })
    .eq("id", userId);
}

export async function updateEmployee(
  client: SupabaseClient<Database>,
  {
    id,
    employeeType,
    permissions,
    companyId,
  }: {
    id: string;
    employeeType: string;
    permissions: Record<string, CompanyPermission>;
    companyId: string;
  },
): Promise<Result> {
  const updateEmployeeEmployeeType = await client
    .from("employee")
    .upsert([{ id, companyId, employeeTypeId: employeeType }]);

  if (updateEmployeeEmployeeType.error)
    return error(updateEmployeeEmployeeType.error, "Failed to update employee");

  return updatePermissions(client, { id, permissions, companyId });
}

export async function updatePermissions(
  client: SupabaseClient<Database>,
  {
    id,
    permissions,
    companyId,
    addOnly = false,
  }: {
    id: string;
    permissions: Record<string, CompanyPermission>;
    companyId: string;
    addOnly?: boolean;
  },
): Promise<Result> {
  if (await client.rpc("is_claims_admin")) {
    const claims = await getClaims(client, id);

    if (claims.error) return error(claims.error, "Failed to get claims");

    const updatedPermissions = (
      typeof claims.data !== "object" ||
        Array.isArray(claims.data) ||
        claims.data === null
        ? {}
        : claims.data
    ) as Record<string, string[]>;

    // add any missing claims to the current claims
    Object.keys(permissions).forEach((name) => {
      if (!(`${name}_view` in updatedPermissions)) {
        updatedPermissions[`${name}_view`] = [];
      }
      if (!(`${name}_create` in updatedPermissions)) {
        updatedPermissions[`${name}_create`] = [];
      }
      if (!(`${name}_update` in updatedPermissions)) {
        updatedPermissions[`${name}_update`] = [];
      }
      if (!(`${name}_delete` in updatedPermissions)) {
        updatedPermissions[`${name}_delete`] = [];
      }
    });

    if (addOnly) {
      Object.entries(permissions).forEach(([name, permission]) => {
        const module = name.toLowerCase();
        if (
          permission.view &&
          !updatedPermissions[`${module}_view`]?.includes(companyId)
        ) {
          updatedPermissions[`${module}_view`].push(companyId);
        }
        if (
          permission.create &&
          !updatedPermissions[`${module}_create`]?.includes(companyId)
        ) {
          updatedPermissions[`${module}_create`].push(companyId);
        }
        if (
          permission.update &&
          !updatedPermissions[`${module}_update`]?.includes(companyId)
        ) {
          updatedPermissions[`${module}_update`].push(companyId);
        }
        if (
          permission.delete &&
          !updatedPermissions[`${module}_delete`]?.includes(companyId)
        ) {
          updatedPermissions[`${module}_delete`].push(companyId);
        }
      });
    } else {
      Object.entries(permissions).forEach(([name, permission]) => {
        const module = name.toLowerCase();
        if (permission.view) {
          if (!updatedPermissions[`${module}_view`]?.includes(companyId)) {
            updatedPermissions[`${module}_view`] = [
              ...updatedPermissions[`${module}_view`],
              companyId,
            ];
          }
        } else {
          updatedPermissions[`${module}_view`] = (
            updatedPermissions[`${module}_view`] as string[]
          ).filter((c: string) => c !== companyId);
        }

        if (permission.create) {
          if (!updatedPermissions[`${module}_create`]?.includes(companyId)) {
            updatedPermissions[`${module}_create`] = [
              ...updatedPermissions[`${module}_create`],
              companyId,
            ];
          }
        } else {
          updatedPermissions[`${module}_create`] = (
            updatedPermissions[`${module}_create`] as string[]
          ).filter((c: string) => c !== companyId);
        }

        if (permission.update) {
          if (!updatedPermissions[`${module}_update`]?.includes(companyId)) {
            updatedPermissions[`${module}_update`] = [
              ...updatedPermissions[`${module}_update`],
              companyId,
            ];
          }
        } else {
          updatedPermissions[`${module}_update`] = (
            updatedPermissions[`${module}_update`] as string[]
          ).filter((c: string) => c !== companyId);
        }

        if (permission.delete) {
          if (!updatedPermissions[`${module}_delete`]?.includes(companyId)) {
            updatedPermissions[`${module}_delete`] = [
              ...updatedPermissions[`${module}_delete`],
              companyId,
            ];
          }
        } else {
          updatedPermissions[`${module}_delete`] = (
            updatedPermissions[`${module}_delete`] as string[]
          ).filter((c: string) => c !== companyId);
        }
      });
    }

    const permissionsUpdate = await getSupabaseServiceRole()
      .from("user")
      .update({ permissions: updatedPermissions })
      .eq("id", id);
    if (permissionsUpdate.error)
      return error(permissionsUpdate.error, "Failed to update claims");

    await redis.del(getPermissionCacheKey(id));

    return success("Permissions updated");
  } else {
    return error(null, "You do not have permission to update permissions");
  }
}
