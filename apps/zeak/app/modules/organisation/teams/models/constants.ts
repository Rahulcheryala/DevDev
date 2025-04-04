export const teamTabs = [
  {
    id: 1,
    title: "Dashboard",
    value: "teamDashboard",
    content: "Dashboard",
  },
  {
    id: 2,
    title: "All Teams",
    value: "teamsList",
    content: "All Teams",
  }
];

export enum TeamTab {
  DASHBOARD = "teamDashboard",
  LIST = "teamsList"
}

export enum TeamAddFlowTabs {
  CREATE_FLOW = "general",
  USER_FLOW = "users"
}

export enum TeamViewFlowTabs {
  GENERAL = "general",
  USERS = 'users',
  AUDIT = "audit"
}

export type TeamComponents = 'listing' | 'individual' | null;