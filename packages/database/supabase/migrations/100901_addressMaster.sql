-- We can uncomment this if we need to create the table again

create type "golden"."verificationStatus" as enum ('Verified', 'Unverified', 'Pending');

create table "golden"."addressMaster" (
    "addressId" uuid not null default uuid_generate_v4(),
    "contextId" integer not null,
    "address1" character varying,
    "address2" character varying,
    "city" character varying,
    "state" character varying,
    "postalCode" character varying,
    "country" character varying,
    "county" character varying,
    "isRestricted" boolean default false,
    "latitude" numeric(10,8),
    "longitude" numeric(11,8),
    "googlePlaceId" character varying,
    "formattedAddress" character varying,
    "verificationStatus" "golden"."verificationStatus" default 'Pending'::"golden"."verificationStatus",
    "isActive" boolean default true,
    "validFrom" timestamp with time zone,
    "validTo" timestamp with time zone,
    "companyId" uuid not null,
    "createdAt" timestamp with time zone default CURRENT_TIMESTAMP,
    "createdBy" uuid,
    "lastUpdatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    PRIMARY KEY ("addressId")
);

CREATE INDEX "idxAddressMasterContextId" ON golden."addressMaster" USING btree ("contextId");

CREATE INDEX "idxAddressMasterIsActive" ON golden."addressMaster" USING btree ("isActive");

CREATE INDEX "idxAddressMasterCompanyId" ON golden."addressMaster" USING btree ("companyId");

alter table "golden"."addressMaster" add constraint "addressMaster_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "public"."addressStructure"("contextId") not valid;

alter table "golden"."addressMaster" validate constraint "addressMaster_contextId_fkey";

grant delete on table "golden"."addressMaster" to "anon";
grant insert on table "golden"."addressMaster" to "anon";
grant references on table "golden"."addressMaster" to "anon";
grant select on table "golden"."addressMaster" to "anon";
grant trigger on table "golden"."addressMaster" to "anon";
grant truncate on table "golden"."addressMaster" to "anon";
grant update on table "golden"."addressMaster" to "anon";

grant delete on table "golden"."addressMaster" to "authenticated";
grant insert on table "golden"."addressMaster" to "authenticated";
grant references on table "golden"."addressMaster" to "authenticated";
grant select on table "golden"."addressMaster" to "authenticated";
grant trigger on table "golden"."addressMaster" to "authenticated";
grant truncate on table "golden"."addressMaster" to "authenticated";
grant update on table "golden"."addressMaster" to "authenticated";

grant delete on table "golden"."addressMaster" to "service_role";
grant insert on table "golden"."addressMaster" to "service_role";
grant references on table "golden"."addressMaster" to "service_role";
grant select on table "golden"."addressMaster" to "service_role";
grant trigger on table "golden"."addressMaster" to "service_role";
grant truncate on table "golden"."addressMaster" to "service_role";
grant update on table "golden"."addressMaster" to "service_role";

-- CREATE TRIGGER updateAddressMasterUpdatedAt BEFORE UPDATE ON golden."addressMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();