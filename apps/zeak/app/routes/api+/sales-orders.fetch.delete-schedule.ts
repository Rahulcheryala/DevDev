import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { schedules } from "@trigger.dev/sdk/v3";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { taskId } = await request.json();

    if (!taskId) {
      return json(
        { success: false, error: "taskId is required" },
        { status: 400 },
      );
    }

    // Get all schedules from trigger.dev
    const schedulesList = await schedules.list();
    console.log("List of Schedules:", JSON.stringify(schedulesList));

    // Filter and delete schedules related to this task
    const deletePromises = schedulesList.data
      .filter((schedule) => schedule.task === taskId)
      .map(async (schedule) => {
        console.log("schedule being deleted", schedule);
        try {
          console.log(`Deleting schedule ${schedule.id}`);
          await schedules.del(schedule.id);
        } catch (err) {
          console.error(`Failed to delete schedule ${schedule.id}:`, err);
        }
      });

    console.log("deletePromises", deletePromises);

    await Promise.all(deletePromises);

    return json({ success: true });
  } catch (error) {
    console.error("Error deleting schedules:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete schedules",
      },
      { status: 500 },
    );
  }
};
