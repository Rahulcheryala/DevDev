create type "public"."defaultLanguage" as enum ('en-US', 'fr-FR');

create type "public"."tenantStatus" as enum ('Active', 'Suspended', 'Trial', 'Inactive');

create table "public"."tenantMaster" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "domainId" text,
    "planId" uuid,
    "primaryContactId" uuid,
    "status" "tenantStatus" not null,
    "dataRetentionDays" integer,
    "defaultLanguage" "defaultLanguage",
    "hostingRegion" character varying,
    "metadata" jsonb,
    "notes" character varying,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "lastUpdatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxTenantMasterDomainId" ON public."tenantMaster" USING btree ("domainId");

CREATE INDEX "idxTenantMasterPlanId" ON public."tenantMaster" USING btree ("planId");

CREATE INDEX "idxTenantMasterStatus" ON public."tenantMaster" USING btree ("status");

set check_function_bodies = off;

-- Commented out update function (you may want to implement this separately)
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

grant delete on table "public"."tenantMaster" to "anon";
grant insert on table "public"."tenantMaster" to "anon";
grant references on table "public"."tenantMaster" to "anon";
grant select on table "public"."tenantMaster" to "anon";
grant trigger on table "public"."tenantMaster" to "anon";
grant truncate on table "public"."tenantMaster" to "anon";
grant update on table "public"."tenantMaster" to "anon";

grant delete on table "public"."tenantMaster" to "authenticated";
grant insert on table "public"."tenantMaster" to "authenticated";
grant references on table "public"."tenantMaster" to "authenticated";
grant select on table "public"."tenantMaster" to "authenticated";
grant trigger on table "public"."tenantMaster" to "authenticated";
grant truncate on table "public"."tenantMaster" to "authenticated";
grant update on table "public"."tenantMaster" to "authenticated";

grant delete on table "public"."tenantMaster" to "service_role";
grant insert on table "public"."tenantMaster" to "service_role";
grant references on table "public"."tenantMaster" to "service_role";
grant select on table "public"."tenantMaster" to "service_role";
grant trigger on table "public"."tenantMaster" to "service_role";
grant truncate on table "public"."tenantMaster" to "service_role";
grant update on table "public"."tenantMaster" to "service_role";

-- Commented out triggers (you may want to implement these separately)
-- CREATE TRIGGER updateAddressMasterUpdatedAt BEFORE UPDATE ON public."addressMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressRelationUpdatedAt BEFORE UPDATE ON public."addressRelation" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressStructureUpdatedAt BEFORE UPDATE ON public."addressStructure" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateTenantMasterUpdatedAt BEFORE UPDATE ON public."tenantMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();