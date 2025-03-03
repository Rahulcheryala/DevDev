create table "golden"."empOrgAssignment" (
    "id" uuid not null default uuid_generate_v4(),
    "employeeId" uuid not null,
    "companyId" uuid not null,
    "departmentId" uuid,
    "positionId" uuid,
    "locationId" uuid,
    "managerId" uuid,
    "startDate" date not null,
    "endDate" date,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    CONSTRAINT "empOrgAssignment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "empOrgAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "golden"."employeeMaster"("id"),
    CONSTRAINT "empOrgAssignment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id"),
    CONSTRAINT "empOrgAssignment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "golden"."departments"("id"),
    -- CONSTRAINT "empOrgAssignment_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "golden"."employeeMaster"("id"),
    CONSTRAINT "empOrgAssignment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "golden"."empAddresses"("id")
    -- CONSTRAINT "empOrgAssignment_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "golden"."employeeMaster"("id"),
);

grant delete on table "golden"."empOrgAssignment" to "anon";
grant insert on table "golden"."empOrgAssignment" to "anon";
grant references on table "golden"."empOrgAssignment" to "anon";
grant select on table "golden"."empOrgAssignment" to "anon";
grant trigger on table "golden"."empOrgAssignment" to "anon";
grant truncate on table "golden"."empOrgAssignment" to "anon";
grant update on table "golden"."empOrgAssignment" to "anon";

grant delete on table "golden"."empOrgAssignment" to "authenticated";
grant insert on table "golden"."empOrgAssignment" to "authenticated";
grant references on table "golden"."empOrgAssignment" to "authenticated";
grant select on table "golden"."empOrgAssignment" to "authenticated";
grant trigger on table "golden"."empOrgAssignment" to "authenticated";
grant truncate on table "golden"."empOrgAssignment" to "authenticated";
grant update on table "golden"."empOrgAssignment" to "authenticated";

grant delete on table "golden"."empOrgAssignment" to "service_role";
grant insert on table "golden"."empOrgAssignment" to "service_role";
grant references on table "golden"."empOrgAssignment" to "service_role";
grant select on table "golden"."empOrgAssignment" to "service_role";
grant trigger on table "golden"."empOrgAssignment" to "service_role";
grant truncate on table "golden"."empOrgAssignment" to "service_role";
grant update on table "golden"."empOrgAssignment" to "service_role";
