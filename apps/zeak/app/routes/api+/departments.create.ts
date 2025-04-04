import type { ActionFunction } from "@remix-run/node";
import { createDepartment } from "../../modules/departments/services";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const action: ActionFunction = async ({ request }) => {
    console.log("Request received:", request);    
    try {
        const { client, companyId, userId } = await requirePermissions(request, {
            view: "users",
            role: "employee",
        });
        const tenant = await getTenantId(client, companyId);
        const tenantId = tenant?.data?.tenantId;
        const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
        const dept = await request.json();
        const updatedDepartment = {
            name: dept.name,
            departmentCode: dept.departmentCode,
            description: dept.description,
            status: dept.status,
            supervisor: dept.supervisor || null,           
            effectiveStartDate: dept.effectiveStartDate ? new Date(dept.effectiveStartDate).toISOString() : undefined,
            effectiveEndDate: dept.effectiveEndDate ? new Date(dept.effectiveEndDate).toISOString() : undefined,
            // logo: dept.image, 
            companyId: companyId,
            createdBy: userId,
            createdAt: new Date().toISOString(),
            lastUpdatedBy: userId,
            updatedAt: new Date().toISOString(),
        };
        const data = await createDepartment(prisma, updatedDepartment);
        console.log("Created Department:", data);
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Server Error:", error);
        throw new Response(
            JSON.stringify({ error: "Failed to create department" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

