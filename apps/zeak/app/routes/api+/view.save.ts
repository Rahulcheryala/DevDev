import { validator, validationError } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  viewValidator,
  upsertView,
  upsertViewDetails,
  upsertViewShare,
} from "~/modules/view";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { error, success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId, companyId } = await requirePermissions(request, {
    create: "users",
    update: "users",
  });

  const formData = await request.formData();
  formData.append("companyId", companyId);

  const validation = await validator(viewValidator).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { id, name, privacy, entity, params, tableConf, sharedWith } =
    validation.data;

  let viewResult;
  if (id) {
    viewResult = await upsertView(client, {
      id,
      ...(name && { name }),
      ...(entity && { entity }),
      ...(privacy && { privacy }),
      companyId,
      modifiedBy: userId,
      modifiedOn: new Date().toISOString(),
    });

    if (viewResult.error) {
      return json(
        { data: null, error: "Failed to update" },
        await flash(request, error(viewResult.error, "Failed to update")),
      );
    }
  } else {
    viewResult = await upsertView(client, {
      ...(name && { name }),
      ...(entity && { entity }),
      ...(privacy && { privacy }),
      createdBy: userId,
      companyId,
    });

    if (viewResult.error) {
      return json(
        { data: null, error: "Failed to create" },
        await flash(request, error(viewResult.error, "Failed to create")),
      );
    }
  }

  // Handle viewDetails creation/update
  if (viewResult.data) {
    for (const view of viewResult.data) {
      if (view.id) {
        const viewId = view.id;

        // Upsert viewDetails
        const viewDetailResult = await upsertViewDetails(client, {
          viewId,
          ...(params && { params: JSON.parse(params) }),
          ...(tableConf && { tableConf: JSON.parse(tableConf) }),
          createdBy: userId,
        });

        if (viewDetailResult.error) {
          return json(
            { data: null, error: "Failed to create or update view details" },
            await flash(
              request,
              error(
                viewDetailResult.error,
                "Failed to create or update view details",
              ),
            ),
          );
        }

        // Upsert viewShare for each user in sharedWith
        if (sharedWith && sharedWith.length > 0) {
          for (const sharedUserId of sharedWith) {
            const viewShareResult = await upsertViewShare(client, {
              viewId,
              sharedWith: sharedUserId,
              sharedBy: userId,
              sharedOn: new Date().toISOString(),
              createdBy: userId,
            });

            if (viewShareResult.error) {
              return json(
                { data: null, error: "Failed to share view" },
                await flash(
                  request,
                  error(viewShareResult.error, "Failed to share view"),
                ),
              );
            }
          }
        }
      }
    }
  }

  return json(
    { data: viewResult.data, error: null },
    await flash(request, success("Shareable view created")),
  );
}
