import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireAuthSession } from "~/services/session.server";
import { getSupabase } from "~/lib/supabase";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { id } = params;
    if (!id) {
        return json({ error: "User ID is required" }, { status: 400 })
    }
    const { accessToken, companyId, expiresAt, expiresIn, userId, } =
        await requireAuthSession(request, { verify: false });

    const supabase = getSupabase(accessToken);

    const { data: user, error } = await supabase.from('user').select('*').eq('id', id)

    return json({ user })
}