CREATE TABLE "public"."companyUsers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "departmentId" UUID NOT NULL,
    "roleInDepartment" UUID,
    "startDate" DATE,
    "endDate" DATE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "lastUpdatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "companyUsers_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "companyUsers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id"),
    -- TODO: Add department table
    -- CONSTRAINT "companyUsers_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "golden"."departments"("id"),
    -- CONSTRAINT "companyMaster_roleInDepartment_fkey" FOREIGN KEY ("roleInDepartment") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "companyUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id"),
    CONSTRAINT "companyUsers_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "companyUsers_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "companyUsers_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."companyUsers" TO "anon";
GRANT INSERT ON TABLE "public"."companyUsers" TO "anon";
GRANT REFERENCES ON TABLE "public"."companyUsers" TO "anon";
GRANT SELECT ON TABLE "public"."companyUsers" TO "anon";
GRANT TRIGGER ON TABLE "public"."companyUsers" TO "anon";
GRANT TRUNCATE ON TABLE "public"."companyUsers" TO "anon";
GRANT UPDATE ON TABLE "public"."companyUsers" TO "anon";

GRANT DELETE ON TABLE "public"."companyUsers" TO "authenticated";
GRANT INSERT ON TABLE "public"."companyUsers" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."companyUsers" TO "authenticated";
GRANT SELECT ON TABLE "public"."companyUsers" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."companyUsers" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."companyUsers" TO "authenticated";
GRANT UPDATE ON TABLE "public"."companyUsers" TO "authenticated";

GRANT DELETE ON TABLE "public"."companyUsers" TO "service_role";
GRANT INSERT ON TABLE "public"."companyUsers" TO "service_role";
GRANT REFERENCES ON TABLE "public"."companyUsers" TO "service_role";
GRANT SELECT ON TABLE "public"."companyUsers" TO "service_role";
GRANT TRIGGER ON TABLE "public"."companyUsers" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."companyUsers" TO "service_role";
GRANT UPDATE ON TABLE "public"."companyUsers" TO "service_role";
