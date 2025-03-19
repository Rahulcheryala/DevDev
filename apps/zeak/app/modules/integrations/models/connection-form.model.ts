import { ConnectionStatus, EnvironmentType, ExecutionFrequency } from "@prisma/client";

export type ConnectionForm = {
    integrationId: string;
    connectionName: string;
    connectionCode: string;
    connectionDescription?: string;
    isEnabled: boolean;
    connectionDetails: {
        environmentType: EnvironmentType | '',
        environmentURL: string,
        maxRetries: number | null,
        retryDelay: number | null,
        timeout: number | null,
    }
    executionFrequency: ExecutionFrequency | '';
    connectionStatus: ConnectionStatus | '';
    companies: string[],
};

export const initialConnectionFormData: ConnectionForm = {
    integrationId: '',
    connectionName: '',
    connectionCode: '',
    connectionDescription: '',
    isEnabled: false,
    connectionDetails: {
        environmentType: '',
        environmentURL: '',
        maxRetries: null,
        retryDelay: null,
        timeout: null,
    },
    executionFrequency: '', // TODO(vamsi): Add default value
    connectionStatus: '', // TODO(vamsi): Add default value
    companies: [],
};