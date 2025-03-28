import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getModuleConfig } from "~/modules/shared";
import { requirePermissions } from "~/services/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const authorized = await requirePermissions(request, {});

  return json(await getModuleConfig(authorized.client, "table"));
}
