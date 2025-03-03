import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { tasks } from "@trigger.dev/sdk/v3";

export const action: ActionFunction = async ({ request }) => {
  const { taskId, payload } = await request.json();

  try {
    await tasks.trigger(taskId, payload);
    return json({ success: true });
  } catch (error) {
    console.error("Failed to trigger task:", error);
    return json(
      { success: false, error: "Failed to trigger task" },
      { status: 500 },
    );
  }
};
