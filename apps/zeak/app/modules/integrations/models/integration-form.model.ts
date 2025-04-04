import {
  ApplicationName,
  IntegrationType,
  IntegrationCategory,
  ConnectionType,
  AuthType,
  ExecutionFrequency,
  Status,
} from "@prisma/client";

export type IntegrationForm = {
  logo?: string;
  isFavorite?: boolean;
  integrationName: string;
  integrationCode: string;
  applicationName: ApplicationName | "";
  description?: string;
  integrationType: IntegrationType;
  integrationCategory: IntegrationCategory | "";
  connectionType: ConnectionType | "";
  authType: AuthType | "";
  connectionLimit: number | null;
  status: Status | "";
  companyIds: string[];
  executionFrequency?: ExecutionFrequency | "";
  maxRetries?: number | null;
  retryDelay?: number | null;
  timeout?: string;
  deletedAt?: String | null;
  deletedBy?: String | null;
};

// Initial states for the context
export const initialIntegrationForm: IntegrationForm = {
  logo: "",
  isFavorite: false,
  integrationName: "",
  integrationCode: "",
  applicationName: "",
  description: "",
  integrationType: IntegrationType.User_Defined,
  integrationCategory: "",
  connectionType: "",
  authType: "",
  connectionLimit: 0,
  status: Status.Active,
  companyIds: [],
  executionFrequency: ExecutionFrequency.On_Demand,
  maxRetries: null,
  retryDelay: null,
  timeout: "",
};
