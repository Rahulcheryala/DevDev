import { NotificationAudience } from "~/routes/x+/notifications+/_types";

export const notificationAudiences = [
  {
    label: "All",
    value: NotificationAudience.All,
  },
  {
    label: "Customized",
    value: NotificationAudience.CUSTOMIZED,
  },
  {
    label: "Undefined",
    value: NotificationAudience.NONE,
  },
];

export const sections = [
  {
    label: "All Platform Users",
    description:
      "Choose undefined to use this notification in Workflows, Automations and Business Rules.",
    audience: NotificationAudience.All,
  },
  {
    label: "Select One or More Users, Teams or Departments",
    description:
      "You can select multiple users, teams or departments separated by a comma",
    audience: NotificationAudience.CUSTOMIZED,
  },
  {
    label: "Undefined - For Business Rules and Automations",
    description:
      "Choose undefined to use this notification in Workflows, Automations and Business Rules.",
    audience: NotificationAudience.NONE,
  },
];
