CREATE TABLE "golden"."notificationChannels" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "notificationId" UUID NOT NULL,
    "channelType" CHARACTER VARYING NOT NULL,
    "templateId" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "primaryChannel" UUID NOT NULL,
    "fallbackChannel" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "syncToken" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "notificationChannels_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "notificationChannels_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "golden"."notificationMaster"("id"),
    CONSTRAINT "notificationChannels_primaryChannel_fkey" FOREIGN KEY ("primaryChannel") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationChannels_fallbackChannel_fkey" FOREIGN KEY ("fallbackChannel") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationChannels_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationChannels_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationChannels_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
    -- TODO: Add syncToken foreign key
    -- CONSTRAINT "notificationChannels_syncToken_fkey" FOREIGN KEY ("syncToken") REFERENCES "golden"."syncToken"("id")
);

GRANT DELETE ON TABLE "golden"."notificationChannels" TO "anon";
GRANT INSERT ON TABLE "golden"."notificationChannels" TO "anon";
GRANT REFERENCES ON TABLE "golden"."notificationChannels" TO "anon";
GRANT SELECT ON TABLE "golden"."notificationChannels" TO "anon";
GRANT TRIGGER ON TABLE "golden"."notificationChannels" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."notificationChannels" TO "anon";
GRANT UPDATE ON TABLE "golden"."notificationChannels" TO "anon";

GRANT DELETE ON TABLE "golden"."notificationChannels" TO "authenticated";
GRANT INSERT ON TABLE "golden"."notificationChannels" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."notificationChannels" TO "authenticated";
GRANT SELECT ON TABLE "golden"."notificationChannels" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."notificationChannels" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."notificationChannels" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."notificationChannels" TO "authenticated";

GRANT DELETE ON TABLE "golden"."notificationChannels" TO "service_role";
GRANT INSERT ON TABLE "golden"."notificationChannels" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."notificationChannels" TO "service_role";
GRANT SELECT ON TABLE "golden"."notificationChannels" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."notificationChannels" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."notificationChannels" TO "service_role";
GRANT UPDATE ON TABLE "golden"."notificationChannels" TO "service_role";
