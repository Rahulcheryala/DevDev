import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { GenericQueryFilters } from "~/utils/query";
import { setGenericQueryFilters } from "~/utils/query";
import { sanitize } from "~/utils/supabase";
import type { RoleType, TeamStatus, DepartmentStatus } from "./types";

export async function getEmployeeTypes(
  client: SupabaseClient<Database>,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null } & {
    type?: string | null;
  },
) {
  let query = client
    .from("employeeType")
    .select("*", { count: "exact" })
    .eq("companyId", companyId);

  if (args?.type) {
    query = query.eq("type", args?.type ?? "Default");
  }

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

export async function upsertEmployeeType(
  client: SupabaseClient<Database>,
  employeeType:
    | { id: string; disable: boolean; modifiedOn: string; companyId: string }
    | {
        disable: boolean;
        name: string;
        description: string;
        type: RoleType;
        companyId: string;
        effectiveDate: string;
      }
    | {
        id: string;
        disable: boolean;
        name: string;
        description: string;
        type: RoleType;
        companyId: string;
        effectiveDate: string;
      },
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

export async function getTeams(
  client: SupabaseClient<Database>,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("team")
    .select(
      "id, name, description, status, companyId(id, name), createdOn, teamMember(id, userId(fullName, avatarUrl), employee(id, companyId, employeeType(name, description, id)), deletedOn)",
      { count: "exact" },
    )
    .eq("companyId", companyId)
    .is("deletedOn", null);

  if (args?.search) {
    query = query.ilike("name", `%${args.search}%`);
  }

  if (args) {
    query = setGenericQueryFilters(query, args, [
      { column: "name", ascending: true },
    ]);
  }

  query = query.filter("teamMember.deletedOn", "is", null);

  return query;
}

export async function upsertTeam(
  client: SupabaseClient<Database>,
  team:
    | { id: string; status: TeamStatus; modifiedOn: string }
    | {
        name: string;
        description: string;
        status: TeamStatus;
        companyId: string;
        createdBy: string;
      }
    | {
        id: string;
        name: string;
        description: string;
        modifiedBy: string;
        modifiedOn: string;
      },
) {
  if ("id" in team) {
    return client
      .from("team")
      .update(sanitize(team))
      .eq("id", team.id)
      .select("id")
      .single();
  }
  return client.from("team").insert([team]).select("id").single();
}

export async function getTeam(
  client: SupabaseClient<Database>,
  teamId: string,
) {
  return client
    .from("team")
    .select("*")
    .eq("id", teamId)
    .is("deletedOn", null)
    .single();
}

export async function deleteTeam(
  client: SupabaseClient<Database>,
  teamIds: Array<string>,
  userId: string,
) {
  return client
    .from("team")
    .update({ deletedOn: new Date().toISOString(), deletedBy: userId })
    .in("id", teamIds);
}

export async function getTeamMembers(
  client: SupabaseClient<Database>,
  teamId: string,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("teamMember")
    .select(
      "id, userId(id, fullName, email, avatarUrl, active), teamId, companyId(id, name), employee(id, companyId, employeeType(name, description, id))",
      {
        count: "exact",
      },
    )
    .eq("companyId", companyId)
    .eq("teamId", teamId)
    .is("deletedOn", null);

  if (args?.search) {
    query = query.ilike("teamId", `%${args.search}%`);
  }

  if (args) {
    query = setGenericQueryFilters(query, args, [
      { column: "teamId", ascending: true },
    ]);
  }

  return query;
}

export async function upsertTeamMember(
  client: SupabaseClient<Database>,
  teamMember:
    | { id: string }
    | {
        teamId: string;
        userId: string;
        employeeId: string;
        status: TeamStatus;
        companyId: string;
        createdBy: string;
        createdOn: string;
      },
) {
  if ("id" in teamMember) {
    return client
      .from("teamMember")
      .update(sanitize(teamMember))
      .eq("id", teamMember.id)
      .select("id")
      .single();
  }
  return client.from("teamMember").insert([teamMember]).select("id").single();
}

export async function deleteTeamMember(
  client: SupabaseClient<Database>,
  teamMemberIds: Array<string>,
  userId: string,
) {
  return client
    .from("teamMember")
    .update({ deletedOn: new Date().toISOString(), deletedBy: userId })
    .in("id", teamMemberIds);
}

export async function getDepartments(
  client: SupabaseClient<Database>,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("department")
    .select(
      "id, name, departmentCode, description, status, logo, company:company(id, name), supervisor, supervisorDetails:user!department_supervisor_fkey(id, fullName, email), createdOn, createdBy, effectiveStartDate, effectiveEndDate, departmentMember(id, deletedOn), modifiedOn, modifiedBy",
      { count: "exact" },
    )
    .eq("companyId", companyId)
    .is("deletedOn", null);

  if (args?.search) {
    query = query.ilike("name", `%${args.search}%`);
  }

  if (args) {
    query = setGenericQueryFilters(query, args, [
      { column: "name", ascending: true },
    ]);
  }

  query = query.filter("departmentMember.deletedOn", "is", null);

  return query;
}

export async function upsertDepartment(
  client: SupabaseClient<Database>,
  department:
    | { id: string; status: DepartmentStatus; modifiedOn: string }
    | Database["public"]["Tables"]["department"]["Insert"]
    | {
        id: string;
        name: string;
        description: string;
        modifiedBy: string;
        modifiedOn: string;
      },
) {
  if (department?.id) {
    return client
      .from("department")
      .update(sanitize(department))
      .eq("id", department.id)
      .select("id")
      .single();
  }
  return client
    .from("department")
    .insert([
      department as Database["public"]["Tables"]["department"]["Insert"],
    ])
    .select("*")
    .single();
}

export async function getDepartment(
  client: SupabaseClient<Database>,
  departmentId: string,
) {
  return client
    .from("department")
    .select("*")
    .eq("id", departmentId)
    .is("deletedOn", null)
    .single();
}

export async function getDepartmentByKey(
  client: SupabaseClient<Database>,
  obj: { [key: string]: any },
  isSingle = true,
) {
  if (!obj) return null;
  const query = client.from("department").select("*");

  Object.keys(obj).forEach((keyName: string) => {
    query.ilike(keyName, `%${obj[keyName]}%`);
  });
  query.is("deletedOn", null);

  if (isSingle) query.single();

  return query;
}

export async function deleteDepartment(
  client: SupabaseClient<Database>,
  departmentIds: Array<string>,
  userId: string,
) {
  return client
    .from("department")
    .update({ deletedOn: new Date().toISOString(), deletedBy: userId })
    .in("id", departmentIds);
}

export async function getDepartmentMembers(
  client: SupabaseClient<Database>,
  departmentId: string,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("departmentMember")
    .select(
      "id, userId, userDetails:user!departmentMember_userId_fkey(id, fullName, email, avatarUrl, active), departmentId, company:company(id, name), status",
      {
        count: "exact",
      },
    )
    .eq("companyId", companyId)
    .eq("departmentId", departmentId)
    .is("deletedOn", null);

  if (args?.search) {
    query = query.ilike("departmentId", `%${args.search}%`);
  }

  if (args) {
    query = setGenericQueryFilters(query, args, [
      { column: "departmentId", ascending: true },
    ]);
  }

  return query;
}

export async function upsertDepartmentMember(
  client: SupabaseClient<Database>,
  departmentMember:
    | { id: string }
    | {
        departmentId: string;
        userId: string;
        employeeId: string;
        status: DepartmentStatus;
        companyId: string;
        createdBy: string;
        createdOn: string;
      },
) {
  if ("id" in departmentMember) {
    return client
      .from("departmentMember")
      .update(sanitize(departmentMember))
      .eq("id", departmentMember.id)
      .select("id")
      .single();
  }
  return client
    .from("departmentMember")
    .insert(departmentMember)
    .select("id")
    .single();
}

export function addDepartmentMembers(
  client: SupabaseClient<Database>,
  departmentMembers: Array<{
    departmentId: string;
    userId: string;
    companyId: string;
    createdBy: string;
    createdOn: string;
  }>,
) {
  return client.from("departmentMember").insert(departmentMembers).select("id");
}

export async function deleteDepartmentMember(
  client: SupabaseClient<Database>,
  departmentMemberIds: Array<string>,
  userId: string,
) {
  return client
    .from("departmentMember")
    .update({ deletedOn: new Date().toISOString(), deletedBy: userId })
    .eq("id", departmentMemberIds);
}

export async function deleteDepartmentMembers(
  client: SupabaseClient<Database>,
  departmentMemberIds: Array<string>,
  departmentId: string,
  userId: string,
) {
  return client
    .from("departmentMember")
    .update({ deletedOn: new Date().toISOString(), deletedBy: userId })
    .eq("departmentId", departmentId)
    .in("id", departmentMemberIds);
}

//////////////////////////
////    Companies    /////
//////////////////////////

export async function getPaginatedCompanyList(
  client: SupabaseClient<Database>,
  userId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("companies")
    .select(
      "id, name, companyCode, domainUrl, deletedAt, userId, status, logo",
      { count: "exact" },
    )
    .eq("userId", userId)
    .is("deletedAt", null)
    .order("name");

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

export async function deleteCompany(
  client: SupabaseClient<Database>,
  companyIds: Array<string>,
  userId: string,
) {
  return client
    .from("company")
    .update({ deletedAt: new Date().toISOString(), deletedBy: userId })
    .in("id", companyIds);
}

//////////////////////////
//////    Fonts    ///////
//////////////////////////

export async function getFonts(client: SupabaseClient<Database>) {
  return client
    .from("font")
    .select("*", { count: "exact" })
    .is("deletedOn", null)
    .order("name");
}

export async function insertFont(
  client: SupabaseClient<Database>,
  fontDetail: Database["public"]["Tables"]["font"]["Insert"],
) {
  return client.from("font").insert(fontDetail);
}

export async function deleteFont(
  client: SupabaseClient<Database>,
  fontId: string,
  fontDetail: Database["public"]["Tables"]["font"]["Update"],
) {
  return client.from("font").update(fontDetail).eq("id", fontId);
}

export async function checkCompanyName(
  client: SupabaseClient<Database>,
  companyName: string
) {
  return client
      .from("companyMaster")
      .select("*", { count: "exact" })
      .eq("name", companyName);
}

export async function checkCompanyCode(
  client: SupabaseClient<Database>,
  companyCode: string
) {
  return client
      .from("companyMaster")
      .select("*", { count: "exact" })
      .eq("companyCode", companyCode);
}
