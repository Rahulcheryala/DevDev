import { json, type ActionFunctionArgs } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { resolveVariable } from "~/utils/variableResolver";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const requestBody = await request.json();
    const { notificationId, data, preview } = requestBody;

    const supabase = getSupabaseServiceRole();
    const { data: notification, error } = await supabase
      .from("notfMaster")
      .select("*, createdBy")
      .eq("id", notificationId)
      .single();

    if (error) {
      throw new Error("Failed to fetch notification");
    }

    let resolvedContent = notification.webContent as string;

    // First, handle count patterns
    const countRegex = /\$count\{\{([^}]+)\}\}/g;
    const countMatches = [...(resolvedContent ?? "").matchAll(countRegex)];

    for (const match of countMatches) {
      const [fullMatch, tableName] = match;
      console.log("Resolving count for table:", tableName);

      const count = await resolveVariable(
        tableName.trim(),
        {
          userId: notification.createdBy,
          integrationId: notification.integrationId,
        },
        true,
      );

      resolvedContent = resolvedContent?.replace(
        fullMatch,
        count?.toString() || "0",
      );
    }

    // Then handle regular variables
    const variableRegex = /\$\{\{([^}]+)\}\}/g;
    const matches = [...(resolvedContent ?? "").matchAll(variableRegex)];

    for (const match of matches) {
      const [fullMatch, variablePath] = match;
      console.log("Resolving variable:", variablePath);

      const resolvedValue = await resolveVariable(variablePath.trim(), {
        userId: notification.createdBy,
        integrationId: notification.integrationId,
      });

      resolvedContent =
        resolvedContent?.replace(
          fullMatch,
          resolvedValue?.toString() || "[Not Found]",
        ) ?? null;
    }

    // Append the sales order count information
    resolvedContent = `${resolvedContent}\n${data.count} Sales Orders pulled from Dynamics in the latest sync`;

    return json({
      success: true,
      resolvedContent,
      originalContent: notification.webContent,
    });
  } catch (error) {
    console.error("Error generating preview:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate preview",
      },
      { status: 500 },
    );
  }
}
