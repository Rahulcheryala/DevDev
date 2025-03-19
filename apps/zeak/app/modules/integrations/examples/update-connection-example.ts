import { updateConnectionFn } from "../utils/api.utils";
import { ConnectionForm } from "../models/connection-form.model";

/**
 * Example function demonstrating how to update an existing connection
 */
export async function updateConnectionExample(connectionId: string) {
  try {
    // Prepare the update data - only include fields you want to update
    const updateData: Partial<ConnectionForm> = {
      // Update only what needs to be changed
      isEnabled: true,
      connectionStatus: "Online",
      connectionDetails: {
        maxRetries: 5,
        timeout: 60000
      }
      // Add any other fields that need to be updated
    };

    // Call the API utility function with the connection ID and update data
    const updatedConnection = await updateConnectionFn(connectionId, updateData);
    
    console.log("Connection updated successfully:", updatedConnection);
    return updatedConnection;
  } catch (error) {
    console.error("Failed to update connection:", error);
    throw error;
  }
} 