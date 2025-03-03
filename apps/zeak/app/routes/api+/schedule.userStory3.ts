import { json } from "@remix-run/node";
import {
  activateSchedule,
  deactivateSchedule,
} from "~/modules/workflows/salesOrderSync/scheduler";

export async function action({ request }: { request: Request }) {
  const { taskId, action } = await request.json();

  if (action === "activate") {
    const result = await activateSchedule(taskId);
    return json(result);
  } else if (action === "deactivate") {
    const result = await deactivateSchedule(taskId);
    return json(result);
  }

  return json({ success: false, error: "Invalid action" });
}
