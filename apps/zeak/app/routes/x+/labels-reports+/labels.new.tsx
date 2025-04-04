import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  DEFAULT_PREVIEW_URL,
  LabelForm,
  labelValidator,
  upsertLabel,
} from "~/modules/labelsreports";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { setCustomFields } from "~/utils/form";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId, companyId } = await requirePermissions(request, {
    create: "labelsreports",
  });

  const formData = await request.formData();
  const validation = await validator(labelValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { name, width, height, size, previewUrl, labelType } = validation.data;

  const createLabel = await upsertLabel(client, {
    name,
    width,
    height,
    size,
    configuration: null,
    createdBy: userId,
    previewUrl: previewUrl || DEFAULT_PREVIEW_URL,
    customFields: setCustomFields(formData),
    companyId,
    labelType,
  });

  if (createLabel.error) {
    return redirect(
      path.to.labelsreportsHome(),
      await flash(request, error(createLabel.error, "Failed to create label.")),
    );
  }

  return redirect(
    path.to.labelsreportsLabelView(createLabel?.data[0]?.id),
    await flash(request, success("Label created.")),
  );
}

export default function NewLabel() {
  const initialValues = {
    name: "" as string,
    width: 0,
    height: 0,
    size: "px",
    configuration: null,
  };

  return <LabelForm initialValues={initialValues} />;
}
