import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  removeDepartmentMemberValidator,
  deleteDepartmentMembers,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(removeDepartmentMemberValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { departmentId, ids } = validation.data;

  const departmentMember = await deleteDepartmentMembers(
    client,
    ids.split(","),
    departmentId,
    userId,
  );

  if (departmentMember.error) {
    return json(
      null,
      await flash(
        request,
        error(departmentMember.error, "Failed to remove department member"),
      ),
    );
  }

  return json({ success: true });
}
