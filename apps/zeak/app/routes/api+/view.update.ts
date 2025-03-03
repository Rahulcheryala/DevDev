import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  viewValidator,
  updateViewColumns,
  upsertViewShare,
  deleteSharedMemberFromViewShare,
} from "~/modules/view";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId, companyId } = await requirePermissions(request, {
    update: "labelsreports",
  });

  const formData = await request.formData();
  formData.append("companyId", companyId);

  const validation = await validator(viewValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, name, params, tableConf, privacy, entity, sharedWith } =
    validation.data;
  if (!id) {
    return json(
      { data: null, error: "ID is required for updating" },
      await flash(
        request,
        error("ID is required for updating", "Failed to update"),
      ),
    );
  }

  const updates: { [key: string]: any } = {
    ...(name && { name }),
    ...(entity && { entity }),
    ...(privacy && { privacy }),
    ...(params && { params: JSON.parse(params) }),
    ...(tableConf && { tableConf: JSON.parse(tableConf) }),
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
  };

  const updateView = await updateViewColumns(
    client,
    id,
    updates,
    companyId,
    userId,
  );

  if (updateView.error) {
    return json(
      { data: null, error: "Failed to update" },
      await flash(request, error(updateView.error, "Failed to update")),
    );
  }

  if (sharedWith && Array.isArray(sharedWith)) {
    await deleteSharedMemberFromViewShare(client, id, userId);

    for (const sharedUserId of sharedWith) {
      await upsertViewShare(client, {
        viewId: id,
        sharedWith: sharedUserId,
        sharedBy: userId,
        sharedOn: new Date().toISOString(),
        createdBy: userId,
      });
    }
  }

  return json(
    { data: updateView.data, error: null },
    await flash(request, success("Shareable view updated")),
  );
}
