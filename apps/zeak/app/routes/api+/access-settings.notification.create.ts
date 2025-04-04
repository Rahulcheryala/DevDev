import { validationError, validator } from "@zeak/remix-validated-form";
import { type ActionFunctionArgs, json } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost } from "~/utils/http";
import { schedules } from "@trigger.dev/sdk/v3";
import type { NotificationRecurrence } from "~/utils/notification";
import {
  createNotificationQueue,
  generateCronPattern,
} from "~/utils/notification";
import { notificationTrigger } from "~/triggers/notification.trigger";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const notificationStatusMap = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DRAFT: "draft",
  BLOCKED: "blocked",
} as const;

export const notificationRecurrenceMap = {
  ONE_TIME: "oneTime",
  ON_DEMAND: "onDemand",
  HOURLY: "hourly",
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
} as const;

export const notificationTypeMap = {
  MANUAL: "manual",
  TIME: "time",
  EVENT: "event",
} as const;

export const notificationPriortyMap = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export const notificationPurposeMap = {
  MARKETING: "Marketing",
  SYSTEM_ALERTS: "SystemAlerts",
  Alerts: "Alerts",
  USER_ENGAGEMENT: "UserEngagement",
} as const;

export const notificationAudienceMap = {
  All: "all",
  CUSTOMIZED: "customized",
  NONE: "none",
} as const;

export const notificationFlags = ["0", "1"] as const;

export const notificationStatus = [
  "active",
  "inactive",
  "draft",
  "blocked",
] as const;

export const notificationType = ["manual", "time", "event"] as const;

export const notificationAudience = ["all", "none", "customized"] as const;

export const notificationRecurrence = [
  "oneTime",
  "onDemand",
  "hourly",
  "daily",
  "weekly",
  "monthly",
] as const;

export const notificationPriorty = [
  "low",
  "medium",
  "high",
  "critical",
] as const;

export const notificationPurpose = [
  "Marketing",
  "Alerts",
  "SystemAlerts",
  "UserEngagement",
] as const;

export const notificationsValidator = z.object({
  id: zfd.text(z.string().optional()),
  name: z.string().trim().min(2, { message: "Notification name is required" }),
  description: z.string().optional(),
  companyIdStr: z.string(),
  purpose: z.enum(notificationPurpose, { message: "Purpose is required." }),
  status: z.enum(notificationStatus, { message: "Status is required" }),
  type: z.enum(notificationType, { message: "Type is required" }),
  recurrence: z.enum(notificationRecurrence, {
    message: "Recurrence is required",
  }),
  audience: z.enum(notificationAudience, { message: "Audience is required" }),
  priority: z.enum(notificationPriorty, { message: "Priority is required" }),
  isWebDelivery: z.enum(notificationFlags).default("0"),
  isEmailDelivery: z.enum(notificationFlags).default("0"),
  isSMSDelivery: z.enum(notificationFlags).default("0"),
  webContent: z.string().trim().min(5, { message: "Content is required." }),
  startDateTime: z.string().optional(),
  endDateTime: z.string().optional(),
  ocurrences: z.number().optional(),
});

export type NotificationsValidator = z.infer<typeof notificationsValidator>;

export type NotificationCreateRequest = z.infer<
  typeof notificationsValidator
> & { customizedAudience?: string; companyIdStr: string };

enum NotificationCustomizedAudienceEntity {
  USER = "user",
  TEAM = "team",
  DEPARTMENT = "department",
}

export type NotificationCustomizedAudience = {
  entityType: NotificationCustomizedAudienceEntity;
  entityId: string;
};

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    create: "users",
  });

  const formData = await request.formData();
  const validation = await validator(notificationsValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const requestBody = validation.data as NotificationCreateRequest;
  validateRequest(requestBody);
  const _notification = getNotificationBody(requestBody, userId);
  const companyIds = JSON.parse(requestBody.companyIdStr) as string[];
  const notification = await client
    .from("notfMaster" as any)
    .insert([_notification])
    .select("*")
    .single();

  await client.from("notfCompanyMapping" as any).insert(
    companyIds.map((id) => ({
      companyId: id,
      notificationId: notification.data.id,
    })),
  );

  const response = { notifictionId: notification.data.id };
  if (requestBody.audience === "customized") {
    const customizedAudiences = JSON.parse(
      requestBody.customizedAudience as string,
    ) as NotificationCustomizedAudience[];
    const audiences = customizedAudiences.map((audience) => ({
      notificationId: notification.data.id,
      entityType: audience.entityType,
      entityId: audience.entityId,
    }));
    await client.from("notfCustomizedAudience" as any).insert(audiences);
  }

  if (requestBody.recurrence === "onDemand") {
    return json(response);
  }

  if (requestBody.recurrence === "oneTime") {
    await createNotificationQueue(notification.data.id);
    return json(response);
  }

  const cron = generateCronPattern(
    requestBody.recurrence as NotificationRecurrence,
    notification.data.startDateTime,
  );

  const schedule = await schedules.create({
    task: notificationTrigger.id,
    cron: cron,
    externalId: notification.data.id,
    deduplicationKey: notification.data.id,
    timezone: "Asia/Calcutta",
  });

  await client
    .from("notfMaster" as any)
    .update({ scheduleId: schedule.id })
    .eq("id", notification.data.id);

  return json(response);
}

const getNotificationBody = (
  body: NotificationsValidator,
  createdBy: string,
) => {
  return {
    name: body.name,
    description: body.description,
    status: body.status,
    type: body.type,
    webContent: body.webContent,
    isWebDelivery: body.isWebDelivery === "1",
    isEmailDelivery: body.isEmailDelivery === "1",
    isSMSDelivery: body.isSMSDelivery === "1",
    recurrence: body.recurrence,
    purpose: body.purpose,
    priority: body.priority,
    audience: body.audience,
    startDateTime: new Date(body.startDateTime!),
    endDateTime: new Date(body.endDateTime!),
    occurences: body.ocurrences,
    version: 1,
    createdBy: createdBy,
  };
};

const validateRequest = async (requestBody: NotificationCreateRequest) => {
  if (
    requestBody.recurrence === "onDemand" &&
    requestBody.audience !== "none"
  ) {
    throw new Error("On demand notification should not have audience");
  }

  if (
    requestBody.isEmailDelivery === "0" &&
    requestBody.isWebDelivery === "0" &&
    requestBody.isSMSDelivery === "0"
  ) {
    throw new Error("Atlest one delivery method is required.");
  }
};
