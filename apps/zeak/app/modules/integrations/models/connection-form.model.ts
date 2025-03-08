export type ConnectionForm = {
    connectionName: string;
    status: 'draft' | 'active' | 'inactive';
    integrationType: string;
    integrationName: string;
    environmentType: string;
    environmentURL: string;
    companies: string[];
    integrationSettings: {
        connectionMode: 'online' | 'offline';
        connectionType: string;
        authentication: string;
        integrationCategory: string;
    };

    executionFrequency: 'on-demand' | 'scheduled';
    maxRetries: number;
    retryDelay: number;
    timeout: number;
    enabled: boolean;
};

export const initialConnectionFormData: ConnectionForm = {
    connectionName: '',
    status: 'draft',
    integrationType: '',
    integrationName: '',
    environmentType: '',
    environmentURL: '',
    companies: [],
    integrationSettings: {
        connectionMode: 'online',
        connectionType: '',
        authentication: '',
        integrationCategory: '',
    },
    
    executionFrequency: 'on-demand',
    maxRetries: 0,
    retryDelay: 0,
    timeout: 0,
    enabled: false,
};