import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteLabel, removeLabelValidator } from "~/modules/labelsreports";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error } from "~/utils/result";

export async function action({ request, params }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    delete: "labelsreports",
  });

  const formData = await request.formData();

  const validation = await validator(removeLabelValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { ids } = validation.data;

  const remove = await deleteLabel(client, ids.split(","), userId);

  if (remove.error) {
    return redirect(
      path.to.labelsreportsHome(),
      await flash(request, error(remove.error, "Failed to delete label")),
    );
  }

  return redirect(path.to.labelsreportsHome());
}
