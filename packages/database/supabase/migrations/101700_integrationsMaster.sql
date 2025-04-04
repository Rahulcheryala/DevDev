-- Create enum type for integration types
CREATE TYPE "golden"."applicationName" AS ENUM ('Microsoft Dynamics 365', 'Office 365', 'Azure DevOps', 'Salesforce', 'Slack');
CREATE TYPE "golden"."integrationType" AS ENUM ('System', 'User Defined');
CREATE TYPE "golden"."integrationCategory" AS ENUM ('ERP', 'CRM', 'Project Management', 'Productivity', 'Communication');
CREATE TYPE "golden"."connectionType" AS ENUM ('API', 'SOAP', 'REST');
CREATE TYPE "golden"."authType" AS ENUM ('Basic Auth', 'OAuth2', 'API Key', 'PAT');
CREATE TYPE "golden"."status" AS ENUM ('Active', 'Inactive', 'Blocked', 'Draft', 'Deprecated', 'Error');
CREATE TYPE "golden"."lastTestResult" AS ENUM ('Success', 'Failure', 'Pending');

-- Create a domain for createdBy that can be either a UUID or 'System'
CREATE DOMAIN "golden"."createdByDomain" AS TEXT
CHECK (VALUE ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' OR VALUE = 'System');

-- Create integrationsMaster table
CREATE TABLE "golden"."integrationsMaster" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationName" CHARACTER VARYING(150) NOT NULL,
    "applicationName" "golden"."applicationName" NOT NULL,
    "integrationCode" CHARACTER VARYING(100) NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT FALSE,
    "integrationType" "golden"."integrationType" NOT NULL DEFAULT 'User Defined'::"golden"."integrationType",
    "integrationCategory" "golden"."integrationCategory" NOT NULL,
    "connectionType" "golden"."connectionType" NOT NULL,
    "authType" "golden"."authType" NOT NULL,
    "connectionLimit" INT NOT NULL,
    "copies" INT DEFAULT 0,
    "status" "golden"."status" NOT NULL,
    "companyIds" UUID[], -- Array of UUIDs referencing companyMaster
    "tags" JSONB,
    "isTested" BOOLEAN NOT NULL DEFAULT FALSE,
    "lastTestedAt" TIMESTAMP WITH TIME ZONE,
    "lastTestedBy" UUID,
    "lastTestResult" "golden"."lastTestResult",
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" "golden"."createdByDomain" NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncToken" UUID NOT NULL,
    CONSTRAINT "integrationsMaster_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationsMaster_integrationName_key" UNIQUE ("integrationName"),
    CONSTRAINT "integrationsMaster_integrationCode_key" UNIQUE ("integrationCode"),
    CONSTRAINT "integrationsMaster_lastTestedBy_fkey" FOREIGN KEY ("lastTestedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationsMaster_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationsMaster_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

-- Create a function to validate createdBy references
CREATE OR REPLACE FUNCTION "golden"."validate_created_by"()
RETURNS TRIGGER AS $$
BEGIN
    -- Skip validation if createdBy is 'System'
    IF NEW."createdBy" = 'System' THEN
        RETURN NEW;
    END IF;
    
    -- Check if createdBy exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM "auth"."users" WHERE "id"::text = NEW."createdBy") THEN
        RAISE EXCEPTION 'createdBy must reference a valid user ID or be "System"';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a function to validate companyIds references
CREATE OR REPLACE FUNCTION "golden"."validate_company_ids"()
RETURNS TRIGGER AS $$
DECLARE
    company_id UUID;
BEGIN
    -- Check if each company ID exists in public.companyMaster
    FOREACH company_id IN ARRAY NEW."companyIds" LOOP
        IF NOT EXISTS (SELECT 1 FROM "public"."companyMaster" WHERE "id" = company_id) THEN
            RAISE EXCEPTION 'Company ID % does not exist in companyMaster table', company_id;
        END IF;
    END LOOP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to validate createdBy
CREATE TRIGGER "validate_created_by_trigger"
BEFORE INSERT OR UPDATE ON "golden"."integrationsMaster"
FOR EACH ROW
EXECUTE FUNCTION "golden"."validate_created_by"();

-- Create a trigger to validate companyIds
CREATE TRIGGER "validate_company_ids_trigger"
BEFORE INSERT OR UPDATE ON "golden"."integrationsMaster"
FOR EACH ROW
EXECUTE FUNCTION "golden"."validate_company_ids"();

-- Grant permissions
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationsMaster" TO "anon";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationsMaster" TO "authenticated";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationsMaster" TO "service_role";

-- Grant permissions for the function
GRANT EXECUTE ON FUNCTION "golden"."validate_created_by"() TO "anon";
GRANT EXECUTE ON FUNCTION "golden"."validate_created_by"() TO "authenticated";
GRANT EXECUTE ON FUNCTION "golden"."validate_created_by"() TO "service_role";

GRANT EXECUTE ON FUNCTION "golden"."validate_company_ids"() TO "anon";
GRANT EXECUTE ON FUNCTION "golden"."validate_company_ids"() TO "authenticated";
GRANT EXECUTE ON FUNCTION "golden"."validate_company_ids"() TO "service_role";

COMMENT ON COLUMN "golden"."integrationsMaster"."createdBy" IS 'User ID who created the integration or "System" for system-created integrations';
COMMENT ON COLUMN "golden"."integrationsMaster"."companyIds" IS 'Array of company IDs referencing the companyMaster table in the public schema';