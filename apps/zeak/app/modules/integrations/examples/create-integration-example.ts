import { createIntegrationFn } from "../utils/api.utils";
import { IntegrationForm } from "../models/integration-form.model";

/**
 * Example function demonstrating how to create a new integration
 */
export async function createIntegrationExample() {
  try {
    // Prepare the integration data according to your schema requirements
    const integrationData: any = {
      integrationName: "Vamsi's Azure DevOps trial",
      applicationName: "Azure DevOps", // Using enum value from schema
      integrationCode: "AZUREDEV-002",
      description: "Integration with Azure DevOps for Project Management",
      logo: "https://img.freepik.com/premium-vector/data-integration-outline-icon-vector-graphic-design-logo-web-site-social-media-mobile-app_756957-1317.jpg",
      integrationType: "User Defined",
      integrationCategory: "Project Management",
      connectionType: "API",
      authType: "OAuth2",
      connectionLimit: 5,
      status: "Active",
      companyIds: ["01952092-b6fd-4b4a-80ee-e827fbd1519d"], // Add your company ID
      tags: ["Project Management", "Azure DevOps", "Project Management"],
      isFavorite: false
    } as any; // Type assertion to bypass TypeScript errors

    // Call the API utility function
    const createdIntegration = await createIntegrationFn(integrationData);
    
    console.log("Integration created successfully:", createdIntegration);
    return createdIntegration;
  } catch (error) {
    console.error("Failed to create integration:", error);
    throw error;
  }
} 