import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireAuthSession } from "~/services/session.server";
import { getSupabase } from "~/lib/supabase";
import { getPrismaInstance } from "~/utils/prisma.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { accessToken, userId } =
        await requireAuthSession(request, { verify: false });

    const supabase = getSupabase(accessToken);

    // Get the actual company records from Supabase
    const { data: companies, error } = await supabase
        .from('companyMaster')
        .select('*')

    if (error) {
        return json({ error: "Failed to fetch companies" }, { status: 500 });
    }

    return json({ companies, error });
}