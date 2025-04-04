import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { removeFontValidator, deleteFont } from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId } = await requirePermissions(request, {
    delete: "users",
  });

  const formData = await request.formData();

  const validation = await validator(removeFontValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { ids } = validation.data;

  const deleteFontResult = await deleteFont(client, ids, {
    deletedBy: userId,
    deletedOn: new Date().toISOString(),
  });

  if (deleteFontResult.error) {
    return json(
      null,
      await flash(request, error(deleteFontResult.error, "Failed to delete")),
    );
  }

  return json(
    deleteFontResult.data,
    await flash(request, success("Deleted successfully")),
  );
}
