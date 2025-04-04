import {
  ConnectionStatus,
  ConnectionEnvType,
  ExecutionFrequency,
} from "@prisma/client";

export type ConnectionForm = {
  integrationId: string;
  connectionName: string;
  connectionCode: string;
  connectionDescription?: string;
  isEnabled: boolean;
  connectionDetails: {
    environmentType: ConnectionEnvType | "";
    environmentURL: string;
    maxRetries: number | null;
    retryDelay: number | null;
    timeout: string;
  };
  executionFrequency: ExecutionFrequency | "";
  connectionStatus: ConnectionStatus | "";
  companyIds: string[];
};

export const initialConnectionFormData: ConnectionForm = {
  integrationId: "",
  connectionName: "",
  connectionCode: "",
  connectionDescription: "",
  isEnabled: false,
  connectionDetails: {
    environmentType: "",
    environmentURL: "",
    maxRetries: null,
    retryDelay: null,
    timeout: "",
  },
  executionFrequency: ExecutionFrequency.On_Demand,
  connectionStatus: ConnectionStatus.Online,
  companyIds: [],
};
