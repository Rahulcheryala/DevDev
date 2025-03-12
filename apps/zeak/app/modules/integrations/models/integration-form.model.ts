import {
    ApplicationName,
    IntegrationType,
    IntegrationCategory,
    ConnectionType,
    AuthType,
    ExecutionFrequency,
  } from "@prisma/client";

export type IntegrationForm = {
    logo?: string; 
    integrationType: IntegrationType | '';
    integrationName: string;
    integrationCode: string;
    purpose?: string;
    applicationName: ApplicationName | '';
    integrationCategory: IntegrationCategory | '';
    connectionType: ConnectionType | '';
    authentication: AuthType | '';
    connectionLimit: number;
    companies: string[];
    executionFrequency: ExecutionFrequency | '';
    maxRetries: number | null;
    retryDelay: number | null;
    timeout: number | null;
};

// Initial states for the context
export const initialIntegrationForm: IntegrationForm = {
    logo: '',
    integrationType: 'User_Defined',
    integrationName: '',
    integrationCode: '',
    purpose: '',
    applicationName: '',
    integrationCategory: '',
    connectionType: '',
    authentication: '',
    connectionLimit: 0,
    companies: [],
    executionFrequency: 'On_Demand',
    maxRetries: null,
    retryDelay: null,
    timeout: null,
}; 