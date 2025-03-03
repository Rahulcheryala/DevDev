import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  changeStatusDepartmentValidator,
  upsertDepartment,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(changeStatusDepartmentValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, status } = validation.data;

  const updateDepartment = await upsertDepartment(client, {
    id,
    status,
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
  });

  if (updateDepartment.error) {
    return json(
      null,
      await flash(request, error(updateDepartment.error, "Failed to update")),
    );
  }

  return json(
    updateDepartment,
    await flash(request, success("Updated successfully")),
  );
}
