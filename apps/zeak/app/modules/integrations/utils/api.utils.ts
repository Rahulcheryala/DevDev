import { path } from "~/utils/path";
import { IntegrationForm } from "../models/integration-form.model";
import { IIntegrationModel } from "../models/integration.model";
import { IntegrationsQuery } from "../services/getPaginatedIntegrationList";
import { IConnectionModel } from "../models/connection.model";
import { ConnectionsQuery } from "../services/getPaginatedConnectionList";
import { ConnectionForm } from "../models/connection-form.model";
import { toast } from "@zeak/react";

export const fetchCompanyById = async (id: string): Promise<{ name: string, id: string }> => {
    let url = `${path.to.api.fetchCompanyById(id)}`;
    const response = await fetch(url);
    const records = await response.json();
    return { name: records.data.name, id: records.data.tenantId };
}

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

export const fetchConnectionsList = async (filters?: Partial<ConnectionsQuery>): Promise<{
    data: IConnectionModel[];
    pagination: {
      total: number;
      pageSize: number;
      current: number;
      totalPages: number;
    };
  }> => {
    let url = `${path.to.api.connectionsList}?`;
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
    // console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch connections');
    }
    const records = await response.json(); 
    // console.log(records.data);
    return records;
};

export const createIntegrationFn = async (data: IntegrationForm): Promise<IIntegrationModel> => {
    try {
        const response = await fetch(
            path.to.api.integrationCreate,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create integration');
        }
        
        const record = await response.json();
        return record;
    } catch (error: any) {
        toast.error(error.message || 'Failed to create integration');
        throw error;
    }
};

export const fetchIntegrationConnections = async (integrationId: string) => {
    const url = path.to.api.integrationConnections(integrationId);
    const response = await fetch(url);
    const records = await response.json(); 
    return records;
};

export const updateIntegrationFn = async (id: string, data: Partial<IntegrationForm>): Promise<IIntegrationModel> => {
    if (!id) throw new Error('Integration ID is required');
    
    try {
        const response = await fetch(
            path.to.api.integrationEdit,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, id }),
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update integration');
        }
        
        const record = await response.json();
        // console.log("record", record);
        return record;
    } catch (error: any) {
        toast.error(error.message || 'Failed to update integration details');
        throw error;
    }
};

export const createConnectionFn = async (data: ConnectionForm): Promise<IConnectionModel> => {
    try {
        const response = await fetch(
            path.to.api.connectionCreate,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create connection');
        }
        
        const record = await response.json();
        return record;
    } catch (error: any) {
        toast.error(error.message || 'Failed to create connection');
        throw error;
    }
};

export const updateConnectionFn = async (id: string, data: Partial<ConnectionForm>): Promise<IConnectionModel> => {
    if (!id) throw new Error('Connection ID is required');
    
    try {
        const response = await fetch(
            path.to.api.connectionEdit,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, id }),
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update connection');
        }
        
        const record = await response.json();
        return record;
    } catch (error: any) {
        toast.error(error.message || 'Failed to update connection details');
        throw error;
    }
};