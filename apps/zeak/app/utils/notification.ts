import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { NotificationRecurrence } from "~/routes/x+/notifications+/_types";
import type { NotificationQueueResponse } from "~/types";

export const generateCronPattern = (
  frequency: NotificationRecurrence,
  startDateTime: string,
) => {
  const start = new Date(startDateTime);

  const minutes = start.getMinutes();
  const hours = start.getHours();
  const dayOfMonth = start.getDate();
  const dayOfWeek = start.getDay();
  const month = start.getMonth();

  switch (frequency) {
    case NotificationRecurrence.HOURLY:
      return `${minutes} * * * *`;
    case NotificationRecurrence.DAILY:
      return `${minutes} ${hours} * * *`;
    case NotificationRecurrence.WEEKLY:
      return `${minutes} ${hours} * * ${dayOfWeek}`;
    case NotificationRecurrence.MONTHLY:
      return `${minutes} ${hours} ${dayOfMonth} * *`;
    default:
      return `${minutes} ${hours} ${dayOfMonth} ${month + 1} *`;
  }
};

const getUsersBasedOnAudience = async (
  client: SupabaseClient,
  companyId: string,
  notificationId: string,
  audience: string,
) => {
  if (audience === "none") {
    return [];
  }

  if (audience === "customized") {
    const { data } = await client
      .from("notfCustomizedAudience")
      .select("*")
      .eq("notificationId", notificationId);

    const users = [];

    for (const audience of data ?? []) {
      if (audience.entityType === "team") {
        const { data } = await client
          .from("teamMember")
          .select("userId")
          .eq("teamId", audience.entityId);
        if (data) {
          users.push(data.map((member) => member.userId));
        }
      }
      if (audience.entityType === "department") {
        const { data } = await client
          .from("departmentMember")
          .select("userId")
          .eq("departmentId", audience.entityId);
        if (data) {
          users.push(data.map((member) => member.userId));
        }
      }

      const { data } = await client
        .from("user")
        .select("id")
        .eq("id", audience.entityId);
      if (data) {
        users.push(data.map((member) => member.id));
      }
    }

    return users;
  }

  const { data } = await client
    .from("userToCompany")
    .select("*")
    .eq("companyId", companyId);
  return (data as any[]).map((mapping) => mapping.userId);
};

export const createNotificationQueue = async (
  notificationId: string,
): Promise<NotificationQueueResponse> => {
  const supabase = getSupabaseServiceRole();
  const { data: notification, error: notficationError } = await supabase
    .from("notfMaster" as any)
    .select("*")
    .eq("id", notificationId)
    .single();

  if (notficationError || notification == null) {
    throw new Error("Invalid notification id.");
  }

  if (notification.endDateTime && notification.endDateTime > new Date()) {
    return {
      isExpired: true,
      success: false,
      scheduleId: notification.scheduleId,
    };
  }

  const { data: notificationCompanies, error: companyMappingError } =
    await supabase
      .from("notfCompanyMapping" as any)
      .select("*")
      .eq("notificationId", notificationId);

  if (companyMappingError) {
    return { success: false };
  }

  const queueData = [];
  for (const notificationCompany of notificationCompanies ?? []) {
    const userIds = await getUsersBasedOnAudience(
      supabase,
      notificationCompany.companyId,
      notificationId,
      notification.audience as string,
    );

    for (const userId of userIds) {
      queueData.push({
        companyId: notificationCompany.companyId,
        userId: userId,
        notificationId: notificationId,
        webContent: notification.webContent, // TODO: Replace variables
        emailContent: notification.emailContent,
        smsContent: notification.smsContent,
      });
    }
  }

  const { error } = await supabase.from("notfQueue" as any).insert(queueData);

  if (error) {
    return { success: false };
  }

  return { success: true };
};

export async function previewNotificationWithTrigger(notificationId: string) {
  const supabase = getSupabaseServiceRole();

  // First create the notification queue
  const queueResponse = await createNotificationQueue(notificationId);
  if (!queueResponse.success) {
    throw new Error("Failed to create notification preview");
  }

  // Get the queued notification with resolved variables
  const { data: queuedNotification, error } = await supabase
    .from("notfQueue")
    .select("*")
    .eq("notificationId", notificationId)
    .single();

  if (error || !queuedNotification) {
    throw new Error("Failed to fetch preview notification");
  }

  // Clean up the preview queue entry
  await supabase
    .from("notfQueue")
    .delete()
    .eq("notificationId", notificationId);

  return queuedNotification.webContent; // Return resolved content
}
