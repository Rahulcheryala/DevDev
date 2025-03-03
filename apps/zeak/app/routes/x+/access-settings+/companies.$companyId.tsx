import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  type companyValidatorV2,
  updateCompanyValidator,
} from "~/modules/access-settings";
import { CompanyModal } from "~/modules/access-settings/ui/companies";
import { getCompany, updateCompany } from "~/modules/settings";
import { getLocationsList, upsertLocation } from "~/modules/resources";

import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { getCustomFields, setCustomFields } from "~/utils/form";
import { assertIsPost, notFound } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import type z from "zod";
import { validationError, validator } from "@zeak/remix-validated-form";
import { getSupabaseServiceRole } from "~/lib/supabase";
import logger from "~/lib/logger";
import { generateSignedUrl } from "~/modules/shared/shared.server";
import { s3Client } from "~/lib/s3";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    view: "users",
    update: "users",
  });

  const { companyId } = params;
  if (!companyId) throw notFound("Invalid Team Id");

  const company = await getCompany(client, companyId);

  let detail = null;

  if (company?.data) {
    detail = {
      ...company.data,
      logo: company?.data?.logo
        ? await generateSignedUrl(
            s3Client,
            process.env.AWS_BUCKET_NAME as string,
            company.data.logo,
          )
        : null,
    };
  }

  if (company.error) {
    throw redirect(
      path.to.companySettings,
      await flash(
        request,
        error(company.error, "Error loading company details"),
      ),
    );
  }
  return json({
    company: detail,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { userId } = await requirePermissions(request, {
    update: ["settings", "users"],
  });
  const formData = await request.formData();
  const validation = await validator(updateCompanyValidator).validate(formData);
  if (validation.error) {
    return validationError(validation.error);
  }

  try {
    const client = getSupabaseServiceRole();

    const supabaseClient = getSupabaseServiceRole();
    const { id, ...data } = validation.data;

    const locations = await getLocationsList(client, id as string);
    const location = locations?.data?.[0];

    const [companyUpdate, locationUpdate] = await Promise.all([
      updateCompany(supabaseClient, id as string, {
        ...data,
        customFields: setCustomFields(formData),
        updatedBy: userId,
        updatedAt: new Date().toISOString(),
      }),
      // INFO - Location will not be present for company that has been saved via ftue flow.
      !location
        ? null
        : upsertLocation(supabaseClient, {
            ...location,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            countryCode: data.country,
            timezone: data.timezone,
            companyId: id,
            updatedBy: userId,
          }),
    ]);

    if (companyUpdate.error) {
      logger.error(companyUpdate.error);
      throw new Error("Fatal: failed to update company");
    }

    if (location && locationUpdate?.error) {
      logger.error(locationUpdate?.error);
      throw new Error("Fatal: failed to update location");
    }

    return redirect(
      path.to.companySettings,
      await flash(request, success("Updated successfully")),
    );
  } catch (err: any) {
    return redirect(
      path.to.companySettings,
      await flash(
        request,
        error(err, err?.message ?? "Failed to update company"),
      ),
    );
  }
}

export default function EditCompany() {
  const { googleMapsApiKey, company } = useLoaderData<typeof loader>();
  const companyDetails = {
    ...company,
    ...getCustomFields(company?.customFields),
  } as z.infer<typeof companyValidatorV2>;
  return (
    <CompanyModal
      companyDetails={companyDetails}
      googleMapsApiKey={googleMapsApiKey as string}
    />
  );
}
