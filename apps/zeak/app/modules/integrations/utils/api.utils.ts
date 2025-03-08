import { path } from "~/utils/path";
import { IntegrationForm } from "../models/integration-form.model";
import { IIntegrationModel } from "../models/integration.model";
import { IntegrationsQuery } from "../services/getPaginatedIntegrationList";

export const fetchIntegrationsList = async (filters?: Partial<IntegrationsQuery>): Promise<{
  data: IIntegrationModel[];
  pagination: {
    total: number;
    pageSize: number;
    current: number;
    totalPages: number;
  };
}> => {
    let url = `${path.to.api.integrationsList}?`;
    
    if (filters) {
        const queryParams = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(val => queryParams.append(`${key}[]`, val));
                } else {
                    queryParams.append(key, String(value));
                }
            }
        });
        
        url += queryParams.toString();
    }
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch integrations');
    }
    const records = await response.json(); 
    return records;
};

export const fetchConnectionsList = async () => {
    const url = `${path.to.api.connectionsList}`;
    const response = await fetch(url);
    const records = await response.json(); 
    return records;
};

export const createIntegrationFn = async (data: IntegrationForm) => {
    try {
        // TODO: Implement actual API call
        // const response = await fetch('/api/integrations', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });
        
        // if (!response.ok) {
        //     throw new Error('Failed to create integration');
        // }
        
        // return await response.json();

        // console.log(data);
    } catch (error) {
        console.error('Error creating integration:', error);
        throw error;
    }
};

export const updateIntegrationFn = async (id: string, data: Partial<IntegrationForm>): Promise<void> => {
    // TODO: Implement API call to update integration
};

export const fetchCompany = async () => {
    // TODO: Implement API call to fetch company details
    return { id: '1', name: 'Company' };
}; 