create type "golden"."teamUserRole" as enum ('Member', 'Leader', 'Contributor');

create table "golden"."teamUsers" (
    "id" uuid not null default uuid_generate_v4(),
    "teamId" uuid not null,
    "userId" uuid not null,
    "role" "golden"."teamUserRole" default 'Member'::"golden"."teamUserRole",
    "isActive" boolean not null default true,
    "addedAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "addedBy" uuid not null,
    "removedAt" timestamp with time zone,
    "removedBy" uuid,
    "lastActivityAt" timestamp with time zone,
    "notes" text,
    "syncToken" uuid,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxTeamUsersIsActive" ON golden."teamUsers" USING btree ("isActive");

CREATE INDEX "idxTeamUsersRole" ON golden."teamUsers" USING btree ("role");

CREATE INDEX "idxTeamUsersTeamId" ON golden."teamUsers" USING btree ("teamId");

CREATE INDEX "idxTeamUsersUserId" ON golden."teamUsers" USING btree ("userId");

CREATE UNIQUE INDEX "teamUsers_teamId_userId_key" ON golden."teamUsers" USING btree ("teamId", "userId");

alter table "golden"."teamUsers" add constraint "teamUsers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "golden"."teams"("id") not valid;

alter table "golden"."teamUsers" validate constraint "teamUsers_teamId_fkey";

alter table "golden"."teamUsers" add constraint "teamUsers_teamId_userId_key" UNIQUE using index "teamUsers_teamId_userId_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION golden.updateTeamUserCount()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.isActive = TRUE THEN
        UPDATE "golden"."teams" 
        SET "userCount" = "userCount" + 1 
        WHERE "id" = NEW."teamId";
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.isActive = FALSE AND NEW.isActive = TRUE THEN
            UPDATE "golden"."teams" 
            SET "userCount" = "userCount" + 1 
            WHERE "id" = NEW."teamId";
        ELSIF OLD.isActive = TRUE AND NEW.isActive = FALSE THEN
            UPDATE "golden"."teams" 
            SET "userCount" = "userCount" - 1 
            WHERE "id" = NEW."teamId";
        END IF;
    ELSIF TG_OP = 'DELETE' AND OLD.isActive = TRUE THEN
        UPDATE "golden"."teams" 
        SET "userCount" = "userCount" - 1 
        WHERE "id" = OLD."teamId";
    END IF;
    RETURN NEW;
END;
$function$
;

grant delete on table "golden"."teamUsers" to "anon";
grant insert on table "golden"."teamUsers" to "anon";
grant references on table "golden"."teamUsers" to "anon";
grant select on table "golden"."teamUsers" to "anon";
grant trigger on table "golden"."teamUsers" to "anon";
grant truncate on table "golden"."teamUsers" to "anon";
grant update on table "golden"."teamUsers" to "anon";

grant delete on table "golden"."teamUsers" to "authenticated";
grant insert on table "golden"."teamUsers" to "authenticated";
grant references on table "golden"."teamUsers" to "authenticated";
grant select on table "golden"."teamUsers" to "authenticated";
grant trigger on table "golden"."teamUsers" to "authenticated";
grant truncate on table "golden"."teamUsers" to "authenticated";
grant update on table "golden"."teamUsers" to "authenticated";

grant delete on table "golden"."teamUsers" to "service_role";
grant insert on table "golden"."teamUsers" to "service_role";
grant references on table "golden"."teamUsers" to "service_role";
grant select on table "golden"."teamUsers" to "service_role";
grant trigger on table "golden"."teamUsers" to "service_role";
grant truncate on table "golden"."teamUsers" to "service_role";
grant update on table "golden"."teamUsers" to "service_role";

CREATE TRIGGER teamUsersAfterDelete AFTER DELETE ON golden."teamUsers" FOR EACH ROW EXECUTE FUNCTION "golden".updateTeamUserCount();

CREATE TRIGGER teamUsersAfterInsert AFTER INSERT ON golden."teamUsers" FOR EACH ROW EXECUTE FUNCTION "golden".updateTeamUserCount();

CREATE TRIGGER teamUsersAfterUpdate AFTER UPDATE ON golden."teamUsers" FOR EACH ROW EXECUTE FUNCTION "golden".updateTeamUserCount();