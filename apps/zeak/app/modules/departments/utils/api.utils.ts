import { toast } from "@zeak/react";
import { path } from "../../../utils/path";
import { DepartmentForm } from "../models/department-form.model";
import { IDepartmentModel } from "../models/department.model";
import { DepartmentsQuery } from "../services/getPaginatedDepartmentList";
import { EmployeeUser } from "../../../components/types/employee-user.model";

export const fetchCompany = async (): Promise<{ name: string, id: string }> => {
    let url = `${path.to.api.fetchCompany}?`;
    const response = await fetch(url);
    const records = await response.json();
    return records.data;
}

export const fetchEmployeeList = async (): Promise<EmployeeUser[]> => {
    let url = `${path.to.api.employeeList}?`;
    const response = await fetch(url);
    const records = await response.json();
    return records.data;
}


export const fetchDepartmentList = async (filters?: Partial<DepartmentsQuery>): Promise<IDepartmentModel[]> => {
    let url = `${path.to.api.departmentList}?`;
    for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
            url = url + `${key}=${filters[key as keyof DepartmentsQuery]}&`
        }
    }
    const response = await fetch(url);
    const records = await response.json();
    return records.data;
}


export const updateDepartmentFn = async (id: string, body: Partial<DepartmentForm>): Promise<void> => {
    if (!id) return;
    try {
        delete body.supervisorEmail;
        const response = await fetch(
            path.to.api.departmentEdit,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...body, id }),
            }
        );
        const record = await response.json();
        if (record.error) {
            throw record.error;
        }
        return;
    } catch (error: any) {
        toast.error(error || 'Failed to update department details')
        throw error;
    }
}

export const createDepartmentFn = async (body: Partial<DepartmentForm>): Promise<IDepartmentModel> => {
    try {
        const response = await fetch(
            path.to.api.departmentCreate,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );
        const record = await response.json();
        if (record.error) {
            throw record.error;
        }
        return record;
    } catch (error: any) {
        toast.error(error || 'Failed to create department');
        throw error;
    }
}


export const manageEmployeesToDepartment = async (departmentId: string, departmentUsers: string[], existingUsers: string[] = []) => {
    try {
        const newUsers = departmentUsers.filter(user => !existingUsers.includes(user));
        const removedUsers = existingUsers.filter(user => !departmentUsers.includes(user));
    
        if (!removedUsers.length && !newUsers.length) return;
    
        const response = await fetch(path.to.api.deptEmployeeMap, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                employeeIds: newUsers,
                departmentId: departmentId,
                removedEmployeeIds: removedUsers
            }),
        });
        const record = await response.json();
        if (record.error) {
            throw record.error;
        }
        return record;
    } catch (error: any) {
        toast.error(error || 'Failed to update users in department');
        throw error;
    }
}
