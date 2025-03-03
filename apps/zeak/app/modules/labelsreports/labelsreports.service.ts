import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { GenericQueryFilters } from "~/utils/query";
import { setGenericQueryFilters } from "~/utils/query";
import type { LabelsReports } from "./types";

export async function deleteLabel(
  client: SupabaseClient<Database>,
  labelIds: Array<string>,
  userId: string,
) {
  return client
    .from("labelsReports")
    .update({ deletedOn: new Date().toISOString(), deletedBy: userId })
    .in("id", labelIds);
}

export async function getLabelsReportsCount(
  client: SupabaseClient<Database>,
  companyId: string,
) {
  return client
    .from("labelsReports")
    .select("*", { count: "exact", head: true })
    .eq("companyId", companyId);
}

export async function getLabelsReports(
  client: SupabaseClient<Database>,
  args: GenericQueryFilters & {
    name: string | null;
    status: string | null;
    labelType: string | null;
    id: string | null;
  },
  companyId: string,
) {
  let query = client
    .from("labelsReports")
    .select("*", { count: "exact" })
    .eq("companyId", companyId)
    .is("deletedOn", null);

  if (args.name) {
    query = query.ilike("name", `%${args.name}%`);
  }

  if (args.status) {
    query = query.eq("status", args.status as NonNullable<"Draft" | "Submitted" | "Approved" | "Not Approved" | "Hold">);
  }

  if (args.labelType) {
    query = query.eq("labelType", args.labelType as NonNullable<"Label" | "Document">);
  }
  if (args.id) {
    query = query.eq("id", args.id);
  }

  query = setGenericQueryFilters(query, args, [
    { column: "id", ascending: false },
  ]);
  return query;
}

export async function upsertLabel(
  client: SupabaseClient<Database>,
  label: Partial<LabelsReports>,
) {
  if (label.id) {
    return client
      .from("labelsreports")
      .update(label)
      .eq("id", label.id)
      .select();
  }

  return client.from("labelsreports").insert(label).select();
}

export async function getLabel(
  client: SupabaseClient<Database>,
  labelId: string,
) {
  return client.from("labelsreports").select("*").eq("id", labelId).single();
}
