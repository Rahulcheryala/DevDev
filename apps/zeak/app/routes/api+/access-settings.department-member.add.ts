import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  addDepartmentMembers,
  addDepartmentMemberValidator,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, companyId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(addDepartmentMemberValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { departmentId, userIds } = validation.data;
  const reqObj = userIds.split(",").map((userId: string) => ({
    departmentId,
    userId: userId,
    companyId,
    createdBy: userId,
    createdAt: new Date().toISOString(),
  }));

  const departmentMember = await addDepartmentMembers(client, reqObj);

  if (departmentMember.error) {
    return json(
      null,
      await flash(
        request,
        error(departmentMember.error, "Failed to add department member"),
      ),
    );
  }

  return json(departmentMember);
}
