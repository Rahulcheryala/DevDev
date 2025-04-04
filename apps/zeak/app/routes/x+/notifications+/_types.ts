import type { z } from "zod";
import type {
  newNotificationValidator,
  notificationAudienceFormValidator,
  notificationDeliveryFormValidator,
  notificationRecurrenceFormValidator,
} from "./_model";

export type NotificationCreateForm = z.infer<typeof newNotificationValidator>;

export type NotificationRecurrenceForm = z.infer<
  typeof notificationRecurrenceFormValidator
>;

export type NotificationAudienceForm = z.infer<
  typeof notificationAudienceFormValidator
>;

export type NotificationDeliveryForm = z.infer<
  typeof notificationDeliveryFormValidator
>;

export type NotificationCreateRequest = z.infer<
  typeof newNotificationValidator
> & { id?: string; companyIdStr: string };

export type NotificationEditRecurrenceRequest = z.infer<
  typeof notificationRecurrenceFormValidator
> & { id: string };

export type NotificationEditAudienceRequest = z.infer<
  typeof notificationAudienceFormValidator
> & { customizedAudience?: string; id: string };

export type NotificationEditDeliveryRequest = z.infer<
  typeof notificationDeliveryFormValidator
> & { id: string };

export enum NotificationColor {
  YELLOW = "yellow",
  RED = "red",
  GREEN = "green",
}

export enum NotificationType {
  MANUAL = "manual",
  TIME = "time",
  EVENT = "event",
}

export enum NotificationPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum NotificationPurpose {
  MARKETING = "Marketing",
  SYSTEM_ALERTS = "SystemAlerts",
  ALERTS = "Alerts",
  USER_ENGAGEMENT = "UserEngagement",
}

export enum NotificationRecurrence {
  ONE_TIME = "oneTime",
  HOURLY = "hourly",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum NotificationAudience {
  All = "all",
  CUSTOMIZED = "customized",
  NONE = "none",
}

enum NotificationCustomizedAudienceEntity {
  USER = "user",
  TEAM = "team",
  DEPARTMENT = "department",
}

export type NotificationCustomizedAudience = {
  entityType: NotificationCustomizedAudienceEntity;
  entityId: string;
};

export type AppNotification = {
  id: string;
  name: string;
  description: string;
  audience: string;
  recurrence: string;
  purpose: string;
  status: string;
  color: string;
  startDateTime?: string;
  endDateTime?: string;
  occurences?: number;
  webContent: string;
};
