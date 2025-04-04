import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { deleteCompany } from "~/modules/access-settings/access-settings.service";
import { flash } from "~/services/session.server";
import { assertIsPost, notFound } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";

export async function action({ request, params }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    delete: "users",
  });

  const { companyIds } = params;
  if (!companyIds) throw notFound("companyId not found");

  const remove = await deleteCompany(client, companyIds.split(","), userId);

  if (remove.error) {
    return redirect(
      path.to.companySettings,
      await flash(request, error(remove.error, "Failed to delete company"))
    );
  }

  return redirect(
    path.to.companySettings,
    await flash(request, success("Company deleted successfully"))
  );
}
