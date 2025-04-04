import type { Database, Json } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { z } from "zod";
import type { DataType } from "~/modules/shared";
import type { GenericQueryFilters } from "~/utils/query";
import { setGenericQueryFilters } from "~/utils/query";
import { sanitize } from "~/utils/supabase";
import type {
  employeeJobValidator,
  locationValidator,
} from "./resources.models";

export async function deleteLocation(
  client: SupabaseClient<Database>,
  locationId: string,
) {
  return client.from("location").delete().eq("id", locationId);
}

export async function getEmployeeJob(
  client: SupabaseClient<Database>,
  employeeId: string,
  companyId: string,
) {
  return client
    .from("employeeJob")
    .select("*")
    .eq("id", employeeId)
    .eq("companyId", companyId)
    .single();
}

export async function getLocation(
  client: SupabaseClient<Database>,
  locationId: string,
) {
  return client.from("location").select("*").eq("id", locationId).single();
}

export async function getLocations(
  client: SupabaseClient<Database>,
  companyId: string,
  args?: GenericQueryFilters & { search: string | null },
) {
  let query = client
    .from("location")
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

export async function getLocationsList(
  client: SupabaseClient<Database>,
  companyId: string,
) {
  return client
    .from("location")
    .select(`id, name`)
    .eq("companyId", companyId)
    .order("name");
}

export type PersonAttributeValue = {
  userAttributeValueId: string;
  value: boolean | string | number;
  dataType?: DataType;
  user?: {
    id: string;
    fullName: string | null;
    avatarUrl: string | null;
  } | null;
};

export async function insertEmployeeJob(
  client: SupabaseClient<Database>,
  job: {
    id: string;
    companyId: string;
    locationId?: string;
  },
) {
  return client.from("employeeJob").insert(job).select("*").single();
}

export async function updateEmployeeJob(
  client: SupabaseClient<Database>,
  employeeId: string,
  employeeJob: z.infer<typeof employeeJobValidator> & {
    companyId: string;
    updatedBy: string;
    customFields?: Json;
  },
) {
  return client
    .from("employeeJob")
    .update(sanitize(employeeJob))
    .eq("id", employeeId)
    .eq("companyId", employeeJob.companyId);
}

export async function upsertLocation(
  client: SupabaseClient<Database>,
  location:
    | (Omit<z.infer<typeof locationValidator>, "id"> & {
        companyId: string;
        createdBy: string;
        customFields?: Json;
      })
    | (Omit<z.infer<typeof locationValidator>, "id"> & {
        id: string;
        updatedBy: string;
        customFields?: Json;
      }),
) {
  if ("id" in location) {
    return client
      .from("location")
      .update(sanitize(location))
      .eq("id", location.id);
  }
  return client.from("location").insert([location]).select("*").single();
}
