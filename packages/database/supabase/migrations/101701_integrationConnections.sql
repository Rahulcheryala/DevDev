CREATE TYPE "golden"."executionFrequency" AS ENUM ('On-Demand', 'Batch', 'Scheduled');
CREATE TYPE "golden"."connectionStatus" AS ENUM ('Online', 'Offline', 'Error', 'Draft');
CREATE TYPE "golden"."environmentType" AS ENUM ('PROD', 'SANDBOX', 'DEV', 'TEST');
CREATE TYPE "golden"."connectionDetailsType" AS (
    "environmentType" "golden"."environmentType",
    "environmentURL" TEXT,
    "maxRetries" INTEGER,
    "timeout" INTEGER,
    "retryDelay" INTEGER
); 

CREATE TABLE "golden"."integrationConnections" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationId" UUID NOT NULL,
    "connectionName" CHARACTER VARYING(150) NOT NULL,
    "connectionCode" CHARACTER VARYING(100) NOT NULL,
    "connectionDescription" TEXT,
    "companyIds" UUID[], -- Array of UUIDs referencing companyMaster TODO(vamsi): not null condition is removed temporarily
    "isEnabled" BOOLEAN NOT NULL DEFAULT FALSE,
    "connectionDetails" JSONB NOT NULL, -- TODO(vamsi): Make it a composite type
    "executionFrequency" "golden"."executionFrequency" NOT NULL,  -- TODO(vamsi): Add master list value instead of enum
    "connectionStatus" "golden"."connectionStatus" NOT NULL,
    "copies" INT DEFAULT 0,
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
    CONSTRAINT "integrationConnections_pkey" PRIMARY KEY ("id"),
    -- CONSTRAINT "integrationConnections_connectionName_key" UNIQUE ("connectionName"),
    CONSTRAINT "integrationConnections_connectionCode_key" UNIQUE ("connectionCode"),
    CONSTRAINT "integrationConnections_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "golden"."integrationsMaster"("id") ON DELETE CASCADE,
    -- CONSTRAINT "integrationConnections_executionFrequency_fkey" FOREIGN KEY ("executionFrequency") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationConnections_lastTestedBy_fkey" FOREIGN KEY ("lastTestedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationConnections_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationConnections_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

-- Create a function to validate companyIds references
CREATE OR REPLACE FUNCTION "golden"."validate_connection_company_ids"()
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

-- Create a function to validate createdBy references
CREATE OR REPLACE FUNCTION "golden"."validate_connection_created_by"()
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

-- Create a trigger to validate companyIds
CREATE TRIGGER "validate_connection_company_ids_trigger"
BEFORE INSERT OR UPDATE ON "golden"."integrationConnections"
FOR EACH ROW
EXECUTE FUNCTION "golden"."validate_connection_company_ids"();

-- Create a trigger to validate createdBy
CREATE TRIGGER "validate_connection_created_by_trigger"
BEFORE INSERT OR UPDATE ON "golden"."integrationConnections"
FOR EACH ROW
EXECUTE FUNCTION "golden"."validate_connection_created_by"();

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationConnections" TO "anon";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationConnections" TO "service_role";

-- Grant permissions for the functions
GRANT EXECUTE ON FUNCTION "golden"."validate_connection_company_ids"() TO "anon";
GRANT EXECUTE ON FUNCTION "golden"."validate_connection_company_ids"() TO "authenticated";
GRANT EXECUTE ON FUNCTION "golden"."validate_connection_company_ids"() TO "service_role";

GRANT EXECUTE ON FUNCTION "golden"."validate_connection_created_by"() TO "anon";
GRANT EXECUTE ON FUNCTION "golden"."validate_connection_created_by"() TO "authenticated";
GRANT EXECUTE ON FUNCTION "golden"."validate_connection_created_by"() TO "service_role";

-- Add comments
COMMENT ON COLUMN "golden"."integrationConnections"."companyIds" IS 'Array of company IDs referencing the companyMaster table in the public schema';
COMMENT ON COLUMN "golden"."integrationConnections"."createdBy" IS 'User ID who created the connection or "System" for system-created connections';