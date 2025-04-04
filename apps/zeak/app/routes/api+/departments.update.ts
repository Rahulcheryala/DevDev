import type { ActionFunction } from "@remix-run/node";
import { updateDepartment } from "../../modules/departments/services/updateDepartment";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const action: ActionFunction = async ({ request }) => {
    console.log("Request received:", request);
    try {
        const { client, userId, companyId } = await requirePermissions(request, {
            view: "users",
            role: "employee",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const dept = await request.json();
        const updatedDepartment: any = {};

        if (typeof dept.name === 'string') {
            updatedDepartment.name = dept.name;
        }
        if (typeof dept.departmentCode === 'string') {
            updatedDepartment.departmentCode = dept.departmentCode;
        }
        if (typeof dept.description === 'string') {
            updatedDepartment.description = dept.description;
        }
        if (typeof dept.status === 'string') {
            updatedDepartment.status = dept.status;
        }
        if (typeof dept.supervisorEmail === 'string') {
            updatedDepartment.supervisorEmail = dept.supervisorEmail;
        }
        if (typeof dept.supervisor === 'string') {
            updatedDepartment.supervisor = dept.supervisor;
        }
        if (dept.effectiveStartDate !== undefined) {
            updatedDepartment.effectiveStartDate = dept.effectiveStartDate || null;
        }
        if (dept.effectiveEndDate !== undefined) {
            updatedDepartment.effectiveEndDate = dept.effectiveEndDate || null;
        }
        if (typeof dept.image === 'string') {
            updatedDepartment.logo = dept.image;
        }
        if (typeof dept.isArchived === 'boolean') {
            updatedDepartment.isArchived = dept.isArchived;
        }

        updatedDepartment.lastUpdatedBy = userId;
        updatedDepartment.updatedAt = new Date().toISOString();

        const data = await updateDepartment(prisma, dept.id, updatedDepartment);
        console.log("Updated Department:", data);
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        throw new Response(
            JSON.stringify({ error: "Failed to update department details" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

