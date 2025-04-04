import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { commentValidator } from "~/modules/labelsreports";
import { commentServerService } from "~/modules/labelsreports/labelsreports.comments.server";
import { requirePermissions } from "~/services/auth/auth.server";
import { isValidJson } from "~/utils/helper";
import { assertIsPost } from "~/utils/http";
import { error } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client } = await requirePermissions(request, {
    update: "labelsreports",
  });

  const formData = await request.formData();

  const validation = await validator(commentValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  try {
    const { functionName, args } = validation.data;
    if (!commentServerService || !(commentServerService as any)[functionName]) {
      return error({}, "Method not found");
    }
    const result: any = await (commentServerService as any)[functionName](
      client,
      isValidJson(args) ? JSON.parse(args) : args,
    );

    return json(result);
  } catch (e: any) {
    return error(e, "Failed to perform action");
  }
}
