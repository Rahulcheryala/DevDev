// tasksRegistry.ts
import { task as originalTask, schedules } from "@trigger.dev/sdk/v3";

type TaskMetadata = {
  name: string;
  id: string;
  description: string;
  priority: string;
  createdBy: string;
  createdOn: string; // Automatically populated at runtime
  lastRun: Date | null; // Populated dynamically when the task runs
  //status: string;
  noOfRuns: number;
  isActive: boolean;
  scheduleId?: string;
};

// Array to hold all registered tasks
const configuredTasks: TaskMetadata[] = [];

/**
 * Adds a task to the configured tasks array with metadata.
 * Dynamically populates `createdOn` property.
 * @param task - The task object including metadata.
 */
export const registerTask = ({
  id,
  name,
  description,
  priority,
  createdBy,
  isActive,
  ...taskConfig
}: Omit<TaskMetadata, "createdOn" | "lastRun" | "noOfRuns"> &
  Parameters<typeof originalTask>[0]) => {
  // Register the task automatically

  console.log("Registering task:", id); // <--- Add this log

  configuredTasks.push({
    id,
    name,
    description,
    priority,
    createdBy,
    createdOn: new Date().toISOString(), // Automatically set createdOn
    lastRun: null, // Initially set to null, populated dynamically if needed
    noOfRuns: 0,
    isActive,
  });

  // Return the original task function with the rest of the task configuration
  return originalTask({ id, ...taskConfig });
};

/**
 * Registers a scheduled task with metadata and adds it to the `configuredTasks` array.
 * Dynamically populates `createdOn` property and includes schedule information.
 * @param scheduledTaskConfig - The task object including metadata.
 */
export const registerScheduledTask = ({
  id,
  name,
  description,
  priority,
  createdBy,
  isActive,
  scheduleId,
  ...taskConfig
}: Omit<TaskMetadata, "createdOn" | "lastRun" | "noOfRuns"> &
  Parameters<typeof schedules.task>[0] & { scheduleId: string }) => {
  console.log("Registering scheduled task:", id);

  configuredTasks.push({
    id,
    name,
    description,
    priority,
    createdBy,
    isActive,
    scheduleId,
    createdOn: new Date().toISOString(),
    lastRun: null,
    noOfRuns: 0,
  });

  // Return the original scheduled task function with the rest of the task configuration
  return schedules.task({ id, ...taskConfig });
};

/**
 * Retrieves all configured tasks.
 */
export const getAllTasks = () => {
  console.log("Fetching all tasks:", configuredTasks); // <--- Add this log
  return configuredTasks;
};

export const registerEventTask = ({
  id,
  name,
  description,
  priority,
  createdBy,
  event,
  ...taskConfig
}: Omit<TaskMetadata, "createdOn" | "lastRun" | "noOfRuns"> &
  Parameters<typeof originalTask>[0] & { event: string }) => {
  console.log("Registering event task:", id);

  configuredTasks.push({
    id,
    name,
    description,
    priority,
    createdBy,
    createdOn: new Date().toISOString(),
    lastRun: null,
    noOfRuns: 0,
    isActive: true,
  });

  return originalTask({ id, event, ...taskConfig });
};

export { configuredTasks };
