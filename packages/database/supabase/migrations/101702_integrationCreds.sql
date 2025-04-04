CREATE TABLE "golden"."integrationCreds" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationId" UUID NOT NULL,
    "versionId" UUID NOT NULL,
    "authType" UUID NOT NULL,
    "credentials" JSONB NOT NULL,
    "policy" JSONB,
    "validFrom" TIMESTAMP,
    "validTo" TIMESTAMP,
    "lastUsedAt" TIMESTAMP,
    "tokenCache" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "integrationCreds_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationCreds_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "golden"."integrationConnections"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationCreds_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "golden"."integrationVersions"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationCreds_authType_fkey" FOREIGN KEY ("authType") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationCreds_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationCreds_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationCreds_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."integrationCreds" TO "anon";
GRANT INSERT ON TABLE "golden"."integrationCreds" TO "anon";
GRANT REFERENCES ON TABLE "golden"."integrationCreds" TO "anon";
GRANT SELECT ON TABLE "golden"."integrationCreds" TO "anon";
GRANT TRIGGER ON TABLE "golden"."integrationCreds" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."integrationCreds" TO "anon";
GRANT UPDATE ON TABLE "golden"."integrationCreds" TO "anon";

GRANT DELETE ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT INSERT ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT SELECT ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."integrationCreds" TO "authenticated";

GRANT DELETE ON TABLE "golden"."integrationCreds" TO "service_role";
GRANT INSERT ON TABLE "golden"."integrationCreds" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."integrationCreds" TO "service_role";
GRANT SELECT ON TABLE "golden"."integrationCreds" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."integrationCreds" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."integrationCreds" TO "service_role";
GRANT UPDATE ON TABLE "golden"."integrationCreds" TO "service_role";
