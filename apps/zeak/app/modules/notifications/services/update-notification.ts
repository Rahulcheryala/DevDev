import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function updateNotification(
  client: SupabaseClient<Database>,
  notificationId: string,
  body: any,
) {
  return await client
    .from("notfMaster" as any)
    .update(body)
    .eq("id", notificationId)
    .single();
}
