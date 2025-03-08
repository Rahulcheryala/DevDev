import { LoaderFunction } from "@remix-run/node";
import { getTenantId } from "~/modules/access-settings";
import { getPaginatedIntegrationsList } from "~/modules/integrations/services/getPaginatedIntegrationList";
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
        if (searchParams.has('integrationName')) filters.integrationName = searchParams.get('integrationName');
        if (searchParams.has('applicationName')) filters.applicationName = searchParams.get('applicationName');
        if (searchParams.has('integrationCode')) filters.integrationCode = searchParams.get('integrationCode');
        if (searchParams.has('status')) filters.status = searchParams.get('status');
        if (searchParams.has('integrationType')) filters.integrationType = searchParams.get('integrationType');
        if (searchParams.has('connectionType')) filters.connectionType = searchParams.get('connectionType');
        if (searchParams.has('integrationCategory')) filters.integrationCategory = searchParams.get('integrationCategory');
        if (searchParams.has('isTested')) filters.isTested = searchParams.get('isTested') === 'true';
        
        // Handle array parameters
        const companyIds = searchParams.getAll('companyIds[]');
        if (companyIds.length > 0) filters.companyIds = companyIds;
        
        const tags = searchParams.getAll('tags[]');
        if (tags.length > 0) filters.tags = tags;
        
        // Add pagination parameters
        const page = searchParams.has('page') ? Number(searchParams.get('page')) : undefined;
        const limit = searchParams.has('limit') ? Number(searchParams.get('limit')) : undefined;
        
        // Call the service function
        const data = await getPaginatedIntegrationsList(prisma, filters, page, limit);
        
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