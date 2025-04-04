import type { PrismaClient } from '@prisma/client';

export async function createTeam(
    prisma: PrismaClient,
    teamData: {
        name: string;
        teamCode: string;
        description?: string;
        imageUrl?: string;
        status?: string;
        companyId: string;
        createdBy: string;
        parentTeamId?: string;
        teamLeaderId?: string;
        visibility: string;
        startDate?: string | null;
        endDate?: string | null;
    }
) {
    const data = await prisma.teams.create({
        data: teamData
    });

    return data;
}
