import { DepartmentStatus } from "../../company/types";
import { PrismaClient } from "@prisma/client";


export async function updateDepartment(
    prisma: PrismaClient,
    id: string,
    updates: {
        name: string;
        departmentCode: string;
        description?: string;
        logo?: string;
        supervisor?: string;
        status?: DepartmentStatus
        effectiveStartDate?: string;
        effectiveEndDate?: string;
        companyId: string;
        createdBy: string;
    }) {
    const data = await prisma.departments.update({
        where: { id },
        data: updates
    });

    return data;
}
