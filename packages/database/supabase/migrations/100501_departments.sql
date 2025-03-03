create type "golden"."departmentStatus" as enum ('Active', 'Inactive', 'Blocked');

create table "golden"."departments" (
    "id" uuid not null default uuid_generate_v4(),
    "companyId" uuid not null,
    "name" text not null,
    "departmentCode" TEXT NOT NULL,
    "description" text,
    "metadata" jsonb,
    "logo" TEXT,
    "supervisor" uuid,
    "status" "golden"."departmentStatus" not null default 'Active'::"golden"."departmentStatus",
    "effectiveStartDate" TIMESTAMP WITH TIME ZONE,
    "effectiveEndDate" TIMESTAMP WITH TIME ZONE,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "version" integer not null default 1,
    "isArchived" boolean not null default false,
    "syncToken" uuid,
    PRIMARY KEY ("id"),
    CONSTRAINT "departments_supervisor_fkey" FOREIGN KEY ("supervisor") REFERENCES "golden"."employeeMaster"("id")
);

CREATE UNIQUE INDEX "idx_unique_active_department_name" ON golden."departments" USING btree ("companyId", "name") WHERE ("deletedAt" IS NULL);

CREATE INDEX "idxDepartmentsCompanyId" ON golden."departments" USING btree ("companyId");

CREATE INDEX "idxDepartmentsDeletedAt" ON golden."departments" USING btree ("deletedAt");

CREATE INDEX "idxDepartmentsIsArchived" ON golden."departments" USING btree ("isArchived");

CREATE INDEX "idxDepartmentsStatus" ON golden."departments" USING btree ("status");

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION golden.incrementDepartmentVersion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW."version" = OLD."version" + 1;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION golden.updateUpdatedAtColumn()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW."lastUpdatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;

grant delete on table "golden"."departments" to "anon";
grant insert on table "golden"."departments" to "anon";
grant references on table "golden"."departments" to "anon";
grant select on table "golden"."departments" to "anon";
grant trigger on table "golden"."departments" to "anon";
grant truncate on table "golden"."departments" to "anon";
grant update on table "golden"."departments" to "anon";

grant delete on table "golden"."departments" to "authenticated";
grant insert on table "golden"."departments" to "authenticated";
grant references on table "golden"."departments" to "authenticated";
grant select on table "golden"."departments" to "authenticated";
grant trigger on table "golden"."departments" to "authenticated";
grant truncate on table "golden"."departments" to "authenticated";
grant update on table "golden"."departments" to "authenticated";

grant delete on table "golden"."departments" to "service_role";
grant insert on table "golden"."departments" to "service_role";
grant references on table "golden"."departments" to "service_role";
grant select on table "golden"."departments" to "service_role";
grant trigger on table "golden"."departments" to "service_role";
grant truncate on table "golden"."departments" to "service_role";
grant update on table "golden"."departments" to "service_role";

-- Commented out triggers (you may want to implement these separately)
-- CREATE TRIGGER incrementDepartmentVersionOnUpdate BEFORE UPDATE ON golden."departments" FOR EACH ROW EXECUTE FUNCTION incrementDepartmentVersion();
-- CREATE TRIGGER updateDepartmentsUpdatedAt BEFORE UPDATE ON golden."departments" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();