create type "public"."billingFrequency" as enum ('Monthly', 'Quarterly', 'Annually');

create type "public"."billingTerms" as enum ('Prepaid', 'Net30', 'Net60');

create type "public"."supportEscalation" as enum ('Level1', 'Level2', 'Level3');

create type "public"."supportHours" as enum ('24/7', 'BusinessHours');

create type "public"."supportTier" as enum ('Standard', 'Premium', 'Enterprise');

create table "public"."tenantSubscription" (
    "id" uuid not null default uuid_generate_v4(),
    "tenantId" uuid not null,
    "planId" uuid not null,
    "billingStartDate" timestamp with time zone not null,
    "billingEndDate" timestamp with time zone not null,
    "billingFrequency" "billingFrequency" not null,
    "billingTerms" "billingTerms",
    "renewalDate" timestamp with time zone,
    "trialEndDate" timestamp with time zone,
    "amount" numeric(10,2) not null,
    "currency" character varying(10) not null,
    "isActive" boolean not null default true,
    "supportTier" "supportTier",
    "supportSlaResponse" character varying(20),
    "supportSlaAvailability" character varying(10),
    "supportSlaHours" "supportHours",
    "supportSlaEscalation" "supportEscalation",
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "lastUpdatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxTenantSubscriptionBillingEndDate" ON public."tenantSubscription" USING btree ("billingEndDate");

CREATE INDEX "idxTenantSubscriptionIsActive" ON public."tenantSubscription" USING btree ("isActive");

CREATE INDEX "idxTenantSubscriptionPlanId" ON public."tenantSubscription" USING btree ("planId");

CREATE INDEX "idxTenantSubscriptionTenantId" ON public."tenantSubscription" USING btree ("tenantId");

alter table "public"."tenantSubscription" add constraint "tenantSubscription_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenantMaster"("id") not valid;

alter table "public"."tenantSubscription" validate constraint "tenantSubscription_tenantId_fkey";

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

grant delete on table "public"."tenantSubscription" to "anon";
grant insert on table "public"."tenantSubscription" to "anon";
grant references on table "public"."tenantSubscription" to "anon";
grant select on table "public"."tenantSubscription" to "anon";
grant trigger on table "public"."tenantSubscription" to "anon";
grant truncate on table "public"."tenantSubscription" to "anon";
grant update on table "public"."tenantSubscription" to "anon";

grant delete on table "public"."tenantSubscription" to "authenticated";
grant insert on table "public"."tenantSubscription" to "authenticated";
grant references on table "public"."tenantSubscription" to "authenticated";
grant select on table "public"."tenantSubscription" to "authenticated";
grant trigger on table "public"."tenantSubscription" to "authenticated";
grant truncate on table "public"."tenantSubscription" to "authenticated";
grant update on table "public"."tenantSubscription" to "authenticated";

grant delete on table "public"."tenantSubscription" to "service_role";
grant insert on table "public"."tenantSubscription" to "service_role";
grant references on table "public"."tenantSubscription" to "service_role";
grant select on table "public"."tenantSubscription" to "service_role";
grant trigger on table "public"."tenantSubscription" to "service_role";
grant truncate on table "public"."tenantSubscription" to "service_role";
grant update on table "public"."tenantSubscription" to "service_role";

-- Commented out triggers (you may want to implement these separately)
-- CREATE TRIGGER updateAddressMasterUpdatedAt BEFORE UPDATE ON public."addressMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressRelationUpdatedAt BEFORE UPDATE ON public."addressRelation" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressStructureUpdatedAt BEFORE UPDATE ON public."addressStructure" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateTenantDomainsUpdatedAt BEFORE UPDATE ON public."tenantDomains" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateTenantMasterUpdatedAt BEFORE UPDATE ON public."tenantMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateTenantSubscriptionUpdatedAt BEFORE UPDATE ON public."tenantSubscription" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();