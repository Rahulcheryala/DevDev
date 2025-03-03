import type { LoaderFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import { getTeamsList } from "../../modules/organisation/teams/services";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Authenticate and get company context
    const { client, companyId } = await requirePermissions(request, {
      view: "users",
      role: "employee",
    });

    // Get tenant info and initialize Prisma
    const tenant = await getTenantId(client, companyId);
    const prisma = fetchCustomSchemaPrismaInstance(tenant?.data?.tenantId!);

    // Extract search parameters
    const params = Object.fromEntries(new URL(request.url).searchParams);
    
    // Build filter options
    const filters = {
      companyId,
      id: params.id,
      name: params.name,
      teamCode: params.teamCode,
      status: params.status as "Active" | "Inactive" | undefined,
      visibility: params.visibility as "Private" | "Public" | undefined,
      parentTeamId: params.parentTeamId,
      teamLeaderId: params.teamLeaderId,
      isArchived: params.isArchived === undefined ? undefined : Boolean(params.isArchived),
      createdBy: params.createdBy,
      lastUpdatedBy: params.lastUpdatedBy,
    };

    const checkDuplicacy = params.checkDuplicacy === 'true';
    const teams = await getTeamsList(prisma, filters, checkDuplicacy);

    return new Response(JSON.stringify(teams || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in teams.list:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch teams" }), 
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};
