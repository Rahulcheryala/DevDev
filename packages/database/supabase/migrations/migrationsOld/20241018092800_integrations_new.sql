CREATE TYPE "integration_type_enum" AS ENUM ('ERP', 'CRM', 'Scheduling', 'Comms');

CREATE TABLE "integrations" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "integrationName" TEXT NOT NULL,
  "integrationType" "integration_type_enum" NOT NULL, -- Enum type for integration types
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "integrationJson" JSONB NOT NULL, -- Stores the Dynamics OAuth session as JSON
  "userId" TEXT NOT NULL, -- userId references user table
  "companyId" TEXT NOT NULL, -- companyId references userToCompany table
  CONSTRAINT "chk_integration_name" CHECK (length("integrationName") > 0), -- Ensure name is not empty
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."user"("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_company FOREIGN KEY ("companyId") REFERENCES public."company"("id") ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE public."DynamicsIntegrationTokenCache" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "integrationId" UUID NOT NULL,
  "tokenCache" JSONB NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT "IntegrationTokenCache_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "fk_integration_id" FOREIGN KEY ("integrationId") REFERENCES public."integrations"("id") ON DELETE CASCADE
);


-- Enable Row-Level Security (RLS) on the integrations table
ALTER TABLE "integrations" ENABLE ROW LEVEL SECURITY;

-- RLS policies for the integrations table


CREATE POLICY "Employees with settings_view can view integrations." ON "integrations"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('settings_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with settings_create can insert intergations" ON "integrations"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('settings_create', "companyId")
  );
  
CREATE POLICY "Employees with settings_update can update integrations." ON "integrations"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('settings_update', "companyId")
  );

CREATE POLICY "Employees with settings_delete can delete integrations." ON "integrations"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('settings_delete', "companyId")
  );

-- Enable Row-Level Security (RLS) on the DynamicsIntegrationTokenCache table
ALTER TABLE public."DynamicsIntegrationTokenCache" ENABLE ROW LEVEL SECURITY;

-- RLS policies for the DynamicsIntegrationTokenCache table (similar pattern can be applied based on requirements)
CREATE POLICY "Employees with settings_view can view DynamicsIntegrationTokenCache." ON public."DynamicsIntegrationTokenCache"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('settings_view', (
      SELECT "companyId"
      FROM public."integrations"
      WHERE "integrations"."id" = public."DynamicsIntegrationTokenCache"."integrationId"
    ))
  );


  -- Grant permissions to anon

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."DynamicsIntegrationTokenCache" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."integrations" TO anon;

-- Grant permissions to service_role

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."DynamicsIntegrationTokenCache" TO service_role;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."integrations" TO service_role;
