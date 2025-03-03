import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { getViews } from "~/modules/view";
import { error } from "~/utils/result";

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId, userId } = await requirePermissions(request, {});

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const table = searchParams.get("table") as string;
  const viewType = searchParams.get("viewType") as string;

  if (!table || table === "undefined") {
    return json(
      { data: null },
      await flash(request, error(request, "Bad request for next sequence")),
    );
  }

  try {
    let views = await getViews(client, companyId, userId, table, viewType);
    return json(views);
  } catch (err) {
    return json(
      { data: null },
      await flash(request, error(err, `Failed to get views for ${table}`)),
    );
  }
}
