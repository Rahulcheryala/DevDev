create table "golden"."contactMaster" (
    "id" uuid not null default uuid_generate_v4(),
    "firstName" bytea not null,
    "firstNameSearch" text,
    "lastName" bytea not null,
    "lastNameSearch" text,
    "email" bytea,
    "emailSearch" text,
    "phone" bytea,
    "phoneSearch" text,
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid,
    "syncData" jsonb,
    PRIMARY KEY ("id")
);

CREATE INDEX "idxContactMasterDeletedAt" ON golden."contactMaster" USING btree ("deletedAt");

CREATE INDEX "idxContactMasterEmailSearch" ON golden."contactMaster" USING btree ("emailSearch") WHERE ("emailSearch" IS NOT NULL);

CREATE INDEX "idxContactMasterFullNameSearch" ON golden."contactMaster" USING btree ("firstNameSearch", "lastNameSearch");

CREATE INDEX "idxContactMasterPhoneSearch" ON golden."contactMaster" USING btree ("phoneSearch") WHERE ("phoneSearch" IS NOT NULL);

alter table "golden"."contactMaster" add constraint "emailFormat" CHECK ((("emailSearch" IS NULL) OR ("emailSearch" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text))) not valid;

alter table "golden"."contactMaster" validate constraint "emailFormat";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION "decryptContactData"(pEncryptedData bytea)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN convert_from(
        decrypt(
            pEncryptedData,
            getEncryptionKey(),
            'aes'
        ),
        'utf8'
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION golden.encryptContactData(pData text)
 RETURNS bytea
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN encrypt(
        convert_to(pData, 'utf8'),
        getEncryptionKey(),
        'aes'
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION golden.getEncryptionKey()
 RETURNS bytea
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- In production, this should be fetched from a secure key management service (need to change)
    RETURN decode('0123456789abcdef0123456789abcdef', 'hex');
END;
$function$
;

grant delete on table "golden"."contactMaster" to "anon";
grant insert on table "golden"."contactMaster" to "anon";
grant references on table "golden"."contactMaster" to "anon";
grant select on table "golden"."contactMaster" to "anon";
grant trigger on table "golden"."contactMaster" to "anon";
grant truncate on table "golden"."contactMaster" to "anon";
grant update on table "golden"."contactMaster" to "anon";

grant delete on table "golden"."contactMaster" to "authenticated";
grant insert on table "golden"."contactMaster" to "authenticated";
grant references on table "golden"."contactMaster" to "authenticated";
grant select on table "golden"."contactMaster" to "authenticated";
grant trigger on table "golden"."contactMaster" to "authenticated";
grant truncate on table "golden"."contactMaster" to "authenticated";
grant update on table "golden"."contactMaster" to "authenticated";

grant delete on table "golden"."contactMaster" to "service_role";
grant insert on table "golden"."contactMaster" to "service_role";
grant references on table "golden"."contactMaster" to "service_role";
grant select on table "golden"."contactMaster" to "service_role";
grant trigger on table "golden"."contactMaster" to "service_role";
grant truncate on table "golden"."contactMaster" to "service_role";
grant update on table "golden"."contactMaster" to "service_role";