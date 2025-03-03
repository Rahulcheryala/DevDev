import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { getSupabaseServiceRole } from "~/lib/supabase/client";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const supabase = getSupabaseServiceRole();

    // Fetch tables
    const { data: tables, error: tablesError } =
      await supabase.rpc("list_tables");

    if (tablesError) {
      console.error("Error fetching tables:", tablesError);
      return json(
        {
          success: false,
          error: "Error fetching tables",
          details: tablesError.message,
        },
        {
          status: 500,
        },
      );
    }

    if (!tables || tables.length === 0) {
      return json({
        success: true,
        variables: [],
        count: 0,
      });
    }

    // For each table, fetch columns
    const allVariables = [];
    for (const table of tables) {
      try {
        const { data: columns, error: columnsError } = await supabase.rpc(
          "list_columns",
          {
            p_table_name: table.table_name, // Match the parameter name in the function
          },
        );

        if (columnsError) {
          console.error(
            `Error fetching columns for table ${table.table_name}:`,
            columnsError,
          );
          continue;
        }

        if (columns && columns.length > 0) {
          // Add regular column variables
          allVariables.push(
            ...columns.map((col) => ({
              name: `${table.table_name}.${col.column_name}`,
              type: col.data_type,
            })),
          );

          // Add count variable for specific tables
          if (
            ["salesorders", "orders", "invoices"].includes(
              table.table_name.toLowerCase(),
            )
          ) {
            allVariables.push({
              name: `count.${table.table_name}`,
              type: "integer",
            });
          }
        }
      } catch (columnError) {
        console.error(
          `Error processing table ${table.table_name}:`,
          columnError,
        );
        continue;
      }
    }

    // Add timestamp variables
    const timestampVariables = [
      { name: "timestamp.current", type: "timestamp" },
      { name: "timestamp.lastSync", type: "timestamp" },
      { name: "timestamp.nextSync", type: "timestamp" },
    ];

    const variables = [...allVariables, ...timestampVariables];

    return json({
      success: true,
      variables: variables.map((v) => v.name),
      variablesWithTypes: variables,
      count: variables.length,
    });
  } catch (error) {
    console.error("Error in context-variables loader:", error);
    return json(
      {
        success: false,
        error: "Failed to fetch context variables",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
};
