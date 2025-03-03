import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost } from "~/utils/http";
import { redirect } from "@remix-run/react";
import type { TeamStatus } from "~/modules/access-settings";
import {
  teamValidator,
  upsertTeam,
  upsertTeamMember,
} from "~/modules/access-settings";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import { flash } from "~/services/session.server";
import { Team } from "~/modules/access-settings/ui";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    create: "users",
  });

  const formData = await request.formData();
  const validation = await validator(teamValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { name, description, companyId, status } = validation.data;

  const team = await upsertTeam(client, {
    name,
    description,
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

  if (team) {
    await upsertTeamMember(client, {
      teamId: team?.data?.id!,
      userId,
      employeeId: userId,
      status: status as TeamStatus,
      companyId,
      createdBy: userId,
      createdOn: new Date().toISOString(),
    });
  }

  return redirect(
    path.to.teamsEdit(team?.data?.id) + "?tab=users",
    await flash(request, success("Created successfully")),
  );
}

export default function NewTeam() {
  const tabs: string[] = ["teamOverview", "users"];

  return (
    <Team currentTab={tabs[0]} tabs={tabs} count={0} teamMembers={[]}></Team>
  );
}
