import type { Database, Json } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { z } from "zod";
import { sanitize } from "~/utils/supabase";
import { companyStatusMap, type companyValidatorV2 } from "../access-settings";

export async function getCompanies(
  client: SupabaseClient<Database>,
  userId: string,
) {
  const companies = await client
    .from("companyMaster")
    .select("*")
    .eq("primaryContactId", userId)
    .is("deletedAt", null)
    .eq("status", companyStatusMap.ACTIVE)
    .order("name");

  if (companies.error) {
    return companies;
  }

  return {
    data: companies.data,
    error: null,
  };
}

export async function getCompany(
  client: SupabaseClient<Database>,
  companyId: string,
) {
  const company = await client
    .from("companyMaster")
    .select("*")
    .eq("id", companyId)
    .single();
  if (company.error) {
    return company;
  }

  return {
    data: company.data,
    error: null,
  };
}

export async function insertTenant(
  client: SupabaseClient<Database>,
  company: { name: string; status: string, createdBy: string },
) {
  return client.from("tenantMaster").insert(company).select("id").single();
}

export async function insertCompany(
  client: SupabaseClient<Database>,
  company: {
    name: string;
    domainUrl: string;
    status?: string;
    tenantId: string;
    createdBy: string;
    lastUpdatedBy: string;
    primaryContactId: string;
    dnbNumber?: string;
    bbbNumber?: string;
    // creditRating?: string; // TODO: need to update migration
    // taxId?: string; // TODO: need to update migration
    // registrationNumber?: string; // TODO: need to update migration
    // registeredState?: string; // TODO: need to update migration
    // registeredCountry?: string; // TODO: need to update migration
  }
) {
  return client.from("companyMaster").insert(company).select("id").single();
}

export async function seedCompany(
  client: SupabaseClient<Database>,
  companyId: string,
  userId: string,
  employeeTypeId: string,
) {
  return client.functions.invoke("seed-company", {
    body: {
      companyId,
      userId,
      employeeTypeId
    },
  });
}

export async function createCompanySchema(
  client: SupabaseClient<Database>,
  tenantId: string,  // Fixed typo
) {
  try {
    const { data, error } = await client.functions.invoke("schema-clone", {
      body: {
        newSchemaName: tenantId,
      },
    });

    console.log('Create company schema error:', error);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Create company schema error:', error);
    throw error;
  }
}


export async function updateCompany(
  client: SupabaseClient<Database>,
  companyId: string,
  company: Partial<z.infer<typeof companyValidatorV2>> & {
    updatedBy: string;
    customFields?: Json;
    updatedAt: string;
  },
) {
  return client.from("companyMaster").update(sanitize(company)).eq("id", companyId);
}

export async function updateLogo(
  client: SupabaseClient<Database>,
  companyId: string,
  logo: string | null,
) {
  return client
    .from("companyMaster")
    .update(
      sanitize({
        logo,
      }),
    )
    .eq("id", companyId);
}

export async function getCompanyByCompanyIdAndUserId(
  client: SupabaseClient<Database>,
  companyId: string,
  userId: string
) {
  const company = await client
    .from("companyMaster")
    .select(
      "id, name, companyCode, domainUrl, deletedAt, primaryContactId, status, tenantId"
    )
    .eq("id", companyId)
    .eq("primaryContactId", userId)
    .single();
  if (company.error) {
    return company;
  }

  return {
    data: company.data,
    error: null,
  };
}
