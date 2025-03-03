create type "public"."companyStatus" as enum ('Active', 'Inactive');

CREATE TABLE "public"."companyMaster" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "companyCode" CHARACTER VARYING,
    "industry" CHARACTER VARYING,
    "companyType" UUID,
    "dnbNumber" CHARACTER VARYING,
    "bbbNumber" CHARACTER VARYING,
    "taxId" CHARACTER VARYING,
    "registrationNumber" CHARACTER VARYING,
    "registeredState" CHARACTER VARYING,
    "registeredCountry" CHARACTER VARYING,
    "website" CHARACTER VARYING,
    "phoneNumber" CHARACTER VARYING,
    "email" CHARACTER VARYING,
    "primaryContactId" UUID,
    "fiscalYearStart" DATE,
    "fiscalYearEnd" DATE,
    "effectivityStartDate" DATE,
    "effectivityEndDate" DATE,
    "parentCompanyId" UUID,
    "isActive" BOOLEAN,
    "purpose" TEXT,
    "ownershipType" UUID,
    "employeeCount" INT,
    "annualRevenue" DECIMAL(15,2),
    "currency" CHARACTER VARYING,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "status" "companyStatus" NOT NULL DEFAULT 'Active',
    "domainUrl" TEXT,
    CONSTRAINT "companyMaster_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "companyMaster_companyType_fkey" FOREIGN KEY ("companyType") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "companyMaster_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenantMaster"("id"),
    CONSTRAINT "companyMaster_ownershipType_fkey" FOREIGN KEY ("ownershipType") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "companyMaster_parentCompanyId_fkey" FOREIGN KEY ("parentCompanyId") REFERENCES "public"."companyMaster"("id"),
    CONSTRAINT "companyMaster_primaryContactId_fkey" FOREIGN KEY ("primaryContactId") REFERENCES "public"."user"("id"),
    CONSTRAINT "companyMaster_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id"),
    CONSTRAINT "companyMaster_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "public"."user"("id"),
    CONSTRAINT "companyMaster_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "public"."user"("id")

);

CREATE UNIQUE INDEX "companyMaster_companyCode_key" ON "public"."companyMaster" USING btree ("companyCode");

GRANT DELETE ON TABLE "public"."companyMaster" TO "anon";
GRANT INSERT ON TABLE "public"."companyMaster" TO "anon";
GRANT REFERENCES ON TABLE "public"."companyMaster" TO "anon";
GRANT SELECT ON TABLE "public"."companyMaster" TO "anon";
GRANT TRIGGER ON TABLE "public"."companyMaster" TO "anon";
GRANT TRUNCATE ON TABLE "public"."companyMaster" TO "anon";
GRANT UPDATE ON TABLE "public"."companyMaster" TO "anon";

GRANT DELETE ON TABLE "public"."companyMaster" TO "authenticated";
GRANT INSERT ON TABLE "public"."companyMaster" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."companyMaster" TO "authenticated";
GRANT SELECT ON TABLE "public"."companyMaster" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."companyMaster" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."companyMaster" TO "authenticated";
GRANT UPDATE ON TABLE "public"."companyMaster" TO "authenticated";

GRANT DELETE ON TABLE "public"."companyMaster" TO "service_role";
GRANT INSERT ON TABLE "public"."companyMaster" TO "service_role";
GRANT REFERENCES ON TABLE "public"."companyMaster" TO "service_role";
GRANT SELECT ON TABLE "public"."companyMaster" TO "service_role";
GRANT TRIGGER ON TABLE "public"."companyMaster" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."companyMaster" TO "service_role";
GRANT UPDATE ON TABLE "public"."companyMaster" TO "service_role";
