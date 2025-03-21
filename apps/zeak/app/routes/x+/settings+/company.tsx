import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  VStack,
} from "@zeak/react";
import { validationError, validator } from "@zeak/remix-validated-form";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useRouteData } from "~/hooks";
import type { Company as CompanyType } from "~/modules/settings";
import {
  CompanyForm,
  CompanyLogoForm,
  companyValidator,
  updateCompany,
  updateLogo,
} from "~/modules/settings";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import type { Handle } from "~/utils/handle";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";

export const handle: Handle = {
  breadcrumb: "Company",
  to: path.to.company,
};

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, companyId, userId } = await requirePermissions(request, {
    update: "settings",
  });
  const formData = await request.formData();

  if (formData.get("intent") === "about") {
    const validation = await validator(companyValidator).validate(formData);

    if (validation.error) {
      return validationError(validation.error);
    }

    const update = await updateCompany(client, companyId, {
      ...validation.data,
      updatedBy: userId,
      updatedAt: new Date().toISOString(),
    });
    if (update.error)
      return json(
        {},
        await flash(request, error(update.error, "Failed to update company")),
      );

    return json({}, await flash(request, success("Updated company")));
  }

  if (formData.get("intent") === "logo") {
    const logoPath = formData.get("path");
    if (logoPath === null || typeof logoPath === "string") {
      const logoUpdate = await updateLogo(client, companyId, logoPath);

      if (logoUpdate.error) {
        throw redirect(
          path.to.company,
          await flash(
            request,
            error(logoUpdate.error, "Failed to update logo"),
          ),
        );
      }

      throw redirect(
        path.to.company,
        await flash(
          request,
          success(
            logoPath === null
              ? "Removed logo. Please refresh the page"
              : "Updated logo",
          ),
        ),
      );
    } else {
      throw redirect(
        path.to.company,
        await flash(request, error(null, "Invalid logo path")),
      );
    }
  }

  return null;
}

export default function Company() {
  const routeData = useRouteData<{ company: CompanyType }>(
    path.to.authenticatedRoot,
  );

  const company = routeData?.company;
  if (!company) throw new Error("Company not found");

  const initialValues = {
    name: company.name,
    taxId: company.taxId ?? undefined,
    addressLine1: company.addressLine1 ?? "",
    addressLine2: company.addressLine2 ?? undefined,
    city: company.city ?? "",
    state: company.state ?? "",
    postalCode: company.postalCode ?? "",
    countryCode: company.countryCode ?? undefined,
    phone: company.phone ?? undefined,
    email: company.email ?? undefined,
    website: company.website ?? undefined,
  };

  return (
    <VStack spacing={0} className="p-4 h-full">
      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
          <CardDescription>
            This information will be used on document headers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 w-full">
            {/* @ts-ignore */}
            <CompanyForm company={initialValues} />
            <CompanyLogoForm company={company} />
          </div>
        </CardContent>
      </Card>
    </VStack>
  );
}
