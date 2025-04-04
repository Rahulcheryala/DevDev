import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { DOMAIN_URL, VERCEL_URL } from "~/config/env";
import { CreateEmployeeModal, createEmployeeValidator } from "~/modules/users";
import { createEmployeeAccount } from "~/modules/users/users.server";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, companyId } = await requirePermissions(request, {
    create: "users",
  });

  const validation = await validator(createEmployeeValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { email, firstName, lastName, employeeType, inviteUser, password, enable2FA } = validation.data;

  const url = new URL(request.url);
  const result = await createEmployeeAccount(
    client,
    {
      email,
      firstName,
      lastName,
      employeeType,
      companyId,
      inviteUser,
      MFAEnabled: enable2FA,
      password
    },
    `${VERCEL_URL}/v2/verify?email=${email}`,
  );

  throw redirect(path.to.employeeAccounts, await flash(request, result));
}

const CreateEmployee = () => {
  return <CreateEmployeeModal />;
}

export default CreateEmployee