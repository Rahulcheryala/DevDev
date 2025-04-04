import type { ActionFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";
import { getTenantId } from "../../modules/access-settings";
import { fetchCustomSchemaPrismaInstance } from "../../utils/prisma";
import { createTeamMapping } from "../../modules/organisation/teams/services";

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
    const data = await createTeamMapping(prisma, {
      ...requestData,
      companyId,
      createdBy: userId,
    });
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Server Error:", error);
    throw new Response(
      JSON.stringify({ error: "Failed to update users in teams" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

