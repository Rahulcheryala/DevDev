import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { duplicateTeamValidator, upsertTeam } from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    create: "users",
  });

  const formData = await request.formData();

  const validation = await validator(duplicateTeamValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { name, description, companyId, status } = validation.data;

  const team = await upsertTeam(client, {
    name: name + " copy",
    description: description + " copy",
    companyId,
    status: status!,
    createdBy: userId,
  });

  if (team.error) {
    return redirect(
      path.to.teams,
      await flash(request, error(team.error, "Failed to create")),
    );
  }

  return redirect(
    path.to.teams,
    await flash(request, success("Created successfully")),
  );
}
