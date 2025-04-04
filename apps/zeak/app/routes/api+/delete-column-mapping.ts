import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { requireAuthSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = (await requireAuthSession(request)).userId;
  const supabase = getSupabaseServiceRole();
  const url = new URL(request.url);
  const integrationId = url.searchParams.get("integrationId");

  if (!integrationId) {
    return json(
      { success: false, error: "integrationId is required" },
      { status: 400 },
    );
  }

  try {
    // First get all table mappings for this integration
    const { data: tableMappings, error: tableMappingsError } = await supabase
      .from("integrationTableMappings")
      .select("id")
      .eq("integrationId", integrationId);

    if (tableMappingsError) throw tableMappingsError;

    // Delete all column mappings for these table mappings
    if (tableMappings.length > 0) {
      const { error: deleteColumnError } = await supabase
        .from("integrationColumnMappings")
        .delete()
        .in(
          "tableMappingId",
          tableMappings.map((tm) => tm.id),
        );

      if (deleteColumnError) throw deleteColumnError;
    }

    // Delete the table mappings
    const { error: deleteTableError } = await supabase
      .from("integrationTableMappings")
      .delete()
      .eq("integrationId", integrationId);

    if (deleteTableError) throw deleteTableError;

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting column mapping:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete mapping",
      },
      { status: 500 },
    );
  }
};
