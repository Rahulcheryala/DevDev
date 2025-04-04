import { PrismaClient } from '@prisma/client'
import { DepartmentStatus } from "../../company/types";
import { IDepartmentModel } from "../models/department.model";
import { decodeValue } from "../utils/decode.utils";
import { fetchCustomSchemaPrismaInstance } from '../../../utils/prisma';


export interface DepartmentsQuery {
  id?: string;
  name?: string;
  departmentCode?: string;
  status?: DepartmentStatus; 
  effectiveStartDateFrom?: string;
  effectiveStartDateTo?: string;
  effectiveEndDateFrom?: string;
  effectiveEndDateTo?: string; 
  companyId?: string;
  modifiedOn?: string;
  page?: number;
  limit?: number;
}


export async function getPaginatedDepartmentsList(
  prisma: PrismaClient,
  filters: Partial<DepartmentsQuery>,
  page?: number,
  limit?: number
) {
  // Construct the where clause based on filters
  const where: any = {
    ...filters.id && { id: filters.id },
    ...filters.name && { name: { contains: filters.name, mode: 'insensitive' } },
    ...filters.departmentCode && { departmentCode: { equals: filters.departmentCode, mode: 'insensitive' } },
    ...filters.status && (Array.isArray(filters.status) 
      ? { status: { in: filters.status } }
      : { status: filters.status }
    ),
    ...filters.companyId && { companyId: filters.companyId },
    ...filters.effectiveStartDateFrom && { effectiveStartDate: { gte: filters.effectiveStartDateFrom } },
    ...filters.effectiveStartDateTo && { effectiveStartDate: { lte: filters.effectiveStartDateTo } },
    ...filters.effectiveEndDateFrom && { effectiveEndDate: { gte: filters.effectiveEndDateFrom } },
    ...filters.effectiveEndDateTo && { effectiveEndDate: { lte: filters.effectiveEndDateTo } }
  };

  // Calculate skip and take for pagination
  const skip = page && limit ? (page - 1) * limit : undefined;
  const take = limit;

  try {
    const [data, total] = await Promise.all([
      prisma.departments.findMany({
        where,
        include: {
          departmentUsers: {
            include: {
              employee: true
            }
          },
          supervisorUser: true
        } as never,
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.departments.count({ where })
    ]);

    const publicSchemaPrisma = fetchCustomSchemaPrismaInstance('public');
    const users = await publicSchemaPrisma.user.findMany({
      where: {
        id: {
          in: [...new Set(data.flatMap((dept) => [dept.createdBy, dept.lastUpdatedBy, dept.deletedBy]))].filter((id): id is string => id !== null)
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phno: true,
        avatarUrl: true,
      }
    });

    const userMap = new Map(users.map(user => [user.id, user]));

    // Format the response
    const formattedData = (data as any[]).map((dept) => ({
      ...dept,
      noOfUsers: dept.departmentUsers?.length || 0,
      empOrgAssignment: (dept.departmentUsers || [])?.map((assignment: any) => ({
        ...assignment,
        employeeDetails: assignment.employee ? {
          ...assignment.employee,
          firstName: assignment.employee.firstName ? decodeValue(assignment.employee.firstName as unknown as Uint8Array<ArrayBufferLike>) : null,
          lastName: assignment.employee.lastName ? decodeValue(assignment.employee.lastName as unknown as Uint8Array<ArrayBufferLike>) : null,
          phoneNumber: assignment.employee.phoneNumber ? decodeValue(assignment.employee.phoneNumber as unknown as Uint8Array<ArrayBufferLike>) : null,
          email: assignment.employee.email ? decodeValue(assignment.employee.email as unknown as Uint8Array<ArrayBufferLike>) : null,
        } : null,
      })),
      supervisorUser: dept.supervisorUser ? {
        ...dept.supervisorUser,
        firstName: dept.supervisorUser.firstName ? decodeValue(dept.supervisorUser.firstName as unknown as Uint8Array<ArrayBufferLike>) : null,
        lastName: dept.supervisorUser.lastName ? decodeValue(dept.supervisorUser.lastName as unknown as Uint8Array<ArrayBufferLike>) : null,
        phoneNumber: dept.supervisorUser.phoneNumber ? decodeValue(dept.supervisorUser.phoneNumber as unknown as Uint8Array<ArrayBufferLike>) : null,
        email: dept.supervisorUser.email ? decodeValue(dept.supervisorUser.email as unknown as Uint8Array<ArrayBufferLike>) : null,
      } : null,
      supervisorEmail: dept.supervisorUser?.email ? decodeValue(dept.supervisorUser.email as unknown as Uint8Array<ArrayBufferLike>) : '-',
      createdByUser: userMap.get(dept.createdBy),
      lastUpdatedByUser: userMap.get(dept.lastUpdatedBy),
      deletedByUser: userMap.get(dept.deletedBy),
    }));

    return {
      data: formattedData || [],
      total,
      page: page || 1,
      limit: limit || total,
      totalPages: limit ? Math.ceil(total / limit) : 1
    };
  } catch (error: any) {
    throw new Error(`Error fetching departments: ${error.message}`);
  }
}


