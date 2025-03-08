-- Create a table to store the mapping between integration patterns and categories
CREATE TABLE "golden"."integrationCategoryMapping" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "applicationNamePattern" "golden"."applicationName" NOT NULL,
    "allowedCategory" "golden"."integrationCategory" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" "golden"."createdByDomain" NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    CONSTRAINT "integrationCategoryMapping_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationCategoryMapping_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id")
);

-- Insert initial mapping data
INSERT INTO "golden"."integrationCategoryMapping" 
    ("id", "applicationNamePattern", "allowedCategory", "description", "createdBy") 
VALUES
    (uuid_generate_v4(), 'Microsoft Dynamics 365', 'ERP', 'Microsoft Dynamics 365 and related products', 'System'),
    (uuid_generate_v4(), 'Office 365', 'Productivity', 'Office 365 and related products', 'System'),
    (uuid_generate_v4(), 'Azure DevOps', 'Project Management', 'Azure DevOps and related products', 'System'),
    (uuid_generate_v4(), 'Salesforce', 'CRM', 'Salesforce and related products', 'System'),
    (uuid_generate_v4(), 'Slack', 'Communication', 'Slack and related communication tools', 'System');

-- Create a function to validate integration category based on application name
CREATE OR REPLACE FUNCTION "golden"."validate_integration_category"()
RETURNS TRIGGER AS $$
DECLARE
    mapping_record RECORD;
    found_match BOOLEAN := FALSE;
BEGIN
    -- Loop through all mapping records
    FOR mapping_record IN SELECT * FROM "golden"."integrationCategoryMapping" LOOP
        -- Check if the application name matches the pattern
        IF NEW."applicationName" = mapping_record."applicationNamePattern" THEN
            found_match := TRUE;
            -- If the category doesn't match the allowed category, raise an exception
            IF NEW."integrationCategory" <> mapping_record."allowedCategory" THEN
                RAISE EXCEPTION 'Integration with application name "%" must have the % category', 
                    mapping_record."applicationNamePattern", mapping_record."allowedCategory";
            END IF;
            -- Exit the loop once a match is found
            EXIT;
        END IF;
    END LOOP;
    
    -- If no match was found, we don't enforce any specific category
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to enforce the validation
CREATE TRIGGER "enforce_integration_category_mapping"
BEFORE INSERT OR UPDATE ON "golden"."integrationsMaster"
FOR EACH ROW
EXECUTE FUNCTION "golden"."validate_integration_category"();

-- Add a comment to explain the trigger
COMMENT ON TRIGGER "enforce_integration_category_mapping" ON "golden"."integrationsMaster" 
IS 'Enforces mapping between application names and their allowed categories using the mapping table';

-- Grant permissions
GRANT SELECT ON TABLE "golden"."integrationCategoryMapping" TO "anon";
GRANT SELECT ON TABLE "golden"."integrationCategoryMapping" TO "authenticated";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "golden"."integrationCategoryMapping" TO "service_role";

GRANT EXECUTE ON FUNCTION "golden"."validate_integration_category"() TO "anon";
GRANT EXECUTE ON FUNCTION "golden"."validate_integration_category"() TO "authenticated";
GRANT EXECUTE ON FUNCTION "golden"."validate_integration_category"() TO "service_role";

-- Add comments to explain the table and columns
COMMENT ON TABLE "golden"."integrationCategoryMapping" IS 'Maps application names to their allowed categories';
COMMENT ON COLUMN "golden"."integrationCategoryMapping"."applicationNamePattern" IS 'Application name to match against';
COMMENT ON COLUMN "golden"."integrationCategoryMapping"."allowedCategory" IS 'Category that must be used for the matching application name';
COMMENT ON COLUMN "golden"."integrationCategoryMapping"."createdBy" IS 'User ID who created the mapping or "System" for system-created mappings'; 