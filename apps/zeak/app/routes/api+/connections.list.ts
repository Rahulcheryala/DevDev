import { LoaderFunction } from "@remix-run/node";
import { getTenantId } from "~/modules/access-settings";
import { getPaginatedConnectionsList } from "~/modules/integrations/services/getPaginatedConnectionList";
import { requirePermissions } from "~/services/auth/auth.server";
import { fetchCustomSchemaPrismaInstance } from "~/utils/prisma";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const { client, companyId } = await requirePermissions(request, {
      view: "integrations",
      role: "employee",
    });

    const tenant = await getTenantId(client, companyId!);
    const tenantId = tenant.data?.tenantId;
    const prisma = fetchCustomSchemaPrismaInstance(tenantId!);

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    // Extract filter parameters
    const filters: any = {};

    if (searchParams.has('id')) filters.id = searchParams.get('id');
    if (searchParams.has('connectionName')) filters.connectionName = searchParams.get('connectionName');
    if (searchParams.has('connectionStatus')) filters.connectionStatus = searchParams.get('connectionStatus');
    if (searchParams.has('integrationName')) filters.integrationName = searchParams.get('integrationName');
    if (searchParams.has('applicationName')) filters.applicationName = searchParams.get('applicationName');
    if (searchParams.has('connectionDescription')) filters.connectionDescription = searchParams.get('connectionDescription');
    if (searchParams.has('errors')) filters.errors = searchParams.get('errors');
    if (searchParams.has('updatedAt')) filters.updatedAt = searchParams.get('updatedAt');
    if (searchParams.has('lastTestedAt')) filters.lastTestedAt = searchParams.get('lastTestedAt');
    if (searchParams.has('isOnline')) filters.isOnline = searchParams.get('isOnline') === 'true';

    // Add pagination parameters
    const page = searchParams.has('page') ? Number(searchParams.get('page')) : undefined;
    const limit = searchParams.has('limit') ? Number(searchParams.get('limit')) : undefined;

    // Call the service function
    const data = await getPaginatedConnectionsList(prisma, filters, page, limit);
    // const data = await getPaginatedConnectionsList(prisma);

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
