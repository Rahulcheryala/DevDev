import type { LoaderFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import { getPaginatedEmployeeList } from "../../services/common/employee.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const { client, companyId } = await requirePermissions(request, {
      view: "users",
      role: "employee",
    });
    const tenant = await getTenantId(client, companyId);
    const tenantId = tenant?.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!!);
    const data = await getPaginatedEmployeeList(prisma, { companyId })
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
  }
};
