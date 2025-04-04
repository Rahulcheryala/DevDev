create type "public"."apiActivityStatus" as enum ('Active', 'Inactive');

create type "public"."apiLoginStatus" as enum ('Logged In', 'Logged Out');

create table "public"."apiUserSession" (
    "id" text not null default xid(),
    "userId" text,
    "location" jsonb not null,
    "device" jsonb not null,
    "ipAddress" text not null,
    "status" "apiLoginStatus" not null,
    "sessionActivity" "apiActivityStatus" not null,
    "createdOn" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "deletedAt" timestamp with time zone,
    "createdBy" text,
    "modifiedBy" text,
    "deletedBy" text,
    "metadata" jsonb,
    "deletedOn" timestamp with time zone
);


alter table "public"."dynamicSalesOrder" drop column "createdOn";

alter table "public"."dynamicSalesOrder" drop column "customFields";

alter table "public"."dynamicSalesOrder" drop column "deletedBy";

alter table "public"."dynamicSalesOrder" drop column "deletedOn";

alter table "public"."dynamicSalesOrder" drop column "modifiedBy";

alter table "public"."dynamicSalesOrder" drop column "modifiedOn";

alter table "public"."dynamicSalesOrder" alter column "createdBy" drop not null;

CREATE UNIQUE INDEX "apiUserSession_pkey" ON public."apiUserSession" USING btree (id);

alter table "public"."apiUserSession" add constraint "apiUserSession_pkey" PRIMARY KEY using index "apiUserSession_pkey";

alter table "public"."apiUserSession" add constraint "apiUserSession_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"(id) not valid;

alter table "public"."apiUserSession" validate constraint "apiUserSession_createdBy_fkey";

alter table "public"."apiUserSession" add constraint "apiUserSession_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"(id) not valid;

alter table "public"."apiUserSession" validate constraint "apiUserSession_deletedBy_fkey";

alter table "public"."apiUserSession" add constraint "apiUserSession_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"(id) not valid;

alter table "public"."apiUserSession" validate constraint "apiUserSession_modifiedBy_fkey";

grant delete on table "public"."apiUserSession" to "anon";

grant insert on table "public"."apiUserSession" to "anon";

grant references on table "public"."apiUserSession" to "anon";

grant select on table "public"."apiUserSession" to "anon";

grant trigger on table "public"."apiUserSession" to "anon";

grant truncate on table "public"."apiUserSession" to "anon";

grant update on table "public"."apiUserSession" to "anon";

grant delete on table "public"."apiUserSession" to "authenticated";

grant insert on table "public"."apiUserSession" to "authenticated";

grant references on table "public"."apiUserSession" to "authenticated";

grant select on table "public"."apiUserSession" to "authenticated";

grant trigger on table "public"."apiUserSession" to "authenticated";

grant truncate on table "public"."apiUserSession" to "authenticated";

grant update on table "public"."apiUserSession" to "authenticated";

grant delete on table "public"."apiUserSession" to "service_role";

grant insert on table "public"."apiUserSession" to "service_role";

grant references on table "public"."apiUserSession" to "service_role";

grant select on table "public"."apiUserSession" to "service_role";

grant trigger on table "public"."apiUserSession" to "service_role";

grant truncate on table "public"."apiUserSession" to "service_role";

grant update on table "public"."apiUserSession" to "service_role";


