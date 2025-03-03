export type EmployeeUser = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    email: string | null;
    phoneNumber: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    nationality: string | null;
    maritalStatus: string | null;
    employmentStatus: string;
    hireDate: string;
    terminationDate: string | null;
    employeeTypeId: string;
    companyId: string;
    primaryCompanyId: string | null;
    createdAt: string; // ISO format date
    createdBy: string;
    updatedAt: string | null; // ISO format date
    lastUpdatedBy: string | null;
    deletedAt: string | null; // ISO format date
    deletedBy: string | null;
    syncData: object | null;
};