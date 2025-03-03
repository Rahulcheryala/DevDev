import { PrismaClient } from "@prisma/client";
import { decodeValue } from "../../modules/departments/utils/decode.utils";

export async function getPaginatedEmployeeList(
    prisma: PrismaClient,
    filters: Partial<{
        id: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        employmentStatus: string;
        hireDateFrom: string;
        hireDateTo: string;
        companyId: string;
    }>,
    page?: number,
    limit?: number
) {
    const where: any = {
        ...(filters.id && { id: filters.id }),
        ...(filters.firstName && { firstName: { contains: filters.firstName, mode: 'insensitive' } }),
        ...(filters.lastName && { lastName: { contains: filters.lastName, mode: 'insensitive' } }),
        ...(filters.phoneNumber && { phoneNumber: filters.phoneNumber }),
        ...(filters.email && { email: { contains: filters.email, mode: 'insensitive' } }),
        ...(filters.employmentStatus && { employmentStatus: filters.employmentStatus }),
        ...(filters.companyId && { companyId: filters.companyId }),
        ...(filters.hireDateFrom && { hireDate: { gte: new Date(filters.hireDateFrom) } }),
        ...(filters.hireDateTo && { hireDate: { lte: new Date(filters.hireDateTo) } }),
    };

    const [data, total] = await Promise.all([
        prisma.employeeMaster.findMany({
            where,
            skip: page && limit ? (page - 1) * limit : undefined,
            take: limit,
        }),
        prisma.employeeMaster.count({ where })
    ]);

    return {
        data: data.map(item => ({
            ...item,
            firstName: decodeValue(item.firstName),
            lastName: decodeValue(item.lastName),
            phoneNumber: decodeValue(item.phoneNumber),
            email: decodeValue(item.email),
        })),
        total,
        page: page || null,
        limit: limit || null,
        totalPages: limit ? Math.ceil(total / limit) : null,
    };
}
