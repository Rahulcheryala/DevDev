import { validationError, validator } from "@zeak/remix-validated-form";
import { type ActionFunctionArgs, json } from "@remix-run/node";
import {
  departmentValidator,
  logoAsStringSchema,
  upsertDepartment,
} from "~/modules/access-settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error } from "~/utils/result";

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
    departmentCode,
    companyId,
    status,
    logo,
    supervisor,
    effectiveStartDate,
    effectiveEndDate,
  } = validation.data;

  const department = await upsertDepartment(client, {
    name,
    companyId,
    description,
    departmentCode,
    logo,
    supervisor: supervisor || null,
    effectiveStartDate: effectiveStartDate ? effectiveStartDate : null,
    effectiveEndDate: effectiveEndDate ? effectiveEndDate : null,
    status,
    createdBy: userId,
    createdOn: new Date().toISOString(),
  });

  if (department.error) {
    return json(
      {
        department: null,
      },
      await flash(request, error(department.error, "Failed to create")),
    );
  }

  return json({
    department: department?.data,
  });
}
