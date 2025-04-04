import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { schedules } from "@trigger.dev/sdk/v3";
import { fetchSalesOrdersWorkflowUs3 } from "../../../src/trigger/fetchSalesOrderWorkflowUS3";

interface IntervalRequest {
  interval: {
    value: number;
    unit: "minutes" | "hours" | "days";
  };
}

function convertToCron(
  value: number,
  unit: "minutes" | "hours" | "days",
): string {
  switch (unit) {
    case "minutes":
      return `*/${value} * * * *`;
    case "hours":
      return `0 */${value} * * *`;
    case "days":
      return `0 0 */${value} * *`;
    default:
      throw new Error("Invalid interval unit");
  }
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const { interval } = (await request.json()) as IntervalRequest;

    // Validate interval
    if (interval.unit === "minutes" && interval.value < 1) {
      throw new Error("Minimum interval is 1 minute");
    }
    if (interval.unit === "days" && interval.value > 7) {
      throw new Error("Maximum interval is 1 week");
    }

    const cronExpression = convertToCron(interval.value, interval.unit);
    const email = "devtest@xcelpros.com";

    // Create the schedule first
    const schedule = await schedules.create({
      task: fetchSalesOrdersWorkflowUs3.id,
      cron: cronExpression,
      externalId: email,
      deduplicationKey: `sch-order-${email}`,
    });

    // Immediately deactivate it
    const deactivatedSchedule = await schedules.deactivate(schedule.id);

    return json({
      success: true,
      schedule: deactivatedSchedule,
      message:
        "Schedule created and deactivated. It will be activated in Step 6.",
    });
  } catch (error) {
    console.error("Error creating fetch schedule:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create schedule",
      },
      { status: 500 },
    );
  }
};
