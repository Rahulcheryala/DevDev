export type IntegrationForm = {
    id?: string;
    logo: string;
    name: string;
    purpose: string;
    application: string;
    integrationCategory: string;
    connectionType: string;
    authentication: string;
    companies: string[];
    status?: 'draft' | 'active' | 'inactive';
    executionType?: 'on-demand' | 'scheduled';
    maxRetries?: string;
    retryDelay?: string;
    timeout?: string;
};

// Initial states for the context
export const initialIntegrationForm: IntegrationForm = {
    logo: "",
    name: "",
    purpose: "",
    application: "",
    integrationCategory: "",
    connectionType: "",
    authentication: "",
    companies: [],
}; 