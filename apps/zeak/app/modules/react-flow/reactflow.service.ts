
import { getSupabaseServiceRole } from "~/lib/supabase";


const supabaseAdmin = getSupabaseServiceRole()

export async function insertOrUpdateReactFlowLogsData(data: any, id?: string) {
  let query = supabaseAdmin.from("workflowsTriggerRows");

  if (id) {
    // Check if the row with the given id exists
    const { data: existingData, error: checkError } = await query
      .select()
      .eq("id", id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing data:", checkError);
      throw checkError;
    }

    if (existingData) {
      // If the row exists, update it
      const { data: updatedData, error: updateError } = await query
        .update(data)
        .eq("id", id)
        .select();

      if (updateError) {
        console.error("Error updating data:", updateError);
        throw updateError;
      }

      return updatedData;
    }
  }

  // If no id provided or the row doesn't exist, insert a new row
  const { data: insertedData, error: insertError } = await query
    .insert(data) // Include the id in the insert if provided
    .select();

  if (insertError) {
    console.error("Error inserting data:", insertError);
    throw insertError;
  }

  return insertedData;
}

export function insertTriggerCreds(data: any) {
  return supabaseAdmin.from("integration_credentials").insert(data).select();
}

export async function getAllTables() {
  try {
    const { data, error } = await supabaseAdmin.rpc("get_all_tables");

    if (error) {
      console.error("Error fetching tables:", error);
    }

    // Extract only table names into an array
    const tableNames = data.map((table: any) => ({
      name: table.table_name,
      value: table.table_name,
    }));

    return { data: tableNames };
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

export async function getAllTriggerCategories() {
  const { data, error } = await supabaseAdmin
    .from("triggerCategories")
    .select("*");

  if (error) {
    console.error("Error fetching trigger categories:", error);
    throw error;
  }

  return { data, error };
}

export async function getAllTriggers() {
  const { data, error } = await supabaseAdmin
    .from("whensTriggerRows")
    .select("*");

  if (error) {
    console.error("Error fetching triggers:", error);
    throw error;
  }

  return { data, error };
}
export async function getAllActions() {
  const { data, error } = await supabaseAdmin.from("triggerEvents").select("*");

  if (error) {
    console.error("Error fetching triggers:", error);
    throw error;
  }

  return { data, error };
}

export async function getAllTablesColumns(tableName: string) {
  const { data, error } = await supabaseAdmin.rpc("get_types", {
    tname: tableName,
  });

  if (error) {
    console.error("Error fetching table column types:", error);
  }

  return { data, error };
}
