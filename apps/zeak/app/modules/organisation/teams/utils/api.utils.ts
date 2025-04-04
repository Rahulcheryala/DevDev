import { toast } from "@zeak/react";
import { EmployeeUser } from "../../../../components/types/employee-user.model";
import { path } from "../../../../utils/path";
import { TeamForm } from "../models/team-form.model";
import { ITeamModel } from "../models/team.model";
import { TeamsQuery } from "../services/getPaginatedTeamList";

export const fetchEmployeeList = async (): Promise<EmployeeUser[]> => {
    let url = `${path.to.api.employeeList}?`;
    const response = await fetch(url);
    const records = await response.json();
    return records.data;
}


export const fetchTeamList = async (filters?: Partial<TeamsQuery>): Promise<ITeamModel[]> => {
    let url = `${path.to.api.teamList}?`;
    for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
            url = url + `${key}=${filters[key as keyof TeamsQuery]}&`
        }
    }
    const response = await fetch(url);
    const records = await response.json();
    return records.data;
}


export const updateTeamFn = async (id: string, body: Partial<TeamForm>): Promise<void> => {
    if (!id) return;
    try {
        delete body.teamLeaderEmail;
        const response = await fetch(
            path.to.api.teamEdit,
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

export const createTeamFn = async (body: Partial<TeamForm>): Promise<ITeamModel> => {
    try {
        const response = await fetch(
            path.to.api.teamCreate,
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


export const manageEmployeesToTeam = async (teamId: string, departmentUsers: string[], existingUsers: string[] = []) => {
    try {
        const newUsers = departmentUsers.filter(user => !existingUsers.includes(user));
        const removedUsers = existingUsers.filter(user => !departmentUsers.includes(user));

        if (!removedUsers.length && !newUsers.length) return;

        const response = await fetch(path.to.api.teamMembersMap, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                employeeIds: newUsers,
                teamId: teamId,
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
