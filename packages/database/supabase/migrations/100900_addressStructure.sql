create table "public"."addressStructure" (
    "id" uuid not null default uuid_generate_v4(),
    "contextId" integer not null,
    "countryCode" integer not null,
    "addressField1" character varying,
    "addressField2" character varying,
    "addressField3" character varying,
    "addressField4" character varying,
    "addressField5" character varying,
    "addressField6" character varying,
    "addressField7" character varying,
    "addressField8" character varying,
    "addressField9" character varying,
    "addressField10" character varying,
    "addressField11" character varying,
    "addressField12" character varying,
    "createdAt" timestamp with time zone default CURRENT_TIMESTAMP,
    "createdBy" uuid,
    "lastUpdatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "addressStructure_contextId_countryCode_key" ON public."addressStructure" USING btree ("contextId", "countryCode");

CREATE UNIQUE INDEX "addressStructure_contextId_key" ON public."addressStructure" USING btree ("contextId");

set check_function_bodies = off;

-- Commented out function (you may want to update this as well)
-- CREATE OR REPLACE FUNCTION public.updateUpdatedAtColumn()
--  RETURNS trigger
--  LANGUAGE plpgsql
-- AS $function$
-- BEGIN
--     NEW.lastUpdatedAt = CURRENT_TIMESTAMP;
--     RETURN NEW;
-- END;
-- $function$
-- ;

grant delete on table "public"."addressStructure" to "anon";
grant insert on table "public"."addressStructure" to "anon";
grant references on table "public"."addressStructure" to "anon";
grant select on table "public"."addressStructure" to "anon";
grant trigger on table "public"."addressStructure" to "anon";
grant truncate on table "public"."addressStructure" to "anon";
grant update on table "public"."addressStructure" to "anon";

grant delete on table "public"."addressStructure" to "authenticated";
grant insert on table "public"."addressStructure" to "authenticated";
grant references on table "public"."addressStructure" to "authenticated";
grant select on table "public"."addressStructure" to "authenticated";
grant trigger on table "public"."addressStructure" to "authenticated";
grant truncate on table "public"."addressStructure" to "authenticated";
grant update on table "public"."addressStructure" to "authenticated";

grant delete on table "public"."addressStructure" to "service_role";
grant insert on table "public"."addressStructure" to "service_role";
grant references on table "public"."addressStructure" to "service_role";
grant select on table "public"."addressStructure" to "service_role";
grant trigger on table "public"."addressStructure" to "service_role";
grant truncate on table "public"."addressStructure" to "service_role";
grant update on table "public"."addressStructure" to "service_role";

-- Commented out trigger (you may want to update this as well after creating the table)
-- CREATE TRIGGER updateAddressStructureUpdatedAt BEFORE UPDATE ON public."addressStructure" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();