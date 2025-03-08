import { ConnectionStatus, EnvironmentType, ExecutionFrequency } from "@prisma/client";

export type ConnectionForm = {
    connectionName: string;
    connectionCode: string;
    connectionDescription?: string;
    connectionDetails: {
        environmentType: EnvironmentType | '',
        environmentURL: string,
        maxRetries: number | null,
        retryDelay: number | null,
        timeout: number | null,
    }
    companies: string[],
    connectionStatus: ConnectionStatus | '';
    executionFrequency: ExecutionFrequency | '';
};

export const initialConnectionFormData: ConnectionForm = {
    connectionName: '',
    connectionCode: '',
    connectionDescription: '',
    connectionDetails: {
        environmentType: '',
        environmentURL: '',
        maxRetries: null,
        retryDelay: null,
        timeout: null,
    },
    companies: [],
    connectionStatus: '', // TODO(vamsi): Add default value
    executionFrequency: '', // TODO(vamsi): Add default value
};
