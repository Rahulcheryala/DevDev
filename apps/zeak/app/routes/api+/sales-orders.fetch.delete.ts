import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { schedules } from "@trigger.dev/sdk/v3";

export const action: ActionFunction = async ({ request }) => {
  try {
    const schedulesList = await schedules.list();
    console.log("List of Schedules is :" + JSON.stringify(schedulesList));
    const targetScheduleid = schedulesList.data[0].id;
    console.log(
      "Retreived Schedule Id is :" + JSON.stringify(targetScheduleid),
    );
    const result = await schedules.del(targetScheduleid); // Delete by schedule I
    // Terminate/delete the schedule based on externalId (e.g., email)

    // const result = await schedules.del(
    // "fetch-sales-orders"
    // );

    // const { data, error } = await getSupabaseServiceRole()
    //     .from("ScheduleTracking")
    //     .select("scheduleId")
    //     .eq("userEmail", email)
    //     .single();

    // if (error || !data) {
    //     console.error("Error fetching schedule ID:", error?.message || "No data found");
    //     throw new Error("Failed to fetch schedule ID.");
    // }

    // await schedules.del(data.scheduleId);

    // await  getSupabaseServiceRole().from("ScheduleTracking").delete().eq("userEmail", email);

    return json({ success: true, result });
  } catch (error) {
    console.error("Error stopping fetch schedule:", error);
    return json({ success: false, error }, { status: 500 });
  }
};
