CREATE TABLE "golden"."notificationEscalations" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "notificationId" UUID NOT NULL,
    "channelId" UUID NOT NULL,
    "escalationLevel" INT NOT NULL,
    "escalateToId" UUID NOT NULL,
    "escalateToType" character varying NOT NULL,
    "doesSLAApply" BOOLEAN,
    "SLAId" UUID,
    "triggerAfter" INTERVAL NOT NULL,
    "status" character varying NOT NULL,
    "resolvedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "syncToken" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "notificationEscalations_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "notificationEscalations_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "golden"."notificationMaster"("id"),
    CONSTRAINT "notificationEscalations_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "golden"."notificationChannels"("id"),
    CONSTRAINT "notificationEscalations_escalateToId_fkey" FOREIGN KEY ("escalateToId") REFERENCES "auth"."users"("id"),
    -- TODO: Add SLAId foreign key
    -- CONSTRAINT "notificationEscalations_SLAId_fkey" FOREIGN KEY ("SLAId") REFERENCES "golden"."SLA"("id"),
    CONSTRAINT "notificationEscalations_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationEscalations_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationEscalations_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."notificationEscalations" TO "anon";
GRANT INSERT ON TABLE "golden"."notificationEscalations" TO "anon";
GRANT REFERENCES ON TABLE "golden"."notificationEscalations" TO "anon";
GRANT SELECT ON TABLE "golden"."notificationEscalations" TO "anon";
GRANT TRIGGER ON TABLE "golden"."notificationEscalations" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."notificationEscalations" TO "anon";
GRANT UPDATE ON TABLE "golden"."notificationEscalations" TO "anon";

GRANT DELETE ON TABLE "golden"."notificationEscalations" TO "authenticated";
GRANT INSERT ON TABLE "golden"."notificationEscalations" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."notificationEscalations" TO "authenticated";
GRANT SELECT ON TABLE "golden"."notificationEscalations" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."notificationEscalations" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."notificationEscalations" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."notificationEscalations" TO "authenticated";

GRANT DELETE ON TABLE "golden"."notificationEscalations" TO "service_role";
GRANT INSERT ON TABLE "golden"."notificationEscalations" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."notificationEscalations" TO "service_role";
GRANT SELECT ON TABLE "golden"."notificationEscalations" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."notificationEscalations" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."notificationEscalations" TO "service_role";
GRANT UPDATE ON TABLE "golden"."notificationEscalations" TO "service_role";
