import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost } from "~/utils/http";
import { redirect } from "@remix-run/react";
import { roleValidator, upsertEmployeeType } from "~/modules/access-settings";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import { flash } from "~/services/session.server";
import { RolePermission } from "~/modules/access-settings/ui";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client } = await requirePermissions(request, {
    create: "users",
  });

  const formData = await request.formData();
  const validation = await validator(roleValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { name, description, type, effectiveDate, companyId } = validation.data;

  const employeeType = await upsertEmployeeType(client, {
    name,
    description,
    type,
    effectiveDate,
    // createdBy: userId,
    companyId,
    disable: false,
  });

  if (employeeType.error) {
    return redirect(
      path.to.rolesPermissions,
      await flash(request, error(employeeType.error, "Failed to create")),
    );
  }

  return redirect(
    path.to.rolesPermissionsEdit(employeeType?.data?.id) +
      "?tab=generalPermissions",
    await flash(request, success("Created successfully")),
  );
}

export default function NewEmployeeType() {
  const tabs: string[] = [
    "overview",
    "generalPermissions",
    "byApplication",
    "menuItems",
  ];

  return <RolePermission currentTab={tabs[0]} tabs={tabs}></RolePermission>;
}
