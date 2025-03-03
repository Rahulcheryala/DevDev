create table "public"."tenantDomains" (
    "id" uuid not null default uuid_generate_v4(),
    "tenantId" uuid not null,
    "domain" text not null,
    "subdomain" text not null,
    "isVerified" boolean not null default false,
    "verificationCode" integer,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "lastUpdatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxTenantDomainsIsVerified" ON public."tenantDomains" USING btree ("isVerified");

CREATE INDEX "idxTenantDomainsTenantId" ON public."tenantDomains" USING btree ("tenantId");

CREATE UNIQUE INDEX "tenantDomains_domain_key" ON public."tenantDomains" USING btree ("domain");

CREATE UNIQUE INDEX "tenantDomains_subdomain_key" ON public."tenantDomains" USING btree ("subdomain");

alter table "public"."tenantDomains" add constraint "tenantDomains_domain_key" UNIQUE using index "tenantDomains_domain_key";

alter table "public"."tenantDomains" add constraint "tenantDomains_subdomain_key" UNIQUE using index "tenantDomains_subdomain_key";

alter table "public"."tenantDomains" add constraint "tenantDomains_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenantMaster"("id") not valid;

alter table "public"."tenantDomains" validate constraint "tenantDomains_tenantId_fkey";

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

grant delete on table "public"."tenantDomains" to "anon";
grant insert on table "public"."tenantDomains" to "anon";
grant references on table "public"."tenantDomains" to "anon";
grant select on table "public"."tenantDomains" to "anon";
grant trigger on table "public"."tenantDomains" to "anon";
grant truncate on table "public"."tenantDomains" to "anon";
grant update on table "public"."tenantDomains" to "anon";

grant delete on table "public"."tenantDomains" to "authenticated";
grant insert on table "public"."tenantDomains" to "authenticated";
grant references on table "public"."tenantDomains" to "authenticated";
grant select on table "public"."tenantDomains" to "authenticated";
grant trigger on table "public"."tenantDomains" to "authenticated";
grant truncate on table "public"."tenantDomains" to "authenticated";
grant update on table "public"."tenantDomains" to "authenticated";

grant delete on table "public"."tenantDomains" to "service_role";
grant insert on table "public"."tenantDomains" to "service_role";
grant references on table "public"."tenantDomains" to "service_role";
grant select on table "public"."tenantDomains" to "service_role";
grant trigger on table "public"."tenantDomains" to "service_role";
grant truncate on table "public"."tenantDomains" to "service_role";
grant update on table "public"."tenantDomains" to "service_role";

-- Commented out triggers (you may want to implement these separately)
-- CREATE TRIGGER updateAddressMasterUpdatedAt BEFORE UPDATE ON public."addressMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressRelationUpdatedAt BEFORE UPDATE ON public."addressRelation" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressStructureUpdatedAt BEFORE UPDATE ON public."addressStructure" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateTenantDomainsUpdatedAt BEFORE UPDATE ON public."tenantDomains" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateTenantMasterUpdatedAt BEFORE UPDATE ON public."tenantMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();