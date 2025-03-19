import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const action: ActionFunction = async ({ request }) => {
    console.log("Request received for connection update:", request);
    try {
        const { client, userId, companyId } = await requirePermissions(request, {
            view: "integrations",
            role: "admin",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const connection = await request.json();
        const updatedConnection: any = {};

        // Process only fields that are provided
        if (typeof connection.integrationId === 'string') {
            updatedConnection.integrationId = connection.integrationId;
        }
        if (typeof connection.connectionName === 'string') {
            updatedConnection.connectionName = connection.connectionName;
        }
        if (typeof connection.connectionCode === 'string') {
            updatedConnection.connectionCode = connection.connectionCode;
        }
        if (typeof connection.connectionDescription === 'string') {
            updatedConnection.connectionDescription = connection.connectionDescription;
        }
        if (Array.isArray(connection.companyIds)) {
            updatedConnection.companyIds = connection.companyIds;
        }
        if (typeof connection.isEnabled === 'boolean') {
            updatedConnection.isEnabled = connection.isEnabled;
        }
        if (connection.connectionDetails !== undefined) {
            updatedConnection.connectionDetails = connection.connectionDetails;
        }
        if (typeof connection.executionFrequency === 'string') {
            updatedConnection.executionFrequency = connection.executionFrequency;
        }
        if (typeof connection.connectionStatus === 'string') {
            updatedConnection.connectionStatus = connection.connectionStatus;
        }
        if (typeof connection.isTested === 'boolean') {
            updatedConnection.isTested = connection.isTested;
        }
        if (connection.lastTestedAt !== undefined) {
            updatedConnection.lastTestedAt = connection.lastTestedAt;
        }
        if (typeof connection.lastTestedBy === 'string') {
            updatedConnection.lastTestedBy = connection.lastTestedBy;
        }
        if (typeof connection.lastTestResult === 'string') {
            updatedConnection.lastTestResult = connection.lastTestResult;
        }

        // Add standard audit fields
        updatedConnection.lastUpdatedBy = userId;
        updatedConnection.updatedAt = new Date().toISOString();

        // Update the connection in the database
        const data = await prisma.integrationConnections.update({
            where: { id: connection.id },
            data: updatedConnection,
            include: {
                integration: true // Include the parent integration in the response
            }
        });

        console.log("Updated Connection:", data);
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        throw new Response(
            JSON.stringify({ error: "Failed to update connection details" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
