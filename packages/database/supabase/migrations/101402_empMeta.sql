create table "golden"."empMeta" (
    "id" uuid not null default uuid_generate_v4(),
    "employeeId" uuid not null,
    "preferredName" bytea,
    "personalEmail" bytea,
    "emergencyContact" bytea,
    "socialSecurityNumber" bytea,
    "workAuthorizationStatus" bytea,
    "disabilityStatus" bytea,
    "veteranStatus" bytea,
    "ethnicity" bytea,
    "preferredLanguage" bytea,
    "profilePictureUrl" bytea,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    PRIMARY KEY ("id")
);

alter table "golden"."empMeta" add constraint "empMeta_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "golden"."employeeMaster"("id") not valid;

alter table "golden"."empMeta" validate constraint "empMeta_employeeId_fkey";

grant delete on table "golden"."empMeta" to "anon";
grant insert on table "golden"."empMeta" to "anon";
grant references on table "golden"."empMeta" to "anon";
grant select on table "golden"."empMeta" to "anon";
grant trigger on table "golden"."empMeta" to "anon";
grant truncate on table "golden"."empMeta" to "anon";
grant update on table "golden"."empMeta" to "anon";

grant delete on table "golden"."empMeta" to "authenticated";
grant insert on table "golden"."empMeta" to "authenticated";
grant references on table "golden"."empMeta" to "authenticated";
grant select on table "golden"."empMeta" to "authenticated";
grant trigger on table "golden"."empMeta" to "authenticated";
grant truncate on table "golden"."empMeta" to "authenticated";
grant update on table "golden"."empMeta" to "authenticated";

grant delete on table "golden"."empMeta" to "service_role";
grant insert on table "golden"."empMeta" to "service_role";
grant references on table "golden"."empMeta" to "service_role";
grant select on table "golden"."empMeta" to "service_role";
grant trigger on table "golden"."empMeta" to "service_role";
grant truncate on table "golden"."empMeta" to "service_role";
grant update on table "golden"."empMeta" to "service_role";

-- Example of Creating an employee's metadata record
-- INSERT INTO "empMeta" (
--     "employeeId",
--     "preferredName",
--     "personalEmail",
--     "emergencyContact",
--     "socialSecurityNumber",
--     "workAuthorizationStatus",
--     "disabilityStatus",
--     "veteranStatus",
--     "ethnicity",
--     "preferredLanguage",
--     "profilePictureUrl",
--     "createdBy"
-- ) VALUES (
--     'employee-uuid-here',                   -- employeeId (actual UUID)
--     encryptData('Jim'),                     -- preferredName
--     encryptData('jim.personal@email.com'),  -- personalEmail
--     encryptJsonData('{                      -- emergencyContact as JSONB
--         "name": "Jane Doe",
--         "relationship": "Spouse",
--         "phone": "555-0123",
--         "address": "123 Emergency St"
--     }'::jsonb),
--     encryptData('123-45-6789'),            -- socialSecurityNumber
--     encryptData('CITIZEN'),                 -- workAuthorizationStatus
--     encryptData('false'),                   -- disabilityStatus
--     encryptData('true'),                    -- veteranStatus
--     encryptData('PREFER_NOT_TO_SAY'),       -- ethnicity
--     encryptData('English'),                 -- preferredLanguage
--     encryptData('/profile/123.jpg'),        -- profilePictureUrl
--     'creator-uuid-here'                     -- createdBy
-- );