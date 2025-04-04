CREATE TABLE "golden"."notificationMaster" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" CHARACTER VARYING NOT NULL,
    "description" TEXT,
    "priority" UUID NOT NULL,
    "purpose" UUID,
    "companyId" UUID NOT NULL,
    "status" UUID NOT NULL,
    "startDate" DATE NOT NULL,
    "startTime" TIME WITH TIME ZONE,
    "recurrence" UUID NOT NULL,
    "doesNotEnd" BOOLEAN,
    "endDate" DATE,
    "endTime" TIME WITH TIME ZONE,
    "endBasedOnEvent" BOOLEAN,
    "endAfterOccurrences" INT,
    "frequency" CHARACTER VARYING,
    "isSilent" BOOLEAN,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "syncToken" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "notificationMaster_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "notificationMaster_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id"),
    CONSTRAINT "notificationMaster_priority_fkey" FOREIGN KEY ("priority") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationMaster_purpose_fkey" FOREIGN KEY ("purpose") REFERENCES"golden"."masterListValue"("id"),
    CONSTRAINT "notificationMaster_status_fkey" FOREIGN KEY ("status") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationMaster_recurrence_fkey" FOREIGN KEY ("recurrence") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "notificationMaster_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationMaster_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "notificationMaster_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
    -- TODO: Add syncToken foreign key
    -- CONSTRAINT "notificationMaster_syncToken_fkey" FOREIGN KEY ("syncToken") REFERENCES "golden"."syncToken"("id")

);

GRANT DELETE ON TABLE "golden"."notificationMaster" TO "anon";
GRANT INSERT ON TABLE "golden"."notificationMaster" TO "anon";
GRANT REFERENCES ON TABLE "golden"."notificationMaster" TO "anon";
GRANT SELECT ON TABLE "golden"."notificationMaster" TO "anon";
GRANT TRIGGER ON TABLE "golden"."notificationMaster" TO "anon"; 
GRANT TRUNCATE ON TABLE "golden"."notificationMaster" TO "anon";
GRANT UPDATE ON TABLE "golden"."notificationMaster" TO "anon";

GRANT DELETE ON TABLE "golden"."notificationMaster" TO "authenticated";
GRANT INSERT ON TABLE "golden"."notificationMaster" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."notificationMaster" TO "authenticated";
GRANT SELECT ON TABLE "golden"."notificationMaster" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."notificationMaster" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."notificationMaster" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."notificationMaster" TO "authenticated";

GRANT DELETE ON TABLE "golden"."notificationMaster" TO "service_role";
GRANT INSERT ON TABLE "golden"."notificationMaster" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."notificationMaster" TO "service_role";
GRANT SELECT ON TABLE "golden"."notificationMaster" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."notificationMaster" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."notificationMaster" TO "service_role";
GRANT UPDATE ON TABLE "golden"."notificationMaster" TO "service_role";
