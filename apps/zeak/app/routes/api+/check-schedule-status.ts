import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { logger, schedules } from "@trigger.dev/sdk/v3";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("check-schedule-status called!");
  const url = new URL(request.url);
  const taskId = url.searchParams.get("taskId");

  if (!taskId) {
    return json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    // Get all schedules for the task
    const scheduleList = await schedules.list({
      page: 1,
      perPage: 1,
    });
    // Find schedule for this specific task
    const taskSchedule = scheduleList.data.find(
      (schedule: { task: string }) => schedule.task === taskId,
    );

    return json({
      exists: !!taskSchedule,
      isActive: taskSchedule?.active ?? false,
      cron: taskSchedule?.generator?.expression,
    });
  } catch (error: unknown) {
    logger.error(
      "Error checking schedule status:",
      error as Record<string, unknown>,
    );
    return json({
      exists: false,
      isActive: false,
    });
  }
}
