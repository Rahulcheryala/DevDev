import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";


export async function getNotification(
  client: SupabaseClient<Database>,
  notificationId: string,
) {
  const notification = await client
    .from("notfMaster" as any)
    .select("*")
    .eq("id", notificationId)
    .single();
  if (notification.error) {
    return notification;
  }

  return {
    data: notification.data,
    error: null,
  };
}