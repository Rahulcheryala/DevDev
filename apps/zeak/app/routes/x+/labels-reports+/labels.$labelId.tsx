import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  LabelForm,
  getLabel,
  labelValidator,
  upsertLabel,
} from "~/modules/labelsreports";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { getCustomFields, setCustomFields } from "~/utils/form";
import { assertIsPost, notFound } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    create: "labelsreports",
  });

  const { labelId } = params;
  if (!labelId) throw notFound("Invalid Label Id");

  const label = await getLabel(client, labelId);
  if (label.error) {
    return redirect(
      path.to.labelsreportsLabelList,
      await flash(request, error(label.error, "Failed to fetch label details")),
    );
  }

  return json({ label: label.data });
}

export async function action({ request, params }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    update: "labelsreports",
  });

  const formData = await request.formData();
  const validation = await validator(labelValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, name, width, height, size, configuration, previewUrl } =
    validation.data;

  const createLabel = await upsertLabel(client, {
    id,
    name,
    width,
    height,
    size,
    configuration,
    previewUrl,
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
    customFields: setCustomFields(formData),
  });

  if (createLabel.error) {
    return redirect(
      path.to.labelsreportsLabelList,
      await flash(request, error(createLabel.error, "Failed to create label.")),
    );
  }

  return redirect(
    path.to.labelsreportsLabelList,
    await flash(request, success("Label created.")),
  );
}

export default function EditAccountCategoryRoute() {
  const { label } = useLoaderData<typeof loader>();

  const initialValues = {
    ...label,
    ...getCustomFields(label?.customFields),
  };

  return <LabelForm key={initialValues.id} initialValues={initialValues} />;
}
