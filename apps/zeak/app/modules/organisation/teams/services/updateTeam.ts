import { PrismaClient } from "@prisma/client";
import type { DepartmentStatus } from "../../company/types";

export async function updateTeam(
    prisma: PrismaClient,
    id: string,
    updates: {
        name: string;
        teamCode?: string;
        description?: string;
        imageUrl?: string;
        status?: DepartmentStatus
        companyId: string
        parentTeamId?: string
        teamLeaderId?: string
        visibility: string
        startDate?: string
        endDate?: string
    }) {
    const data = await prisma.teams.update({
        where: { id },
        data: updates
    });

    return data;
}
