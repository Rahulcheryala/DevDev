import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { deleteView } from "~/modules/view";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { error, success } from "~/utils/result";

export async function action({ request }: LoaderFunctionArgs) {
  const { client, companyId, userId } = await requirePermissions(request, {
    create: "users",
    delete: "users",
  });

  const url = new URL(request.url);
  const viewId = url.searchParams.get("id");

  if (!viewId) {
    return json(
      { data: null, error: "Bad request: view ID is missing" },
      await flash(request, error("Bad request: view ID is missing")),
    );
  }

  const { data, error: deleteError } = await deleteView(
    client,
    companyId,
    userId,
    viewId,
  );

  if (deleteError) {
    return json(
      { data: null, error: deleteError },
      await flash(
        request,
        error(`Failed to delete view with ID ${viewId}: ${deleteError}`),
      ),
    );
  }

  return json(
    { data, error: null },
    await flash(request, success("View deleted successfully")),
  );
}
