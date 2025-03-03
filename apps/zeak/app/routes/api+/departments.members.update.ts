import type { ActionFunction } from "@remix-run/node";
import { createEmpOrgAssignments } from "../../modules/departments/services";
import { requirePermissions } from "../../services/auth/auth.server";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import { getTenantId } from "../../modules/access-settings";

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
    const requestData = await request.json();
    const data = await createEmpOrgAssignments(prisma, {
      ...requestData,
      companyId,
      createdBy: userId,
      startDate: requestData.startDate || new Date().toISOString(),
    });
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Server Error:", error);
    throw new Response(
      JSON.stringify({ error: "Failed to update users in department" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

