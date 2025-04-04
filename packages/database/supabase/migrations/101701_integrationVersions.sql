CREATE TABLE "golden"."integrationVersions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationId" UUID NOT NULL,
    "version" CHARACTER VARYING,
    "environment" UUID NOT NULL,
    "config" JSONB,
    "endpointURL" TEXT NOT NULL,
    "versionStatus" UUID NOT NULL,
    "lastDeploymentAt" TIMESTAMP,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" uuid,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncToken" UUID,
    CONSTRAINT "integrationVersions_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationVersions_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "golden"."integrationConnections"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationVersions_environment_fkey" FOREIGN KEY ("environment") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationVersions_versionStatus_fkey" FOREIGN KEY ("versionStatus") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationVersions_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationVersions_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationVersions_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."integrationVersions" TO "anon";
GRANT INSERT ON TABLE "golden"."integrationVersions" TO "anon";
GRANT REFERENCES ON TABLE "golden"."integrationVersions" TO "anon";
GRANT SELECT ON TABLE "golden"."integrationVersions" TO "anon";
GRANT TRIGGER ON TABLE "golden"."integrationVersions" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."integrationVersions" TO "anon";
GRANT UPDATE ON TABLE "golden"."integrationVersions" TO "anon";

GRANT DELETE ON TABLE "golden"."integrationVersions" TO "authenticated";
GRANT INSERT ON TABLE "golden"."integrationVersions" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."integrationVersions" TO "authenticated";
GRANT SELECT ON TABLE "golden"."integrationVersions" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."integrationVersions" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."integrationVersions" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."integrationVersions" TO "authenticated";

GRANT DELETE ON TABLE "golden"."integrationVersions" TO "service_role";
GRANT INSERT ON TABLE "golden"."integrationVersions" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."integrationVersions" TO "service_role";
GRANT SELECT ON TABLE "golden"."integrationVersions" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."integrationVersions" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."integrationVersions" TO "service_role";
GRANT UPDATE ON TABLE "golden"."integrationVersions" TO "service_role";
