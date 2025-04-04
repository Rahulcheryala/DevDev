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
  // console.log("Request received for integration creation:", request);
  try {
    const { client, companyId, userId } = await requirePermissions(request, {
      view: "integrations",
      role: "user",
    });
    const tenant = await getTenantId(client, companyId);
    const tenantId = tenant?.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
    const integration = await request.json();

    // Generate a UUID for sync token if not provided
    const syncToken = integration.syncToken || crypto.randomUUID();

    const safeReplace = (value: any) => {
      if (!value) return "";
      return typeof value === "string" ? value.replace(/_/g, " ") : value;
    };

    // Enum constraints
    let applicationName = "";
    let integrationType = "";
    let integrationCategory = "";
    let connectionType = "";
    let authType = "";
    let status = "";

    if (Object.values(ApplicationName).includes(integration.applicationName)) {
      applicationName = safeReplace(integration.applicationName);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid application name" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (Object.values(IntegrationType).includes(integration.integrationType)) {
      integrationType = safeReplace(integration.integrationType);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid integration type" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (
      Object.values(IntegrationCategory).includes(
        integration.integrationCategory
      )
    ) {
      integrationCategory = safeReplace(integration.integrationCategory);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid integration category" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (Object.values(ConnectionType).includes(integration.connectionType)) {
      connectionType = safeReplace(integration.connectionType);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid connection type" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (Object.values(AuthType).includes(integration.authType)) {
      authType = safeReplace(integration.authType);
    } else {
      return new Response(JSON.stringify({ error: "Invalid auth type" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (Object.values(Status).includes(integration.status)) {
      status = safeReplace(integration.status);
    } else {
      return new Response(JSON.stringify({ error: "Invalid status" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }


    // Format the tags array correctly (or null)
    // const tagsArray = integration.tags
    //     ? Prisma.raw(`'${JSON.stringify(integration.tags)}'::json`)
    //     : null;

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
                "isTested",
                "createdBy",
                "createdAt",
                "syncToken"
            ) VALUES (
                ${integration.integrationName},
                ${applicationName}::golden."applicationName",
                ${integration.integrationCode},
                ${integration.logo || null},
                ${integration.description || null},
                ${integration.isFavorite || false},
                ${integrationType}::golden."integrationType",
                ${integrationCategory}::golden."integrationCategory",
                ${connectionType}::golden."connectionType",
                ${authType}::golden."authType",
                ${integration.connectionLimit || 1},
                ${status}::golden."status",
                ${integration.companyIds},
                ${integration.isTested || false},
                ${userId},
                ${new Date().toISOString()},
                ${syncToken}
            ) RETURNING *;
        `;

    // console.log("Integration created successfully:", result);

    // Since $queryRaw returns the result directly, we can use it
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Server Error:", error);
    // Return the actual error message to help with debugging
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create integration";
    throw new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
