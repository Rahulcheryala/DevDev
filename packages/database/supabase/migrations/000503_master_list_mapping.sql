CREATE TABLE "golden"."masterListMapping" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "company" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "status" BOOLEAN NOT NULL DEFAULT TRUE,
    "module" TEXT,
    "field" TEXT,
    "masterListId" UUID,
    CONSTRAINT "masterListMapping_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "masterListMapping_company_fkey" FOREIGN KEY ("company") REFERENCES "golden"."companyMaster"("id") ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT "masterListMapping_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT "masterListMapping_masterListId_fkey" FOREIGN KEY ("masterListId") REFERENCES "golden"."masterList"("id") ON UPDATE CASCADE ON DELETE SET NULL
);

GRANT DELETE ON TABLE "golden"."masterListMapping" TO "anon";
GRANT INSERT ON TABLE "golden"."masterListMapping" TO "anon";
GRANT REFERENCES ON TABLE "golden"."masterListMapping" TO "anon";
GRANT SELECT ON TABLE "golden"."masterListMapping" TO "anon";
GRANT TRIGGER ON TABLE "golden"."masterListMapping" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."masterListMapping" TO "anon";
GRANT UPDATE ON TABLE "golden"."masterListMapping" TO "anon";

GRANT DELETE ON TABLE "golden"."masterListMapping" TO "authenticated";
GRANT INSERT ON TABLE "golden"."masterListMapping" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."masterListMapping" TO "authenticated";
GRANT SELECT ON TABLE "golden"."masterListMapping" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."masterListMapping" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."masterListMapping" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."masterListMapping" TO "authenticated";

GRANT DELETE ON TABLE "golden"."masterListMapping" TO "service_role";
GRANT INSERT ON TABLE "golden"."masterListMapping" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."masterListMapping" TO "service_role";
GRANT SELECT ON TABLE "golden"."masterListMapping" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."masterListMapping" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."masterListMapping" TO "service_role";
GRANT UPDATE ON TABLE "golden"."masterListMapping" TO "service_role";
