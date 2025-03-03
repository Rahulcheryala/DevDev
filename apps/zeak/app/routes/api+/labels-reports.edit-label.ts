import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { editLabelValidator, upsertLabel } from "~/modules/labelsreports";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId } = await requirePermissions(request, {
    update: "labelsreports",
  });

  const formData = await request.formData();

  const validation = await validator(editLabelValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const {
    id,
    name,
    width,
    height,
    size,
    configuration,
    previewUrl,
    flashSuccessMsg,
    isFavorite,
    status,
  } = validation.data;

  const updateLabel = await upsertLabel(client, {
    id,
    ...(name && { name }),
    ...(width && { width }),
    ...(height && { height }),
    ...(size && { size }),
    ...(configuration && { configuration }),
    ...(previewUrl && { previewUrl }),
    ...(isFavorite && { isFavorite: isFavorite === "true" }),
    ...(status && { status }),
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
  });

  if (updateLabel.error) {
    return json(
      null,
      await flash(
        request,
        error(updateLabel.error, "Failed to update label detail."),
      ),
    );
  }

  return json(
    updateLabel,
    await flash(request, success(flashSuccessMsg || "Label updated")),
  );
}
