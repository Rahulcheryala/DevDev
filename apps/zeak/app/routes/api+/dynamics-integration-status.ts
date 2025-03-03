import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { checkDynamicsIntegration } from "~/utils/checkDynamicsIntegration";
import { getAuthSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // const authSession = await getAuthSession(request);
    // console.log("🔍 Auth session found:", authSession);
    // if (!authSession) {
    //   return json({ isIntegrated: false, message: "Not authenticated" });
    // }
    const status = await checkDynamicsIntegration("yash.santani@xcelpros.com");
    return json(status);
  } catch (error) {
    return json({
      isIntegrated: false,
      message: "Error checking integration status",
    });
  }
};
