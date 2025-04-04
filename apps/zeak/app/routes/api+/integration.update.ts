import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import {
  ApplicationName,
  Prisma,
  IntegrationType,
  IntegrationCategory,
  ConnectionType,
  AuthType,
  Status,
} from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { client, userId, companyId } = await requirePermissions(request, {
      view: "integrations",
      role: "user",
    });
    const tenant = await getTenantId(client, companyId);
    const tenantId = tenant?.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
    const integration = await request.json();
    
    // Validate required field
    if (!integration.id) {
      throw new Response(
        JSON.stringify({ error: "Integration ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Helper function to convert values with spaces back to enum format
    const safeReplace = (value: any) => {
      if (!value) return "";
      return typeof value === "string" ? value.replace(/_/g, " ") : value;
    };

    // Validate and prepare enum values
    let applicationName = null;
    let integrationType = null;
    let integrationCategory = null;
    let connectionType = null;
    let authType = null;
    let status = null;

    // Only validate fields that are being updated
    if (integration.applicationName !== undefined) {
      if (Object.values(ApplicationName).includes(integration.applicationName)) {
        applicationName = safeReplace(integration.applicationName);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid application name" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (integration.integrationType !== undefined) {
      if (Object.values(IntegrationType).includes(integration.integrationType)) {
        integrationType = safeReplace(integration.integrationType);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid integration type" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (integration.integrationCategory !== undefined) {
      if (Object.values(IntegrationCategory).includes(integration.integrationCategory)) {
        integrationCategory = safeReplace(integration.integrationCategory);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid integration category" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (integration.connectionType !== undefined) {
      if (Object.values(ConnectionType).includes(integration.connectionType)) {
        connectionType = safeReplace(integration.connectionType);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid connection type" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (integration.authType !== undefined) {
      if (Object.values(AuthType).includes(integration.authType)) {
        authType = safeReplace(integration.authType);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid auth type" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (integration.status !== undefined) {
      if (Object.values(Status).includes(integration.status)) {
        status = safeReplace(integration.status);
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid status" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Build update fields object for dynamic SQL generation
    const updates: Record<string, any> = {};
    
    // Add regular fields
    // if (integration.integrationName !== undefined) updates.integrationName = integration.integrationName;
    // if (integration.integrationCode !== undefined) updates.integrationCode = integration.integrationCode;
    if (integration.description !== undefined) updates.description = integration.description;
    if (integration.logo !== undefined) updates.logo = integration.logo;
    if (integration.isFavorite !== undefined) updates.isFavorite = integration.isFavorite;
    if (integration.connectionLimit !== undefined) updates.connectionLimit = integration.connectionLimit;
    if (integration.isTested !== undefined) updates.isTested = integration.isTested;
    if (integration.lastTestedAt !== undefined) updates.lastTestedAt = integration.lastTestedAt;
    if (integration.lastTestedBy !== undefined) updates.lastTestedBy = integration.lastTestedBy;
    if (integration.lastTestResult !== undefined) updates.lastTestResult = integration.lastTestResult;
    if (integration.copies !== undefined) updates.copies = integration.copies;
    
    // Add enum fields that need type casting
    if (applicationName !== null) updates.applicationName = { value: applicationName, type: "applicationName" };
    if (integrationType !== null) updates.integrationType = { value: integrationType, type: "integrationType" };
    if (integrationCategory !== null) updates.integrationCategory = { value: integrationCategory, type: "integrationCategory" };
    if (connectionType !== null) updates.connectionType = { value: connectionType, type: "connectionType" };
    if (authType !== null) updates.authType = { value: authType, type: "authType" };
    if (status !== null) updates.status = { value: status, type: "status" };
    
    // Handle special fields
    if (integration.companyIds !== undefined) updates.companyIds = integration.companyIds;
    // if (integration.tags !== undefined) {
    //   updates.tags = integration.tags ? JSON.stringify(integration.tags) : null;
    // }
    if (integration.deletedAt !== undefined) {
      updates.deletedAt = integration.deletedAt;
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
    const params: any[] = [integration.id]; // First param is always the ID for the WHERE clause
    
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && 'type' in value) {
        // This is an enum that needs type casting
        setClauses.push(`"${key}" = $${params.length + 1}::golden."${value.type}"`);
        params.push(value.value);
      } 
    //   else if (key === 'tags' && value !== null) {
    //     // Tags need special handling for JSON
    //     setClauses.push(`"${key}" = $${params.length + 1}::json`);
    //     params.push(value);
    //   }
      else {
        // Regular field
        setClauses.push(`"${key}" = $${params.length + 1}`);
        params.push(value);
      }
    });

    // Construct the schema-qualified table name
    const schemaTable = Prisma.raw(`"${tenantId}"."integrationsMaster"`);
    
    // Log for debugging
    // console.log("SET clauses:", setClauses.join(", "));

    try {
      // Construct and execute the update query
      const setClause = setClauses.join(", ");
      
      // Build the SQL query string
      const sql = `UPDATE "${tenantId}"."integrationsMaster" SET ${setClause} WHERE id = $1`;
      
      // console.log("Executing SQL:", sql);
      // console.log("With params:", params);
      
      // Execute update using $executeRawUnsafe to ensure all parameters are passed correctly
      await prisma.$executeRawUnsafe(sql, ...params);
      
      // Fetch and return the updated record
      const updatedIntegration = await prisma.$queryRaw`
        SELECT * FROM ${schemaTable}
        WHERE id = ${integration.id};
      `;
      
      return new Response(
        JSON.stringify(Array.isArray(updatedIntegration) ? updatedIntegration[0] : updatedIntegration),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      console.error("SQL Error:", error);
      
      // Check for type cast errors and provide helpful message
      if (error.message?.includes('does not exist')) {
        throw new Response(
          JSON.stringify({ 
            error: "Type casting error. Check the enum type names.",
            details: error.message
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      throw error;
    }
  } catch (error) {
    console.error("Server Error:", error);
    // Return the actual error message to help with debugging
    const errorMessage = error instanceof Error ? error.message : "Failed to update integration";
    throw new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
