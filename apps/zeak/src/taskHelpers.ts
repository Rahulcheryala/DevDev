import { logger, runs, usage, wait } from "@trigger.dev/sdk/v3";
import fs from "fs";
import pkg from "lodash";
import { createClient } from "@supabase/supabase-js";
import { configuredTasks } from "./taskRegistry";
import dotenv from "dotenv";
const { chunk } = pkg;

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_ROLE,
);

export async function fetchUserIdAndCompanyId(userEmail: string) {
  console.log(
    "The email address received in the helper function is :" + userEmail,
  );
  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("id")
    .eq("email", userEmail)
    .single();

  if (userError || !userData) {
    logger.error(`Error fetching user ID: ${userError?.message}`);
    throw new Error(`Error fetching user ID: ${userError?.message}`);
  }

  const userId = userData.id;

  // Fetch company ID
  const { data: userToCompanyData, error: userToCompanyError } = await supabase
    .from("userToCompany")
    .select("companyId")
    .eq("userId", userId)
    .single();

  if (userToCompanyError || !userToCompanyData) {
    logger.error(`Error fetching company ID: ${userToCompanyError?.message}`);
    throw new Error(
      `Error fetching company ID: ${userToCompanyError?.message}`,
    );
  }
  const companyId = userToCompanyData.companyId;

  return { userId, companyId };
}

export async function insertWorkflowLog(
  runDetails: any,
  ctx: any,
  userId: string,
  companyId: string,
) {
  const workflowLog = {
    runId: runDetails.id,
    workflowName: runDetails.taskIdentifier,
    environment: ctx.environment.type ?? null,
    status: "Initialized",
    startedAt: runDetails.startedAt ? new Date(runDetails.startedAt) : null,
    durationMs: 0,
    executionTimeMs: 0,
    costInCents: runDetails.costInCents ?? null,
    logs: runDetails,
    companyId: companyId,
    createdBy: userId,
    description: configuredTasks.find((t) => (t.id = runDetails.id))
      ?.description,
  };

  const { error } = await supabase.from("workflowLogs").insert([workflowLog]);

  if (error) {
    logger.error(`Error inserting into workflowLogs: ${error.message}`);
    throw new Error(`Failed to insert workflow log: ${error.message}`); // Throw error
  } else {
    logger.log("Workflow log inserted successfully.");
  }
}

export async function updateWorkflowLogScores(runId: string, updates: any) {
  // **Fetch the existing logs**
  const { data: existingRecord, error: fetchError } = await supabase
    .from("workflowLogs")
    .select("logs")
    .eq("runId", runId)
    .single();

  if (fetchError) {
    logger.error(`Error fetching existing logs: ${fetchError.message}`);
    throw new Error(
      `Failed to fetch existing workflow log: ${fetchError.message}`,
    );
  }

  // **Merge existing logs with new updates**
  const updatedLogs = {
    ...existingRecord.logs,
    ...updates.logs,
  };

  // **Prepare the update data**
  const updateData = {
    ...updates,
    logs: updatedLogs,
  };

  // **Perform the update**
  const { error } = await supabase
    .from("workflowLogs")
    .update(updateData)
    .eq("runId", runId);

  if (error) {
    logger.error(`Error updating workflowLogs: ${error.message}`);
    throw new Error(`Failed to update workflow log: ${error.message}`); // Throw error
  } else {
    logger.log("Workflow log updated successfully.");
  }
}

// **Function to update the chronological duration every second**
export function startUpdateLoop(runId: string, ctx: any) {
  const startTime = Date.now();

  const intervalId = setInterval(async () => {
    if (ctx.isCompleted) {
      clearInterval(intervalId);
      return;
    }

    const currentTime = Date.now();
    const durationMs = currentTime - startTime;

    // **Update duration_ms in the workflow log**
    await updateWorkflowLogScores(runId, { durationMs: durationMs });
  }, 1000); // **Update every 1 second**
}

// export async function getLastRunTime(taskId: string): Promise<string | null> {
//   try {
//     const taskRuns = await runs.list({
//       taskIdentifier: taskId,
//       limit: 1,
//     });
//     if (taskRuns) {
//       return taskRuns.data[0].startedAt?.toISOString() ?? null;
//     }
//   } catch (error) {
//     console.error(`Failed to get last run for task ${taskId}:`, error);
//   }
//   return null;
// }

export async function getLastRunTimeAndFrequency(
  taskId: string,
): Promise<{ lastRun: string | null; noOfRuns: number }> {
  try {
    let noOfRuns = 0;
    let lastRun: string | null = null;

    // Auto-pagination through all runs
    for await (const run of runs.list({ taskIdentifier: taskId })) {
      if (!lastRun) {
        // Capture the first run's startedAt (most recent run)
        lastRun = run.startedAt?.toISOString() ?? null;
      }
      noOfRuns++; // Increment run count
    }

    return { lastRun, noOfRuns };
  } catch (error) {
    console.error(`Failed to get last run for task ${taskId}:`, error);
    return { lastRun: null, noOfRuns: 0 };
  }
}

// Helper to parse CSV file
// Helper function to parse the CSV file
export const parseCsv = async (
  csvFilePath: string,
  runId: string,
): Promise<any[]> => {
  if (!fs.existsSync(csvFilePath)) {
    logger.error(`CSV file not found at path: ${csvFilePath}`);

    // **Set status to 'Failed'**
    await updateWorkflowLogScores(runId, { status: "Failed" });
    throw new Error(`CSV file not found at path: ${csvFilePath}`);
  }

  const parseCSV = async (): Promise<any[]> => {
    const csvParserModule = await import("csv-parser");
    const csvParser = csvParserModule.default || csvParserModule;
    return new Promise((resolve, reject) => {
      const records: any[] = [];
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on("data", (data) => records.push(data))
        .on("end", () => resolve(records))
        .on("error", (error) => reject(error));
    });
  };

  try {
    const records = await parseCSV();
    logger.log(`Parsed ${records.length} records from CSV file.`);

    // **Update logs with total records**
    await updateWorkflowLogScores(runId, {
      logs: { totalRecords: records.length },
    });

    return records;
  } catch (error: any) {
    logger.error(`Error parsing CSV file: ${error.message}`);

    // **Set status to 'Failed'**
    await updateWorkflowLogScores(runId, { status: "Failed" });
    throw new Error(`Error parsing CSV file: ${error.message}`);
  }
};

// Helper function to process batches of records
export const processBatches = async (
  records: any[],
  runId: string,
  ctx: any,
) => {
  const batches = chunk(records, 50);
  logger.log(`Divided records into ${batches.length} batches of 50.`);

  let totalSuccessfulRows = 0;
  let totalFailedRows = 0;
  let batchComputeDurations: number[] = [];
  let previousComputeDuration = 0;
  let hasFailedBatch = false;
  let successfulBatchMessages: string[] = [];
  let failedBatchMessages: string[] = [];

  let usageCurrent = usage.getCurrent();
  if (usageCurrent.compute?.total?.durationMs) {
    previousComputeDuration = usageCurrent.compute.total.durationMs;
  }

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchNumber = i + 1;

    let successfulRows = 0;
    let failedRows = 0;

    try {
      // **Insert batch into Supabase**
      const { data, error } = await supabase
        .from("testScores")
        .insert(batch)
        .select();

      if (error) {
        hasFailedBatch = true;
        logger.error(
          `Batch ${batchNumber}: Failed to insert records. Error: ${error.message}`,
        );
        failedRows = batch.length;
        totalFailedRows += failedRows;

        failedBatchMessages.push(
          `Batch ${batchNumber}: Failed with error - ${error.message}`,
        );

        // **Update logs with failed rows**
        await updateWorkflowLogScores(runId, {
          logs: { failedRows: totalFailedRows, failedBatchMessages },
        });

        continue;
      }

      successfulRows = data.length;
      totalSuccessfulRows += successfulRows;

      // **Get current total compute duration**
      usageCurrent = usage.getCurrent();
      let currentComputeDuration = usageCurrent.compute?.total?.durationMs || 0;

      // **Calculate compute duration for the batch**
      const batchComputeDuration =
        currentComputeDuration - previousComputeDuration;
      batchComputeDurations.push(batchComputeDuration);
      previousComputeDuration = currentComputeDuration;

      successfulBatchMessages.push(
        `Batch ${batchNumber}: Successfully inserted ${successfulRows} records. Compute duration: ${batchComputeDuration} ms`,
      );

      logger.log(
        `Batch ${batchNumber}: Successfully inserted ${successfulRows} records. Compute duration: ${batchComputeDuration} ms`,
      );

      // **Update logs with successful rows and compute durations**
      await updateWorkflowLogScores(runId, {
        logs: {
          successfulRowsInBatch: 50,
          failedRowsInBatch: failedRows,
          successfulRows: totalSuccessfulRows,
          computeDurations: batchComputeDurations,
          totalComputeDuration: currentComputeDuration,
          successfulBatchMessages,
        },
      });
    } catch (error: any) {
      hasFailedBatch = true;
      logger.error(
        `Batch ${batchNumber}: Exception occurred while inserting records. Error: ${error.message}`,
      );
      failedRows = batch.length;
      totalFailedRows += failedRows;

      logger.log(`Updating workflow logs for failed batch ${batchNumber}`, {
        successfulRowsInBatch: 0,
        failedRowsInBatch: failedRows,
        totalSuccessfulRows,
        totalFailedRows,
      });

      await updateWorkflowLogScores(runId, {
        logs: {
          successfulRowsInBatch: 0,
          failedRowsInBatch: 50,
          successfulRows: totalSuccessfulRows,
          failedRows: totalFailedRows,
          computeDurations: batchComputeDurations,
          totalComputeDuration: previousComputeDuration,
        },
      });
    }

    // **Wait for 1 second before processing the next batch**
    await wait.for({ seconds: 1 });
  }

  ctx.hasFailedBatch = hasFailedBatch;
};

export async function getDynamicsIntegration(userEmail: string) {
  const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("integrationName", "Dynamics F&O")
    .eq("integrationJson->>email", userEmail)
    .single();

  if (error || !data) {
    console.error(
      "Error fetching Dynamics integration:",
      error?.message || "No data found",
    );
    throw new Error("Failed to fetch Dynamics integration");
  }

  const integrationData = data.integrationJson;

  return integrationData;
}
