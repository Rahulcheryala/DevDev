import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getAuthSession } from "~/services/session.server";
import { checkDynamicsIntegration } from "~/utils/checkDynamicsIntegration";
import { path } from "~/utils/path";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log("🔍 Starting workflow configuration status check");

    const authSession = await getAuthSession(request);
    if (!authSession) {
      console.log("❌ No auth session found");
      return json({
        isComplete: false,
        completedSteps: 0,
        totalSteps: 4,
        message: "Not authenticated",
      });
    }
    console.log("✅ Auth session found:", authSession.email);

    const origin = new URL(request.url).origin;
    console.log("🌐 Request origin:", origin);

    // Step 1: Check Integration Status
    console.log("📡 Checking integration status...");
    const integrationStatus = await checkDynamicsIntegration(
      "yash.santani@xcelpros.com",
    );
    console.log("Integration status:", integrationStatus);

    const steps = {
      integration: integrationStatus.isIntegrated,
      mapping: false,
      frequency: false,
      notification: false,
    };
    console.log("Initial steps state:", steps);

    if (
      integrationStatus.isIntegrated &&
      integrationStatus.integrationData?.id
    ) {
      console.log(
        "✅ Integration verified with ID:",
        integrationStatus.integrationData.id,
      );

      // Step 2: Check Mapping Status
      console.log("🗺️ Checking mapping status...");
      const mappingResponse = await fetch(
        `${origin}/api/check-column-mapping?integrationId=${integrationStatus.integrationData.id}`,
      );
      const mappingData = await mappingResponse.json();
      steps.mapping = mappingData.hasMappings;
      console.log("Mapping status:", mappingData);

      // Step 3: Check Frequency Status
      console.log("⏰ Checking frequency status...");
      const scheduleResponse = await fetch(
        `${origin}/api/check-schedule-status?taskId=fetch-sales-orders-us3`,
      );
      const scheduleData = await scheduleResponse.json();
      steps.frequency = scheduleData.exists;
      console.log("Schedule status:", scheduleData);

      // Step 4: Check Notification Status
      if (steps.mapping && steps.frequency) {
        console.log("🔔 Checking notification status...");
        const notificationResponse = await fetch(
          `${origin}/api/check-notification-setup`,
          {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Cookie: request.headers.get("Cookie") || "",
            },
            body: JSON.stringify({
              name: "Sales Order Sync Notification",
            }),
          },
        );

        if (!notificationResponse.ok) {
          console.error(
            "Notification check failed:",
            await notificationResponse.text(),
          );
          steps.notification = false;
        } else {
          const notificationData = await notificationResponse.json();
          steps.notification = notificationData.isConfigured;
          console.log("Notification status:", notificationData);
        }
      } else {
        console.log(
          "⏭️ Skipping notification check as previous steps are incomplete",
        );
      }
    } else {
      console.log("⛔ Integration not complete, skipping remaining checks");
    }

    const completedSteps = Object.values(steps).filter(Boolean).length;
    const totalSteps = Object.keys(steps).length;

    console.log("Final steps state:", {
      steps,
      completedSteps,
      totalSteps,
    });

    const stepNames = {
      integration: "Microsoft Dynamics Integration",
      mapping: "Data Mapping",
      frequency: "Sync Frequency",
      notification: "Notifications",
    };

    const nextStep =
      Object.entries(steps).find(([_, isComplete]) => !isComplete)?.[0] || null;
    const progressMessage = nextStep
      ? `Please complete ${stepNames[nextStep as keyof typeof stepNames]}`
      : "All steps completed";

    console.log("🏁 Final response:", {
      isComplete: completedSteps === totalSteps,
      completedSteps,
      totalSteps,
      steps,
      stepNames,
      message: progressMessage,
      nextStep,
    });

    return json({
      isComplete: completedSteps === totalSteps,
      completedSteps,
      totalSteps,
      steps,
      stepNames,
      message: progressMessage,
      nextStep,
    });
  } catch (error) {
    console.error("❌ Error in workflow configuration status:", error);
    return json({
      isComplete: false,
      completedSteps: 0,
      totalSteps: 4,
      message: "Error checking configuration status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
