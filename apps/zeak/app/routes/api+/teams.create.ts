import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { createTeam } from "../../modules/organisation/teams/services/addNewTeam";
import { getTenantId } from "../../modules/access-settings/access-settings.service";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const action: ActionFunction = async ({ request }) => {
    console.log("Request received:", request);    
    try {
        const { client, companyId, userId } = await requirePermissions(request, {
            view: "users",
            role: "employee",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const team = await request.json();
        const updatedTeam = {
            name: team.name,
            teamCode: team.teamCode,
            description: team.description,
            status: team.status,
            startDate: team.startDate ? new Date(team.startDate).toISOString() : null,
            endDate: team.endDate ?  new Date(team.endDate).toISOString() : null,  
            parentTeamId: team.parentTeamId || null,
            teamLeaderId: team.teamLeaderId || null,
            visibility: team.visibility,
            // imageUrl: team.image, 
            companyId: companyId,
            createdBy: userId,
            lastUpdatedBy: userId,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        };
        const data = await createTeam(prisma, updatedTeam);
        console.log("Created Team:", data);
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        throw new Response(
            JSON.stringify({ error: "Failed to create team" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

