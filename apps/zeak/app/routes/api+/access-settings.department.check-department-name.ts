import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  checkDepartmentNameValidator,
  getDepartmentByKey,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(checkDepartmentNameValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { name } = validation.data;

  const duplicateDeptName = await getDepartmentByKey(
    client,
    {
      name,
    },
    false,
  );

  if (duplicateDeptName?.error) {
    return json(
      null,
      await flash(
        request,
        error(duplicateDeptName.error, "Failed to check for department name"),
      ),
    );
  }

  return json(
    {
      isDuplicate: !!duplicateDeptName?.data?.length,
      count: duplicateDeptName?.data?.length,
    },
    await flash(request, success("Updated successfully")),
  );
}
