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

export enum NotificationPriorty {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum NotificationPurpose {
  MARKETING = "Marketing",
  SYSTEM_ALERTS = "SystemAlerts",
  Alerts = "Alerts",
  USER_ENGAGEMENT = "UserEngagement",
}

export const notificationTypeList = [
  {
    label: "On-Demand",
    value: NotificationType.MANUAL,
    description:
      "These are user-driven events, meaning notifications are triggered based on user actions or workflows within the system.",
    color: "hsl(var(--accent-primary-dark)",
  },
  {
    label: "Time based",
    value: NotificationType.TIME,
    description:
      "These are user-driven events, meaning notifications are triggered based on user actions or workflows within the system.",
    color: "hsl(var(--greenish-blue))",
  },
  {
    label: "Events",
    value: NotificationType.EVENT,
    description:
      "These are user-driven events, meaning notifications are triggered based on user actions or workflows within the system.",
    color: "hsl(var(--accent-yellow)",
  },
];

export const notificationPriorityList = [
  {
    label: "Critcal",
    value: NotificationPriorty.CRITICAL,
  },
  {
    label: "High",
    value: NotificationPriorty.HIGH,
  },
  {
    label: "Medium",
    value: NotificationPriorty.MEDIUM,
  },
  {
    label: "Low",
    value: NotificationPriorty.LOW,
  },
];

export const notificationPurposeList = [
  {
    label: "Marketing",
    value: NotificationPurpose.MARKETING,
  },
  {
    label: "Alerts",
    value: NotificationPurpose.Alerts,
  },
  {
    label: "System Alerts",
    value: NotificationPurpose.SYSTEM_ALERTS,
  },
  {
    label: "User Engagement",
    value: NotificationPurpose.USER_ENGAGEMENT,
  },
];

export const notificationColorList = [
  {
    label: "Yellow",
    value: NotificationColor.YELLOW,
  },
  {
    label: "Red",
    value: NotificationColor.RED,
  },
  {
    label: "Green",
    value: NotificationColor.GREEN,
  },
];
