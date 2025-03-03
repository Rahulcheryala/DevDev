CREATE TABLE "golden"."notificationRules" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "notificationId" UUID NOT NULL,
    "channelId" UUID NOT NULL,
    "condition" TEXT,
    "escalated" BOOLEAN NOT NULL,
    "doesSLAApply" BOOLEAN,
    "SLAId" UUID,
    "fallback" BOOLEAN,
    "duration" INTERVAL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "syncToken" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "notificationRules_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "notificationRules_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "golden"."notificationMaster"("id"),
    CONSTRAINT "notificationRules_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "golden"."notificationChannels"("id"),
    -- TODO: Add SLAId foreign key
    -- CONSTRAINT "notificationRules_SLAId_fkey" FOREIGN KEY ("SLAId") REFERENCES "golden"."SLA"("id"),
    CONSTRAINT "notificationRules_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationRules_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationRules_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."notificationRules" TO "anon";
GRANT INSERT ON TABLE "golden"."notificationRules" TO "anon";
GRANT REFERENCES ON TABLE "golden"."notificationRules" TO "anon";
GRANT SELECT ON TABLE "golden"."notificationRules" TO "anon";
GRANT TRIGGER ON TABLE "golden"."notificationRules" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."notificationRules" TO "anon";
GRANT UPDATE ON TABLE "golden"."notificationRules" TO "anon";

GRANT DELETE ON TABLE "golden"."notificationRules" TO "authenticated";
GRANT INSERT ON TABLE "golden"."notificationRules" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."notificationRules" TO "authenticated";
GRANT SELECT ON TABLE "golden"."notificationRules" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."notificationRules" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."notificationRules" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."notificationRules" TO "authenticated";

GRANT DELETE ON TABLE "golden"."notificationRules" TO "service_role";
GRANT INSERT ON TABLE "golden"."notificationRules" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."notificationRules" TO "service_role";
GRANT SELECT ON TABLE "golden"."notificationRules" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."notificationRules" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."notificationRules" TO "service_role";
GRANT UPDATE ON TABLE "golden"."notificationRules" TO "service_role";
