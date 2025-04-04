CREATE TABLE "golden"."masterListValue" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "masterListId" UUID NOT NULL,
    "value" CHARACTER VARYING NOT NULL,
    "displayName" CHARACTER VARYING,
    "description" TEXT,
    "meaning" TEXT,
    "sequence" INT,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "editable" BOOLEAN NOT NULL DEFAULT TRUE,
    "image" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT FALSE,
    "type" TEXT DEFAULT 'user defined',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "syncToken" TEXT,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "masterListValue_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "masterListValue_masterListId_fkey" FOREIGN KEY ("masterListId") REFERENCES "golden"."masterList"("id"),
    CONSTRAINT "masterListValue_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "masterListValue_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "masterListValue_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."masterListValue" TO "anon";
GRANT INSERT ON TABLE "golden"."masterListValue" TO "anon";
GRANT REFERENCES ON TABLE "golden"."masterListValue" TO "anon";
GRANT SELECT ON TABLE "golden"."masterListValue" TO "anon";
GRANT TRIGGER ON TABLE "golden"."masterListValue" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."masterListValue" TO "anon";
GRANT UPDATE ON TABLE "golden"."masterListValue" TO "anon";

GRANT DELETE ON TABLE "golden"."masterListValue" TO "authenticated";
GRANT INSERT ON TABLE "golden"."masterListValue" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."masterListValue" TO "authenticated";
GRANT SELECT ON TABLE "golden"."masterListValue" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."masterListValue" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."masterListValue" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."masterListValue" TO "authenticated";

GRANT DELETE ON TABLE "golden"."masterListValue" TO "service_role";
GRANT INSERT ON TABLE "golden"."masterListValue" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."masterListValue" TO "service_role";
GRANT SELECT ON TABLE "golden"."masterListValue" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."masterListValue" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."masterListValue" TO "service_role";
GRANT UPDATE ON TABLE "golden"."masterListValue" TO "service_role";
