create table "golden"."employeeMaster" (
    "id" uuid not null default uuid_generate_v4(),
    "firstName" bytea not null,
    "lastName" bytea not null,
    "middleName" bytea,
    "email" bytea,
    "phoneNumber" bytea,
    "dateOfBirth" bytea,
    "gender" bytea,
    "nationality" bytea,
    "maritalStatus" bytea,
    "employmentStatus" bytea not null,
    "hireDate" bytea not null,
    "terminationDate" bytea,
    "employeeTypeId" UUID not null,
    "companyId" UUID not null,
    "primaryCompanyId" uuid,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    PRIMARY KEY ("id")
);

grant delete on table "golden"."employeeMaster" to "anon";
grant insert on table "golden"."employeeMaster" to "anon";
grant references on table "golden"."employeeMaster" to "anon";
grant select on table "golden"."employeeMaster" to "anon";
grant trigger on table "golden"."employeeMaster" to "anon";
grant truncate on table "golden"."employeeMaster" to "anon";
grant update on table "golden"."employeeMaster" to "anon";

grant delete on table "golden"."employeeMaster" to "authenticated";
grant insert on table "golden"."employeeMaster" to "authenticated";
grant references on table "golden"."employeeMaster" to "authenticated";
grant select on table "golden"."employeeMaster" to "authenticated";
grant trigger on table "golden"."employeeMaster" to "authenticated";
grant truncate on table "golden"."employeeMaster" to "authenticated";
grant update on table "golden"."employeeMaster" to "authenticated";

grant delete on table "golden"."employeeMaster" to "service_role";
grant insert on table "golden"."employeeMaster" to "service_role";
grant references on table "golden"."employeeMaster" to "service_role";
grant select on table "golden"."employeeMaster" to "service_role";
grant trigger on table "golden"."employeeMaster" to "service_role";
grant truncate on table "golden"."employeeMaster" to "service_role";
grant update on table "golden"."employeeMaster" to "service_role";

-- Example of Creating a new employee
-- INSERT INTO "employeeMaster" (
--     "firstName",
--     "lastName",
--     "middleName",
--     "email",
--     "phoneNumber",
--     "dateOfBirth",
--     "gender",
--     "nationality",
--     "maritalStatus",
--     "employmentStatus",
--     "hireDate",
--     "employeeType",
--     "primaryCompanyId",
--     "createdBy"
-- ) VALUES (
--     encryptData('John'),                     -- firstName
--     encryptData('Doe'),                      -- lastName
--     encryptData('Robert'),                   -- middleName
--     encryptData('john.doe@company.com'),     -- email
--     encryptData('1234567890'),              -- phoneNumber
--     encryptData('1990-01-01'),              -- dateOfBirth
--     encryptData('Male'),                     -- gender
--     encryptData('US'),                       -- nationality
--     encryptData('MARRIED'),                  -- maritalStatus
--     encryptData('ACTIVE'),                   -- employmentStatus
--     encryptData('2023-01-01'),              -- hireDate
--     encryptData('FULL-TIME'),               -- employeeType
--     'company-uuid-here',                     -- primaryCompanyId
--     'creator-uuid-here'                      -- createdBy
-- );

-- Example 2: Reading employee data
-- SELECT 
--     "id",
--     decryptData("firstName") as "firstName",
--     decryptData("lastName") as "lastName",
--     decryptData("middleName") as "middleName",
--     decryptData("email") as "email",
--     decryptData("phoneNumber") as "phoneNumber",
--     decryptData("dateOfBirth") as "dateOfBirth",
--     decryptData("gender") as "gender",
--     decryptData("nationality") as "nationality",
--     decryptData("maritalStatus") as "maritalStatus",
--     decryptData("employmentStatus") as "employmentStatus",
--     decryptData("hireDate") as "hireDate",
--     decryptData("employeeType") as "employeeType"
-- FROM "employeeMaster"
-- WHERE "id" = 'employee-uuid-here';