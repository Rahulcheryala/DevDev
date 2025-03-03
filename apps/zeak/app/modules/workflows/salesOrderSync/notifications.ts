import { createHtmlEmail, sendEmail } from "~/utils/emailHelper";
import type { WorkflowContext, SyncResult } from "./types";
import { getSupabase } from "~/lib/supabase/client";
import { path } from "~/utils/path";

export async function sendSyncNotification(
  context: WorkflowContext,
  syncResult: SyncResult,
) {
  const supabase = getSupabase();
  const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
  if (!syncResult.success) {
    // Handle error notification
    return;
  }

  try {
    // Trigger web notification
    const response = await fetch(`${BASE_URL}/api/notification/trigger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        notificationId: context.notificationId,
        data: {
          count: syncResult.count,
          // Add other dynamic variables here
        },
      }),
    });
    const result = await response.json();
    console.log("🔍 Notification trigger response:", result);

    const { error: queueError } = await supabase.from("notfQueue").insert({
      notificationId: context.notificationId,
      userId: context.userId,
      companyId: context.companyId,
      webContent:
        result.resolvedContent ||
        `Successfully synced ${syncResult.count} orders from Dynamics 365.`,
      status: "unread",
      emailContent: `Sales Order Sync Report\nSuccessfully synced ${syncResult.count} orders from Dynamics 365.`,
    });

    if (queueError) throw queueError;
    // Send email notification
    const emailResult = await sendEmail({
      to: context.recipients,
      subject: "Sales Order Sync Complete",
      content: createHtmlEmail(`
        <h2>Sales Order Sync Report</h2>
        <p>Successfully synced ${syncResult.count} orders from Dynamics 365.</p>
      `),
    });
    console.log("🔍 Email notification result:", emailResult);
  } catch (error) {
    console.error("Failed to send notifications:", error);
  }
}
