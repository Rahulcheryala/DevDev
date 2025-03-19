import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const action: ActionFunction = async ({ request }) => {
    console.log("Request received for integration update:", request);
    try {
        const { client, userId, companyId } = await requirePermissions(request, {
            view: "integrations",
            role: "admin",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const integration = await request.json();
        const updatedIntegration: any = {};

        // Process only fields that are provided
        if (typeof integration.integrationName === 'string') {
            updatedIntegration.integrationName = integration.integrationName;
        }
        if (typeof integration.integrationCode === 'string') {
            updatedIntegration.integrationCode = integration.integrationCode;
        }
        if (typeof integration.description === 'string') {
            updatedIntegration.description = integration.description;
        }
        if (typeof integration.logo === 'string') {
            updatedIntegration.logo = integration.logo;
        }
        if (typeof integration.isFavorite === 'boolean') {
            updatedIntegration.isFavorite = integration.isFavorite;
        }
        if (typeof integration.integrationType === 'string') {
            updatedIntegration.integrationType = integration.integrationType;
        }
        if (typeof integration.integrationCategory === 'string') {
            updatedIntegration.integrationCategory = integration.integrationCategory;
        }
        if (typeof integration.connectionType === 'string') {
            updatedIntegration.connectionType = integration.connectionType;
        }
        if (typeof integration.authType === 'string') {
            updatedIntegration.authType = integration.authType;
        }
        if (typeof integration.connectionLimit === 'number') {
            updatedIntegration.connectionLimit = integration.connectionLimit;
        }
        if (typeof integration.status === 'string') {
            updatedIntegration.status = integration.status;
        }
        if (Array.isArray(integration.companyIds)) {
            updatedIntegration.companyIds = integration.companyIds;
        }
        if (integration.tags !== undefined) {
            updatedIntegration.tags = integration.tags;
        }
        if (typeof integration.isTested === 'boolean') {
            updatedIntegration.isTested = integration.isTested;
        }
        if (integration.lastTestedAt !== undefined) {
            updatedIntegration.lastTestedAt = integration.lastTestedAt;
        }
        if (typeof integration.lastTestedBy === 'string') {
            updatedIntegration.lastTestedBy = integration.lastTestedBy;
        }
        if (typeof integration.lastTestResult === 'string') {
            updatedIntegration.lastTestResult = integration.lastTestResult;
        }

        // Add standard audit fields
        updatedIntegration.lastUpdatedBy = userId;
        updatedIntegration.updatedAt = new Date().toISOString();

        // Update the integration in the database
        const data = await prisma.integrationsMaster.update({
            where: { id: integration.id },
            data: updatedIntegration
        });

        console.log("Updated Integration:", data);
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        throw new Response(
            JSON.stringify({ error: "Failed to update integration details" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
