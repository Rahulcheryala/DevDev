import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost } from "~/utils/http";
import { getSupabase } from "~/lib/supabase";

export const action = async ({ request }: ActionFunctionArgs) => {
  //   assertIsPost(request);
  //   const { client } = await requirePermissions(request, {
  //     view: "notifications",
  //   });
  const client = getSupabase();
  const { name } = await request.json();

  if (!name) {
    return json({
      isConfigured: false,
      message: "Notification name is required",
    });
  }

  // Check for notification with specific name
  const { data: notification } = await client
    .from("notfMaster")
    .select("id, webContent, emailConfig")
    .eq("name", name)
    .single();

  return json({
    isConfigured: !!notification,
    notificationId: notification?.id,
    webContent: notification?.webContent,
    emailConfig: notification?.emailConfig,
  });
};
