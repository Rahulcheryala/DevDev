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
    applicationName: ApplicationName | '';
    description?: string;
    integrationType:  'System' | "User Defined";
    integrationCategory: IntegrationCategory | '';
    connectionType: ConnectionType | '';
    authType: AuthType | '';
    connectionLimit: number | null;
    status: Status | ''
    companies: string[];
    // executionFrequency: ExecutionFrequency | '';
    // maxRetries: number | null;
    // retryDelay: number | null;
    // timeout: number | null;
    deletedAt?: String | null;
    deletedBy?: String | null;
};

// Initial states for the context
export const initialIntegrationForm: IntegrationForm = {
    logo: '',
    isFavorite: false,
    integrationName: '',
    integrationCode: '',
    applicationName: '',
    description: '',
    integrationType: 'User Defined',
    integrationCategory: '',
    connectionType: '',
    authType: '',
    connectionLimit: 0,
    status: 'Active',
    companies: [],
    // executionFrequency: 'On_Demand',
    // maxRetries: null,
    // retryDelay: null,
    // timeout: null,
}; 