CREATE TYPE "golden"."parameterName" AS ENUM ('TOKEN_URL', 'CLIENT_ID', 'CLIENT_SECRET', 'AUTH_CODE', 'REFRESH_TOKEN', 'API_KEY', 'API_SECRET', 'API_KEY_ID', 'API_KEY_SECRET');
CREATE TYPE "golden"."parameterType" AS ENUM ('String', 'Number', 'Boolean', 'Object', 'Array');
CREATE TYPE "golden"."parameterStatus" AS ENUM ('Active', 'Deprecated');

CREATE TABLE "golden"."integrationParameters" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationId" UUID NOT NULL,
    "parameterName" "golden"."parameterName" NOT NULL,
    "parameterValue" TEXT,
    "valueType" "golden"."parameterType" NOT NULL,
    "isSensitive" BOOLEAN NOT NULL DEFAULT FALSE,
    "parameterStatus" "golden"."parameterStatus" NOT NULL,
    "companyId" JSONB NOT NULL,
    --"companyIds" UUID[] NOT NULL, --TODO(vamsi): Change to Array of UUIDs referencing companyMaster
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncToken" UUID NOT NULL,
    CONSTRAINT "integrationParameters_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationParameters_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "golden"."integrationsMaster"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationParameters_parameterName_key" UNIQUE ("parameterName", "integrationId"),
    CONSTRAINT "integrationParameters_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationParameters_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationParameters_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

-- Create a function to validate companyIds references
-- CREATE OR REPLACE FUNCTION "golden"."validate_parameter_company_ids"()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     company_id UUID;
-- BEGIN
--     -- Check if each company ID exists in public.companyMaster
--     FOREACH company_id IN ARRAY NEW."companyIds" LOOP
--         IF NOT EXISTS (SELECT 1 FROM "public"."companyMaster" WHERE "id" = company_id) THEN
--             RAISE EXCEPTION 'Company ID % does not exist in companyMaster table', company_id;
--         END IF;
--     END LOOP;
    
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create a function to validate createdBy references
-- CREATE OR REPLACE FUNCTION "golden"."validate_parameter_created_by"()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Skip validation if createdBy is 'System'
--     IF NEW."createdBy" = 'System' THEN
--         RETURN NEW;
--     END IF;
    
--     -- Check if createdBy exists in auth.users
--     IF NOT EXISTS (SELECT 1 FROM "auth"."users" WHERE "id"::text = NEW."createdBy") THEN
--         RAISE EXCEPTION 'createdBy must reference a valid user ID or be "System"';
--     END IF;
    
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create a trigger to validate companyIds
-- CREATE TRIGGER "validate_parameter_company_ids_trigger"
-- BEFORE INSERT OR UPDATE ON "golden"."integrationParameters"
-- FOR EACH ROW
-- EXECUTE FUNCTION "golden"."validate_parameter_company_ids"();

-- -- Create a trigger to validate createdBy
-- CREATE TRIGGER "validate_parameter_created_by_trigger"
-- BEFORE INSERT OR UPDATE ON "golden"."integrationParameters"
-- FOR EACH ROW
-- EXECUTE FUNCTION "golden"."validate_parameter_created_by"();

-- Grant permissions
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationParameters" TO "anon";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationParameters" TO "authenticated";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationParameters" TO "service_role";

-- Grant permissions for the functions
-- GRANT EXECUTE ON FUNCTION "golden"."validate_parameter_company_ids"() TO "anon";
-- GRANT EXECUTE ON FUNCTION "golden"."validate_parameter_company_ids"() TO "authenticated";
-- GRANT EXECUTE ON FUNCTION "golden"."validate_parameter_company_ids"() TO "service_role";

-- GRANT EXECUTE ON FUNCTION "golden"."validate_parameter_created_by"() TO "anon";
-- GRANT EXECUTE ON FUNCTION "golden"."validate_parameter_created_by"() TO "authenticated";
-- GRANT EXECUTE ON FUNCTION "golden"."validate_parameter_created_by"() TO "service_role";

-- -- Add comments
-- COMMENT ON COLUMN "golden"."integrationParameters"."companyIds" IS 'Array of company IDs referencing the companyMaster table in the public schema';
-- COMMENT ON COLUMN "golden"."integrationParameters"."createdBy" IS 'User ID who created the parameter or "System" for system-created parameters';
