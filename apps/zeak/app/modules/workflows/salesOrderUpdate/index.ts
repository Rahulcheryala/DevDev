import type {
  WorkflowDefinition,
  WorkflowContext,
  SyncResult,
} from "../salesOrderSync/types";
import { executeWorkflow } from "../salesOrderSync/executor";
import { sendSyncNotification } from "../salesOrderSync/notifications";

interface UpdateResult extends SyncResult {
  orderId: string;
  changes: Record<string, any>;
}

export class SalesOrderUpdateWorkflow {
  private workflow: WorkflowDefinition<WorkflowContext, UpdateResult>;
  private context: WorkflowContext;

  constructor(context: WorkflowContext) {
    const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

    this.context = context;
    this.workflow = {
      id: "sales-order-update",
      name: "Sales Order Update Workflow",
      description: "Updates sales order in Dynamics 365",

      steps: [
        {
          name: "update-order",
          execute: async (context: WorkflowContext): Promise<UpdateResult> => {
            const response = await fetch(
              `${BASE_URL}/api/sales-orders/update`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  salesOrderNumber: context.salesOrderNumber,
                  changes: context.changes,
                  integrationId: context.integrationId,
                }),
              },
            );
            return response.json();
          },
        },
        {
          name: "send-notifications",
          execute: async (
            context: WorkflowContext,
            previousResult?: UpdateResult,
          ): Promise<UpdateResult> => {
            if (previousResult?.success) {
              await sendSyncNotification(context, {
                ...previousResult,
                count: 1,
              });
            }
            return previousResult || { success: false, error: "Update failed" };
          },
        },
      ],

      onError: async (
        context: WorkflowContext,
        error: Error,
      ): Promise<UpdateResult> => {
        return {
          success: false,
          error: error.message,
          orderId: context.orderId,
          changes: context.changes,
        };
      },
    };
  }

  async executeUpdate() {
    return executeWorkflow(this.workflow, this.context);
  }
}
