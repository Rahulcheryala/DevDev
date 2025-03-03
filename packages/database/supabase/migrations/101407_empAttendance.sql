create table "golden"."empAttendance" (
    "id" uuid not null default uuid_generate_v4(),
    "employeeId" uuid not null,
    "attendanceDate" bytea,
    "checkInTime" bytea,
    "checkOutTime" bytea,
    "leaveType" "leaveType",
    "leaveStartDate" bytea,
    "leaveEndDate" bytea,
    "leaveStatus" "leaveStatus",
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    CONSTRAINT "empAttendance_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "empAttendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "golden"."employeeMaster"("id")
);

grant delete on table "golden"."empAttendance" to "anon";
grant insert on table "golden"."empAttendance" to "anon";
grant references on table "golden"."empAttendance" to "anon";
grant select on table "golden"."empAttendance" to "anon";
grant trigger on table "golden"."empAttendance" to "anon";
grant truncate on table "golden"."empAttendance" to "anon";
grant update on table "golden"."empAttendance" to "anon";

grant delete on table "golden"."empAttendance" to "authenticated";
grant insert on table "golden"."empAttendance" to "authenticated";
grant references on table "golden"."empAttendance" to "authenticated";
grant select on table "golden"."empAttendance" to "authenticated";
grant trigger on table "golden"."empAttendance" to "authenticated";
grant truncate on table "golden"."empAttendance" to "authenticated";
grant update on table "golden"."empAttendance" to "authenticated";

grant delete on table "golden"."empAttendance" to "service_role";
grant insert on table "golden"."empAttendance" to "service_role";
grant references on table "golden"."empAttendance" to "service_role";
grant select on table "golden"."empAttendance" to "service_role";
grant trigger on table "golden"."empAttendance" to "service_role";
grant truncate on table "golden"."empAttendance" to "service_role";
grant update on table "golden"."empAttendance" to "service_role";
