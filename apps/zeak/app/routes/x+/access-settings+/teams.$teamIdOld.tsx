import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost, notFound } from "~/utils/http";
import {
  json,
  redirect,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import {
  getTeam,
  getTeamMembers,
  teamValidator,
  upsertTeam,
} from "~/modules/access-settings";
import { Team } from "~/modules/access-settings/ui";
import { validationError, validator } from "@zeak/remix-validated-form";
import { path } from "~/utils/path";
import { flash } from "~/services/session.server";
import { error, success } from "~/utils/result";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client, companyId } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const { teamId } = params;
  if (!teamId) throw notFound("Invalid Team Id");

  const [team, teamMembers] = await Promise.all([
    getTeam(client, teamId),
    getTeamMembers(client, teamId, companyId),
  ]);

  if (teamMembers.error) {
    throw redirect(
      path.to.teams,
      await flash(
        request,
        error(teamMembers.error, "Error loading team members"),
      ),
    );
  }
  if (team.error) {
    throw redirect(
      path.to.teams,
      await flash(request, error(team.error, "Error loading team")),
    );
  }

  return json({
    count: teamMembers.count ?? 0,
    team: team.data ?? null,
    teamMembers: teamMembers.data ?? [],
  });
}

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

  const { id, name, description, status } = validation.data;

  const team = await upsertTeam(client, {
    id: `${id}`,
    name,
    description,
    status: status!,
    modifiedBy: userId,
    modifiedOn: new Date().toISOString(),
  });

  if (team.error) {
    return redirect(
      path.to.teams,
      await flash(request, error(team.error, "Failed to update")),
    );
  }

  return redirect(
    path.to.teamsEdit(team?.data?.id) + "?tab=users",
    await flash(request, success("Updated successfully")),
  );
}

export default function EditTeam() {
  const { team, count, teamMembers } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const tabs: string[] = ["teamOverview", "users", "settings"];

  return (
    <Team
      currentTab={tab ? tab : tabs[0]}
      tabs={tabs}
      team={team}
      count={count}
      teamMembers={teamMembers}
    ></Team>
  );
}
