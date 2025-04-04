create type "golden"."addressType" as enum ('Billing', 'Shipping', 'Home', 'Work');

create type "golden"."entityType" as enum ('Customer', 'Vendor');

create table "golden"."addressRelation" (
    "addressRelationId" uuid not null default uuid_generate_v4(),
    "addressId" uuid not null,
    "entityName" "golden"."entityType" not null,
    "addressType" "golden"."addressType" not null,
    "isPrimary" boolean default false,
    "contactId" uuid,
    "effectiveStartDate" timestamp with time zone,
    "effectiveEndDate" timestamp with time zone,
    "createdByUserId" uuid,
    "isVerified" boolean default false,
    "lastVerifiedOn" timestamp with time zone,
    "notes" character varying,
    "createdAt" timestamp with time zone default CURRENT_TIMESTAMP,
    "createdBy" uuid,
    "lastUpdatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    PRIMARY KEY ("addressRelationId")
);

CREATE INDEX "idxAddressRelationAddressId" ON golden."addressRelation" USING btree ("addressId");

CREATE INDEX "idxAddressRelationEntityName" ON golden."addressRelation" USING btree ("entityName");

CREATE INDEX "idxAddressRelationIsPrimary" ON golden."addressRelation" USING btree ("isPrimary");

alter table "golden"."addressRelation" add constraint "addressRelation_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "golden"."addressMaster"("addressId") not valid;

alter table "golden"."addressRelation" validate constraint "addressRelation_addressId_fkey";

set check_function_bodies = off;

-- Commented out update function (you may want to implement this separately)
-- CREATE OR REPLACE FUNCTION golden.updateUpdatedAtColumn()
--  RETURNS trigger
--  LANGUAGE plpgsql
-- AS $function$
-- BEGIN
--     NEW.lastUpdatedAt = CURRENT_TIMESTAMP;
--     RETURN NEW;
-- END;
-- $function$
-- ;

grant delete on table "golden"."addressRelation" to "anon";
grant insert on table "golden"."addressRelation" to "anon";
grant references on table "golden"."addressRelation" to "anon";
grant select on table "golden"."addressRelation" to "anon";
grant trigger on table "golden"."addressRelation" to "anon";
grant truncate on table "golden"."addressRelation" to "anon";
grant update on table "golden"."addressRelation" to "anon";

grant delete on table "golden"."addressRelation" to "authenticated";
grant insert on table "golden"."addressRelation" to "authenticated";
grant references on table "golden"."addressRelation" to "authenticated";
grant select on table "golden"."addressRelation" to "authenticated";
grant trigger on table "golden"."addressRelation" to "authenticated";
grant truncate on table "golden"."addressRelation" to "authenticated";
grant update on table "golden"."addressRelation" to "authenticated";

grant delete on table "golden"."addressRelation" to "service_role";
grant insert on table "golden"."addressRelation" to "service_role";
grant references on table "golden"."addressRelation" to "service_role";
grant select on table "golden"."addressRelation" to "service_role";
grant trigger on table "golden"."addressRelation" to "service_role";
grant truncate on table "golden"."addressRelation" to "service_role";
grant update on table "golden"."addressRelation" to "service_role";

-- Commented out triggers (we may want to implement these separately in future)
-- CREATE TRIGGER updateAddressMasterUpdatedAt BEFORE UPDATE ON golden."addressMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressRelationUpdatedAt BEFORE UPDATE ON golden."addressRelation" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressStructureUpdatedAt BEFORE UPDATE ON golden."addressStructure" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();