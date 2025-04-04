/** @format */

import { requireAuthSession } from "~/services/session.server";
import { getSupabase } from "~/lib/supabase";
import { getUser } from "~/modules/users/users.server";
import { fetchCustomSchemaPrismaInstance } from "~/utils/prisma";

export const getPrismaInstance = async (request: Request) => {
  const { accessToken, companyId, expiresAt, expiresIn, userId } =
    await requireAuthSession(request, { verify: false });

  const supabase = getSupabase(accessToken);

  const { data: user, error } = await getUser(supabase, userId);
  if (error) {
    throw new Error(error.message);
  }
  const { data: tenant, error: tenantError } = await supabase
    .from("tenantMaster")
    .select("*")
    .eq("createdBy", user?.id)
    .single();
  if (tenantError) {
    throw new Error(tenantError.message);
  }
  return fetchCustomSchemaPrismaInstance(tenant?.id);
};
