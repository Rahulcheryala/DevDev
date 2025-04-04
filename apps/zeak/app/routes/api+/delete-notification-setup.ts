import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsDelete } from "~/utils/http";

export const action: ActionFunction = async ({ request }) => {
  assertIsDelete(request);
  const { client } = await requirePermissions(request, {
    delete: "users",
  });

  try {
    const { name } = await request.json();

    // Delete notification by name
    const { error: deleteError } = await client
      .from("notfMaster")
      .delete()
      .eq("name", name);

    if (deleteError) throw deleteError;

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete notification",
      },
      { status: 500 },
    );
  }
};
