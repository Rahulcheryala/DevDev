import type { Database } from "@zeak/database";
import { redirect } from "@remix-run/node";
import type {
  AuthSession as SupabaseAuthSession,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import {
  ACCESS_TOKEN_EXPIRY,
  DOMAIN_URL,
  REFRESH_ACCESS_TOKEN_THRESHOLD,
  VERCEL_URL,
} from "~/config/env";
import { getSupabase, getSupabaseServiceRole } from "~/lib/supabase";
import { getCompaniesForUser } from "~/modules/users";
import { getUser, getUserClaims } from "~/modules/users/users.server";
import {
  flash,
  getAuthSession,
  requireAuthSession,
} from "~/services/session.server";
import { path } from "~/utils/path";
import { error } from "~/utils/result";
import type { AuthSession, UserAuthSessionInfo } from "./types";
import { UserStatus, SessionActivity } from "./types";
import { moduleConfiguration, permissions, claims } from "~/modules-configuration";

export async function createEmailAuthAccount(
  email: string,
  password: string,
  meta?: Record<string, unknown>,
) {
  const { data, error } = await getSupabaseServiceRole().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: {
      ...meta,
    },
  });

  if (!data.user || error) return null;

  return data.user;
}

export async function deleteAuthAccount(userId: string) {
  const { error } =
    await getSupabaseServiceRole().auth.admin.deleteUser(userId);

  if (error) return null;

  return true;
}

export async function deactivateAuthAccount(userId: string) {
  const { error } =
    await getSupabaseServiceRole().auth.admin.deleteUser(userId, true);

  if (error) return null;

  return true;
}

export async function getAuthAccountByAccessToken(accessToken: string) {
  const { data, error } =
    await getSupabaseServiceRole().auth.getUser(accessToken);

  if (!data.user || error) return null;

  return data.user;
}

export function makeAuthSession(
  supabaseSession: SupabaseAuthSession | null,
  companyId: string,
  sessionId: string,
): AuthSession | null {
  if (!supabaseSession) return null;

  if (!supabaseSession.refresh_token)
    throw new Error("User should have a refresh token");

  if (!supabaseSession.user?.email)
    throw new Error("User should have an email");

  return {
    userSessionId: sessionId,
    accessToken: supabaseSession.access_token,
    companyId,
    refreshToken: supabaseSession.refresh_token,
    userId: supabaseSession.user.id,
    email: supabaseSession.user.email,
    expiresIn:
      (supabaseSession.expires_in ?? 3000) - REFRESH_ACCESS_TOKEN_THRESHOLD,
    expiresAt: supabaseSession.expires_at ?? -1,
  };
}

export async function requirePermissions(
  request: Request,
  requiredPermissions: {
    view?: string | string[];
    create?: string | string[];
    update?: string | string[];
    delete?: string | string[];
    role?: string;
  },
): Promise<{
  client: SupabaseClient<Database>;
  companyId: string;
  email: string;
  userId: string;
}> {
  const { accessToken, companyId, email, userId } =
    await requireAuthSession(request);

  const client = getSupabase(accessToken);
  // early exit if no requiredPermissions are required
  if (Object.keys(requiredPermissions).length === 0)
    return { client, companyId, email, userId };

  const myClaims = await getUserClaims(userId);

  const hasRequiredPermissions = Object.entries(requiredPermissions).every(
    ([action, permission]) => {
      if (typeof permission === "string") {
        if (action === "role") {
          return myClaims.role === permission;
        }
        if (!(permission in myClaims.permissions)) return false;
        const permissionForCompany =
          myClaims.permissions[permission][
          action as "view" | "create" | "update" | "delete"
          ];
        return (
          permissionForCompany.includes("0") || // 0 is the wildcard for all companies
          permissionForCompany.includes(companyId)
        );
      } else if (Array.isArray(permission)) {
        return permission.every((p) => {
          const permissionForCompany =
            myClaims.permissions[p][
            action as "view" | "create" | "update" | "delete"
            ];
          return (
            permissionForCompany.includes("0") || // 0 is the wildcard for all companies
            permissionForCompany.includes(companyId)
          );
        });
      } else {
        return false;
      }
    },
  );

  // if (!hasRequiredPermissions) {
  //   throw redirect(
  //     path.to.authenticatedRoot,
  //     await flash(
  //       request,
  //       error({ myClaims, requiredPermissions }, "Access Denied"),
  //     ),
  //   );
  // }

  return { client, companyId, email, userId };
}

export async function resetPassword(accessToken: string, password: string) {
  const { error } = await getSupabase(accessToken).auth.updateUser({
    password,
  });

  if (error) return null;

  return true;
}

export async function sendInviteByEmail(
  email: string,
  data?: Record<string, unknown>,
  inviteCallbackUrl?: string,
) {

  // const { data: sendInviteData, error } = await getSupabaseServiceRole().auth.admin.generateLink({
  //   type: 'invite',
  //   email
  // })

  // console.log('sendInviteData Invie Link', `${VERCEL_URL}/v2/verify?token=${sendInviteData.properties?.hashed_token}&type=${sendInviteData.properties?.verification_type}&email=${email}&redirect_to=${VERCEL_URL}/v2/verify`)

  // console.log('sendInviteData', sendInviteData)

  return getSupabaseServiceRole().auth.admin.inviteUserByEmail(email, {
    redirectTo: `${VERCEL_URL}/v2/verify`,
    data,
  });
}

export async function sendMagicLink(email: string) {

  try {
    const { data, error } = await getSupabaseServiceRole().auth.signInWithOtp({
      email,
      options: {
        data: {
          role: 'admin'
        },
        shouldCreateUser: true,
        emailRedirectTo: `${VERCEL_URL}/v2/verify`, // Use your configured domain URL
      },
    });

    if (error) {
      console.error('Magic link error:', error);
      return { data: null, error };
    }

    return {
      data: {
        data: data,
        user: null,
        session: null,
        message: 'Magic link sent successfully'
      },
      error: null
    };
  } catch (err) {
    console.error('Unexpected error sending magic link:', err);
    return {
      data: null,
      error: new Error('Failed to send magic link')
    };
  }
}

export function sendPasswordRecoveryEmail(email: string, redirectUrl: string) {
  return getSupabaseServiceRole().auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });
}

export async function createNewUser(id: any, email: string,
  firstName: string,
  lastName: string) {

  const upsertAdmin = await getSupabaseServiceRole().from("user").upsert([
    {
      id,
      email,
      firstName,
      lastName,
      permissions,
    },
  ]);
  if (upsertAdmin.error) throw upsertAdmin.error;

  // give the admin user all the claims
  await getSupabaseServiceRole().auth.admin.updateUserById(id, {
    app_metadata: claims,
  });

  const deleteModuleConfiguration = await getSupabaseServiceRole()
    .from("moduleConfiguration")
    .delete()
    .neq("id", 0);
  if (deleteModuleConfiguration.error) throw deleteModuleConfiguration.error;

  Object.keys(moduleConfiguration).forEach(async (key: any) => {
    if (key) {
      const insertModuleConfiguration = await getSupabaseServiceRole()
        .from("moduleConfiguration")
        .insert({
          name: key,
          configuration:
            moduleConfiguration[key as keyof typeof moduleConfiguration],
        });
      if (insertModuleConfiguration.error)
        throw insertModuleConfiguration.error;
    }
  });
}

export async function signUpWithEmail(
  email: string,
  password: string,
  deviceInfo: string,
  locationInfo: string,
  firstName: string,
  lastName: string,
) {
  const client = getSupabaseServiceRole();

  const { data: createUser, error: createUserError } = await client.auth.admin
    .createUser({
      email,
      password,
      email_confirm: true,
    })

  if (!createUser || createUserError) return null;

  createNewUser(createUser.user.id, email, firstName, lastName)

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (!data.session || error) return null;

  const companies = await getCompaniesForUser(client, data.user!.id);

  const sessionData: UserAuthSessionInfo = {
    userId: data.user!.id,
    device: JSON.parse(deviceInfo),
    location: JSON.parse(locationInfo),
    ipAddress: JSON.parse(locationInfo).ip,
    status: "Logged In",
    sessionActivity: "Active",
    metadata: JSON.parse(JSON.stringify(data)),
    createdBy: data!.user!.id,
  };

  const session = await createUserSession(sessionData);

  if (!session) return null;

  return makeAuthSession(data.session, companies?.[0] ?? 1, session.id);
}


export async function signInWithEmail(
  email: string,
  password: string,
  deviceInfo: string,
  locationInfo: string,
) {
  const client = getSupabaseServiceRole();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (!data.session || error) return null;
  const companies = await getCompaniesForUser(client, data.user.id);

  const sessionData: UserAuthSessionInfo = {
    userId: data.user?.id,
    device: JSON.parse(deviceInfo),
    location: JSON.parse(locationInfo),
    ipAddress: JSON.parse(locationInfo).ip,
    status: "Logged In",
    sessionActivity: "Active",
    metadata: JSON.parse(JSON.stringify(data)),
    createdBy: data.user?.id,
  };

  const session = await createUserSession(sessionData);

  if (!session) return null;

  return makeAuthSession(data.session, companies?.[0] ?? 1, session.id);
}

export async function createUserSession(sessionData: UserAuthSessionInfo) {
  const client = getSupabaseServiceRole();

  const { data, error } = await client
    .from("userSession")
    .insert(sessionData)
    .select("id")
    .single();

  if (!data || error) return null;

  return data;
}

export async function getUserSession(userId: string, userSessionId: string) {
  const { data, error } = await getSupabaseServiceRole()
    .from("userSession")
    .select("*")
    .eq("userId", userId)
    .eq("id", userSessionId)
    .single();

  if (!data || error) return null;

  return data;
}

export async function refreshAccessToken(
  refreshToken?: string,
  request?: Request,
  companyId?: string | null,
  userInfo?: { deviceInfo?: string; locationInfo?: any },
): Promise<AuthSession | null> {
  if (!refreshToken) return null;

  const client = getSupabaseServiceRole();

  const { data, error } = await client.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (!data.session || !data?.user?.id || error) return null;

  let userSessionId = null;

  if (userInfo) {
    const sessionData: UserAuthSessionInfo = {
      userId: data?.user?.id,
      device: !userInfo?.deviceInfo ? {} : JSON.parse(userInfo.deviceInfo),
      location: !userInfo?.locationInfo
        ? {}
        : JSON.parse(userInfo.locationInfo),
      ipAddress: !userInfo?.locationInfo
        ? ""
        : JSON.parse(userInfo.locationInfo).ip,
      status: "Logged In",
      sessionActivity: "Active",
      metadata: JSON.parse(JSON.stringify(data)),
      createdBy: data.user.id,
    };

    const session = await createUserSession(sessionData);

    if (!session) return null;

    userSessionId = session.id;
  } else {
    userSessionId = request
      ? ((await getAuthSession(request)) as AuthSession)?.userSessionId
      : "";
  }

  return makeAuthSession(data.session, companyId!, userSessionId);
}

export async function verifyAuthSession(authSession: AuthSession) {
  const authAccount = await getAuthAccountByAccessToken(
    authSession.accessToken,
  );
  return Boolean(authAccount);
}

// ======================================API VERSIONS =================================

export async function getApiUserSession(userId: string, userSessionId: string) {
  const { data, error } = await getSupabaseServiceRole()
    .from("apiUserSession")
    .select("*")
    .eq("userId", userId)
    .eq("id", userSessionId)
    .single();

  if (!data || error) return null;

  return data;
}

export async function APICreateUserSession(sessionData: UserAuthSessionInfo) {
  try {
    const client = getSupabaseServiceRole();

    const { data, error } = await client
      .from("apiUserSession")
      .insert(sessionData)
      .select("id")
      .single();

    if (error) {
      console.error("Error in APICreateUserSession:", error);
      return null;
    }

    if (!data) {
      console.error("No data returned from APICreateUserSession");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in APICreateUserSession:", error);
    return null;
  }
}

export async function APISignInWithEmail(
  email: string,
  password: string,
  deviceInfo: string,
  locationInfo: string,
): Promise<AuthSession | null> {
  const client = getSupabaseServiceRole();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (!data.session || error) return null;
  const companies = await getCompaniesForUser(client, data.user.id);

  const sessionData: UserAuthSessionInfo = {
    userId: data.user?.id,
    device: JSON.parse(deviceInfo),
    location: JSON.parse(locationInfo),
    ipAddress: JSON.parse(locationInfo).ip,
    status: UserStatus.LoggedIn,
    sessionActivity: SessionActivity.Active,
    metadata: data,
    createdBy: data.user?.id,
  };

  const session = await APICreateUserSession(sessionData);

  if (!session) return null;

  return APIMakeAuthSession(data.session, companies?.[0] ?? 1, session.id);
}

export async function APIRefreshAccessToken(
  refreshToken: string,
  companyId: string,
  userInfo?: { deviceInfo?: string; locationInfo?: any },
): Promise<AuthSession | null> {
  const client = getSupabaseServiceRole();

  const { data, error } = await client.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (!data.session || !data?.user?.id || error) return null;

  let userSessionId = null;

  if (userInfo) {
    const sessionData: UserAuthSessionInfo = {
      userId: data?.user?.id,
      device: !userInfo?.deviceInfo ? {} : JSON.parse(userInfo.deviceInfo),
      location: !userInfo?.locationInfo
        ? {}
        : JSON.parse(userInfo.locationInfo),
      ipAddress: !userInfo?.locationInfo
        ? ""
        : JSON.parse(userInfo.locationInfo).ip,
      status: UserStatus.LoggedIn,
      sessionActivity: SessionActivity.Active,
      metadata: data,
      createdBy: data.user.id,
    };

    const session = await APICreateUserSession(sessionData);

    if (!session) return null;

    userSessionId = session.id;
  }

  return APIMakeAuthSession(data.session, companyId, userSessionId);
}

export async function APIMakeAuthSession(
  sessionData: any,
  companyId: string,
  sessionId: string,
): Promise<AuthSession | null> {
  try {
    if (!sessionData) return null;

    if (!sessionData.refresh_token) {
      throw new Error("User should have a refresh token");
    }

    if (!sessionData.user?.email) {
      throw new Error("User should have an email");
    }

    const REFRESH_ACCESS_TOKEN_THRESHOLD = 300;

    const authSession: AuthSession = {
      userSessionId: sessionId,
      accessToken: sessionData.access_token,
      companyId,
      refreshToken: sessionData.refresh_token,
      userId: sessionData.user.id,
      email: sessionData.user.email,
      expiresIn:
        (sessionData.expires_in ?? ACCESS_TOKEN_EXPIRY) -
        REFRESH_ACCESS_TOKEN_THRESHOLD,
      expiresAt: sessionData.expires_at ?? -1,
    };

    return authSession;
  } catch (error) {
    console.error("Error in APIMakeAuthSession:", error);
    return null;
  }
}

// export async function verify2FA(userId: string, code: string) {
//   const { data, error } = await getSupabaseServiceRole().auth.admin.verifyOtp({
//     userId,
//     type: 'totp',
//     token: code,
//   });

//   if (error) return null;
//   return data;
// }




// app/utils/supabase.server.ts



// Custom types for our authentication flow
export interface SignupData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  companyName: string;
}

export interface PasswordSetupData {
  password: string;
  confirmPassword: string;
}

// Validation helpers
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
  // International phone format
  const phoneRegex = /^\+[1-9]\d{10,14}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const getUserId = async ({
  email,
  firstName,
  phone
}: {
  email: string,
  firstName: string,
  phone: string
}): Promise<string> => {
  const existingUserId = await getSupabaseServiceRole().auth.admin
    .listUsers()
    .then(
      ({ data }) =>
        data.users.find((user: User) => user?.email! === email)?.id,
    );

  if (existingUserId) return existingUserId;

  const newUserId = await getSupabaseServiceRole().auth.admin
    .createUser({
      email: email,
      phone: phone,
      email_confirm: false,
      phone_confirm: false
    })
    .then(({ data }) => data.user?.id)
    .catch((e) => {
      throw e;
    });

  if (newUserId) return newUserId;

  throw new Error("Could not create or get user");
};

// Auth service functions
export async function createTenantAndUser(userData: SignupData) {

  const userId = await getUserId({
    email: userData.email,
    firstName: userData.firstName,
    phone: userData.phone,
  })

  const { data: user, error: tenantError } = await getSupabaseServiceRole()
    .from('user')
    .upsert([
      {
        id: userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        permissions,
      }
    ])
    .select()
    .single();

  if (tenantError) throw new Error('Failed to create tenant');

  // const { data: user, error: userError } = await getSupabaseServiceRole().auth.admin.createUser({
  //   email: userData.email,
  //   phone: userData.phone,
  //   user_metadata: {
  //     first_name: userData.firstName,
  //     last_name: userData.lastName,
  //     tenant_id: tenant.id
  //   },
  //   email_confirm: false,
  //   phone_confirm: false
  // });

  // if (userError) throw new Error('Failed to create user');

  return { user };
}

export async function sendVerificationOTP(email: string, phone: string) {
  // Send email OTP
  const { error: emailError } = await getSupabaseServiceRole().auth.signInWithOtp({
    email,
  });

  if (emailError) throw new Error('Failed to send email OTP');

  // Send phone OTP (if implemented)
  // const { error: phoneError } = await supabase.auth.signInWithOtp({
  //   phone,
  // });

  // if (phoneError) throw new Error('Failed to send phone OTP');
}

export async function verifyOTP(email: string, emailToken: string) {
  const { data, error } = await getSupabaseServiceRole().auth.verifyOtp({
    email,
    token: emailToken,
    type: 'email'
  });

  if (error) throw new Error('Invalid OTP');
  return data;
}

export async function setupPassword(userId: string, password: string) {
  const { error } = await getSupabaseServiceRole().auth.admin.updateUserById(
    userId,
    { password }
  );

  if (error) throw new Error('Failed to set password');
}