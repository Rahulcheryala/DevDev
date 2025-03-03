import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { GenericQueryFilters } from "~/utils/query";
import { setGenericQueryFilters } from "~/utils/query";


export default async function getPaginatedCompanyList(
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