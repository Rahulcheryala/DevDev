create type "public"."ruleActionType" as enum ('SendNotification', 'TransformData', 'APICall');

create type "public"."ruleEventType" as enum ('FormSubmission', 'APICall');

create type "public"."ruleExecutionStatus" as enum ('Success', 'Failure');

create type "public"."ruleOperatorType" as enum ('Equal', 'NotEqual', 'GreaterThan', 'And', 'Or');

create type "public"."ruleStatus" as enum ('Active', 'Inactive', 'Draft');

create type "public"."ruleType" as enum ('Validation', 'Substitution', 'Custom');

create table "public"."rules" (
    "ruleId" uuid not null default uuid_generate_v4(),
    "name" character varying(255) not null,
    "type" "ruleType" not null,
    "priority" integer not null default 0,
    "isglobal" boolean not null default false,
    "createdBy" uuid not null,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone,
    "description" text,
    "status" "ruleStatus" not null default 'Draft'::"ruleStatus"
);


CREATE INDEX idxrulespriority ON public.rules USING btree (priority);

CREATE INDEX idxrulesstatus ON public.rules USING btree (status);

CREATE UNIQUE INDEX rules_pkey ON public.rules USING btree ("ruleId");

alter table "public"."rules" add constraint "rules_pkey" PRIMARY KEY using index "rules_pkey";

grant delete on table "public"."rules" to "anon";

grant insert on table "public"."rules" to "anon";

grant references on table "public"."rules" to "anon";

grant select on table "public"."rules" to "anon";

grant trigger on table "public"."rules" to "anon";

grant truncate on table "public"."rules" to "anon";

grant update on table "public"."rules" to "anon";

grant delete on table "public"."rules" to "authenticated";

grant insert on table "public"."rules" to "authenticated";

grant references on table "public"."rules" to "authenticated";

grant select on table "public"."rules" to "authenticated";

grant trigger on table "public"."rules" to "authenticated";

grant truncate on table "public"."rules" to "authenticated";

grant update on table "public"."rules" to "authenticated";

grant delete on table "public"."rules" to "service_role";

grant insert on table "public"."rules" to "service_role";

grant references on table "public"."rules" to "service_role";

grant select on table "public"."rules" to "service_role";

grant trigger on table "public"."rules" to "service_role";

grant truncate on table "public"."rules" to "service_role";

grant update on table "public"."rules" to "service_role";


