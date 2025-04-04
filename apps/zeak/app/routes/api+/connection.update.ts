import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import {
  Prisma,
  ExecutionFrequency,
  ConnectionStatus,
  LastTestResult,
} from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { client, userId, companyId } = await requirePermissions(request, {
      view: "connections",
      role: "user",
    });
    const tenant = await getTenantId(client, companyId);
    const tenantId = tenant?.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
    const connection = await request.json();

    // Validate required field
    if (!connection.id) {
      throw new Response(
        JSON.stringify({ error: "Connection ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Helper function to convert values with spaces back to enum format
    const safeReplace = (value: any) => {
      if (!value) return "";
      return typeof value === "string" ? value.replace(/_/g, " ") : value;
    };

    // Validate and prepare enum values
    let executionFrequency = null;
    let connectionStatus = null;
    let lastTestResult = null;

    // Only validate fields that are being updated
    if (connection.executionFrequency !== undefined) {
      if (
        Object.values(ExecutionFrequency).includes(
          connection.executionFrequency
        )
      ) {
        executionFrequency = safeReplace(connection.executionFrequency);
        // Special handling for On_Demand
        if (connection.executionFrequency === "On_Demand") {
          executionFrequency = connection.executionFrequency.replace(/_/g, "-");
        }
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid execution frequency" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (connection.connectionStatus !== undefined) {
      if (
        Object.values(ConnectionStatus).includes(connection.connectionStatus)
      ) {
        connectionStatus = safeReplace(connection.connectionStatus);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid connection status" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (connection.lastTestResult !== undefined) {
      if (connection.lastTestResult === null) {
        lastTestResult = null;
      } else if (
        Object.values(LastTestResult).includes(connection.lastTestResult)
      ) {
        lastTestResult = safeReplace(connection.lastTestResult);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid last test result" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Build update fields object for dynamic SQL generation
    const updates: Record<string, any> = {};

    // Add regular fields
    if (connection.integrationId !== undefined)
      updates.integrationId = connection.integrationId;
    // if (connection.connectionName !== undefined) updates.connectionName = connection.connectionName;
    // if (connection.connectionCode !== undefined) updates.connectionCode = connection.connectionCode;
    if (connection.connectionDescription !== undefined)
      updates.connectionDescription = connection.connectionDescription;
    if (connection.isEnabled !== undefined)
      updates.isEnabled = connection.isEnabled;
    if (connection.isTested !== undefined)
      updates.isTested = connection.isTested;
    if (connection.lastTestedAt !== undefined)
      updates.lastTestedAt = connection.lastTestedAt;
    if (connection.lastTestedBy !== undefined)
      updates.lastTestedBy = connection.lastTestedBy;

    // Add enum fields that need type casting
    if (executionFrequency !== null)
      updates.executionFrequency = {
        value: executionFrequency,
        type: "executionFrequency",
      };
    if (connectionStatus !== null)
      updates.connectionStatus = {
        value: connectionStatus,
        type: "connectionStatus",
      };
    if (lastTestResult !== null)
      updates.lastTestResult = {
        value: lastTestResult,
        type: "lastTestResult",
      };

    // Handle special fields
    if (connection.companyIds !== undefined)
      updates.companyIds = connection.companyIds;
    if (connection.connectionDetails !== undefined) {
      updates.connectionDetails = JSON.stringify(connection.connectionDetails);
    }

    if (connection.deletedAt !== undefined) {
      updates.deletedAt = connection.deletedAt;
      updates.deletedBy = userId;
    }

    // Add audit fields
    updates.lastUpdatedBy = userId;
    updates.updatedAt = new Date().toISOString();

    // Check if we have fields to update
    if (Object.keys(updates).length === 0) {
      throw new Response(
        JSON.stringify({ error: "No fields provided for update" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Construct the SET clause parts and parameters dynamically
    const setClauses: string[] = [];
    const params: any[] = [connection.id]; // First param is always the ID for the WHERE clause

    // Process all update fields
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && "type" in value) {
        // This is an enum that needs type casting
        setClauses.push(
          `"${key}" = $${params.length + 1}::golden."${value.type}"`
        );
        params.push(value.value);
      } else if (key === 'connectionDetails') {
        // Handle connectionDetails as JSON
        setClauses.push(`"${key}" = $${params.length + 1}::json`);
        params.push(value);
      } else {
        // Regular field
        setClauses.push(`"${key}" = $${params.length + 1}`);
        params.push(value);
      }
    });

    // Construct the schema-qualified table name
    const schemaTable = Prisma.raw(`"${tenantId}"."integrationConnections"`);

    // Log for debugging
    console.log("SET clauses:", setClauses.join(", "));

    try {
      // Construct and execute the update query
      const setClause = setClauses.join(", ");

      // Build the SQL query string
      const sql = `UPDATE "${tenantId}"."integrationConnections" SET ${setClause} WHERE id = $1`;

      console.log("Executing SQL:", sql);
      console.log("With params:", params);

      // Execute update using $executeRawUnsafe to ensure all parameters are passed correctly
      await prisma.$executeRawUnsafe(sql, ...params);

      // Fetch and return the updated record
      const updatedConnection = await prisma.$queryRaw`
              SELECT * FROM ${schemaTable}
              WHERE id = ${connection.id};
            `;

      return new Response(
        JSON.stringify(
          Array.isArray(updatedConnection)
            ? updatedConnection[0]
            : updatedConnection
        ),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      console.error("SQL Error:", error);

      // Check for type cast errors and provide helpful message
      if (error.message?.includes("does not exist")) {
        throw new Response(
          JSON.stringify({
            error: "Type casting error. Check the enum type names.",
            details: error.message,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error("Server Error:", error);
    // Return the actual error message to help with debugging
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update connection";
    throw new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
