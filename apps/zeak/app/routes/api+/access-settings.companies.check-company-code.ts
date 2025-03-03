import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { validationError, validator } from "@zeak/remix-validated-form";
import { checkCompanyCodeValidator } from "~/modules/company/access-settings.model";
import { checkCompanyCode } from "~/modules/company/access-settings.service";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(checkCompanyCodeValidator).validate(
    formData
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { companyCode } = validation.data;

  const result = await checkCompanyCode(client, companyCode);

  if (result?.count && result.count > 0) {
    return json(error(null, "Company code already exists"), {
      status: 400,
    });
  }

  return json(result, await flash(request, success("Company code is valid")));
}
