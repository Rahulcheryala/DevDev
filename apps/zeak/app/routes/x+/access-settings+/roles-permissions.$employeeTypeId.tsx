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
  getEmployeeType,
  roleValidator,
  upsertEmployeeType,
} from "~/modules/access-settings";
import { RolePermission } from "~/modules/access-settings/ui";
import { validationError, validator } from "@zeak/remix-validated-form";
import { path } from "~/utils/path";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const { employeeTypeId } = params;
  if (!employeeTypeId) throw notFound("Invalid Employee Type Id");

  const employeeType = await getEmployeeType(client, employeeTypeId);

  return json({ employeeType: employeeType.data ?? null });
}

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

  const { name, description, type, effectiveDate, companyId, id } =
    validation.data;

  await upsertEmployeeType(client, {
    id,
    name,
    description,
    type,
    effectiveDate,
    // createdBy: userId,
    companyId,
    disable: false,
  });

  return redirect(
    path.to.rolesPermissionsEdit(id + "") + "?tab=generalPermissions",
  );
}

export default function EditEmployeeType() {
  const { employeeType } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const tabs: string[] = [
    "overview",
    "generalPermissions",
    "byApplication",
    "menuItems",
  ];

  return (
    <RolePermission
      currentTab={tab ? tab : tabs[0]}
      tabs={tabs}
      employeeType={employeeType}
    ></RolePermission>
  );
}
