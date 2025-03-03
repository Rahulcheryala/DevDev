CREATE TABLE "golden"."masterList" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" CHARACTER VARYING NOT NULL,
    "code" CHARACTER VARYING,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "inactivatedAt" TIMESTAMP WITH TIME ZONE,
    "inactivatedBy" UUID,
    "purpose" TEXT,
    "metadata" JSONB,
    "syncToken" TEXT,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "masterList_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "masterList_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "masterList_inactivatedBy_fkey" FOREIGN KEY ("inactivatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "masterList_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "masterList_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);


GRANT DELETE ON TABLE "golden"."masterList" TO "anon";
GRANT INSERT ON TABLE "golden"."masterList" TO "anon";
GRANT REFERENCES ON TABLE "golden"."masterList" TO "anon";
GRANT SELECT ON TABLE "golden"."masterList" TO "anon";
GRANT TRIGGER ON TABLE "golden"."masterList" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."masterList" TO "anon";
GRANT UPDATE ON TABLE "golden"."masterList" TO "anon";

GRANT DELETE ON TABLE "golden"."masterList" TO "authenticated";
GRANT INSERT ON TABLE "golden"."masterList" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."masterList" TO "authenticated";
GRANT SELECT ON TABLE "golden"."masterList" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."masterList" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."masterList" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."masterList" TO "authenticated";

GRANT DELETE ON TABLE "golden"."masterList" TO "service_role";
GRANT INSERT ON TABLE "golden"."masterList" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."masterList" TO "service_role";
GRANT SELECT ON TABLE "golden"."masterList" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."masterList" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."masterList" TO "service_role";
GRANT UPDATE ON TABLE "golden"."masterList" TO "service_role";
