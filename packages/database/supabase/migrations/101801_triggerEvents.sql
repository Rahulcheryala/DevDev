CREATE TYPE "triggerType" AS ENUM('DATA_CHANGE', 'SYSTEM_EVENT', 'USER_ACTION', 'CRON', 'TIME_BASED');
CREATE TYPE "triggerStatus" AS ENUM('ACTIVE', 'INACTIVE', 'PAUSED', 'ERROR');

CREATE TABLE "public"."triggerEvents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "scope" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "companyId" UUID,
    "description" TEXT,
    "type" "triggerType",
    "status" "triggerStatus",
    "scheduleExpression" TEXT,
    "eventConditions" JSONB,
    "metadata" JSONB DEFAULT '{}'::jsonb,
    "isSystemDefined" BOOLEAN DEFAULT FALSE,
    "categoryId" UUID NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" UUID,
    "modifiedOn" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "deletedOn" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "triggerEvents_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "triggerEvents_scope_fkey" FOREIGN KEY ("scope") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "triggerEvents_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."triggerCategories"("id") ON DELETE CASCADE,
    CONSTRAINT "triggerEvents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenantMaster"("id"),
    CONSTRAINT "triggerEvents_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id"),
    CONSTRAINT "triggerEvents_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "triggerEvents_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "triggerEvents_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."triggerEvents" TO "anon";
GRANT INSERT ON TABLE "public"."triggerEvents" TO "anon";
GRANT REFERENCES ON TABLE "public"."triggerEvents" TO "anon";
GRANT SELECT ON TABLE "public"."triggerEvents" TO "anon";
GRANT TRIGGER ON TABLE "public"."triggerEvents" TO "anon";
GRANT TRUNCATE ON TABLE "public"."triggerEvents" TO "anon";
GRANT UPDATE ON TABLE "public"."triggerEvents" TO "anon";

GRANT DELETE ON TABLE "public"."triggerEvents" TO "authenticated";
GRANT INSERT ON TABLE "public"."triggerEvents" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."triggerEvents" TO "authenticated";
GRANT SELECT ON TABLE "public"."triggerEvents" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."triggerEvents" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."triggerEvents" TO "authenticated";
GRANT UPDATE ON TABLE "public"."triggerEvents" TO "authenticated";

GRANT DELETE ON TABLE "public"."triggerEvents" TO "service_role";
GRANT INSERT ON TABLE "public"."triggerEvents" TO "service_role";
GRANT REFERENCES ON TABLE "public"."triggerEvents" TO "service_role";
GRANT SELECT ON TABLE "public"."triggerEvents" TO "service_role";
GRANT TRIGGER ON TABLE "public"."triggerEvents" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."triggerEvents" TO "service_role";
GRANT UPDATE ON TABLE "public"."triggerEvents" TO "service_role";
