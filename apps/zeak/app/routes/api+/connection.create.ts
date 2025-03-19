import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import { Prisma, ExecutionFrequency, ConnectionStatus, LastTestResult } from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
    // console.log("Request received for connection creation:", request);
    try {
        const { client, companyId, userId } = await requirePermissions(request, {
            view: "integrations",
            role: "admin",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const connection = await request.json();
        
        // Generate a UUID for sync token if not provided
        const syncToken = connection.syncToken || crypto.randomUUID();
        
        // Log enum values for debugging
        // console.log("Valid ExecutionFrequencies:", Object.values(ExecutionFrequency));
        // console.log("Valid ConnectionStatuses:", Object.values(ConnectionStatus));
        // console.log("Valid LastTestResults:", Object.values(LastTestResult));
        
        // // Log the connection data for debugging
        // console.log("Connection data to be created:", connection);
        // console.log("Using tenant ID:", tenantId);

        console.log("connection data to be created:", connection);
        console.log("Using tenant ID:", tenantId);
        
        // Format the company IDs as appropriate for the schema
        const companyIdsArray = connection.companyIds || [companyId];
        
        // Format the connection details properly as JSON
        const connectionDetails = connection.connectionDetails 
            ? Prisma.raw(`'${JSON.stringify(connection.connectionDetails)}'::json`) 
            : Prisma.raw(`'{}'::json`);
        
        // First, construct the schema-qualified table name using Prisma.raw
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
                ${companyIdsArray},
                ${connection.isEnabled || false},
                ${connectionDetails},
                ${connection.executionFrequency}::golden."executionFrequency",
                ${connection.connectionStatus}::golden."connectionStatus",
                ${connection.isTested || false},
                ${connection.lastTestedAt || null},
                ${connection.lastTestedBy || null},
                ${connection.lastTestResult ? `${connection.lastTestResult}::golden."lastTestResult"` : null},
                ${userId},
                ${new Date().toISOString()},
                ${syncToken}
            ) RETURNING *;
        `;
        
        // Join with the integration data to include it in the response
        // const connectionWithIntegration = await prisma.$queryRaw`
        //     SELECT c.*, i.*
        //     FROM ${schemaTable} c
        //     JOIN "${tenantId}"."integrationsMaster" i ON c."integrationId" = i."id"
        //     WHERE c."syncToken" = ${syncToken}
        // `;
        
        console.log("Created Connection:", result);
        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        // Return the actual error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "Failed to create connection";
        throw new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}; 