import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  departmentValidator,
  logoAsStringSchema,
  upsertDepartment,
} from "~/modules/access-settings";
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

  const validation = await validator(
    departmentValidator.merge(logoAsStringSchema),
  ).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const {
    name,
    description,
    companyId,
    status,
    departmentCode,
    supervisor = null,
    logo,
    effectiveStartDate,
    effectiveEndDate,
  } = validation.data;

  const department = await upsertDepartment(client, {
    name: name + " copy",
    description: description + " copy",
    departmentCode: departmentCode + "_copy",
    companyId,
    logo,
    supervisor: ["null", null].includes(supervisor) ? null : supervisor,
    effectiveStartDate: effectiveStartDate ? effectiveStartDate : undefined,
    effectiveEndDate: effectiveEndDate ? effectiveEndDate : undefined,
    status: status!,
    createdBy: userId,
    createdOn: new Date().toISOString(),
  });

  if (department.error) {
    return redirect(
      path.to.departments,
      await flash(request, error(department.error, "Failed to create")),
    );
  }

  return redirect(
    path.to.departments,
    await flash(request, success("Created successfully")),
  );
}
