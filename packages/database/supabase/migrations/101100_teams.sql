create type "golden"."teamStatus" as enum ('Active', 'Inactive', 'Blocked');

create type "golden"."teamVisibility" as enum ('golden', 'Public', 'Private', 'Restricted');

create table "golden"."teams" (
    "id" uuid not null default uuid_generate_v4(),
    "companyId" uuid not null,
    "name" text not null,
    "teamCode" text not null,
    "description" text,
    "status" "golden"."teamStatus" not null default 'Active'::"golden"."teamStatus",
    "parentTeamId" uuid,
    "teamLeaderId" uuid,
    "userCount" integer default 0,
    "visibility" "golden"."teamVisibility" not null default 'Private'::"golden"."teamVisibility",
    "metadata" jsonb,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "startDate" date NULL,
    "endDate" date NULL,
    "version" integer not null default 1,
    "imageUrl" text NULL,
    "isArchived" boolean not null default false,
    "syncToken" uuid,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxTeamsCompanyId" ON golden."teams" USING btree ("companyId");

CREATE INDEX "idxTeamsIsArchived" ON golden."teams" USING btree ("isArchived");

CREATE INDEX "idxTeamsParentTeamId" ON golden."teams" USING btree ("parentTeamId");

CREATE INDEX "idxTeamsStatus" ON golden."teams" USING btree ("status");

CREATE INDEX "idxTeamsTeamLeaderId" ON golden."teams" USING btree ("teamLeaderId");

CREATE INDEX "idxTeamsVisibility" ON golden."teams" USING btree ("visibility");

alter table "golden"."teams" add constraint "teams_parentTeamId_fkey" FOREIGN KEY ("parentTeamId") REFERENCES "golden"."teams"("id") not valid;

alter table "golden"."teams" validate constraint "teams_parentTeamId_fkey";

alter table "golden"."teams" add constraint "valid_hierarchy" CHECK (("id" <> "parentTeamId")) not valid;

alter table "golden"."teams" validate constraint "valid_hierarchy";

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

grant delete on table "golden"."teams" to "anon";
grant insert on table "golden"."teams" to "anon";
grant references on table "golden"."teams" to "anon";
grant select on table "golden"."teams" to "anon";
grant trigger on table "golden"."teams" to "anon";
grant truncate on table "golden"."teams" to "anon";
grant update on table "golden"."teams" to "anon";

grant delete on table "golden"."teams" to "authenticated";
grant insert on table "golden"."teams" to "authenticated";
grant references on table "golden"."teams" to "authenticated";
grant select on table "golden"."teams" to "authenticated";
grant trigger on table "golden"."teams" to "authenticated";
grant truncate on table "golden"."teams" to "authenticated";
grant update on table "golden"."teams" to "authenticated";

grant delete on table "golden"."teams" to "service_role";
grant insert on table "golden"."teams" to "service_role";
grant references on table "golden"."teams" to "service_role";
grant select on table "golden"."teams" to "service_role";
grant trigger on table "golden"."teams" to "service_role";
grant truncate on table "golden"."teams" to "service_role";
grant update on table "golden"."teams" to "service_role";

-- Commented out triggers (you may want to implement these separately)
-- CREATE TRIGGER updateAddressMasterUpdatedAt BEFORE UPDATE ON golden."addressMaster" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAtColumn();
-- CREATE TRIGGER updateAddressRelationUpdatedAt BEFORE UPDATE ON golden."addressRelation" FOR EACH ROW EXECUTE FUNCTION updateUpdatedAt