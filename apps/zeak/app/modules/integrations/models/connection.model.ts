import {
    ExecutionFrequency,
    ConnectionStatus,
    LastTestResult,
    EnvironmentType
} from "@prisma/client";

export interface IConnectionModel {
    id: string;
    integrationId: string;
    connectionName: string;
    connectionCode: string;
    connectionDescription?: string;
    companyIds: string[];
    isOnline: boolean;
    connectionDetails: {
        environmentType: EnvironmentType;
        environmentURL: string;
        maxRetries: number;
        timeout: number;
        retryDelay: number;
    };
    executionFrequency: ExecutionFrequency;
    connectionStatus: ConnectionStatus;
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
}