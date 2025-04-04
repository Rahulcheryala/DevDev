import type { LoaderFunction } from "@remix-run/node";
import { getPaginatedDepartmentsList } from "../../modules/departments/services";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const { client, companyId } = await requirePermissions(request, {
      view: "users",
      role: "employee",
    });
    const tenant = await getTenantId(client, companyId!);
    const tenantId = tenant.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!);

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const data = await getPaginatedDepartmentsList(prisma, {
      companyId: companyId!,
      id: searchParams.get('id')!,
      name: searchParams.get('name')!,
      departmentCode: searchParams.get('departmentCode')!,
      page: Number(searchParams.get('page')!),
      limit: Number(searchParams.get('limit')!),
    })
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    throw new Response(
      JSON.stringify({ error: "An unexpected error occurred!!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
