-- This is the base for employee encryption
create type "public"."employeeTypes" as enum ('FULL-TIME', 'PART-TIME', 'CONTRACTOR');

create type "public"."employmentStatus" as enum ('ACTIVE', 'INACTIVE', 'TERMINATED');

create type "public"."ethnicity" as enum ('HISPANIC_OR_LATINO', 'NOT_HISPANIC_OR_LATINO', 'PREFER_NOT_TO_SAY', 'ASIAN');

create type "public"."gender" as enum ('Male', 'Female', 'Other');

create type "public"."leaveStatus" as enum ('APPROVED', 'PENDING', 'REJECTED');

create type "public"."leaveType" as enum ('Sick', 'Vacation', 'Unpaid');

create type "public"."maritalStatus" as enum ('SINGLE', 'MARRIED', 'DIVORCED');

create type "public"."payFrequency" as enum ('Monthly', 'Bi-weekly');

create type "public"."proficiencyLevel" as enum ('Beginner', 'Intermediate', 'Expert');

create type "public"."workAuthStatus" as enum ('CITIZEN', 'PERMANENT_RESIDENT', 'WORK_VISA', 'OTHER');

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.decryptData(pEncryptedData bytea)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    IF pEncryptedData IS NULL THEN
        RETURN NULL;
    END IF;
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

CREATE OR REPLACE FUNCTION public.decryptJsonData(pEncryptedData bytea)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    IF pEncryptedData IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN convert_from(
        decrypt(
            pEncryptedData,
            getEncryptionKey(),
            'aes'
        ),
        'utf8'
    )::jsonb;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.encryptData(pData text)
 RETURNS bytea
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    IF pData IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN encrypt(
        convert_to(pData, 'utf8'),
        getEncryptionKey(),
        'aes'
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.encryptJsonData(pData jsonb)
 RETURNS bytea
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    IF pData IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN encrypt(
        convert_to(pData::text, 'utf8'),
        getEncryptionKey(),
        'aes'
    );
END;
$function$
;