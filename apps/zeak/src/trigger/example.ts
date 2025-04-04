import { registerTask, configuredTasks } from "../taskRegistry";
import {
  logger,
  wait,
  queue,
  usage,
  runs,
  tasks,
  task,
} from "@trigger.dev/sdk/v3";
import {
  fetchUserIdAndCompanyId,
  startUpdateLoop,
  parseCsv,
  processBatches,
  insertWorkflowLog,
  updateWorkflowLogScores,
} from "../taskHelpers";
import type { ExtendedContext } from "~/modules/workflows";
import fs from "fs";
import path from "path";

configuredTasks.splice(0, configuredTasks.length);

// Extend the base Trigger.dev context with custom fields

const OneAtATimeQueue = queue({
  name: "OneAtATimeQueue",
  concurrencyLimit: 1,
});

const TenAtATimeQueue = queue({
  name: "TenAtATimeQueue",
  concurrencyLimit: 10,
});

export const helloWorldTask = registerTask({
  id: "hello_world_task_ayush",
  name: "Hello World",
  description: "A simple task that waits for 5 seconds logs 'Hello, World!' ",
  priority: "Low",
  createdBy: "Bindu",
  isActive: true, // or false, depending on the task status

  // onStart lifecycle - handle error and set ctx.hasError if needed
  onStart: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Task is starting!", { payload, ctx });

    try {
      logger.log("User Email is:" + payload.email);
      const userData = await fetchUserIdAndCompanyId(payload.email);
      logger.log("User Data is: " + JSON.stringify(userData));

      if (userData && userData.userId && userData.companyId) {
        ctx.userId = userData.userId;
        ctx.companyId = userData.companyId;
      }

      // Insert initial workflow log
      const runDetails = await runs.retrieve(ctx.run.id);
      await insertWorkflowLog(runDetails, ctx, ctx.userId, ctx.companyId);
    } catch (error: unknown) {
      logger.error(`Error in onStart: ${error.message}`);
      ctx.hasError = true; // Mark that an error occurred
    }
  },

  // Initialization phase - handle errors and set ctx.hasError if needed
  init: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Task is running", { payload, ctx });
    const runId = ctx.run.id;

    try {
      // Set status to 'Running'
      await updateWorkflowLogScores(runId, { status: "Running" });

      // Start updating the chronological duration every second
      ctx.isCompleted = false;
      startUpdateLoop(runId, ctx);
    } catch (error: any) {
      logger.error(`Error in init: ${error.message}`);
      ctx.hasError = true; // Mark that an error occurred
    }
  },

  // Main task execution - handle errors and set ctx.hasError if needed
  run: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Hello, world!", { payload, ctx });

    try {
      await wait.for({ seconds: 5 });
    } catch (error: any) {
      logger.error(`Error in run: ${error.message}`);
      ctx.hasError = true; // Mark that an error occurred
    }

    return {
      message: "Hello World after 5s!",
    };
  },

  // Handle success, and set status based on ctx.hasError
  onSuccess: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    logger.log("Task completed successfully.");

    // Get current total compute duration
    const usageCurrent = usage.getCurrent().compute.total.durationMs;
    logger.log("Current Usage: " + usageCurrent);

    // Check if any error occurred during the task
    const status = ctx.hasError ? "Error" : "Completed";
    logger.log("Error Status: " + ctx.hasError);
    // Update workflow log with the final status
    await updateWorkflowLogScores(runId, {
      status, // Set either 'Completed' or 'Error'
      logs: { totalComputeDuration: usageCurrent },
    });

    ctx.isCompleted = true;
  },

  // Handle task failure, and set ctx.hasError to true
  onFailure: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    logger.error("Task failed.");

    // Set status to 'Failed'
    await updateWorkflowLogScores(runId, { status: "Failed" });

    // Mark the task as completed to stop the update loop
    ctx.isCompleted = true;
    ctx.hasError = true; // Mark that an error occurred
  },
});

export const helloWorldTask2 = registerTask({
  id: "hello-world_task2",
  name: "Hello World 2",
  description: "Sends another hello world message",
  priority: "Medium",
  createdBy: "Anupam Appar",
  isActive: true,

  onStart: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Task is starting!", { payload, ctx });

    try {
      const userEmail = payload.email;
      const userData = await fetchUserIdAndCompanyId(userEmail);

      if (userData && userData.userId && userData.companyId) {
        ctx.userId = userData.userId;
        ctx.companyId = userData.companyId;
      }

      const runDetails = await runs.retrieve(ctx.run.id);
      await insertWorkflowLog(runDetails, ctx, ctx.userId, ctx.companyId);
    } catch (error: any) {
      logger.error(`Error in onStart: ${error.message}`);
      ctx.hasError = true;
    }
  },

  init: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    const runId = ctx.run.id;
    try {
      await updateWorkflowLogScores(runId, { status: "Running" });
      ctx.isCompleted = false;
      startUpdateLoop(runId, ctx);
    } catch (error: any) {
      logger.error(`Error in init: ${error.message}`);
      ctx.hasError = true;
    }
  },

  run: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    try {
      logger.log("Hello, world 2!", { payload, ctx });
      await wait.for({ seconds: 1 });
    } catch (error: any) {
      logger.error(`Error in run: ${error.message}`);
      ctx.hasError = true;
    }

    return { message: "Hello, world 2!" };
  },

  onSuccess: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    const usageCurrent = usage.getCurrent().compute.total.durationMs;
    const status = ctx.hasError ? "Error" : "Completed";

    await updateWorkflowLogScores(runId, {
      status,
      logs: { totalComputeDuration: usageCurrent },
    });

    ctx.isCompleted = true;
  },

  onFailure: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    await updateWorkflowLogScores(runId, { status: "Failed" });
    ctx.isCompleted = true;
    ctx.hasError = true;
  },
});

export const getHelloWorldRunTask = registerTask({
  id: "get-hello-world-run",
  name: "Get Hello World Run",
  description: "Fetches the last 20 runs for the Hello World Task",
  priority: "Low",
  createdBy: "Anupam Appar",
  isActive: true,

  onStart: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Task is starting!", { payload, ctx });

    try {
      const userEmail = payload.email;
      const userData = await fetchUserIdAndCompanyId(userEmail);

      if (userData && userData.userId && userData.companyId) {
        ctx.userId = userData.userId;
        ctx.companyId = userData.companyId;
      }

      const runDetails = await runs.retrieve(ctx.run.id);
      await insertWorkflowLog(runDetails, ctx, ctx.userId, ctx.companyId);
    } catch (error: any) {
      logger.error(`Error in onStart: ${error.message}`);
      ctx.hasError = true;
    }
  },

  init: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    const runId = ctx.run.id;
    try {
      await updateWorkflowLogScores(runId, { status: "Running" });
      ctx.isCompleted = false;
      startUpdateLoop(runId, ctx);
    } catch (error: any) {
      logger.error(`Error in init: ${error.message}`);
      ctx.hasError = true;
    }
  },

  run: async (payload: any, { ctx }) => {
    try {
      logger.log("Get hello world run!", { payload, ctx });
      const run = await runs.list({ limit: 20 });
      return run;
    } catch (error) {
      logger.error(`Error in run: ${error.message}`);
      ctx.hasError = true;
      return { message: "Error fetching runs." };
    }
  },

  onSuccess: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    const usageCurrent = usage.getCurrent().compute.total.durationMs;
    const status = ctx.hasError ? "Error" : "Completed";

    await updateWorkflowLogScores(runId, {
      status,
      logs: { totalComputeDuration: usageCurrent },
    });

    ctx.isCompleted = true;
  },

  onFailure: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    await updateWorkflowLogScores(runId, { status: "Failed" });
    ctx.isCompleted = true;
    ctx.hasError = true;
  },
});

export const runTenTasks = registerTask({
  id: "ten-hello-world-run",
  name: "Run Hello World 10 Times",
  description: "Runs helloWorldTask and helloWorldTask2 10 times",
  priority: "High",
  createdBy: "Kiran",
  isActive: true,
  queue: TenAtATimeQueue,

  onStart: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Task is starting!", { payload, ctx });

    try {
      const userEmail = payload.email;
      const userData = await fetchUserIdAndCompanyId(userEmail);

      if (userData && userData.userId && userData.companyId) {
        ctx.userId = userData.userId;
        ctx.companyId = userData.companyId;
      }

      const runDetails = await runs.retrieve(ctx.run.id);
      await insertWorkflowLog(runDetails, ctx, ctx.userId, ctx.companyId);
    } catch (error: any) {
      logger.error(`Error in onStart: ${error.message}`);
      ctx.hasError = true;
    }
  },

  init: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    const runId = ctx.run.id;
    try {
      await updateWorkflowLogScores(runId, { status: "Running" });
      ctx.isCompleted = false;
      startUpdateLoop(runId, ctx);
    } catch (error: any) {
      logger.error(`Error in init: ${error.message}`);
      ctx.hasError = true;
    }
  },

  run: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    try {
      logger.log("Running 10 hello world tasks each!", { payload, ctx });

      // Create an array of task promises using triggerAndPoll
      const taskPromises = Array.from({ length: 10 }, async (_, i) => {
        logger.log(
          `Triggering and polling task ${
            i + 1
          } for helloWorldTask and helloWorldTask2`,
        );

        return Promise.all([
          tasks.triggerAndPoll(
            helloWorldTask.id,
            { email: "devtest@xcelpros.com" },
            { pollIntervalMs: 2000 }, // Poll every 2 seconds
          ),
          tasks.triggerAndPoll(
            helloWorldTask2.id,
            { email: "devtest@xcelpros.com" },
            { pollIntervalMs: 2000 }, // Poll every 2 seconds
          ),
        ]);
      });

      // Wait for all task promises to resolve
      await Promise.all(taskPromises);

      logger.log("Successfully triggered and completed all 10 tasks.");
    } catch (error: any) {
      logger.error(`Error in run: ${error.message}`);
      ctx.hasError = true;
    }

    return { message: "Successfully triggered 10 tasks." };
  },

  onSuccess: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    const usageCurrent = usage.getCurrent().compute.total.durationMs;
    const status = ctx.hasError ? "Error" : "Completed";

    await updateWorkflowLogScores(runId, {
      status,
      logs: { totalComputeDuration: usageCurrent },
    });

    ctx.isCompleted = true;
  },

  onFailure: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    await updateWorkflowLogScores(runId, { status: "Failed" });
    ctx.isCompleted = true;
    ctx.hasError = true;
  },
});

export const seedTestScores = registerTask({
  id: "seed_test_scores",
  name: "Seed Test Scores",
  description: "Seeds test scores from a CSV file",
  queue: OneAtATimeQueue, // Adjust the queue based on your needs
  priority: "High",
  createdBy: "Yash",
  isActive: true,

  onStart: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    logger.log("Initializing seed_test_scores task", { payload, ctx });

    try {
      const userEmail = payload.email;

      // Fetch userId and companyId using the helper function
      const userData = await fetchUserIdAndCompanyId(userEmail);
      if (userData && userData.userId && userData.companyId) {
        ctx.userId = userData.userId;
        ctx.companyId = userData.companyId;
      }

      // Insert initial workflow log using helper
      const runDetails = await runs.retrieve(ctx.run.id);
      await insertWorkflowLog(runDetails, ctx, ctx.userId, ctx.companyId);
    } catch (error: any) {
      logger.error(`Error in onStart: ${error.message}`);
      ctx.hasError = true; // Mark an error
    }
  },

  init: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    const runId = ctx.run.id;

    try {
      // Set status to 'Running'
      await updateWorkflowLogScores(runId, { status: "Running" });

      // Start updating the chronological duration every second
      ctx.isCompleted = false;
      startUpdateLoop(runId, ctx);
    } catch (error: any) {
      logger.error(`Error in init: ${error.message}`);
      ctx.hasError = true;
    }
  },

  run: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
    const runId = ctx.run.id;
    const csvFilePath = path.resolve(
      __dirname,
      "../src/assets/MOCK_DATA_TEST_SCORES.csv",
    );

    // Check if the file exists
    if (!fs.existsSync(csvFilePath)) {
      logger.error(`CSV file not found at path: ${csvFilePath}`);
      await updateWorkflowLogScores(runId, { status: "Failed" });
      throw new Error(`CSV file not found at path: ${csvFilePath}`);
    }

    try {
      // Parse the CSV file
      const records = await parseCsv(csvFilePath, runId);
      logger.log(`Parsed ${records.length} records from CSV file.`);

      // Update logs with total records
      await updateWorkflowLogScores(runId, {
        logs: { totalRecords: records.length },
      });

      // Process batches
      await processBatches(records, runId, ctx);
    } catch (error: any) {
      logger.error(`Error during run: ${error.message}`);
      ctx.hasError = true;
      throw new Error(`Error during run: ${error.message}`);
    }

    ctx.isCompleted = true;
    return { message: "Seeding test_scores completed." };
  },

  onSuccess: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    const status = ctx.hasError ? "Error" : "Completed";

    await updateWorkflowLogScores(runId, { status });
    ctx.isCompleted = true;
  },

  onFailure: async (
    payload: any,
    error: unknown,
    { ctx }: { ctx: ExtendedContext },
  ) => {
    const runId = ctx.run.id;
    await updateWorkflowLogScores(runId, { status: "Failed" });
    ctx.isCompleted = true;
    ctx.hasError = true;
  },
});

export const createNotificationTrigger = async (
  client: any,
  { id, description, name, priority, createdBy, cronPattern }: any,
) => {
  const createdTask = task({
    id: id,
    name: name,
    description: description,
    priority: priority,
    createdBy: createdBy,
    isActive: true,
    queue: TenAtATimeQueue,

    // Main task execution - handle errors and set ctx.hasError if needed
    run: async (payload: any, { ctx }: { ctx: ExtendedContext }) => {
      const notification = await client
        .from("notfMaster" as any)
        .select("*")
        .eq("id", id)
        .single();

      logger.log("Hello, task running!", { payload, ctx, notification });
      return {
        message: "Hello World after 5s!",
      };
    },
    // Handle task failure, and set ctx.hasError to true
    onFailure: async (
      payload: any,
      error: unknown,
      { ctx }: { ctx: ExtendedContext },
    ) => {
      const runId = ctx.run.id;
      logger.error("Task failed.", error, runId);
    },
  });

  await createdTask.trigger({ email: "devtest@xcelpros.com" });

  return createdTask;

  //  return schedules.task({
  //   task: createdTask.id,
  //   cron: cronPattern,
  //   deduplicationKey: createdTask.id
  // })
};
