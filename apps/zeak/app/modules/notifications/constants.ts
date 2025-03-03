export const tabsLinks = [
    {
      id: 1,
      title: "All Notifications",
      value: "allNotifications",
      content: "All Notifications",
    },
    {
      id: 2,
      title: "Notification Queue",
      value: "notificationQueue",
      content: "Notification Queue",
    },
    {
      id: 3,
      title: "Where-Used",
      value: "whereUsed",
      content: "Where-Used",
    },
  ];

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
    label: "On Demand",
    value: NotificationType.MANUAL,
    badgeTextColor:"#007AFF",
    description:
     "Triggered manually whenever needed by the user, system, or process",
    color: "hsl(var(--accent-primary-dark)",
  },
  {
    label: "Scheduled",
    value: NotificationType.TIME,
    badgeTextColor:"#0C817B",
  
    description:
      "Triggered at a specific time with options to set recurrence",
    color: "hsl(var(--greenish-blue))",
  },
  {
    label: "System Trigger",
    value: NotificationType.EVENT,
    badgeTextColor:"#FF9500",
    description:
      "Triggered automatically when a specific event occurs (e.g., order placed or status updated)",
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


