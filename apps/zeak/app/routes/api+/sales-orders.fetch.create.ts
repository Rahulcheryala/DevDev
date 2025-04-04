import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { schedules } from "@trigger.dev/sdk/v3";
import { fetchSalesOrdersWorkflow } from "../../../src/trigger/fetchSalesOrderWorkflow";

export const action: ActionFunction = async ({ request }) => {
  try {
    const email = "devtest@xcelpros.com";

    console.log("Email in the Action Function is :" + email);
    // Fetch userId and companyId dynamically
    // const { userId, companyId } = await fetchUserIdAndCompanyId(email);
    console.log("Email in the Action is: " + email);
    const schedule = await schedules.create({
      task: fetchSalesOrdersWorkflow.id,
      cron: "* * * * *",
      externalId: "devtest@xcelpros.com",
      deduplicationKey: "sch-order",
    });

    // const { error } = await getSupabaseServiceRole().from("ScheduleTracking")
    // .upsert({
    //     userEmail: email,
    //     scheduleId: schedule.id,
    // });

    // if (error) {
    //     console.error("Error storing schedule ID:", error.message);
    //     throw new Error("Failed to store schedule ID.");
    // }

    return json({ success: true, schedule });
  } catch (error) {
    console.error("Error starting fetch schedule:", error);
    return json({ success: false, error }, { status: 500 });
  }
};
