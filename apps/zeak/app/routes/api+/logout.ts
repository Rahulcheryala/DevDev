// File: app/routes/api/logout.ts

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  destroyAuthSessionApi,
  getAuthSessionApi,
  removeApiLoginSession,
} from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { userSessionId } = await request.json();

    if (!userSessionId) {
      return json({ error: "Missing userSessionId" }, { status: 400 });
    }

    const authSession = await getAuthSessionApi(request);

    if (!authSession) await destroyAuthSessionApi(request);

    const { error } = await removeApiLoginSession(userSessionId);

    if (error) {
      console.error("Error logging out:", error);
      return json({ error: "Failed to logout" }, { status: 500 });
    }

    return json(
      { success: true, message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in logout process:", error);
    return json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
