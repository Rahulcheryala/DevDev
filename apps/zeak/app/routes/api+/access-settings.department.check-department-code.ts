import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  checkDepartmentCodeValidator,
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

  const validation = await validator(checkDepartmentCodeValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { departmentCode } = validation.data;

  const duplicateDeptCode = await getDepartmentByKey(
    client,
    {
      departmentCode,
    },
    false,
  );

  if (duplicateDeptCode?.error) {
    return json(
      null,
      await flash(
        request,
        error(duplicateDeptCode.error, "Failed to check for department code"),
      ),
    );
  }

  return json(
    {
      isDuplicate: !!duplicateDeptCode?.data?.length,
      count: duplicateDeptCode?.data?.length,
    },
    await flash(request, success("Updated successfully")),
  );
}
