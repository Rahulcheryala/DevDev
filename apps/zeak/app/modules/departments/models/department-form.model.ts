export type DepartmentForm = {
    id?: string;
    logo: string;
    name: string;
    departmentCode: string;
    description: string;
    status: string;
    supervisor: string;
    supervisorEmail: string;
    effectiveStartDate: string;
    effectiveEndDate: string;
    isArchived?: boolean;
};


// Initial states for the context
export const initialDepartmentForm: DepartmentForm = {
    logo: "",
    name: "",
    departmentCode: "",
    description: "",
    status: "",
    supervisor: "",
    supervisorEmail: "",
    effectiveStartDate: "",
    effectiveEndDate: "",
};