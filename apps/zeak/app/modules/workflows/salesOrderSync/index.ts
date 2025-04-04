import type {
  WorkflowDefinition,
  WorkflowContext,
  SyncResult} from "./types";
import {
  ActivateScheduleResult,
} from "./types";
import { activateSchedule, deactivateSchedule } from "./scheduler";
import { sendSyncNotification } from "./notifications";
import { executeWorkflow } from "./executor";

export class SalesOrderSyncWorkflow {
  private workflow: WorkflowDefinition<WorkflowContext, SyncResult>;
  private context: WorkflowContext;

  constructor(context: WorkflowContext) {
    const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

    this.context = context;
    this.workflow = {
      id: "sales-order-sync",
      name: "Sales Order Sync Workflow",
      description: "Syncs sales orders from Dynamics 365",

      steps: [
        {
          name: "sync-orders",
          execute: async (context: WorkflowContext): Promise<SyncResult> => {
            const response = await fetch(`${BASE_URL}/api/sales-orders/sync`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(context),
            });
            const result: SyncResult = await response.json();
            return result;
          },
        },
        {
          name: "send-notifications",
          execute: async (
            context: WorkflowContext,
            previousResult?: SyncResult,
          ): Promise<SyncResult> => {
            if (previousResult?.success) {
              await sendSyncNotification(context, previousResult);
            }
            return (
              previousResult || {
                success: false,
                count: 0,
                error: "No previous result",
              }
            );
          },
        },
      ],

      onError: async (
        context: WorkflowContext,
        error: Error,
      ): Promise<SyncResult> => {
        return {
          success: false,
          count: 0,
          error: error.message,
        };
      },
    };
  }

  async executeSync() {
    return executeWorkflow(this.workflow, this.context);
  }
}
