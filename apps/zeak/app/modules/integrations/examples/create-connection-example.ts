import { createConnectionFn } from "../utils/api.utils";

/**
 * Example function demonstrating how to create a new connection
 */
export async function createConnectionExample(integrationId: string) {
  try {
    // Prepare the connection data according to your schema requirements
    const connectionData: any = {
      integrationId: integrationId, // The ID of the parent integration
      connectionName: "Production Dynamics Connection",
      connectionCode: "PROD-DYN-001",
      connectionDescription: "Production connection to Microsoft Dynamics 365",
      companies: [], // Add your company ID
      isEnabled: true,
      connectionDetails: {
        environmentType: "PROD",
        environmentURL: "https://yourdynamics.crm.dynamics.com",
        maxRetries: 3,
        timeout: 30000,
        retryDelay: 5000
      },
      executionFrequency: "On-Demand",
      connectionStatus: "Online"
    };

    // Call the API utility function
    const createdConnection = await createConnectionFn(connectionData);
    
    console.log("Connection created successfully:", createdConnection);
    return createdConnection;
  } catch (error) {
    console.error("Failed to create connection:", error);
    throw error;
  }
} 