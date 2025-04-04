import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import {
  Prisma,
  ExecutionFrequency,
  ConnectionStatus,
  LastTestResult,
  ConnectionEnvType,
} from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { client, companyId, userId } = await requirePermissions(request, {
      view: "connections",
      role: "user",
    });
    const tenant = await getTenantId(client, companyId);
    const tenantId = tenant?.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
    const connection = await request.json();

    // Generate a UUID for sync token if not provided
    const syncToken = connection.syncToken || crypto.randomUUID();

    // Helper function to convert values with spaces back to enum format
    const safeReplace = (value: any) => {
      if (!value) return "";
      return typeof value === "string" ? value.replace(/_/g, " ") : value;
    };

    // Validate and prepare enum values
    let environmentType = null;
    let executionFrequency = null;
    let connectionStatus = null;
    let lastTestResult = null;

    // Validate environmentType
    if (
      Object.values(["SANDBOX", "DEV", "TEST", "PROD"]).includes(
        connection.connectionDetails.environmentType
      )
    ) {
      environmentType = safeReplace(
        connection.connectionDetails.environmentType
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid environment type" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate executionFrequency
    if (
      Object.values(ExecutionFrequency).includes(connection.executionFrequency)
    ) {
      if (connection.executionFrequency === "On_Demand") {
        executionFrequency = connection.executionFrequency.replace(/_/g, "-");
      } else {
        executionFrequency = safeReplace(connection.executionFrequency);
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid execution frequency" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate connectionStatus
    if (Object.values(ConnectionStatus).includes(connection.connectionStatus)) {
      connectionStatus = safeReplace(connection.connectionStatus);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid connection status" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate lastTestResult
    if (connection.lastTestResult) {
      if (Object.values(LastTestResult).includes(connection.lastTestResult)) {
        lastTestResult = safeReplace(connection.lastTestResult);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid last test result" }),
          { headers: { "Content-Type": "application/json" }, status: 400 }
        );
      }
    }

    // Format the company IDs as appropriate for the schema
    // const companyIdsArray = connection.companyIds || [companyId];

    // Format the connection details properly as JSON
    const connectionDetails = connection.connectionDetails
      ? Prisma.raw(`'${JSON.stringify(connection.connectionDetails)}'::json`)
      : Prisma.raw(`'{}'::json`);

    // Construct the schema-qualified table name using Prisma.raw
    const schemaTable = Prisma.raw(`"${tenantId}"."integrationConnections"`);

    // Now execute the query with proper parameters
    const result = await prisma.$queryRaw`
            INSERT INTO ${schemaTable} (
                "integrationId",
                "connectionName",
                "connectionCode",
                "connectionDescription",
                "companyIds",
                "isEnabled",
                "connectionDetails",
                "executionFrequency",
                "connectionStatus",
                "isTested",
                "lastTestedAt",
                "lastTestedBy",
                "lastTestResult",
                "createdBy",
                "createdAt",
                "syncToken"
            ) VALUES (
                ${connection.integrationId},
                ${connection.connectionName},
                ${connection.connectionCode},
                ${connection.connectionDescription || null},
                ${connection.companyIds},
                ${connection.isEnabled || false},
                ${connectionDetails},
                ${executionFrequency}::golden."executionFrequency",
                ${connectionStatus}::golden."connectionStatus",
                ${connection.isTested || false},
                ${connection.lastTestedAt || null},
                ${connection.lastTestedBy || null},
                ${lastTestResult ? `${lastTestResult}::golden."lastTestResult"` : null},
                ${userId},
                ${new Date().toISOString()},
                ${syncToken}
            ) RETURNING *;
        `;

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server Error:", error);
    // Return the actual error message to help with debugging
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create connection";
    throw new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
