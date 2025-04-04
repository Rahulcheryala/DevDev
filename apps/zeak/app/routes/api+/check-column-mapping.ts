import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase/client";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const integrationId = url.searchParams.get("integrationId");

  if (!integrationId) {
    return json({ hasMappings: false });
  }

  const supabase = getSupabaseServiceRole();

  const { data: tableMapping, error } = await supabase
    .from("integrationTableMappings")
    .select("id")
    .eq("integrationId", integrationId)
    .single();

  if (error) {
    console.error("Error checking mappings:", error);
    return json({ hasMappings: false });
  }

  const { data: mappings, error: mappingsError } = await supabase
    .from("integrationColumnMappings")
    .select("*")
    .eq("tableMappingId", tableMapping.id);

  return json({ hasMappings: !!mappings, mappings });
};
