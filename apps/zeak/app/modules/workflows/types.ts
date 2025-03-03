import type { Json } from "@zeak/database";
import type { TriggerContext } from "@trigger.dev/sdk";

export type WorkflowLog = {
  name: string;
  id: string;
  description: string;
  triggerType: string;
  priority: string;
  createdBy: string;
  duration: string;
  createdOn: string;
  lastRun: string;
  status: string;
  logs: Json;
};

export interface ExtendedContext extends TriggerContext {
  isCompleted?: boolean;
  hasError?: boolean;
  userId: string;
  companyId: string;
}
