import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { changeStatusCompanyValidator } from "~/modules/access-settings";
import { updateCompany } from "~/modules/settings";
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

  const validation = await validator(changeStatusCompanyValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, status } = validation.data;

  const result = await updateCompany(client, id, {
    id,
    status,
    updatedBy: userId,
    updatedAt: new Date().toISOString(),
  });

  if (result.error) {
    return json(
      null,
      await flash(request, error(result.error, "Failed to update")),
    );
  }

  return json(result, await flash(request, success("Updated successfully")));
}
