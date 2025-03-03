import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  removeTeamMemberValidator,
  deleteTeamMember,
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

  const validation = await validator(removeTeamMemberValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { ids } = validation.data;

  const teamMember = await deleteTeamMember(client, ids.split(","), userId);

  if (teamMember.error) {
    return json(
      null,
      await flash(
        request,
        error(teamMember.error, "Failed to remove team member"),
      ),
    );
  }

  return json(teamMember, await flash(request, success("Team member removed")));
}
