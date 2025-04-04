import { PrismaClient } from "@prisma/client";

export async function deleteTeam(
    prisma: PrismaClient,
    id: string,
    deletedBy: string
) {
    const data = await prisma.teams.update({
        where: {
            id: id
        },
        data: {
            isArchived: true,
            deletedBy: deletedBy,
            deletedAt: new Date().toISOString()
        }
    });

    return data;
} 
