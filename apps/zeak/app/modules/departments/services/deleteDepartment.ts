import { PrismaClient } from "@prisma/client";

export async function deleteDepartment(
    prisma: PrismaClient,
    id: string,
    deletedBy: string
) {
    const data = await prisma.departments.update({
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
