import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteTeam } from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost, notFound } from "~/utils/http";
import { path } from "~/utils/path";
import { error } from "~/utils/result";

export async function action({ request, params }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    delete: "users",
  });

  const { teamIds } = params;
  if (!teamIds) throw notFound("teamIds not found");

  const remove = await deleteTeam(client, teamIds.split(","), userId);

  if (remove.error) {
    return redirect(
      path.to.teams,
      await flash(request, error(remove.error, "Failed to delete team")),
    );
  }

  return redirect(path.to.teams);
}
