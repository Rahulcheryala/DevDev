create type "public"."companyStatus" as enum ('Active', 'Inactive');

CREATE TABLE "company" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "taxId" TEXT,
  "companyCode" TEXT,
  "domainUrl" TEXT,
  "primaryLanguage" TEXT,
  "timezone" TEXT,
  "logo" TEXT,
  "addressLine1" TEXT,
  "addressLine2" TEXT,
  "city" TEXT,
  "state" TEXT,
  "postalCode" TEXT,
  "country" TEXT,
  "countryCode" TEXT,
  "phone" TEXT,
  "fax" TEXT,
  "email" TEXT,
  "website" TEXT,
  "status" "companyStatus" NOT NULL DEFAULT 'Active',
  "updatedBy" TEXT,
  "createdBy" TEXT,
  "deletedBy" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "deletedAt" TIMESTAMP WITH TIME ZONE,
  "customFields" JSONB,
  
  CONSTRAINT "company_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "company_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "user"("id"),
  CONSTRAINT "company_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "company_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

ALTER TABLE "company" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with settings_create can create company" ON "company"
FOR INSERT WITH CHECK (has_any_company_permission('settings_create'));

CREATE POLICY "Employees with settings_update can update company" ON "company"
FOR UPDATE USING (has_role('employee') AND has_any_company_permission('settings_update'));

CREATE POLICY "Employees with settings_delete can delete company" ON "company"
FOR DELETE USING (has_any_company_permission('settings_delete'));

CREATE TABLE "userToCompany" (
  "userId" TEXT NOT NULL REFERENCES "user" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  "companyId" TEXT NOT NULL REFERENCES "company" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "userToCompany_pkey" PRIMARY KEY ("userId", "companyId")
);

CREATE POLICY "Authenticated users can view their associated companies" ON "company"
FOR SELECT USING (
  auth.role() = 'authenticated' AND 
  "id" IN (
    SELECT "companyId" 
    FROM "userToCompany" 
    WHERE "userId" = auth.uid()::text
  )
);

ALTER TABLE "userToCompany" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view their userToCompany associations" ON "userToCompany"
FOR SELECT USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

CREATE POLICY "Employees with users_create can create userToCompany" ON "userToCompany"
FOR INSERT WITH CHECK (has_any_company_permission('users_create'));

CREATE POLICY "Employees with users_update can update userToCompany" ON "userToCompany"
FOR UPDATE USING (has_any_company_permission('users_update'));

CREATE POLICY "Employees with users_delete can delete userToCompany" ON "userToCompany"
FOR DELETE USING (has_any_company_permission('users_delete'));