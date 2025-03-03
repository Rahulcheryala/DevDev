import { DepartmentStatus } from "../../company/types";
import { PrismaClient } from "@prisma/client";

export async function createDepartment(
    prisma: PrismaClient,
    departmentData: {
        name: string;
        departmentCode?: string;
        description?: string;
        logo?: string;
        supervisor: string;
        status?: DepartmentStatus;
        effectiveStartDate?: string;
        effectiveEndDate?: string;
        companyId: string;
        createdBy: string;
    }
) {

    const data = await prisma.departments.create({
        data: {
            ...departmentData,
            departmentCode: departmentData.departmentCode || ''
        }
    });

    return data;
}
