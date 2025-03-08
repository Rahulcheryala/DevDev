CREATE TYPE "golden"."referenceType" AS ENUM ('integration', 'connection');
CREATE TYPE "golden"."eventType" AS ENUM ('connected', 'disconnected', 'error', 'retry');
CREATE TYPE "golden"."eventStatus" AS ENUM ('success', 'failure');

CREATE TABLE "golden"."integrationLogs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "referenceId" UUID NOT NULL,
    "referenceType" "golden"."referenceType" NOT NULL,
    "eventType" "golden"."eventType" NOT NULL,
    "eventTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseCode" INT,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "initiatedBy" UUID,
    "details" TEXT,
    "eventStatus" "golden"."eventStatus" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncToken" UUID NOT NULL,
    CONSTRAINT "integrationLogs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationLogs_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationLogs_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationLogs_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationLogs_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

-- Create a function to validate the referenceId
CREATE OR REPLACE FUNCTION "golden"."validate_reference_id"()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW."referenceType" = 'integration' THEN
    IF NOT EXISTS (SELECT 1 FROM "golden"."integrationsMaster" WHERE "id" = NEW."referenceId") THEN
      RAISE EXCEPTION 'Invalid integrationId reference';
    END IF;
  ELSIF NEW."referenceType" = 'connection' THEN
    IF NOT EXISTS (SELECT 1 FROM "golden"."integrationConnections" WHERE "id" = NEW."referenceId") THEN
      RAISE EXCEPTION 'Invalid connectionId reference';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to validate the referenceId
CREATE TRIGGER "validate_reference_id_trigger"
BEFORE INSERT OR UPDATE ON "golden"."integrationLogs"
FOR EACH ROW
EXECUTE FUNCTION "golden"."validate_reference_id"();

-- Grant permissions
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationLogs" TO "anon";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationLogs" TO "service_role";

-- Grant permissions for the function
GRANT EXECUTE ON FUNCTION "golden"."validate_reference_id"() TO "anon";
GRANT EXECUTE ON FUNCTION "golden"."validate_reference_id"() TO "authenticated";
GRANT EXECUTE ON FUNCTION "golden"."validate_reference_id"() TO "service_role";

-- Add comments to explain the table and columns
COMMENT ON TABLE "golden"."integrationLogs" IS 'Logs for integration connections and events';
COMMENT ON COLUMN "golden"."integrationLogs"."referenceId" IS 'ID of the integration or connection being logged';
COMMENT ON COLUMN "golden"."integrationLogs"."referenceType" IS 'Type of reference (integration or connection)';