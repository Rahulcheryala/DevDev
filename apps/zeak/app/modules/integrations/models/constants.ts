export const integrationTabs = [
  {
    id: 1,
    title: "Dashboard",
    value: "integrationDashboard",
    content: "Dashboard",
  },
  {
    id: 2,
    title: "Integrations",
    value: "integrationsList",
    content: "Integrations",
  },
  {
    id: 3,
    title: "Connections",
    value: "connectionsList",
    content: "Connections",
  },
  {
    id: 4,
    title: "Favorites",
    value: "favoritesList",
    content: "Favorites",
  },
];

// for listing flow
export enum IntegrationTab {
  DASHBOARD = "integrationDashboard",
  INTEGRATIONS = "integrationsList",
  CONNECTIONS = "connectionsList",
  FAVORITES = "favoritesList",
}

// for create flow
export enum CreationFlowTabs {
  STEP_1 = "General",
  STEP_2 = "Schedule & Policies",
  STEP_3 = "Test & Connect",
}

// for view flow
export enum IntegrationViewFlowTabs {
  GENERAL = "General",
  SETUP = "Setup",
  AUDIT = "Audit",
}

export type IntegrationComponents = "listing" | "individual" | null;
export type IntegrationType = "System" | "User Defined";

// export const integrations = [
//   {
//     id: "1",
//     logo: "",
//     integrationName: "Microsoft Dynamics 365",
//     application: "Microsoft Dynamics 365",
//     purpose: "My production ERP product",
//     isFavorite: true,
//     integrationCategory: "ERP",
//     connectionType: "API",
//     authenticationType: "OAuth 2.0",
//     status: "Active",
//     type: "System",
//     lastUpdated: "2024-03-15T09:30:00Z",
//     lastUpdatedBy: "John Doe",
//     connections: [
//       {
//         id: "1",
//         connectionName: "Dev 1",
//         connectionStatus: "ONLINE",
//         environmentType: "PROD",
//         environmentURL: "https://api.microsoft.com",
//         description: "ERP Production environment",
//         errors: 0,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: true,
//         lastUpdatedBy: "Alice Smith",
//       },
//       {
//         id: "2",
//         connectionName: "Dev 2",
//         connectionStatus: "ONLINE",
//         environmentType: "DEV",
//         environmentURL: "https://api.microsoft.com",
//         description: "Feature Development environment",
//         errors: 0,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: true,
//         lastUpdatedBy: "Bob Johnson",
//       },
//       {
//         id: "3",
//         connectionName: "Dev 3",
//         connectionStatus: "ERROR",
//         environmentType: "DEV",
//         environmentURL: "https://api.microsoft.com",
//         description: "UX Development environment",
//         errors: 2,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: false,
//         lastUpdatedBy: "Charlie Brown",
//       },
//     ],
//     companies: [
//       {
//         id: "1",
//         companyName: "Acme Corp",
//         enabled: true,
//         lastUpdated: "2024-03-15T09:00:00Z",
//         errors: 0,
//       },
//       {
//         id: "2",
//         companyName: "TechStart",
//         enabled: false,
//         lastUpdated: "2024-03-14T09:00:00Z",
//         errors: 1,
//       },
//       {
//         id: "3",
//         companyName: "InnovateLabs",
//         enabled: true,
//         lastUpdated: "2024-03-13T09:00:00Z",
//         errors: 5,
//       },
//     ],
//     actions: "Add Connection",
//   },
//   {
//     id: "2",
//     logo: "",
//     integrationName: "Office 365",
//     application: "Office 365",
//     purpose: "My production productivity product",
//     isFavorite: false,
//     integrationCategory: "Productivity",
//     connectionType: "API",
//     authenticationType: "OAuth 2.0",
//     status: "Active",
//     type: "System",
//     lastUpdated: "2024-03-14T15:45:00Z",
//     lastUpdatedBy: "Jane Smith",
//     connections: [
//       {
//         id: "4",
//         connectionName: "Dev 1",
//         connectionStatus: "OFFLINE",
//         environmentType: "PROD",
//         environmentURL: "https://api.microsoft.com",
//         description: "Office Production environment",
//         errors: 0,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: true,
//         lastUpdatedBy: "Eve Adams",
//       },
//       {
//         id: "5",
//         connectionName: "Dev 2",
//         connectionStatus: "ERROR",
//         environmentType: "DEV",
//         environmentURL: "https://api.microsoft.com",
//         description: "Office Feature Development environment",
//         errors: 0,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: true,
//         lastUpdatedBy: "Frank Davis",
//       },
//     ],
//     companies: [
//       {
//         id: "4",
//         companyName: "GlobalTech",
//         enabled: true,
//         lastUpdated: "2024-03-14T10:00:00Z",
//         errors: 0,
//       },
//       {
//         id: "5",
//         companyName: "DevCorp",
//         enabled: true,
//         lastUpdated: "2024-03-14T11:00:00Z",
//         errors: 1,
//       },
//     ],
//     actions: "Add Connection",
//   },
//   {
//     id: "3",
//     logo: "",
//     integrationName: "Azure DevOps for Git",
//     application: "Azure DevOps",
//     purpose: "My production project management product",
//     isFavorite: true,
//     integrationCategory: "Project Management",
//     connectionType: "Webhook",
//     authenticationType: "API Key",
//     status: "Inactive",
//     type: "User Defined",
//     lastUpdated: "2024-03-13T11:20:00Z",
//     lastUpdatedBy: "Yash",
//     connections: [
//       {
//         id: "6",
//         connectionName: "Dev 1",
//         connectionStatus: "ONLINE",
//         environmentType: "DEV",
//         environmentURL: "https://api.microsoft.com",
//         description: "Azure Production environment",
//         errors: 0,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: true,
//         lastUpdatedBy: "Grace Evans",
//       },
//       {
//         id: "7",
//         connectionName: "Dev 2",
//         connectionStatus: "ERROR",
//         environmentType: "DEV",
//         environmentURL: "https://api.microsoft.com",
//         description: "Azure Feature Development environment",
//         errors: 2,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: false,
//         lastUpdatedBy: "Hank Miller",
//       },
//     ],
//     companies: [
//       {
//         id: "6",
//         companyName: "TechStart",
//         enabled: true,
//         lastUpdated: "2024-03-13T12:00:00Z",
//         errors: 6,
//       },
//       {
//         id: "7",
//         companyName: "InnovateLabs",
//         enabled: false,
//         lastUpdated: "2024-03-12T12:00:00Z",
//         errors: 2,
//       },
//       {
//         id: "8",
//         companyName: "DevCorp",
//         enabled: true,
//         lastUpdated: "2024-03-11T12:00:00Z",
//         errors: 0,
//       },
//       {
//         id: "9",
//         companyName: "CloudSys",
//         enabled: true,
//         lastUpdated: "2024-03-10T12:00:00Z",
//         errors: 0,
//       },
//     ],
//     actions: "Add Connection",
//   },
//   {
//     id: "4",
//     logo: "",
//     integrationName: "Salesforce",
//     application: "Salesforce",
//     purpose: "My production CRM product",
//     isFavorite: true,
//     integrationCategory: "CRM",
//     connectionType: "Database",
//     authenticationType: "Basic Auth",
//     status: "Active",
//     type: "System",
//     lastUpdated: "2024-03-15T13:15:00Z",
//     lastUpdatedBy: "John",
//     connections: [
//       {
//         id: "8",
//         connectionName: "Dev 1",
//         connectionStatus: "ONLINE",
//         environmentType: "PROD",
//         environmentURL: "https://api.microsoft.com",
//         description: "Salesforce Production environment",
//         errors: 0,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: true,
//         lastUpdatedBy: "Ian Thompson",
//       },
//       {
//         id: "9",
//         connectionName: "Dev 2",
//         connectionStatus: "OFFLINE",
//         environmentType: "PROD",
//         environmentURL: "https://api.microsoft.com",
//         description: "Salesforce Feature Development environment",
//         errors: 1,
//         lastUpdated: "2024-08-24T14:55:00Z",
//         enabled: false,
//         lastUpdatedBy: "Jack Wilson",
//       },
//     ],
//     companies: [
//       {
//         id: "10",
//         companyName: "Acme Corp",
//         enabled: true,
//         lastUpdated: "2024-03-15T09:00:00Z",
//         errors: 3,
//       },
//       {
//         id: "11",
//         companyName: "TechStart",
//         enabled: true,
//         lastUpdated: "2024-03-14T09:00:00Z",
//         errors: 1,
//       },
//       {
//         id: "12",
//         companyName: "DevCorp",
//         enabled: false,
//         lastUpdated: "2024-03-13T09:00:00Z",
//         errors: 1,
//       },
//       {
//         id: "13",
//         companyName: "CloudSys",
//         enabled: true,
//         lastUpdated: "2024-03-12T09:00:00Z",
//         errors: 0,
//       },
//     ],
//     actions: "Add Connection",
//   },
//   {
//     id: "5",
//     logo: "",
//     integrationName: "Slack for Microsoft Teams",
//     application: "Slack",
//     purpose: "My production communication product",
//     isFavorite: false,
//     integrationCategory: "Communication",
//     connectionType: "Webhook",
//     authenticationType: "API Key",
//     status: "Inactive",
//     type: "User Defined",
//     lastUpdated: "2024-03-12T16:40:00Z",
//     lastUpdatedBy: "Vamsi",
//     connections: [],
//     companies: [
//       {
//         id: "14",
//         companyName: "GlobalTech",
//         enabled: true,
//         lastUpdated: "2024-03-12T10:00:00Z",
//         errors: 7,
//       },
//       {
//         id: "15",
//         companyName: "InnovateLabs",
//         enabled: false,
//         lastUpdated: "2024-03-11T10:00:00Z",
//         errors: 2,
//       },
//       {
//         id: "16",
//         companyName: "Acme Corp",
//         enabled: true,
//         lastUpdated: "2024-03-10T10:00:00Z",
//         errors: 0,
//       },
//     ],
//     actions: "Add Connection",
//   },
// ];

// export interface Integration {
//   id: string;
//   logo: string;
//   integrationName: string;
//   application: string;
//   purpose: string;
//   isFavorite: boolean;
//   integrationCategory: string;
//   connectionType: string;
//   authenticationType: string;
//   status: string;
//   type: string;
//   lastUpdated: string;
//   lastUpdatedBy: string;
//   connections: {
//     id: string;
//     connectionName: string;
//     connectionStatus: string;
//     description: string;
//     errors: number;
//     lastUpdated: string;
//     enabled: boolean;
//     lastUpdatedBy: string;
//   }[];
//   companies: {
//     id: string;
//     companyName: string;
//     enabled: boolean;
//     lastUpdated: string;
//     errors: number;
//   }[];
//   actions: string;
// }
