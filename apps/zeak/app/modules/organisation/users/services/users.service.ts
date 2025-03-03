import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import logger from "~/lib/logger";
import type { GenericQueryFilters } from "~/utils/query";
import { setGenericQueryFilters } from "~/utils/query";
import { capitalize } from "~/utils/string";
import { sanitize } from "~/utils/supabase";
import type { CompanyPermission } from "./types";

export async function deleteEmployeeType(
  client: SupabaseClient<Database>,
  employeeTypeId: string,
) {
  return client.from("employeeType").delete().eq("id", employeeTypeId);
}

export async function getCompaniesForUser(
  client: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await client
    .from("userToCompany")
    .select("companyId")
    .eq("userId", userId);

  if (error) {
    logger.error(error, `Failed to get companies for user ${userId}`);
    return [];
  }

  return data?.map((row) => row.companyId) ?? [];
}

export async function getEmployee(
  client: SupabaseClient<Database>,
  id: string,
  companyId: string,
) {
  return client
    .from("employees")
    .select("*")
    .eq("id", id)
    .eq("companyId", companyId)
    .single();
}

export async function getEmployeeRoleDetails(
  client: SupabaseClient<Database>,
  id: string,
  companyId: string,
) {
  return client
    .from("employees")
    .select(`employeeType(id, name)`)
    .eq("id", id)
    .eq("companyId", companyId)
    .single();
}

export async function getEmployees(
  client: SupabaseClient<Database>,
  companyId: string,
  args: GenericQueryFilters & {
    search: string | null;
  },
) {
  let query = client
    .from("employees")
    .select("*", { count: "exact" })
    .eq("companyId", companyId);

  if (args.search) {
    query = query.ilike("fullName", `%${args.search}%`);
  }

  query = setGenericQueryFilters(query, args, [
    { column: "lastName", ascending: true },
  ]);
  return query;
}

export async function getEmployeesSimpleList(
  client: SupabaseClient<Database>,
  companyId: string,
  args?: GenericQueryFilters & {
    search: string | null;
  },
) {
  let query = client
    .from("employees")
    .select("id, name, avatarUrl, email", { count: "exact" })
    .eq("companyId", companyId);

  if (args && args.search) {
    query = query.ilike("name", `%${args.search}%`);
  }

  if (args) {
    query = setGenericQueryFilters(query, args, [
      { column: "lastName", ascending: true },
    ]);
  }
  return query;
}

export async function getEmployeeType(
  client: SupabaseClient<Database>,
  employeeTypeId: string,
) {
  return client
    .from("employeeType")
    .select("*")
    .eq("id", employeeTypeId)
    .single();
}

export async function getEmployeeTypes(
  client: SupabaseClient<Database>,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("employeeType")
    .select("*", { count: "exact" })
    .eq("companyId", companyId);

  if (args?.search) {
    query = query.ilike("name", `%${args.search}%`);
  }

  if (args) {
    query = setGenericQueryFilters(query, args, [
      { column: "name", ascending: true },
    ]);
  }

  return query;
}

export async function getModules(client: SupabaseClient<Database>) {
  return client.from("modules").select("name").order("name");
}

export async function getPermissionsByEmployeeType(
  client: SupabaseClient<Database>,
  employeeTypeId: string,
) {
  return client
    .from("employeeTypePermission")
    .select("view, create, update, delete, module")
    .eq("employeeTypeId", employeeTypeId);
}

export async function getUsers(client: SupabaseClient<Database>) {
  return client
    .from("user")
    .select(
      "id, firstName, lastName, fullName, email, phno, avatarUrl, address1, address2, zipCode, city, state, country, 2FAEnabled, birthday",
    )
    .eq("active", true)
    .order("lastName");
}

export async function insertEmployeeType(
  client: SupabaseClient<Database>,
  employeeType: { name: string; companyId: string },
) {
  return client
    .from("employeeType")
    .insert([employeeType])
    .select("id")
    .single();
}

export async function upsertEmployeeType(
  client: SupabaseClient<Database>,
  employeeType:
    | { name: string; companyId: string }
    | { id: string; name: string },
) {
  if ("id" in employeeType) {
    return client
      .from("employeeType")
      .update(sanitize(employeeType))
      .eq("id", employeeType.id)
      .select("id")
      .single();
  }
  return client
    .from("employeeType")
    .insert([employeeType])
    .select("id")
    .single();
}

export async function upsertEmployeeTypePermissions(
  client: SupabaseClient<Database>,
  employeeTypeId: string,
  companyId: string,
  permissions: { name: string; permission: CompanyPermission }[],
) {
  const employeeTypePermissions = permissions.map(({ name, permission }) => ({
    employeeTypeId,
    module: capitalize(name) as "Accounting",
    view: permission.view ? [companyId] : [],
    create: permission.create ? [companyId] : [],
    update: permission.update ? [companyId] : [],
    delete: permission.delete ? [companyId] : [],
  }));

  return client.from("employeeTypePermission").upsert(employeeTypePermissions);
}
