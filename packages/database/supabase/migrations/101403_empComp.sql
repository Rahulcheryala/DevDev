create table "golden"."empComp" (
    "id" uuid not null default uuid_generate_v4(),
    "employeeId" uuid not null,
    "basicPay" bytea not null,
    "allowances" bytea,
    "deductions" bytea,
    "payFrequency" bytea not null,
    "currency" bytea not null,
    "effectiveDate" date not null,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    PRIMARY KEY ("id")
);

alter table "golden"."empComp" add constraint "empComp_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "golden"."employeeMaster"("id") not valid;

alter table "golden"."empComp" validate constraint "empComp_employeeId_fkey";

grant delete on table "golden"."empComp" to "anon";
grant insert on table "golden"."empComp" to "anon";
grant references on table "golden"."empComp" to "anon";
grant select on table "golden"."empComp" to "anon";
grant trigger on table "golden"."empComp" to "anon";
grant truncate on table "golden"."empComp" to "anon";
grant update on table "golden"."empComp" to "anon";

grant delete on table "golden"."empComp" to "authenticated";
grant insert on table "golden"."empComp" to "authenticated";
grant references on table "golden"."empComp" to "authenticated";
grant select on table "golden"."empComp" to "authenticated";
grant trigger on table "golden"."empComp" to "authenticated";
grant truncate on table "golden"."empComp" to "authenticated";
grant update on table "golden"."empComp" to "authenticated";

grant delete on table "golden"."empComp" to "service_role";
grant insert on table "golden"."empComp" to "service_role";
grant references on table "golden"."empComp" to "service_role";
grant select on table "golden"."empComp" to "service_role";
grant trigger on table "golden"."empComp" to "service_role";
grant truncate on table "golden"."empComp" to "service_role";
grant update on table "golden"."empComp" to "service_role";

-- Example of Creating a compensation record
-- INSERT INTO "empComp" (
--     "employeeId",
--     "basicPay",
--     "allowances",
--     "deductions",
--     "payFrequency",
--     "currency",
--     "effectiveDate",
--     "createdBy"
-- ) VALUES (
--     'employee-uuid-here',                -- employeeId as UUID
--     encryptData('75000.00'),            -- basicPay
--     encryptData('5000.00'),             -- allowances
--     encryptData('2500.00'),             -- deductions
--     encryptData('Monthly'),             -- payFrequency
--     encryptData('USD'),                 -- currency
--     '2024-01-01',                       -- effectiveDate
--     'creator-uuid-here'                 -- createdBy
-- );