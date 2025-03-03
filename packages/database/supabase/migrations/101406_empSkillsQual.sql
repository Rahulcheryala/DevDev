create table "golden"."empSkillsQual" (
    "id" uuid not null default uuid_generate_v4(),
    "employeeId" uuid not null,
    "skillName" bytea not null,
    "proficiencyLevel" "proficiencyLevel",
    "certificationDate" bytea,
    "expirationDate" bytea,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    CONSTRAINT "empSkillsQual_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "empSkillsQual_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "golden"."employeeMaster"("id")
);

grant delete on table "golden"."empSkillsQual" to "anon";
grant insert on table "golden"."empSkillsQual" to "anon";
grant references on table "golden"."empSkillsQual" to "anon";
grant select on table "golden"."empSkillsQual" to "anon";
grant trigger on table "golden"."empSkillsQual" to "anon";
grant truncate on table "golden"."empSkillsQual" to "anon";
grant update on table "golden"."empSkillsQual" to "anon";

grant delete on table "golden"."empSkillsQual" to "authenticated";
grant insert on table "golden"."empSkillsQual" to "authenticated";
grant references on table "golden"."empSkillsQual" to "authenticated";
grant select on table "golden"."empSkillsQual" to "authenticated";
grant trigger on table "golden"."empSkillsQual" to "authenticated";
grant truncate on table "golden"."empSkillsQual" to "authenticated";
grant update on table "golden"."empSkillsQual" to "authenticated";

grant delete on table "golden"."empSkillsQual" to "service_role";
grant insert on table "golden"."empSkillsQual" to "service_role";
grant references on table "golden"."empSkillsQual" to "service_role";
grant select on table "golden"."empSkillsQual" to "service_role";
grant trigger on table "golden"."empSkillsQual" to "service_role";
grant truncate on table "golden"."empSkillsQual" to "service_role";
grant update on table "golden"."empSkillsQual" to "service_role";
