import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { fetchSalesOrders } from "~/utils/dynamic-data.server";
import { sendSyncNotification } from "~/modules/workflows/salesOrderSync/notifications";
import type { WorkflowContext } from "~/modules/workflows/salesOrderSync/types";

export const action: ActionFunction = async ({ request }) => {
  const context: WorkflowContext = await request.json();

  try {
    const salesOrders = await fetchSalesOrders(context.email);
    if (!salesOrders?.success) {
      throw new Error("Failed to fetch sales orders");
    }
    const result = {
      success: salesOrders.success,
      count: salesOrders.count,
    };

    await sendSyncNotification(context, result);
    return json(result);
  } catch (error) {
    return json({
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : "Sync failed",
    });
  }
};
