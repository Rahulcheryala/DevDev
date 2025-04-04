CREATE TABLE "public"."masterList" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" CHARACTER VARYING NOT NULL,
    "code" CHARACTER VARYING,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "inactivatedAt" TIMESTAMP WITH TIME ZONE,
    "inactivatedBy" UUID,
    "purpose" TEXT,
    "metadata" JSONB,
    "syncToken" TEXT,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    CONSTRAINT "masterList_pkey" PRIMARY KEY ("id")
);


GRANT SELECT ON TABLE "public"."masterList" TO "anon";

GRANT SELECT ON TABLE "public"."masterList" TO "authenticated";

GRANT SELECT ON TABLE "public"."masterList" TO "service_role";

