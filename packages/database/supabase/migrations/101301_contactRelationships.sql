create table "golden"."contactRelationships" (
    "id" uuid not null default uuid_generate_v4(),
    "contactId" uuid not null,
    "entityType" bytea not null,
    "entityTypeSearch" text,
    "entityId" uuid not null,
    "relationshipType" bytea,
    "relationshipTypeSearch" text,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxContactRelationshipsContactId" ON golden."contactRelationships" USING btree ("contactId");

CREATE INDEX "idxContactRelationshipsDeletedAt" ON golden."contactRelationships" USING btree ("deletedAt");

CREATE INDEX "idxContactRelationshipsEntityId" ON golden."contactRelationships" USING btree ("entityId");

CREATE INDEX "idxContactRelationshipsEntityTypeSearch" ON golden."contactRelationships" USING btree ("entityTypeSearch");

CREATE INDEX "idxContactRelationshipsRelationTypeSearch" ON golden."contactRelationships" USING btree ("relationshipTypeSearch");

CREATE UNIQUE INDEX "idxUniqueActiveContactRelation" ON golden."contactRelationships" USING btree ("contactId", "entityId", "entityTypeSearch") WHERE ("deletedAt" IS NULL);

alter table "golden"."contactRelationships" add constraint "contactRelationships_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "golden"."contactMaster"("id") not valid;

alter table "golden"."contactRelationships" validate constraint "contactRelationships_contactId_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION "golden"."updateContactRelationshipSearchColumns"()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW."entityTypeSearch" := convert_from(decrypt(NEW."entityType", getEncryptionKey(), 'aes'), 'utf8');
    
    IF NEW."relationshipType" IS NOT NULL THEN
        NEW."relationshipTypeSearch" := convert_from(decrypt(NEW."relationshipType", getEncryptionKey(), 'aes'), 'utf8');
    END IF;
    
    RETURN NEW;
END;
$function$
;

create or replace view "golden"."vwActiveContactRelationships" as  
SELECT 
    cr."id",
    cr."contactId",
    "decryptContactData"(cr."entityType") AS "entityType",
    cr."entityId",
    "decryptContactData"(cr."relationshipType") AS "relationshipType",
    "decryptContactData"(cm."firstName") AS "firstName",
    "decryptContactData"(cm."lastName") AS "lastName",
    "decryptContactData"(cm."email") AS "email",
    "decryptContactData"(cm."phone") AS "phone",
    cr."createdAt",
    cr."createdBy",
    cr."updatedAt",
    cr."lastUpdatedBy",
    cr."syncData"
FROM 
    "golden"."contactRelationships" cr
JOIN 
    "golden"."contactMaster" cm ON (cr."contactId" = cm."id")
WHERE 
    (cr."deletedAt" IS NULL) AND (cm."deletedAt" IS NULL);

grant delete on table "golden"."contactRelationships" to "anon";
grant insert on table "golden"."contactRelationships" to "anon";
grant references on table "golden"."contactRelationships" to "anon";
grant select on table "golden"."contactRelationships" to "anon";
grant trigger on table "golden"."contactRelationships" to "anon";
grant truncate on table "golden"."contactRelationships" to "anon";
grant update on table "golden"."contactRelationships" to "anon";

grant delete on table "golden"."contactRelationships" to "authenticated";
grant insert on table "golden"."contactRelationships" to "authenticated";
grant references on table "golden"."contactRelationships" to "authenticated";
grant select on table "golden"."contactRelationships" to "authenticated";
grant trigger on table "golden"."contactRelationships" to "authenticated";
grant truncate on table "golden"."contactRelationships" to "authenticated";
grant update on table "golden"."contactRelationships" to "authenticated";

grant delete on table "golden"."contactRelationships" to "service_role";
grant insert on table "golden"."contactRelationships" to "service_role";
grant references on table "golden"."contactRelationships" to "service_role";
grant select on table "golden"."contactRelationships" to "service_role";
grant trigger on table "golden"."contactRelationships" to "service_role";
grant truncate on table "golden"."contactRelationships" to "service_role";
grant update on table "golden"."contactRelationships" to "service_role";

-- Potential triggers you might want to add
CREATE TRIGGER "maintainContactRelationshipSearchColumns" 
BEFORE INSERT OR UPDATE ON "golden"."contactRelationships" 
FOR EACH ROW 
EXECUTE FUNCTION "golden"."updateContactRelationshipSearchColumns"();

-- Example of Creating new contact relationship
-- INSERT INTO "contactRelationships" (
--     "contactId",
--     "entityType",
--     "entityId",
--     "relationshipType",
--     "createdBy"
-- ) VALUES (
--     'contact-uuid-here',
--     encryptContactData('Vendor'),
--     'entity-uuid-here',
--     encryptContactData('Primary'),
--     'user-uuid-here'
-- );

-- Example 2: Query relationships by type
-- SELECT 
--     cr."id",
--     cr."contactId",
--     decryptContactData(cr."entityType") as "entityType",
--     cr."entityId",
--     decryptContactData(cr."relationshipType") as "relationshipType",
--     decryptContactData(cm."firstName") as "contactFirstName",
--     decryptContactData(cm."lastName") as "contactLastName"
-- FROM 
--     "contactRelationships" cr
-- JOIN 
--     "contactMaster" cm ON cr."contactId" = cm."id"
-- WHERE 
--     cr."entityTypeSearch" = 'Vendor'
--     AND cr."relationshipTypeSearch" = 'Primary';

-- Example 3: Update relationship type
-- UPDATE "contactRelationships"
-- SET 
--     "relationshipType" = encryptContactData('Billing'),
--     "lastUpdatedBy" = 'user-uuid-here'
-- WHERE 
--     "contactId" = 'contact-uuid-here'
--     AND "entityId" = 'entity-uuid-here';

-- Example 4: Get all active relationships for a contact
-- SELECT 
--     decryptContactData("entityType") as "entityType",
--     decryptContactData("relationshipType") as "relationshipType",
--     "entityId"
-- FROM 
--     "contactRelationships"
-- WHERE 
--     "contactId" = 'contact-uuid-here'
--     AND "deletedAt" IS NULL;

-- Example 5: Using the view for simplified access
-- SELECT * 
-- FROM "vwActiveContactRelationships"
-- WHERE "entityType" = 'Vendor';

-- Example 6: Soft delete a relationship
-- UPDATE "contactRelationships"
-- SET 
--     "deletedAt" = CURRENT_TIMESTAMP,
--     "deletedBy" = 'user-uuid-here'
-- WHERE 
--     "contactId" = 'contact-uuid-here'
--     AND "entityId" = 'entity-uuid-here';