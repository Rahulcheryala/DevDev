import type { LoaderFunction } from "@remix-run/node";
import { requirePermissions } from "../../services/auth/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const { client } = await requirePermissions(request, {
        view: "company",
        role: "user",
      });
    // Get the company ID from the URL parameter
    const url = new URL(request.url);
    const companyId = url.searchParams.get("id");
    
    if (!companyId) {
      return new Response(
        JSON.stringify({ error: "Company ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Fetch the company details
    const company = await client
      .from("companyMaster")
      .select("name, tenantId")
      .eq("tenantId", companyId)
      .single();
    
    if (company.error) {
      throw new Error(`Failed to fetch company: ${company.error.message}`);
    }
    
    return new Response(
      JSON.stringify(company),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in company fetch endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch company details" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}; 