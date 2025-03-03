export interface WorkflowContext {
  email: string;
  integrationId: string;
  notificationId: string;
  taskId: string;
  recipients: string[];
  userId: string;
  companyId: string;
}

export interface SyncResult {
  success: boolean;
  count: number;
  error?: string;
}

export interface ActivateScheduleResult {
  success: boolean;
  error?: string;
}

export interface WorkflowStep<TContext, TResult, TPreviousResult = any> {
  name: string;
  execute: (
    context: TContext,
    previousResult?: TPreviousResult,
  ) => Promise<TResult>;
}

export interface WorkflowDefinition<TContext, TResult> {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep<TContext, TResult | ActivateScheduleResult>[];
  onError?: (context: TContext, error: Error) => Promise<TResult>;
}

export interface WorkflowExecutionResult<T> {
  success: boolean;
  result?: T;
  error?: string;
  stepResults: { [key: string]: any };
}
