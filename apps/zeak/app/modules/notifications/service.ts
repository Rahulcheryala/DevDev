import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import moment from "moment";

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

export const buildDateTime = (date?: string, time?: string) => {
  if (!date) return;
  const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
  return dateTime.format();
};

export const getTime = (datetime?: Date) => {
  if (!datetime) return;
  return moment(datetime).format("HH:mm:ss");
};

export const getDate = (datetime?: Date) => {
  if (!datetime) return;
  return moment(datetime).format("YYYY-MM-DD");
};

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
