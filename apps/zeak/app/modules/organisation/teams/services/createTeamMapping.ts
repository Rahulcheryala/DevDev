import type { PrismaClient } from '@prisma/client';

export async function createTeamMapping(
    prisma: PrismaClient,
    assignment: {
        employeeIds: string[];
        removedEmployeeIds: string[];
        companyId: string;
        teamId: string;
        createdBy: string;
    }
) {
    if (!assignment?.employeeIds?.length && !assignment.removedEmployeeIds?.length) {
        throw new Error("No assignments provided.");
    }
    if (assignment.removedEmployeeIds?.length) {
        await prisma.teamUsers.updateMany({
            where: {
                teamId: assignment.teamId,
                userId: { in: assignment.removedEmployeeIds }
            },
            data: {
                isActive: false,
                removedAt: new Date().toISOString(),
                removedBy: assignment.createdBy
            }
        })
    }
    if (assignment.employeeIds.length) {
        await prisma.teamUsers.createMany({
            data: assignment.employeeIds.map(employeeId => ({
                teamId: assignment.teamId,
                userId: employeeId,
                isActive: true,
                role: "Member",
                addedBy: assignment.createdBy,
                addedAt: new Date().toISOString()
            }))
        })
    }
    return { message: 'Members update successful' }
}
