CREATE TABLE "golden"."integrationLogs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationId" UUID NOT NULL,
    "versionId" UUID NOT NULL,
    "eventType" UUID NOT NULL,
    "eventTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseCode" INT,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "initiatedBy" UUID,
    "details" TEXT,
    "status" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "integrationLogs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationLogs_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "golden"."integrationConnections"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationLogs_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "golden"."integrationVersions"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationLogs_eventType_fkey" FOREIGN KEY ("eventType") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationLogs_status_fkey" FOREIGN KEY ("status") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationLogs_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationLogs_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationLogs_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationLogs_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."integrationLogs" TO "anon";
GRANT INSERT ON TABLE "golden"."integrationLogs" TO "anon";
GRANT REFERENCES ON TABLE "golden"."integrationLogs" TO "anon";
GRANT SELECT ON TABLE "golden"."integrationLogs" TO "anon";
GRANT TRIGGER ON TABLE "golden"."integrationLogs" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."integrationLogs" TO "anon";
GRANT UPDATE ON TABLE "golden"."integrationLogs" TO "anon";

GRANT DELETE ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT INSERT ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT SELECT ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."integrationLogs" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."integrationLogs" TO "authenticated";

GRANT DELETE ON TABLE "golden"."integrationLogs" TO "service_role";
GRANT INSERT ON TABLE "golden"."integrationLogs" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."integrationLogs" TO "service_role";
GRANT SELECT ON TABLE "golden"."integrationLogs" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."integrationLogs" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."integrationLogs" TO "service_role";
GRANT UPDATE ON TABLE "golden"."integrationLogs" TO "service_role";
