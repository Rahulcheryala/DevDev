const admin = {
  email: "devtest@xcelpros.com",
  password: "zeak123!",
  firstName: "Xcelpros",
  lastName: "Admin",
};

const ALL_TEAMS_ID = "0";

const claims: Record<string, string> = {
  role: "employee",
};

const permissions: Record<string, string[]> = {
  settings_update: [ALL_TEAMS_ID],
  users_update: [ALL_TEAMS_ID],
};

export { admin, claims, permissions };
