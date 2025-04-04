import { PrismaClient } from "@prisma/client";

export async function createEmpOrgAssignments(
  prisma: PrismaClient,
  assignment: {
    employeeIds: string[];
    removedEmployeeIds: string[];
    companyId: string;
    departmentId: string;
    startDate: string; // Format: YYYY-MM-DD
    createdBy: string;
  }
) {
  if (!assignment?.employeeIds?.length && !assignment.removedEmployeeIds?.length) {
    throw new Error("No assignments provided.");
  }

  // Delete removed employees
  if (assignment.removedEmployeeIds?.length) {
    await prisma.empOrgAssignment.deleteMany({
      where: {
        companyId: assignment.companyId,
        departmentId: assignment.departmentId,
        employeeId: {
          in: assignment.removedEmployeeIds
        }
      }
    });
  }

  // Add new employees
  if (assignment.employeeIds.length) {
    await prisma.empOrgAssignment.createMany({
      data: assignment.employeeIds.map((employee) => ({
        employeeId: employee,
        departmentId: assignment.departmentId,
        positionId: null,
        locationId: null,
        managerId: null,
        startDate: assignment.startDate || new Date(),
        companyId: assignment.companyId,
        createdBy: assignment.createdBy,
        createdAt: new Date().toISOString(),
        lastUpdatedBy: assignment.createdBy,
        updatedAt: new Date().toISOString(),
      }))
    });
  }

  return { message: 'Department Members update successful' };
}

