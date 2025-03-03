CREATE TABLE "public"."fontVariants" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "fontFamilyId" UUID NOT NULL,
    "variantName" CHARACTER VARYING NOT NULL,
    "filePath" CHARACTER VARYING NOT NULL,
    "fileFormat" UUID NOT NULL,
    "fontWeight" INTEGER,
    "fontStyle" UUID,
    "fontPreviewUrl" CHARACTER VARYING,
    "isMonospace" BOOLEAN,
    "unicodeSupportRange" JSONB,
    "uploadedBy" UUID NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncData" JSONB,
    CONSTRAINT "fontVariants_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fontVariants_fontStyle_fkey" FOREIGN KEY ("fontStyle") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "fontVariants_fileFormat_fkey" FOREIGN KEY ("fileFormat") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "fontVariants_fontFamilyId_fkey" FOREIGN KEY ("fontFamilyId") REFERENCES "public"."fontFamilyMaster"("id"),
    CONSTRAINT "fontVariants_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "fontVariants_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "fontVariants_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "fontVariants_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."fontVariants" TO "anon";
GRANT INSERT ON TABLE "public"."fontVariants" TO "anon";
GRANT REFERENCES ON TABLE "public"."fontVariants" TO "anon";
GRANT SELECT ON TABLE "public"."fontVariants" TO "anon";
GRANT TRIGGER ON TABLE "public"."fontVariants" TO "anon";
GRANT TRUNCATE ON TABLE "public"."fontVariants" TO "anon";
GRANT UPDATE ON TABLE "public"."fontVariants" TO "anon";

GRANT DELETE ON TABLE "public"."fontVariants" TO "authenticated";
GRANT INSERT ON TABLE "public"."fontVariants" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."fontVariants" TO "authenticated";
GRANT SELECT ON TABLE "public"."fontVariants" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."fontVariants" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."fontVariants" TO "authenticated";
GRANT UPDATE ON TABLE "public"."fontVariants" TO "authenticated";

GRANT DELETE ON TABLE "public"."fontVariants" TO "service_role";
GRANT INSERT ON TABLE "public"."fontVariants" TO "service_role";
GRANT REFERENCES ON TABLE "public"."fontVariants" TO "service_role";
GRANT SELECT ON TABLE "public"."fontVariants" TO "service_role";
GRANT TRIGGER ON TABLE "public"."fontVariants" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."fontVariants" TO "service_role";
GRANT UPDATE ON TABLE "public"."fontVariants" TO "service_role";
