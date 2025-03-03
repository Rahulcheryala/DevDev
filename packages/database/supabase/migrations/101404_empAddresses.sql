-- Create enum for address types
CREATE TYPE "addressTypeEnum" AS ENUM ('PERMANENT', 'MAILING', 'TEMPORARY');

create table "golden"."empAddresses" (
    "id" uuid not null default uuid_generate_v4(),
    "employeeId" uuid not null,
    "addressType" "addressTypeEnum" not null,
    "street" bytea not null,
    "city" bytea not null,
    "state" bytea not null,
    "postalCode" bytea not null,
    "country" bytea not null,
    "isDefault" boolean not null default false,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    CONSTRAINT "empAddresses_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "empAddresses_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "golden"."employeeMaster"("id")
);

grant delete on table "golden"."empAddresses" to "anon";
grant insert on table "golden"."empAddresses" to "anon";
grant references on table "golden"."empAddresses" to "anon";
grant select on table "golden"."empAddresses" to "anon";
grant trigger on table "golden"."empAddresses" to "anon";
grant truncate on table "golden"."empAddresses" to "anon";
grant update on table "golden"."empAddresses" to "anon";

grant delete on table "golden"."empAddresses" to "authenticated";
grant insert on table "golden"."empAddresses" to "authenticated";
grant references on table "golden"."empAddresses" to "authenticated";
grant select on table "golden"."empAddresses" to "authenticated";
grant trigger on table "golden"."empAddresses" to "authenticated";
grant truncate on table "golden"."empAddresses" to "authenticated";
grant update on table "golden"."empAddresses" to "authenticated";

grant delete on table "golden"."empAddresses" to "service_role";
grant insert on table "golden"."empAddresses" to "service_role";
grant references on table "golden"."empAddresses" to "service_role";
grant select on table "golden"."empAddresses" to "service_role";
grant trigger on table "golden"."empAddresses" to "service_role";
grant truncate on table "golden"."empAddresses" to "service_role";
grant update on table "golden"."empAddresses" to "service_role";
