CREATE TABLE "public"."workflowDataProcessed" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "workflowId" TEXT NOT NULL,
    "eventId" UUID NOT NULL,
    "processedData" JSONB NOT NULL,
    "processedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" UUID NOT NULL,
    "metadata" JSONB DEFAULT '{}'::jsonb,
    "isSystemDefined" BOOLEAN DEFAULT FALSE,
    "companyId" UUID NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "workflowDataProcessed_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "workflowDataProcessed_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."triggerEvents"("id") ON DELETE CASCADE,
    CONSTRAINT "workflowDataProcessed_status_fkey" FOREIGN KEY ("status") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "workflowDataProcessed_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id"),
    CONSTRAINT "workflowDataProcessed_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "public"."workflowDataProcessed" TO "anon";
GRANT INSERT ON TABLE "public"."workflowDataProcessed" TO "anon";
GRANT REFERENCES ON TABLE "public"."workflowDataProcessed" TO "anon";
GRANT SELECT ON TABLE "public"."workflowDataProcessed" TO "anon";
GRANT TRIGGER ON TABLE "public"."workflowDataProcessed" TO "anon";
GRANT TRUNCATE ON TABLE "public"."workflowDataProcessed" TO "anon";
GRANT UPDATE ON TABLE "public"."workflowDataProcessed" TO "anon";

GRANT DELETE ON TABLE "public"."workflowDataProcessed" TO "authenticated";
GRANT INSERT ON TABLE "public"."workflowDataProcessed" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."workflowDataProcessed" TO "authenticated";
GRANT SELECT ON TABLE "public"."workflowDataProcessed" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."workflowDataProcessed" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."workflowDataProcessed" TO "authenticated";
GRANT UPDATE ON TABLE "public"."workflowDataProcessed" TO "authenticated";

GRANT DELETE ON TABLE "public"."workflowDataProcessed" TO "service_role";
GRANT INSERT ON TABLE "public"."workflowDataProcessed" TO "service_role";
GRANT REFERENCES ON TABLE "public"."workflowDataProcessed" TO "service_role";
GRANT SELECT ON TABLE "public"."workflowDataProcessed" TO "service_role";
GRANT TRIGGER ON TABLE "public"."workflowDataProcessed" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."workflowDataProcessed" TO "service_role";
GRANT UPDATE ON TABLE "public"."workflowDataProcessed" TO "service_role";
