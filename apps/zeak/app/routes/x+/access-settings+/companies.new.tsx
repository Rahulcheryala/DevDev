import { validationError, validator } from "@zeak/remix-validated-form";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import logger from "~/lib/logger";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { companyValidatorV2 } from "~/modules/access-settings";
import { CompanyModal } from "~/modules/access-settings/ui/companies";
import { insertCompany, seedCompany } from "~/modules/settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { setCustomFields } from "~/utils/form";
import { assertIsPost } from "~/utils/http";
import { insertEmployeeJob, upsertLocation } from "~/modules/resources";
import { getLocalTimeZone } from "@internationalized/date";
import {
  addUserToCompany,
  getPermissionCacheKey,
} from "~/modules/users/users.server";
import { redis } from "@zeak/redis";
import { flash } from "~/services/session.server";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  return json({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { userId } = await requirePermissions(request, {
    update: ["settings", "users"],
  });
  const formData = await request.formData();
  const validation = await validator(companyValidatorV2).validate(formData);
  if (validation.error) {
    return validationError(validation.error);
  }
  try {
    const client = getSupabaseServiceRole();
    const companyInsert = await insertCompany(client, {
      ...validation.data,
      createdBy: userId,
      customFields: setCustomFields(formData),
    });
    if (companyInsert.error) {
      logger.error(companyInsert.error);
      throw new Error("Fatal: failed to insert company");
    }

    let companyId = companyInsert.data?.id;
    if (!companyId) {
      throw new Error("Fatal: failed to get company ID");
    }

    const seed = await seedCompany(client, companyId, userId);
    if (seed.error) {
      logger.error(seed.error);
      throw new Error("Fatal: failed to seed company");
    }

    // TODO: move all of this to transaction.
    // TODO: To be reviewed later. Not sure about location table uses.
    //  for now used it as per previous implementation
    const [locationInsert] = await Promise.all([
      upsertLocation(client, {
        addressLine1: validation.data.addressLine1,
        addressLine2: validation.data.addressLine2,
        city: validation.data.city,
        state: validation.data.state,
        postalCode: validation.data.postalCode,
        countryCode: validation.data.country,
        name: validation.data.name,
        companyId,
        timezone: validation.data.timezone ?? getLocalTimeZone(),
        createdBy: userId,
      }),
    ]);

    if (locationInsert.error) {
      logger.error(locationInsert.error);
      throw new Error("Fatal: failed to insert location");
    }

    const locationId = locationInsert.data?.id;
    if (!locationId) {
      throw new Error("Fatal: failed to get location ID");
    }

    const [userToCompany, job] = await Promise.all([
      addUserToCompany(client, {
        userId,
        companyId,
      }),
      insertEmployeeJob(client, {
        id: userId,
        companyId,
        locationId,
      }),
      redis.del(getPermissionCacheKey(userId)),
    ]);

    if (userToCompany.error) {
      logger.error(userToCompany.error);
      throw new Error("Fatal: failed to add user to company");
    }

    if (job.error) {
      logger.error(job.error);
      throw new Error("Fatal: failed to insert job");
    }

    return redirect(
      path.to.companySettings,
      await flash(request, success("Created successfully")),
    );
  } catch (err: any) {
    logger.error(err);
    return redirect(
      path.to.companySettings,
      await flash(
        request,
        error(err, err?.message ?? "Failed to insert company"),
      ),
    );
  }
}

export default function NewCompany() {
  const { googleMapsApiKey } = useLoaderData<typeof loader>();
  return (
    <CompanyModal
      newCompany={true}
      googleMapsApiKey={googleMapsApiKey as string}
    />
  );
}
