import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { logger, tasks } from "@trigger.dev/sdk/v3";
import { fetchDynamicsSchemaTask } from "../../../src/trigger/fetchDynamicsSchema";

const POLL_INTERVAL_MS = 2000; // Poll every 2 seconds

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const result = await tasks.triggerAndPoll(
      fetchDynamicsSchemaTask.id,
      {
        email: "devtest@xcelpros.com",
      },
      {
        pollIntervalMs: POLL_INTERVAL_MS,
      },
    );

    if (!result?.output) {
      throw new Error("No schema data returned");
    }

    // Return data in format expected by DataMappingStep
    return json({
      success: true,
      columns: result.output,
    });
  } catch (error) {
    logger.error(
      "Error fetching Dynamics schema:",
      error as Record<string, unknown>,
    );
    return json(
      {
        success: false,
        error: "Failed to fetch schema",
      },
      { status: 500 },
    );
  }
};
