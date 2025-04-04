create table "public"."ruleExecutionLogs" (
    "logId" uuid not null default uuid_generate_v4(),
    "ruleId" uuid not null,
    "triggerId" uuid,
    "actionId" uuid,
    "executionTime" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "status" "ruleExecutionStatus" not null,
    "errorDetails" text,
    "logDetails" jsonb
);


CREATE INDEX "idxruleExecutionLogsruleId" ON "public"."ruleExecutionLogs" USING btree ("ruleId");

CREATE INDEX "idxruleExecutionLogsstatus" ON "public"."ruleExecutionLogs" USING btree (status);

CREATE INDEX "idxruleExecutionLogstime" ON "public"."ruleExecutionLogs" USING btree ("executionTime");

CREATE UNIQUE INDEX "ruleExecutionLogs_pkey" ON "public"."ruleExecutionLogs" USING btree ("logId");

alter table "public"."ruleExecutionLogs" add constraint "ruleExecutionLogs_pkey" PRIMARY KEY using index "ruleExecutionLogs_pkey";

alter table "public"."ruleExecutionLogs" add constraint "ruleExecutionLogs_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "ruleActions"("actionId") not valid;

alter table "public"."ruleExecutionLogs" validate constraint "ruleExecutionLogs_actionId_fkey";

alter table "public"."ruleExecutionLogs" add constraint "ruleExecutionLogs_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES rules("ruleId") not valid;

alter table "public"."ruleExecutionLogs" validate constraint "ruleExecutionLogs_ruleId_fkey";

alter table "public"."ruleExecutionLogs" add constraint "ruleExecutionLogs_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "ruleTriggers"("triggerId") not valid;

alter table "public"."ruleExecutionLogs" validate constraint "ruleExecutionLogs_triggerId_fkey";

grant delete on table "public"."ruleExecutionLogs" to "anon";

grant insert on table "public"."ruleExecutionLogs" to "anon";

grant references on table "public"."ruleExecutionLogs" to "anon";

grant select on table "public"."ruleExecutionLogs" to "anon";

grant trigger on table "public"."ruleExecutionLogs" to "anon";

grant truncate on table "public"."ruleExecutionLogs" to "anon";

grant update on table "public"."ruleExecutionLogs" to "anon";

grant delete on table "public"."ruleExecutionLogs" to "authenticated";

grant insert on table "public"."ruleExecutionLogs" to "authenticated";

grant references on table "public"."ruleExecutionLogs" to "authenticated";

grant select on table "public"."ruleExecutionLogs" to "authenticated";

grant trigger on table "public"."ruleExecutionLogs" to "authenticated";

grant truncate on table "public"."ruleExecutionLogs" to "authenticated";

grant update on table "public"."ruleExecutionLogs" to "authenticated";

grant delete on table "public"."ruleExecutionLogs" to "service_role";

grant insert on table "public"."ruleExecutionLogs" to "service_role";

grant references on table "public"."ruleExecutionLogs" to "service_role";

grant select on table "public"."ruleExecutionLogs" to "service_role";

grant trigger on table "public"."ruleExecutionLogs" to "service_role";

grant truncate on table "public"."ruleExecutionLogs" to "service_role";

grant update on table "public"."ruleExecutionLogs" to "service_role";


