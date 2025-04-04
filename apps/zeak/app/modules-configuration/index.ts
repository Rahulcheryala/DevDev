import { table } from "console";
import { fontsList } from "./fonts";
import { labelsreports } from "./labels-reports";
import { sidebar } from "./sidebar";

const moduleConfiguration = {
  sidebar,
  labelsreports,
  table,
  fonts: fontsList,
};

const ALL_TEAMS_ID = "0";

const claims: Record<string, string> = {
  role: "employee",
};

const permissions: Record<string, string[]> = {
  settings_update: [ALL_TEAMS_ID],
  users_update: [ALL_TEAMS_ID],
};

export { moduleConfiguration, claims, permissions };
