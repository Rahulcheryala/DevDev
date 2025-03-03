import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { updateTeam } from "../../modules/organisation/teams/services/updateTeam";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const action: ActionFunction = async ({ request }) => {
    console.log("Request received:", request);
    try {
        const { client, userId, companyId } = await requirePermissions(request, {
            view: "users",
            role: "employee",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const team = await request.json();
        const updatedTeam: any = {};

        if (typeof team.name === 'string') {
            updatedTeam.name = team.name;
        }
        if (typeof team.teamCode === 'string') {
            updatedTeam.teamCode = team.teamCode;
        }
        if (typeof team.description === 'string') {
            updatedTeam.description = team.description;
        }
        if (typeof team.status === 'string') {
            updatedTeam.status = team.status;
        }
        if (team.startDate !== undefined) {
            updatedTeam.startDate = team.startDate || null;
        }
        if (team.endDate !== undefined) {
            updatedTeam.endDate = team.endDate || null;
        }
        if (typeof team.parentTeamId === 'string') {
            updatedTeam.parentTeamId = team.parentTeamId;
        }
        if (typeof team.teamLeaderId === 'string') {
            updatedTeam.teamLeaderId = team.teamLeaderId;
        }
        if (typeof team.visibility === 'string') {
            updatedTeam.visibility = team.visibility;
        }
        if (typeof team.image === 'string') {
            updatedTeam.imageUrl = team.image;
        }
        if (typeof team.isArchived === 'boolean') {
            updatedTeam.isArchived = team.isArchived;
        }

        updatedTeam.lastUpdatedBy = userId;
        updatedTeam.updatedAt = new Date().toISOString();

        const data = await updateTeam(prisma, team.id, updatedTeam);
        console.log("Updated Department:", data);
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        throw new Response(
            JSON.stringify({ error: "Failed to update department details" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

