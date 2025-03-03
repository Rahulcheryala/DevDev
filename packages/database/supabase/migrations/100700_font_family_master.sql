CREATE TABLE "public"."fontFamilyMaster" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "fontFamilyName" CHARACTER VARYING NOT NULL,
    "description" TEXT,
    "companyId" UUID NOT NULL,
    "fontType" BOOLEAN NOT NULL,
    "fontSource" CHARACTER VARYING,
    "licenseType" UUID,
    "licenseExpiryDate" DATE,
    "defaultUsage" UUID,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncData" JSONB,
    CONSTRAINT "fontFamilyMaster_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fontFamilyMaster_licenseType_fkey" FOREIGN KEY ("licenseType") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "fontFamilyMaster_defaultUsage_fkey" FOREIGN KEY ("defaultUsage") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "fontFamilyMaster_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."fontFamilyMaster"("id"),
    CONSTRAINT "fontFamilyMaster_fontFamilyName_unique" UNIQUE ("fontFamilyName"),
    CONSTRAINT "fontFamilyMaster_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "fontFamilyMaster_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES  "auth"."users"("id"),
    CONSTRAINT "fontFamilyMaster_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."fontFamilyMaster" TO "anon";
GRANT INSERT ON TABLE "public"."fontFamilyMaster" TO "anon";
GRANT REFERENCES ON TABLE "public"."fontFamilyMaster" TO "anon";
GRANT SELECT ON TABLE "public"."fontFamilyMaster" TO "anon";
GRANT TRIGGER ON TABLE "public"."fontFamilyMaster" TO "anon";
GRANT TRUNCATE ON TABLE "public"."fontFamilyMaster" TO "anon";
GRANT UPDATE ON TABLE "public"."fontFamilyMaster" TO "anon";

GRANT DELETE ON TABLE "public"."fontFamilyMaster" TO "authenticated";
GRANT INSERT ON TABLE "public"."fontFamilyMaster" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."fontFamilyMaster" TO "authenticated";
GRANT SELECT ON TABLE "public"."fontFamilyMaster" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."fontFamilyMaster" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."fontFamilyMaster" TO "authenticated";
GRANT UPDATE ON TABLE "public"."fontFamilyMaster" TO "authenticated";

GRANT DELETE ON TABLE "public"."fontFamilyMaster" TO "service_role";
GRANT INSERT ON TABLE "public"."fontFamilyMaster" TO "service_role";
GRANT REFERENCES ON TABLE "public"."fontFamilyMaster" TO "service_role";
GRANT SELECT ON TABLE "public"."fontFamilyMaster" TO "service_role";
GRANT TRIGGER ON TABLE "public"."fontFamilyMaster" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."fontFamilyMaster" TO "service_role";
GRANT UPDATE ON TABLE "public"."fontFamilyMaster" TO "service_role";
