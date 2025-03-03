export interface IConnectionModel {
    id: string;
    connectionName: string;
    status: string;
    integrationType: string;
    integrationName: string;
    environmentType: string;
    environmentURL: string;
    companies: string[];
    integrationSettings: {
        connectionType: string;
        authentication: string;
        integrationCategory: string;
    };

    executionFrequency: string;
    maxRetries: number;
    retryDelay: number;
    timeout: number;

    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedAt: string;
    deletedBy: string;  
}