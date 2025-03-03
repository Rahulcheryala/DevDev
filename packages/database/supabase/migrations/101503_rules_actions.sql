create table "public"."ruleActions" (
    "actionId" uuid not null default uuid_generate_v4(),
    "ruleId" uuid not null,
    "actionType" "ruleActionType" not null,
    "actionTarget" character varying(255) not null,
    "actionDetails" jsonb not null,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone
);


CREATE INDEX "idxruleActionsruleId" ON "public"."ruleActions" USING btree ("ruleId");

CREATE INDEX "idxruleActionsType" ON "public"."ruleActions" USING btree ("actionType");

CREATE UNIQUE INDEX "ruleActions_pkey" ON "public"."ruleActions" USING btree ("actionId");

alter table "public"."ruleActions" add constraint "ruleActions_pkey" PRIMARY KEY using index "ruleActions_pkey";

alter table "public"."ruleActions" add constraint "ruleActions_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES rules("ruleId") not valid;

alter table "public"."ruleActions" validate constraint "ruleActions_ruleId_fkey";

grant delete on table "public"."ruleActions" to "anon";

grant insert on table "public"."ruleActions" to "anon";

grant references on table "public"."ruleActions" to "anon";

grant select on table "public"."ruleActions" to "anon";

grant trigger on table "public"."ruleActions" to "anon";

grant truncate on table "public"."ruleActions" to "anon";

grant update on table "public"."ruleActions" to "anon";

grant delete on table "public"."ruleActions" to "authenticated";

grant insert on table "public"."ruleActions" to "authenticated";

grant references on table "public"."ruleActions" to "authenticated";

grant select on table "public"."ruleActions" to "authenticated";

grant trigger on table "public"."ruleActions" to "authenticated";

grant truncate on table "public"."ruleActions" to "authenticated";

grant update on table "public"."ruleActions" to "authenticated";

grant delete on table "public"."ruleActions" to "service_role";

grant insert on table "public"."ruleActions" to "service_role";

grant references on table "public"."ruleActions" to "service_role";

grant select on table "public"."ruleActions" to "service_role";

grant trigger on table "public"."ruleActions" to "service_role";

grant truncate on table "public"."ruleActions" to "service_role";

grant update on table "public"."ruleActions" to "service_role";


