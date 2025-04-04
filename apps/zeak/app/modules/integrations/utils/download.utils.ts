import { IIntegrationModel } from "../models/integration.model";
import { IConnectionModel } from "../models/connection.model";
import { safeReplace } from "./utils";

/**
 * Interface for integration data with connections
 */
interface IntegrationWithConnections extends IIntegrationModel {
  connections?: IConnectionModel[];
}

/**
 * Exports integration data to a CSV file and triggers download
 * @param integrationData The integration data to export
 */
export const exportIntegrationData = (
  integrationData: IntegrationWithConnections,
  connections: IConnectionModel[]
) => {
  // Create CSV with column names in first row
  const columnNames = [
    "ID",
    "Integration Name",
    "Integration Code",
    "Application Name",
    "Description",
    "Logo",
    "Is Favorite",
    "Integration Type",
    "Integration Category",
    "Connection Type",
    "Auth Type",
    "Connection Limit",
    "Status",
    "Is Tested",
    "Last Tested At",
    "Last Tested By",
    "Last Test Result",
    "Created At",
    "Created By",
    "Updated At",
    "Last Updated By",
    "Deleted At",
    "Deleted By",
    "Sync Token",
    "Number of Connections",
    "Companies",
  ];

  // Prepare row data for the CSV
  const rowData = [
    integrationData.id,
    integrationData.integrationName,
    integrationData.integrationCode,
    safeReplace(integrationData.applicationName),
    integrationData.description,
    integrationData.logo,
    integrationData.isFavorite ? "Yes" : "No",
    safeReplace(integrationData.integrationType),
    safeReplace(integrationData.integrationCategory),
    safeReplace(integrationData.connectionType),
    safeReplace(integrationData.authType),
    integrationData.connectionLimit,
    safeReplace(integrationData.status),
    integrationData.isTested ? "Yes" : "No",
    integrationData.lastTestedAt || "",
    integrationData.lastTestedBy || "",
    integrationData.lastTestResult || "",
    integrationData.createdAt || "",
    integrationData.createdBy || "",
    integrationData.updatedAt || "",
    integrationData.lastUpdatedBy || "",
    integrationData.deletedAt || "",
    integrationData.deletedBy || "",
    integrationData.syncToken || "",
    connections.length || 0,
    (integrationData.companyIds || []).join(", "),
  ];

  // Format data for CSV
  const formattedRowData = rowData.map((val) => {
    // Handle special cases like objects, arrays, and dates
    if (val === null || val === undefined) {
      return "";
    } else if (val instanceof Date) {
      return val.toISOString();
    } else if (typeof val === "string") {
      // Check if this is a date string (ISO format)
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
        // Already a date string, just return it
        return val;
      }
      // Escape quotes and wrap values with commas in quotes
      return val.includes(",") || val.includes('"')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
    } else if (typeof val === "object") {
      return JSON.stringify(val);
    } else {
      return val;
    }
  });

  // If there are connections, add additional columns for each connection
  let connectionDetails: string[] = [];
  if (connections && connections.length > 0) {
    // Add connection details
    connectionDetails = connections.map(
      (connection: IConnectionModel, index: number) =>
        `Connection ${index + 1}: ${connection.connectionName || "Unnamed"}`
    );
  }

  // Combine column names and property rows with correct CSV formatting
  const csvRows = [
    [...columnNames, ...connectionDetails].join(","),
    formattedRowData.join(","),
  ];

  const csv = csvRows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  // Set file name based on integration name or code
  const fileName =
    integrationData.integrationName?.replace(/\s+/g, "_") ||
    integrationData.integrationCode ||
    `integration_${integrationData.id}`;

  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exports connection data to a CSV file and triggers download
 * @param connectionData The connection data to export
 */
export const exportConnectionData = (connectionData: IConnectionModel) => {
  // Create CSV with column names in first row
  const columnNames = [
    "ID",
    "Connection Name",
    "Connection Code",
    "Integration ID",
    "Description",
    "Company IDs",
    "Is Enabled",
    "Connection Details",
    "Execution Frequency",
    "Connection Status",
    "Is Tested",
    "Last Tested At",
    "Last Tested By",
    "Last Test Result",
    "Created At",
    "Created By",
    "Updated At",
    "Last Updated By",
    "Deleted At",
    "Deleted By",
    "Sync Token",
  ];

  // Prepare row data for the CSV
  const rowData = [
    connectionData.id,
    connectionData.connectionName,
    connectionData.connectionCode,
    connectionData.integrationId,
    connectionData.connectionDescription,
    (connectionData.companyIds || []).join(", "),
    connectionData.isEnabled ? "Yes" : "No",
    connectionData.connectionDetails
      ? JSON.stringify(connectionData.connectionDetails)
      : "",
    safeReplace(connectionData.executionFrequency),
    safeReplace(connectionData.connectionStatus),
    connectionData.isTested ? "Yes" : "No",
    connectionData.lastTestedAt || "",
    connectionData.lastTestedBy || "",
    connectionData.lastTestResult
      ? safeReplace(connectionData.lastTestResult)
      : "",
    connectionData.createdAt || "",
    connectionData.createdBy || "",
    connectionData.updatedAt || "",
    connectionData.lastUpdatedBy || "",
    connectionData.deletedAt || "",
    connectionData.deletedBy || "",
    connectionData.syncToken || "",
  ];

  // Format data for CSV
  const formattedRowData = rowData.map((val) => {
    // Handle special cases like objects, arrays, and dates
    if (val === null || val === undefined) {
      return "";
    } else if (val instanceof Date) {
      return val.toISOString();
    } else if (typeof val === "string") {
      // Check if this is a date string (ISO format)
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
        // Already a date string, just return it
        return val;
      }
      // Escape quotes and wrap values with commas in quotes
      return val.includes(",") || val.includes('"')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
    } else if (typeof val === "object") {
      return JSON.stringify(val);
    } else {
      return val;
    }
  });

  // Combine column names and property rows with correct CSV formatting
  const csvRows = [columnNames.join(","), formattedRowData.join(",")];

  const csv = csvRows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  // Set file name based on connection name or code
  const fileName =
    connectionData.connectionName?.replace(/\s+/g, "_") ||
    connectionData.connectionCode ||
    `connection_${connectionData.id}`;

  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
