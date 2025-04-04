import type { LoaderFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const { client, companyId } = await requirePermissions(request, {
      view: "users",
      role: "employee",
    });
    const company = await client.from("companyMaster").select(`name, domainUrl,id`).eq("id", companyId).single();
    return new Response(JSON.stringify(company), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
  }
};
