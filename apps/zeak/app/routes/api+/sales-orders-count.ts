import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { requireAuthSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = (await requireAuthSession(request)).userId;
  const supabase = getSupabaseServiceRole();
  const url = new URL(request.url);
  const integrationId = url.searchParams.get("integrationId");

  if (!integrationId) {
    return json({ count: 0 });
  }

  try {
    const { count, error } = await supabase
      .from("SalesOrders")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return json({ count: count || 0 });
  } catch (error) {
    console.error("Error fetching sales orders count:", error);
    return json({ count: 0 });
  }
};
