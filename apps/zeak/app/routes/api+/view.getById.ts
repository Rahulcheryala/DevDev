import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { getViewById } from "~/modules/view";
import { error } from "~/utils/result";

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, companyId, userId } = await requirePermissions(request, {});

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const viewId = searchParams.get("id") as string;

  if (!viewId) {
    return json(
      { data: null },
      await flash(request, error(request, "ID is required")),
    );
  }

  const { data, error: fetchError } = await getViewById(
    client,
    viewId,
    companyId,
    userId,
  );

  if (fetchError) {
    return json(
      { data: null },
      await flash(
        request,
        error(fetchError, `Failed to get view with ID: ${viewId}`),
      ),
    );
  }

  return json(data);
}
