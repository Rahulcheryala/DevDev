import { z } from "zod";
import {
  NotificationType,
  NotificationPriority,
  NotificationPurpose,
  NotificationColor,
  NotificationRecurrence,
  NotificationAudience,
} from "./_types";

const notificationTypes = [
  NotificationType.MANUAL,
  NotificationType.TIME,
  NotificationType.EVENT,
] as const;

const notificationPriorties = [
  NotificationPriority.LOW,
  NotificationPriority.MEDIUM,
  NotificationPriority.HIGH,
  NotificationPriority.CRITICAL,
] as const;

const notificationPurposes = [
  NotificationPurpose.MARKETING,
  NotificationPurpose.ALERTS,
  NotificationPurpose.SYSTEM_ALERTS,
  NotificationPurpose.USER_ENGAGEMENT,
] as const;

const notificationColors = [
  NotificationColor.YELLOW,
  NotificationColor.RED,
  NotificationColor.GREEN,
] as const;

const notificationRecurrences = [
  NotificationRecurrence.ONE_TIME,
  NotificationRecurrence.HOURLY,
  NotificationRecurrence.DAILY,
  NotificationRecurrence.WEEKLY,
  NotificationRecurrence.MONTHLY,
  NotificationRecurrence.YEARLY,
] as const;

const notificationAudiences = [
  NotificationAudience.All,
  NotificationAudience.CUSTOMIZED,
  NotificationAudience.NONE,
] as const;

export const notificationFlags = ["0", "1"] as const;

export const newNotificationValidator = z.object({
  name: z.string().trim().min(2, { message: "Notification name is required" }),
  description: z.string().optional(),
  purpose: z.enum(notificationPurposes, { message: "Purpose is required." }),
  type: z.enum(notificationTypes, { message: "Type is required" }),
  priority: z.enum(notificationPriorties, { message: "Priority is required" }),
  color: z.enum(notificationColors).optional(),
});

export const notificationRecurrenceFormValidator = z.object({
  recurrence: z.enum(notificationRecurrences, {
    message: "Recurrence is required",
  }),
  startDate: z.string().optional(),
  startTime: z.string().optional(),
  startTimezone: z.string().optional(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  endTimezone: z.string().optional(),
  occurences: z.number().optional(),
});

export const notificationAudienceFormValidator = z.object({
  audience: z.enum(notificationAudiences, { message: "Audience is required" }),
});

export const notificationDeliveryFormValidator = z.object({
  isWebDelivery: z.enum(notificationFlags).default("0"),
  isEmailDelivery: z.enum(notificationFlags).default("0"),
  isSMSDelivery: z.enum(notificationFlags).default("0"),
  webContent: z.string().optional(),
  emailContent: z.string().optional(),
  smsContent: z.string().optional(),
  webConfigPosition: z.string().optional(),
  emailConfigSubject: z.string().optional(),
});

export const initialNotificationState = {
  name: "",
  description: "",
  purpose: "",
  priority: "",
  type: NotificationType.MANUAL,
  color: "",
};
