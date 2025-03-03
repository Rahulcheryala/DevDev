create table "public"."ruleConditions" (
    "conditionId" uuid not null default uuid_generate_v4(),
    "ruleId" uuid not null,
    "fieldName" character varying(255) not null,
    "operator" "ruleOperatorType" not null,
    "value" text not null,
    "logicalGroup" integer not null default 0,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone
);


CREATE INDEX "idxruleConditionslogicalgroup" ON "public"."ruleConditions" USING btree ("logicalGroup");

CREATE INDEX "idxruleConditionsruleId" ON "public"."ruleConditions" USING btree ("ruleId");

CREATE UNIQUE INDEX "ruleConditions_pkey" ON "public"."ruleConditions" USING btree ("conditionId");

alter table "public"."ruleConditions" add constraint "ruleConditions_pkey" PRIMARY KEY using index "ruleConditions_pkey";

alter table "public"."ruleConditions" add constraint "ruleConditions_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES rules("ruleId") not valid;

alter table "public"."ruleConditions" validate constraint "ruleConditions_ruleId_fkey";

grant delete on table "public"."ruleConditions" to "anon";

grant insert on table "public"."ruleConditions" to "anon";

grant references on table "public"."ruleConditions" to "anon";

grant select on table "public"."ruleConditions" to "anon";

grant trigger on table "public"."ruleConditions" to "anon";

grant truncate on table "public"."ruleConditions" to "anon";

grant update on table "public"."ruleConditions" to "anon";

grant delete on table "public"."ruleConditions" to "authenticated";

grant insert on table "public"."ruleConditions" to "authenticated";

grant references on table "public"."ruleConditions" to "authenticated";

grant select on table "public"."ruleConditions" to "authenticated";

grant trigger on table "public"."ruleConditions" to "authenticated";

grant truncate on table "public"."ruleConditions" to "authenticated";

grant update on table "public"."ruleConditions" to "authenticated";

grant delete on table "public"."ruleConditions" to "service_role";

grant insert on table "public"."ruleConditions" to "service_role";

grant references on table "public"."ruleConditions" to "service_role";

grant select on table "public"."ruleConditions" to "service_role";

grant trigger on table "public"."ruleConditions" to "service_role";

grant truncate on table "public"."ruleConditions" to "service_role";

grant update on table "public"."ruleConditions" to "service_role";


