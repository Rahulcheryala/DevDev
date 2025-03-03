export const departmentTabs = [
  {
    id: 1,
    title: "Dashboard",
    value: "departmentDashboard",
    content: "Dashboard",
  },
  {
    id: 2,
    title: "All Departments",
    value: "departmentsList",
    content: "All Departments",
  }
];

export enum DepartmentTab {
  DASHBOARD = "departmentDashboard",
  LIST = "departmentsList"
}

export enum DepartmentAddFlowTabs {
  CREATE_FLOW = "general",
  USER_FLOW = "users"
}

export enum DepartmentViewFlowTabs {
  GENERAL = "general",
  USERS = 'users',
  AUDIT = "audit"
}

export type DepartmentComponents = 'listing' | 'individual' | null;