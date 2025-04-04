import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { requireAuthSession } from "~/services/session.server";

interface ColumnMappingRequest {
  integrationId: string;
  tableName: string;
  columns: Array<{
    sourceColumnName: string;
    displayName: string;
    dataType: string;
    isVisible: boolean;
    sortOrder: number;
  }>;
}

export const action: ActionFunction = async ({ request }) => {
  const userId = (await requireAuthSession(request)).userId;
  const supabase = getSupabaseServiceRole();

  try {
    const { integrationId, tableName, columns } =
      (await request.json()) as ColumnMappingRequest;
    console.log("integrationId", integrationId);

    if (!integrationId) {
      return json(
        {
          success: false,
          error: "integrationId is required",
        },
        { status: 400 },
      );
    }

    // Get the companyId from the integration
    const { data: integration, error: integrationError } = await supabase
      .from("integrations")
      .select("companyId")
      .eq("id", integrationId)
      .single();

    if (integrationError) throw integrationError;

    // First, get or create the table mapping
    const { data: tableMapping, error: tableMappingError } = await supabase
      .from("integrationTableMappings")
      .upsert(
        {
          integrationId,
          userId,
          companyId: integration.companyId,
          tableName,
          displayName: tableName,
          updatedAt: new Date().toISOString(),
        },
        {
          onConflict: "integrationId,tableName,companyId",
        },
      )
      .select()
      .single();

    if (tableMappingError) throw tableMappingError;

    // Delete existing column mappings for this table mapping
    const { error: deleteError } = await supabase
      .from("integrationColumnMappings")
      .delete()
      .eq("tableMappingId", tableMapping.id);

    if (deleteError) throw deleteError;

    // Insert new column mappings
    const { error: insertError } = await supabase
      .from("integrationColumnMappings")
      .insert(
        columns.map((col, index) => ({
          tableMappingId: tableMapping.id,
          sourceColumnName: col.sourceColumnName,
          displayName: col.displayName,
          dataType: col.dataType,
          isVisible: col.isVisible,
          sortOrder: col.sortOrder || index,
          updatedAt: new Date().toISOString(),
        })),
      );

    if (insertError) throw insertError;

    return json({ success: true });
  } catch (error) {
    console.error("Error saving column mapping:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to save column mapping",
      },
      { status: 500 },
    );
  }
};
