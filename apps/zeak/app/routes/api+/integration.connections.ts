import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { getTenantId } from "~/modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "~/utils/prisma";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { client, companyId } = await requirePermissions(request, {
        view: "integrations",
        role: "employee",
    });
    
    const tenant = await getTenantId(client, companyId!);
    const tenantId = tenant.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!);

    // Get the integrationId from the URL query parameters
    const url = new URL(request.url);
    const integrationId = url.searchParams.get("integrationId");

    if (!integrationId) {
      return json({ error: "Integration ID is required" }, { status: 400 });
    }

    // Fetch connections for the specified integration
    const connections = await prisma.integrationConnections.findMany({
      where: {
        integrationId: integrationId,
        deletedAt: null,
      },
      orderBy: {
        connectionName: "asc",
      },
    });

    return json({ connections });
  } catch (error) {
    console.error("Error fetching integration connections:", error);
    return json({ error: "Failed to fetch integration connections" }, { status: 500 });
  }
}