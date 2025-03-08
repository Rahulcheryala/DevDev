CREATE TYPE "golden"."encryptionAlgorithm" AS ENUM ('AES', 'RSA', 'SHA256');
CREATE TYPE "golden"."credentialStatus" AS ENUM ('Active', 'Expired', 'Revoked', 'Pending');

CREATE TABLE "golden"."integrationCreds" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "integrationId" UUID NOT NULL,
    "credentials" JSONB,
    "encryptionAlgorithm" "golden"."encryptionAlgorithm",
    "credentialStatus" "golden"."credentialStatus" NOT NULL DEFAULT 'Active'::"golden"."credentialStatus",
    "policy" JSONB,
    "validFrom" TIMESTAMP WITH TIME ZONE,
    "validTo" TIMESTAMP WITH TIME ZONE,
    "issuer" CHARACTER VARYING(255),
    "associatedUser" UUID,
    "scopes" JSONB,
    "refreshToken" JSONB,
    "tokenCache" JSONB,
    "lastUsedAt" TIMESTAMP WITH TIME ZONE,
    "lastFailedAuthAt" TIMESTAMP WITH TIME ZONE,
    "failedAuthCount" INT,
    "credentialNotes" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "lastUpdatedBy" UUID,
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "deletedBy" UUID,
    "syncToken" UUID NOT NULL,
    CONSTRAINT "integrationCreds_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "integrationCreds_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "golden"."integrationsMaster"("id") ON DELETE CASCADE,
    CONSTRAINT "integrationCreds_associatedUser_fkey" FOREIGN KEY ("associatedUser") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationCreds_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationCreds_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "auth"."users"("id"),
    CONSTRAINT "integrationCreds_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "auth"."users"("id")
);

-- Grant permissions
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationCreds" TO "anon";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationCreds" TO "authenticated";
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "golden"."integrationCreds" TO "service_role";
