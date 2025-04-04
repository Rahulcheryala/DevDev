import { schedules } from "@trigger.dev/sdk/v3";

interface ScheduleResult {
  success: boolean;
  schedule?: any;
  error?: string;
}

export async function activateSchedule(
  taskId: string,
): Promise<ScheduleResult> {
  try {
    // First, get all schedules for the task
    const scheduleList = await schedules.list({
      page: 1,
      perPage: 10, // Adjust if needed
    });

    // Find schedule for this specific task
    const taskSchedule = scheduleList.data.find(
      (schedule) => schedule.task === taskId,
    );

    if (!taskSchedule) {
      throw new Error(`No schedule found for task: ${taskId}`);
    }

    console.log(`Found schedule for task ${taskId}:`, taskSchedule);

    // Check if already active
    if (taskSchedule.active) {
      return {
        success: true,
        schedule: taskSchedule,
      };
    }

    // Activate the schedule
    const activatedSchedule = await schedules.activate(taskSchedule.id);

    console.log(`Activated schedule:`, activatedSchedule);

    return {
      success: true,
      schedule: activatedSchedule,
    };
  } catch (error) {
    console.error("Failed to activate schedule:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to activate schedule",
    };
  }
}

export async function deactivateSchedule(
  taskId: string,
): Promise<ScheduleResult> {
  try {
    // Get all schedules
    const scheduleList = await schedules.list({
      page: 1,
      perPage: 10,
    });

    // Find and deactivate all schedules for this task
    const taskSchedules = scheduleList.data.filter(
      (schedule) => schedule.task === taskId,
    );

    if (taskSchedules.length === 0) {
      return {
        success: true,
        error: "No active schedules found",
      };
    }

    // Deactivate all found schedules
    const deactivationPromises = taskSchedules.map((schedule) =>
      schedules.deactivate(schedule.id),
    );

    await Promise.all(deactivationPromises);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to deactivate schedule:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to deactivate schedule",
    };
  }
}
