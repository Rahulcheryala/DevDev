import { logger } from "@trigger.dev/sdk/v3";
import type { WorkflowDefinition, WorkflowExecutionResult } from "./types";

export async function executeWorkflow<TWorkflowContext, TSyncResult>(
  workflow: WorkflowDefinition<TWorkflowContext, TSyncResult>,
  context: TWorkflowContext,
): Promise<WorkflowExecutionResult<TSyncResult>> {
  const stepResults: { [key: string]: any } = {};
  let previousResult: any = undefined;

  try {
    for (const step of workflow.steps) {
      logger.info(`Executing step: ${step.name}`, { previousResult });
      const stepResult = await step.execute(context, previousResult);
      stepResults[step.name] = stepResult;
      previousResult = stepResult;
    }

    return {
      success: true,
      result: stepResults[workflow.steps[workflow.steps.length - 1].name],
      stepResults,
    };
  } catch (error: any) {
    logger.error(`Workflow ${workflow.id} failed:`, error);

    if (workflow.onError) {
      const errorResult = await workflow.onError(context, error as Error);
      return {
        success: false,
        result: errorResult,
        error: error instanceof Error ? error.message : "Unknown error",
        stepResults,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stepResults,
    };
  }
}
