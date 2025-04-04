import {
    ExecutionFrequency,
    ConnectionStatus,
    LastTestResult,
    ConnectionEnvType
} from "@prisma/client";

export interface IConnectionModel {
    id: string;
    integrationId: string;
    connectionName: string;
    connectionCode: string;
    connectionDescription?: string;
    companyIds: string[];
    isEnabled: boolean;
    connectionDetails: {
        environmentType: ConnectionEnvType;
        environmentURL: string;
        maxRetries: number;
        timeout: string;
        retryDelay: number;
    };
    executionFrequency: ExecutionFrequency;
    connectionStatus: ConnectionStatus;
    copies: number;
    isTested: boolean;
    lastTestedAt?: Date;
    lastTestedBy?: string;
    lastTestResult?: LastTestResult;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    lastUpdatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    syncToken: string;
    integration: {
        id: string;
        integrationName: string;
        applicationName: string;
        integrationCategory: string;
        authType: string;
        logo: string;
    }
}