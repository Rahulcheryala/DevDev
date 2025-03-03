CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create type "public"."roleType" as enum ('Default', 'Custom');

-- CreateTable
CREATE TABLE "public"."employeeType" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."roleType" NOT NULL DEFAULT 'Custom',
    "companyId" UUID NOT NULL,
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "disable" BOOLEAN NOT NULL DEFAULT false,
    "effectiveDate" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT "employeeType_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "employeeType_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "employeeType_companyId_idx" ON "public"."employeeType" ("companyId");

ALTER TABLE "public"."employeeType" ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION has_company_permission(claim text, company UUID) RETURNS "bool"
    LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
    AS $$
    DECLARE
      permission_value text[];
    BEGIN
      -- TODO: (current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->claim
      SELECT jsonb_to_text_array(coalesce(permissions->claim, '[]')) INTO permission_value FROM "public"."user" WHERE id = auth.uid()::text;
      IF permission_value IS NULL THEN
        return false;
      ELSIF '0' = ANY(permission_value::text[]) THEN
        return true;
      ELSIF company = ANY(permission_value::text[]) THEN
        return true;
      ELSE
        return false;
      END IF;
    END;
$$;

CREATE POLICY "Employees with users_update can view/modify employee types" ON "public"."employeeType" FOR ALL USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
);

-- CREATE OR REPLACE VIEW "companies" AS
--   SELECT DISTINCT
--     "cm"."id",
--     "cm"."name",
--     "cm"."description",
--     "cm"."companyCode",
--     "cm"."industry",
--     "cm"."companyType",
--     "cm"."status",
--     "cm"."isActive",
--     "cm"."deletedAt",
--     "cu"."departmentId",
--     "cu"."roleInDepartment",
--     "cu"."startDate",
--     "cu"."endDate",
--     "cu"."userId",
--     "cm"."domainUrl",
--     "et"."name" AS "employeeType"
--       FROM "public"."companyUsers" "cu"
--     INNER JOIN "public"."companyMaster" "cm"
--       ON "cm"."id" = "cu"."companyId"
--     INNER JOIN "golden"."employeeMaster" "em"
--       ON "em"."id" = "cu"."userId" AND "em"."companyId" = "cu"."companyId"
--     INNER JOIN "public"."employeeType" "et"
--       ON "et"."id" = "em"."employeeTypeId";