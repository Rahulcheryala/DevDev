import { SalesOrderUpdateWorkflow } from "~/modules/workflows/salesOrderUpdate";
import { resolveWorkflowContext } from "~/modules/workflows/salesOrderSync/contextResolver";
import { registerEventTask } from "../taskRegistry";
import { logger } from "@trigger.dev/sdk/v3";

export const salesOrderUpdateWorkflow = registerEventTask({
  id: "sales-order-update",
  name: "Sales Order Update Workflow",
  description: "Updates sales order in Dynamics 365",
  priority: "High",
  createdBy: "Yash Sagar",
  event: "sales.order.update",
  isActive: true,
  run: async (payload: any) => {
    try {
      const context = await resolveWorkflowContext(payload.email);
      const workflow = new SalesOrderUpdateWorkflow({
        ...context,
        salesOrderNumber: payload.salesOrderNumber,
        changes: payload.changes,
        integrationId: payload.integrationId,
      });
      return workflow.executeUpdate();
    } catch (error: any) {
      logger.error("Error in update workflow:", error);
      throw error;
    }
  },
});
