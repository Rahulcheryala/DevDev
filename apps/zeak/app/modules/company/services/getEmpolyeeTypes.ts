import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { GenericQueryFilters } from "~/utils/query";
import { setGenericQueryFilters } from "~/utils/query";

export default async function getEmployeeTypes(
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
