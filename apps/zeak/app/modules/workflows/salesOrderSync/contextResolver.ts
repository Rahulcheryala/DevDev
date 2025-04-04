import { path } from "~/utils/path";
import type { WorkflowContext } from "./types";
import { fetchUserIdAndCompanyId } from "src/taskHelpers";

export async function resolveWorkflowContext(
  email: string,
): Promise<WorkflowContext> {
  const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

  try {
    // Get userId and companyId first
    const { userId, companyId } = await fetchUserIdAndCompanyId(email);

    // 1. Check integration status
    const integrationResponse = await fetch(
      `${BASE_URL}/api/dynamics-integration-status`,
    );
    const integrationData = await integrationResponse.json();

    console.log(
      "🔍 Integration data in the context resolver:",
      integrationData,
    );

    if (!integrationData.isIntegrated || !integrationData.integrationData?.id) {
      throw new Error("Integration not configured");
    }

    // 2. Check column mapping
    const mappingResponse = await fetch(
      `${BASE_URL}/api/check-column-mapping?integrationId=${integrationData.integrationData?.id}`,
    );
    const mappingData = await mappingResponse.json();

    console.log("🔍 Mapping data in the context resolver:", mappingData);

    if (!mappingData.hasMappings) {
      throw new Error("Column mappings not configured");
    }

    // 3. Check schedule status
    const scheduleResponse = await fetch(
      `${BASE_URL}${path.to.api.checkScheduleStatus("fetch-sales-orders-us3")}`,
    );
    const scheduleData = await scheduleResponse.json();

    if (!scheduleData.exists) {
      throw new Error("Schedule not configured");
    }

    // 4. Check notification setup
    const notificationResponse = await fetch(
      `${BASE_URL}/api/check-notification-setup`,
      {
        method: "POST",
        body: JSON.stringify({ name: "Sales Order Sync Notification" }),
      },
    );
    const notificationData = await notificationResponse.json();

    if (!notificationData.isConfigured || !notificationData.notificationId) {
      throw new Error("Notifications not configured");
    }

    // Construct workflow context from all configurations
    return {
      email,
      integrationId: integrationData.integrationId,
      notificationId: notificationData.notificationId,
      taskId: "fetch-sales-orders-us3",
      recipients: notificationData.emailConfig?.recipients || [],
      userId,
      companyId,
    };
  } catch (error) {
    console.error("Error resolving workflow context:", error);
    throw new Error(
      `Failed to resolve workflow context: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
