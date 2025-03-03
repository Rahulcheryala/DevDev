import { EmployeeUser } from "../../../components/types/employee-user.model";
import { User } from "../../users";

export interface IDepartmentModel {
  id: string;
  name: string;
  departmentCode: string;
  description: string;
  status: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  companyId: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  lastUpdatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  version: number;
  isArchived: boolean;
  syncToken: string | null;
  logo: string | null;
  supervisor: string | null;
  createdOn: string;
  modifiedBy: string | null;
  modifiedOn: string | null;
  deletedOn: string | null;
  supervisorEmail: string | null;
  noOfUsers?: number;
  supervisorUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
  } | null;
  createdByUser: User | null;
  lastUpdatedByUser: User| null;
  deletedByUser:User| null;
  empOrgAssignment: {
    id: string;
    employeeId: string;
    departmentId: string;
    positionId: string | null;
    locationId: string | null;
    managerId: string | null;
    startDate: string;
    endDate: string | null;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    lastUpdatedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    syncData: object | null;
    employeeDetails: EmployeeUser;
  }[];
}