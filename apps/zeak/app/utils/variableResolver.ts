import { getSupabaseServiceRole } from "~/lib/supabase/client";

export async function resolveVariable(
  variable: string,
  context: {
    userId?: string;
    integrationId?: string;
    timestamp?: Date;
  },
  isCount: boolean = false, // New parameter to indicate if this is a count request
): Promise<string | number | null> {
  const supabase = getSupabaseServiceRole();
  console.log("Resolving variable:", variable, "isCount:", isCount);

  // If it's a count request, just get the count from the table name
  if (isCount) {
    console.log("Counting records in table:", variable);
    const { count, error } = await supabase
      .from(variable)
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(`Error getting count for ${variable}:`, error);
      return 0;
    }
    return count || 0;
  }

  // Handle regular variables (${{tableName.columnName}})
  const match = variable.match(/^([^.]+)\.([^.]+)$/);
  if (match) {
    const [_, tableName, columnName] = match;
    console.log("Fetching column:", columnName, "from table:", tableName);

    const { data, error } = await supabase
      .from(tableName)
      .select(columnName)
      .limit(1)
      .single();

    if (error) {
      console.error(`Error fetching ${columnName} from ${tableName}:`, error);
      return null;
    }

    return data[columnName] || null;
  }

  console.warn(`Unhandled variable pattern: ${variable}`);
  return null;
}
