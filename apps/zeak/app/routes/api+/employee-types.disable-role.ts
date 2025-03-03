import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  disableRoleValidator,
  upsertEmployeeType,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, companyId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(disableRoleValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, disable } = validation.data;

  const updateLabel = await upsertEmployeeType(client, {
    id,
    disable: disable === "true" ? true : false,
    companyId,
    updatedAt: new Date().toISOString(),
  });

  if (updateLabel.error) {
    return json(
      null,
      await flash(request, error(updateLabel.error, "Failed to update")),
    );
  }

  return json(
    updateLabel,
    await flash(request, success("Updated successfully")),
  );
}
