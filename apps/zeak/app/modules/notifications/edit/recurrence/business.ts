import { NotificationRecurrence } from "~/routes/x+/notifications+/_types";

export const notificationFrequencies = [
  {
    label: "One Time",
    value: NotificationRecurrence.ONE_TIME,
  },
  {
    label: "Hourly",
    value: NotificationRecurrence.HOURLY,
  },
  {
    label: "Daily",
    value: NotificationRecurrence.DAILY,
  },
  {
    label: "Weekly",
    value: NotificationRecurrence.WEEKLY,
  },
  {
    label: "Monthly",
    value: NotificationRecurrence.MONTHLY,
  },
  {
    label: "Yearly",
    value: NotificationRecurrence.YEARLY,
  },
];

export const timezones = [
  {
    label: "India",
    value: "1",
  },
];

export const endTimeTypes = [
  {
    label: "Date",
    value: "date",
    disabled: false,
  },
  {
    label: "Event",
    value: "event",
    disabled: true,
  },
  {
    label: "Occurences",
    value: "occurences",
    disabled: false,
  },
];
