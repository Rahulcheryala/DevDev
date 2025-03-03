CREATE TABLE "public"."countryMaster" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "countryName" CHARACTER VARYING NOT NULL,
    "twoCharCountryCode" CHARACTER VARYING NOT NULL,
    "threeCharCountryCode" CHARACTER VARYING NOT NULL,
    "region" CHARACTER VARYING,
    "subRegion" CHARACTER VARYING,
    "timeZone" CHARACTER VARYING,
    "currencyCode" CHARACTER VARYING NOT NULL,
    "dialingCode" CHARACTER VARYING,
    "primaryLanguage" CHARACTER VARYING,
    "otherLanguages" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncData" JSONB,
    CONSTRAINT "countryMaster_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "countryMaster_twoCharCountryCode_unique" UNIQUE ("twoCharCountryCode"),
    CONSTRAINT "countryMaster_threeCharCountryCode_unique" UNIQUE ("threeCharCountryCode"),
    CONSTRAINT "countryMaster_dialingCode_unique" UNIQUE ("dialingCode"),
    CONSTRAINT "countryMaster_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "countryMaster_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "countryMaster_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."countryMaster" TO "anon";
GRANT INSERT ON TABLE "public"."countryMaster" TO "anon";
GRANT REFERENCES ON TABLE "public"."countryMaster" TO "anon";
GRANT SELECT ON TABLE "public"."countryMaster" TO "anon";
GRANT TRIGGER ON TABLE "public"."countryMaster" TO "anon";
GRANT TRUNCATE ON TABLE "public"."countryMaster" TO "anon";
GRANT UPDATE ON TABLE "public"."countryMaster" TO "anon";

GRANT DELETE ON TABLE "public"."countryMaster" TO "authenticated";
GRANT INSERT ON TABLE "public"."countryMaster" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."countryMaster" TO "authenticated";
GRANT SELECT ON TABLE "public"."countryMaster" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."countryMaster" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."countryMaster" TO "authenticated";
GRANT UPDATE ON TABLE "public"."countryMaster" TO "authenticated";

GRANT DELETE ON TABLE "public"."countryMaster" TO "service_role";
GRANT INSERT ON TABLE "public"."countryMaster" TO "service_role";
GRANT REFERENCES ON TABLE "public"."countryMaster" TO "service_role";
GRANT SELECT ON TABLE "public"."countryMaster" TO "service_role";
GRANT TRIGGER ON TABLE "public"."countryMaster" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."countryMaster" TO "service_role";
GRANT UPDATE ON TABLE "public"."countryMaster" TO "service_role";
