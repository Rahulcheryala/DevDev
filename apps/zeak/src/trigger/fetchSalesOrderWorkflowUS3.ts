import { SalesOrderSyncWorkflow } from "~/modules/workflows/salesOrderSync";
import { resolveWorkflowContext } from "~/modules/workflows/salesOrderSync/contextResolver";
import { registerScheduledTask } from "../taskRegistry";
import { logger } from "@trigger.dev/sdk/v3";

export const fetchSalesOrdersWorkflowUs3 = registerScheduledTask({
  id: "fetch-sales-orders-us3",
  name: "Fetch Sales Orders Workflow US3",
  description: "A scheduled task to fetch sales orders every minute",
  priority: "High",
  createdBy: "Yash Sagar",
  isActive: true,
  scheduleId: "sch-fetch-sale-orders",
  run: async (payload) => {
    try {
      const email = payload.externalId as string;

      const context = await resolveWorkflowContext(email);

      const workflow = new SalesOrderSyncWorkflow(context);
      return workflow.executeSync();
    } catch (error: any) {
      logger.error("Error in workflow execution:", error);
      throw error;
    }
  },
});
