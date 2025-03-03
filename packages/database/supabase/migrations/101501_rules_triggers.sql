CREATE TABLE "public"."ruleTriggers" (
    "triggerId" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "ruleId" uuid NOT NULL,
    "eventType" "ruleEventType" NOT NULL,
    "sourceSystem" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone
);

CREATE INDEX "idxRuleTriggersEventType" ON "public"."ruleTriggers" USING btree ("eventType");
CREATE INDEX "idxRuleTriggersRuleId" ON "public"."ruleTriggers" USING btree ("ruleId");
CREATE INDEX "idxRuleTriggersSourceSystem" ON "public"."ruleTriggers" USING btree ("sourceSystem");
CREATE UNIQUE INDEX "ruleTriggers_pkey" ON "public"."ruleTriggers" USING btree ("triggerId");

ALTER TABLE "public"."ruleTriggers" ADD CONSTRAINT "ruleTriggers_pkey" 
    PRIMARY KEY USING INDEX "ruleTriggers_pkey";


ALTER TABLE "public"."ruleTriggers" ADD CONSTRAINT "ruleTriggers_ruleId_fkey" 
    FOREIGN KEY ("ruleId") REFERENCES "public"."rules"("ruleId");

ALTER TABLE "public"."ruleTriggers" VALIDATE CONSTRAINT "ruleTriggers_ruleId_fkey";

grant delete on table "public"."ruleTriggers" to "anon";

grant insert on table "public"."ruleTriggers" to "anon";

grant references on table "public"."ruleTriggers" to "anon";

grant select on table "public"."ruleTriggers" to "anon";

grant trigger on table "public"."ruleTriggers" to "anon";

grant truncate on table "public"."ruleTriggers" to "anon";

grant update on table "public"."ruleTriggers" to "anon";

grant delete on table "public"."ruleTriggers" to "authenticated";

grant insert on table "public"."ruleTriggers" to "authenticated";

grant references on table "public"."ruleTriggers" to "authenticated";

grant select on table "public"."ruleTriggers" to "authenticated";

grant trigger on table "public"."ruleTriggers" to "authenticated";

grant truncate on table "public"."ruleTriggers" to "authenticated";

grant update on table "public"."ruleTriggers" to "authenticated";

grant delete on table "public"."ruleTriggers" to "service_role";

grant insert on table "public"."ruleTriggers" to "service_role";

grant references on table "public"."ruleTriggers" to "service_role";

grant select on table "public"."ruleTriggers" to "service_role";

grant trigger on table "public"."ruleTriggers" to "service_role";

grant truncate on table "public"."ruleTriggers" to "service_role";

grant update on table "public"."ruleTriggers" to "service_role";


