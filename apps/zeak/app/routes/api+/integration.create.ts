import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import { ApplicationName, Prisma, IntegrationType, IntegrationCategory, ConnectionType, AuthType, Status } from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
    // console.log("Request received for integration creation:", request);    
    try {
        const { client, companyId, userId } = await requirePermissions(request, {
            view: "integrations",
            role: "admin",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const integration = await request.json();
        
        // Generate a UUID for sync token if not provided
        const syncToken = integration.syncToken || crypto.randomUUID();
        
        // Log enum values for debugging
        // console.log("Valid ApplicationNames:", Object.values(ApplicationName));
        // console.log("Valid IntegrationTypes:", Object.values(IntegrationType));
        // console.log("Valid IntegrationCategories:", Object.values(IntegrationCategory));
        // console.log("Valid ConnectionTypes:", Object.values(ConnectionType));
        // console.log("Valid AuthTypes:", Object.values(AuthType));
        // console.log("Valid Statuses:", Object.values(Status));
        
        // Log the integration data for debugging
        // console.log("Integration data to be created:", integration);
        // console.log("Using tenant ID:", tenantId);
        
        // Format the company IDs as a PostgreSQL array literal
        const companyIdsArray = integration.companyIds || [companyId];
        // const formattedCompanyIds = Prisma.raw(`ARRAY[${companyIdsArray.map((id: string) => `'${id}'`).join(',')}]::text[]`);
        
        // Format the tags array correctly (or null)
        const tagsArray = integration.tags 
            ? Prisma.raw(`'${JSON.stringify(integration.tags)}'::json`) 
            : null;

        // console.log("Formatted company IDs:", formattedCompanyIds);
        console.log("Formatted tags:", tagsArray);
        
        // First, construct the schema-qualified table name using Prisma.raw
        const schemaTable = Prisma.raw(`"${tenantId}"."integrationsMaster"`);
        
        // Now execute the query with proper parameters
        const result = await prisma.$queryRaw`
            INSERT INTO ${schemaTable} (
                "integrationName",
                "applicationName", 
                "integrationCode",
                "logo",
                "description",
                "isFavorite",
                "integrationType",
                "integrationCategory",
                "connectionType",
                "authType",
                "connectionLimit",
                "status",
                "companyIds",
                "tags",
                "isTested",
                "createdBy",
                "createdAt",
                "syncToken"
            ) VALUES (
                ${integration.integrationName},
                ${integration.applicationName}::golden."applicationName",
                ${integration.integrationCode},
                ${integration.logo || null},
                ${integration.description || null},
                ${integration.isFavorite || false},
                ${integration.integrationType }::golden."integrationType",
                ${integration.integrationCategory}::golden."integrationCategory",
                ${integration.connectionType}::golden."connectionType",
                ${integration.authType}::golden."authType",
                ${integration.connectionLimit || 1},
                ${integration.status}::golden."status",
                ${companyIdsArray},
                ${tagsArray},
                ${integration.isTested || false},
                ${userId},
                ${new Date().toISOString()},
                ${syncToken}
            ) RETURNING *;
        `;
        
        console.log("Integration created successfully:", result);
        
        // Since $queryRaw returns the result directly, we can use it
        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        // Return the actual error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "Failed to create integration";
        throw new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
