import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  changeStatusTeamValidator,
  upsertTeam,
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

  const validation = await validator(changeStatusTeamValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, status } = validation.data;

  const updateTeam = await upsertTeam(client, {
    id,
    status,
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
  });

  if (updateTeam.error) {
    return json(
      null,
      await flash(request, error(updateTeam.error, "Failed to update")),
    );
  }

  return json(
    updateTeam,
    await flash(request, success("Updated successfully")),
  );
}
