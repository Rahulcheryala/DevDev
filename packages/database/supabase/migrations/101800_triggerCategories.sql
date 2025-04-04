CREATE TABLE "public"."triggerCategories" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "category" TEXT NOT NULL CHECK (char_length("category") <= 100),
    "categoryDesc" TEXT CHECK (char_length("categoryDesc") <= 255),
    "tenantId" UUID NOT NULL,
    "companyId" UUID,
    "scope" CHARACTER VARYING NOT NULL CHECK ("scope" IN ('tenant', 'company')),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logoImage" TEXT,
    "background" TEXT,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "resourceUrl" TEXT,
    "metadata" JSONB DEFAULT '{}'::jsonb,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" UUID,
    "modifiedOn" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "deletedOn" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "triggerCategories_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "triggerCategories_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenantMaster"("id"),
    CONSTRAINT "triggerCategories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id"),
    CONSTRAINT "triggerCategories_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "triggerCategories_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "triggerCategories_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."triggerCategories" TO "anon";
GRANT INSERT ON TABLE "public"."triggerCategories" TO "anon";
GRANT REFERENCES ON TABLE "public"."triggerCategories" TO "anon";
GRANT SELECT ON TABLE "public"."triggerCategories" TO "anon";
GRANT TRIGGER ON TABLE "public"."triggerCategories" TO "anon";
GRANT TRUNCATE ON TABLE "public"."triggerCategories" TO "anon";
GRANT UPDATE ON TABLE "public"."triggerCategories" TO "anon";

GRANT DELETE ON TABLE "public"."triggerCategories" TO "authenticated";
GRANT INSERT ON TABLE "public"."triggerCategories" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."triggerCategories" TO "authenticated";
GRANT SELECT ON TABLE "public"."triggerCategories" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."triggerCategories" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."triggerCategories" TO "authenticated";
GRANT UPDATE ON TABLE "public"."triggerCategories" TO "authenticated";

GRANT DELETE ON TABLE "public"."triggerCategories" TO "service_role";
GRANT INSERT ON TABLE "public"."triggerCategories" TO "service_role";
GRANT REFERENCES ON TABLE "public"."triggerCategories" TO "service_role";
GRANT SELECT ON TABLE "public"."triggerCategories" TO "service_role";
GRANT TRIGGER ON TABLE "public"."triggerCategories" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."triggerCategories" TO "service_role";
GRANT UPDATE ON TABLE "public"."triggerCategories" TO "service_role";

