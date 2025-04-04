CREATE TABLE "golden"."notificationResponses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "notificationId" UUID NOT NULL,
    "channelId" UUID NOT NULL,
    "recipientId" UUID NOT NULL,
    "recipientType" UUID NOT NULL,
    "sharedWith" JSONB,
    "status" UUID NOT NULL,
    "response" TEXT,
    "responseTimestamp" TIMESTAMP WITH TIME ZONE,
    "deliveryTimestamp" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "syncToken" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "notificationResponses_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "notificationResponses_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "golden"."notificationMaster"("id"),
    CONSTRAINT "notificationResponses_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "golden"."notificationChannels"("id"),
    -- TODO: Add recipientId foreign key
    -- CONSTRAINT "notificationResponses_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "auth"."users"("id"),
    -- TODO: Add syncToken foreign key
    -- CONSTRAINT "notificationResponses_syncToken_fkey" FOREIGN KEY ("syncToken") REFERENCES "golden"."syncToken"("id")
    CONSTRAINT "notificationResponses_recipientType_fkey" FOREIGN KEY ("recipientType") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationResponses_status_fkey" FOREIGN KEY ("status") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationResponses_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationResponses_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationResponses_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

GRANT DELETE ON TABLE "golden"."notificationResponses" TO "anon";
GRANT INSERT ON TABLE "golden"."notificationResponses" TO "anon";
GRANT REFERENCES ON TABLE "golden"."notificationResponses" TO "anon";
GRANT SELECT ON TABLE "golden"."notificationResponses" TO "anon";
GRANT TRIGGER ON TABLE "golden"."notificationResponses" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."notificationResponses" TO "anon";
GRANT UPDATE ON TABLE "golden"."notificationResponses" TO "anon";

GRANT DELETE ON TABLE "golden"."notificationResponses" TO "authenticated";
GRANT INSERT ON TABLE "golden"."notificationResponses" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."notificationResponses" TO "authenticated";
GRANT SELECT ON TABLE "golden"."notificationResponses" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."notificationResponses" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."notificationResponses" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."notificationResponses" TO "authenticated";

GRANT DELETE ON TABLE "golden"."notificationResponses" TO "service_role";
GRANT INSERT ON TABLE "golden"."notificationResponses" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."notificationResponses" TO "service_role";
GRANT SELECT ON TABLE "golden"."notificationResponses" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."notificationResponses" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."notificationResponses" TO "service_role";
GRANT UPDATE ON TABLE "golden"."notificationResponses" TO "service_role";
