import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { validationError, validator } from "@zeak/remix-validated-form";
import { checkCompanyNameValidator } from "~/modules/company/access-settings.model";
import {
  checkCompanyCode,
  checkCompanyName,
} from "~/modules/company/access-settings.service";
import { getCompanyByCompanyIdAndUserId } from "~/modules/settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId, companyId } = await requirePermissions(request, {
    update: "users",
  });

  const formData = await request.formData();

  const validation = await validator(checkCompanyNameValidator).validate(
    formData
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { companyName } = validation.data;

  const company = await getCompanyByCompanyIdAndUserId(
    client,
    companyId,
    userId
  );

  let index = 1;
  let result = null;
  let generatedCompanyCode = null;
  do {
    generatedCompanyCode = [
      company?.data?.name?.slice(0, 2).toUpperCase(),
      companyName?.slice(0, 2).toUpperCase(),
      index.toString().padStart(2, "0"),
    ].join("");

    result = await checkCompanyCode(client, generatedCompanyCode);

    if (result?.count && result.count > 0) {
      index++;
    }
  } while (result?.count && result.count > 0);

  return json(
    { generatedCompanyCode },
    await flash(request, success("Company code is unique"))
  );
}
