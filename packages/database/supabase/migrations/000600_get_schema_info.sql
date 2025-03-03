create sequence "public"."allColumns_id_seq";

create table "public"."allColumns" (
    "id" bigint not null default nextval('"allColumns_id_seq"'::regclass),
    "table_name" text not null,
    "column_name" text not null,
    "data_type" text not null,
    "created_at" timestamp with time zone default now()
);


alter sequence "public"."allColumns_id_seq" owned by "public"."allColumns"."id";

CREATE UNIQUE INDEX "allColumns_pkey" ON public."allColumns" USING btree (id);

alter table "public"."allColumns" add constraint "allColumns_pkey" PRIMARY KEY using index "allColumns_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_schema_info()
RETURNS TABLE (
    table_name text,
    column_name text,
    column_description text,
    data_type text,
    character_maximum_length integer,
    numeric_precision integer,
    numeric_scale integer,
    is_nullable boolean,
    column_default text,
    is_identity boolean,
    is_updatable boolean,
    is_unique boolean,
    foreign_key_info jsonb
)
LANGUAGE sql
SECURITY DEFINER
AS $function$
    WITH unique_constraints AS (
        SELECT
            tc.table_schema,
            tc.table_name,
            kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.constraint_column_usage ccu 
            ON tc.constraint_name = ccu.constraint_name
            AND tc.table_schema = ccu.table_schema
        JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'UNIQUE'
    ),
    foreign_keys AS (
        SELECT
            tc.table_schema,
            tc.table_name,
            kcu.column_name,
            jsonb_build_object(
                'foreign_table', ccu.table_name,
                'foreign_column', ccu.column_name
            ) as fk_info
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage ccu
            ON tc.constraint_name = ccu.constraint_name
            AND tc.table_schema = ccu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
    )
    SELECT 
        c.table_name::text,
        c.column_name::text,
        pd.description as column_description,
        c.data_type::text,
        c.character_maximum_length,
        c.numeric_precision,
        c.numeric_scale,
        CASE WHEN c.is_nullable = 'YES' THEN true ELSE false END as is_nullable,
        c.column_default::text,
        CASE WHEN c.is_identity = 'YES' THEN true ELSE false END as is_identity,
        CASE WHEN c.is_updatable = 'YES' THEN true ELSE false END as is_updatable,
        CASE WHEN uc.column_name IS NOT NULL THEN true ELSE false END as is_unique,
        fk.fk_info as foreign_key_info
    FROM information_schema.columns c
    LEFT JOIN pg_catalog.pg_statio_all_tables st 
        ON c.table_schema = st.schemaname 
        AND c.table_name = st.relname
    LEFT JOIN pg_catalog.pg_description pd
        ON pd.objoid = st.relid 
        AND pd.objsubid = c.ordinal_position
    LEFT JOIN unique_constraints uc
        ON c.table_schema = uc.table_schema
        AND c.table_name = uc.table_name
        AND c.column_name = uc.column_name
    LEFT JOIN foreign_keys fk
        ON c.table_schema = fk.table_schema
        AND c.table_name = fk.table_name
        AND c.column_name = fk.column_name
    WHERE c.table_schema = 'public';
$function$;

grant delete on table "public"."allColumns" to "anon";

grant insert on table "public"."allColumns" to "anon";

grant references on table "public"."allColumns" to "anon";

grant select on table "public"."allColumns" to "anon";

grant trigger on table "public"."allColumns" to "anon";

grant truncate on table "public"."allColumns" to "anon";

grant update on table "public"."allColumns" to "anon";

grant delete on table "public"."allColumns" to "authenticated";

grant insert on table "public"."allColumns" to "authenticated";

grant references on table "public"."allColumns" to "authenticated";

grant select on table "public"."allColumns" to "authenticated";

grant trigger on table "public"."allColumns" to "authenticated";

grant truncate on table "public"."allColumns" to "authenticated";

grant update on table "public"."allColumns" to "authenticated";

grant delete on table "public"."allColumns" to "service_role";

grant insert on table "public"."allColumns" to "service_role";

grant references on table "public"."allColumns" to "service_role";

grant select on table "public"."allColumns" to "service_role";

grant trigger on table "public"."allColumns" to "service_role";

grant truncate on table "public"."allColumns" to "service_role";

grant update on table "public"."allColumns" to "service_role";


