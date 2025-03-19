import { updateIntegrationFn } from "../utils/api.utils";
import { IntegrationForm } from "../models/integration-form.model";

/**
 * Example function demonstrating how to update an existing integration
 */
export async function updateIntegrationExample(integrationId: string) {
  try {
    // Prepare the update data - only include fields you want to update
    const updateData: Partial<IntegrationForm> = {
      // Update only what needs to be changed
      status: "Active",
      connectionLimit: 10,
      isFavorite: true,
      // Add any other fields that need to be updated
    };

    // Call the API utility function with the integration ID and update data
    const updatedIntegration = await updateIntegrationFn(integrationId, updateData);
    
    console.log("Integration updated successfully:", updatedIntegration);
    return updatedIntegration;
  } catch (error) {
    console.error("Failed to update integration:", error);
    throw error;
  }
} 