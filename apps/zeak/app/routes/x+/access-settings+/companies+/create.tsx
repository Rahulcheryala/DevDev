import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { validationError, validator } from "@zeak/remix-validated-form";
import logger from "~/lib/logger";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { companyInfoValidator } from "~/modules/organisation/company/utils/company.validators";
import { insertCompany } from "~/modules/settings/settings.service";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { pick } from "~/utils/helper";
import { path } from "~/utils/path";
import { fetchCustomSchemaPrismaInstance } from "~/utils/prisma";
import { success } from "~/utils/result";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());

  const tenantId = formDataObject.tenantId;
  console.log("tenantId :: ", tenantId);

  const company = pick(formDataObject, [
    "name",
    "companyCode",
    "domainUrl",
    "website",
    "status",
    "effectivityStartDate",
    "effectivityEndDate",
    "dnbNumber",
    "bbbNumber",
    "fiscalYearStart",
    "fiscalYearEnd",
  ]);
  company.effectivityStartDate = company.effectivityStartDate
    ? new Date(company.effectivityStartDate)
    : null;
  company.effectivityEndDate = company.effectivityEndDate
    ? new Date(company.effectivityEndDate)
    : null;

  const validation = await validator(companyInfoValidator).validate(company);
  if (validation.error) {
    return validationError(validation.error);
  }

  const { addressInfoList } = pick(formDataObject, ["addressInfoList"]);
  // const validateAddress = await validator(
  //   addressInfoValidator.array()
  // ).validate(JSON.parse(addressInfoList));
  // console.log("validateAddress :: ", validateAddress);
  // if (validateAddress.error) {
  //   return validationError(validateAddress.error);
  // }

  const { userId } = await requirePermissions(request, {
    update: ["settings", "users"],
  });

  const client = getSupabaseServiceRole();
  const companyInsert = await insertCompany(client, {
    ...validation.data,
    createdBy: userId,
    lastUpdatedBy: userId,
    tenantId: tenantId as string,
    primaryContactId: userId,
    // creditRating: "", // TODO: need to update migration
    // taxId: "1234567890",
    // registrationNumber: "1234567890",
    // registeredState: "CA",
    // registeredCountry: "US",
  });
  console.log("companyInsert :: ", companyInsert);
  if (companyInsert.error) {
    console.log("companyInsert.error :: ", companyInsert.error);
    throw new Error("Fatal: failed to insert company");
  }

  let companyId = companyInsert.data?.id;
  // if (!companyId) {
  //   throw new Error("Fatal: failed to get company ID");
  // }

  const prisma = fetchCustomSchemaPrismaInstance(tenantId as string);

  const addresses = JSON.parse(addressInfoList);
  addresses.forEach(async (address: any) => {
    const addressData = await prisma.addressMaster.create({
      data: {
        contextId: 1, // Countrycode for United States TODO: get from country list
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        county: address.county,
        isRestricted: address.isRestricted,
        latitude: address.latitude,
        longitude: address.longitude,
        googlePlaceId: address.googlePlaceId,
        formattedAddress: address.formattedAddress,
        isActive: address.isActive,
        companyId: companyId,
        // isDefault: address.isDefault, // TODO: need to update migration
        // validFrom: address.validFrom,
        // validTo: address.validTo,
        // purpose: address.purpose,
        createdBy: userId,
      },
    });
    logger.info("addressData ::", addressData);
    const contacts = address?.contacts || [];
    contacts.forEach(async (contact: any) => {
      const contactData = await prisma.contactMaster.create({
        data: {
          firstName: Buffer.from(contact?.name || ''),
          firstNameSearch: contact?.name,
          lastName: Buffer.from(contact?.name || ''),
          lastNameSearch: contact?.name,
          email: contact?.email ? Buffer.from(contact?.email) : null,
          emailSearch: contact?.email,
          phone: contact?.phone ? Buffer.from(contact?.phone) : null,
          phoneSearch: contact?.phone,
          createdBy: userId,
        },
      });
      logger.info("contactData ::", contactData);
    });
  });

  return redirect(
    path.to.companySettings,
    await flash(request, success("Created successfully"))
  );
}
