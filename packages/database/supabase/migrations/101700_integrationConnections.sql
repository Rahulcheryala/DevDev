CREATE TABLE "golden"."integrationConnections" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" CHARACTER VARYING NOT NULL,
    "type" UUID,
    "category" UUID,
    "connector" UUID,
    "description" TEXT,
    "status" UUID NOT NULL,
    "connectionLimit" INT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncToken" UUID,
    CONSTRAINT "integrationConnections_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationConnections_category_fkey" FOREIGN KEY ("connector") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationConnections_connector_fkey" FOREIGN KEY ("category") REFERENCES"golden"."masterListValue"("id"),
    CONSTRAINT "integrationConnections_type_fkey" FOREIGN KEY ("type") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationConnections_status_fkey" FOREIGN KEY ("status") REFERENCES "golden"."masterListValue"("id"),
    CONSTRAINT "integrationConnections_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationConnections_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationConnections_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
    -- TODO: Add syncToken foreign key
    -- CONSTRAINT "notificationMaster_syncToken_fkey" FOREIGN KEY ("syncToken") REFERENCES "golden"."syncToken"("id")
);

GRANT DELETE ON TABLE "golden"."integrationConnections" TO "anon";
GRANT INSERT ON TABLE "golden"."integrationConnections" TO "anon";
GRANT REFERENCES ON TABLE "golden"."integrationConnections" TO "anon";
GRANT SELECT ON TABLE "golden"."integrationConnections" TO "anon";
GRANT TRIGGER ON TABLE "golden"."integrationConnections" TO "anon";
GRANT TRUNCATE ON TABLE "golden"."integrationConnections" TO "anon";
GRANT UPDATE ON TABLE "golden"."integrationConnections" TO "anon";

GRANT DELETE ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT INSERT ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT REFERENCES ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT SELECT ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT TRIGGER ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT TRUNCATE ON TABLE "golden"."integrationConnections" TO "authenticated";
GRANT UPDATE ON TABLE "golden"."integrationConnections" TO "authenticated";

GRANT DELETE ON TABLE "golden"."integrationConnections" TO "service_role";
GRANT INSERT ON TABLE "golden"."integrationConnections" TO "service_role";
GRANT REFERENCES ON TABLE "golden"."integrationConnections" TO "service_role";
GRANT SELECT ON TABLE "golden"."integrationConnections" TO "service_role";
GRANT TRIGGER ON TABLE "golden"."integrationConnections" TO "service_role";
GRANT TRUNCATE ON TABLE "golden"."integrationConnections" TO "service_role";
GRANT UPDATE ON TABLE "golden"."integrationConnections" TO "service_role";
