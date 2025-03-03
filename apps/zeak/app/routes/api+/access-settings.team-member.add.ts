import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  addTeamMemberValidator,
  upsertTeamMember,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";
import type { TeamStatus } from "~/modules/access-settings";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, companyId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(addTeamMemberValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { teamId, userId, status } = validation.data;

  const teamMember = await upsertTeamMember(client, {
    teamId,
    userId,
    employeeId: userId,
    status: status as TeamStatus,
    companyId,
    createdBy: userId,
    createdOn: new Date().toISOString(),
  });

  if (teamMember.error) {
    return json(
      null,
      await flash(
        request,
        error(teamMember.error, "Failed to add team member"),
      ),
    );
  }

  return json(teamMember, await flash(request, success("Team member added")));
}
