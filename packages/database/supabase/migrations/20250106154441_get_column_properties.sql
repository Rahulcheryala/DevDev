set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_column_properties()
 RETURNS TABLE(table_name text, column_name text, is_nullable boolean, module text, foreign_key_info jsonb)
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
    SELECT 
        c.relname as table_name,
        a.attname as column_name,
        a.attnotnull as is_nullable,
        split_part(c.relname, '_', 1) as module,
        (
            SELECT jsonb_build_object(
                'column', a.attname,
                'references', jsonb_build_object(
                    'table', cf.relname,
                    'column', af.attname
                )
            )
            FROM pg_constraint con
            JOIN pg_class cf ON con.confrelid = cf.oid
            JOIN pg_attribute af ON af.attrelid = cf.oid AND af.attnum = ANY(con.confkey)
            WHERE con.conrelid = c.oid
            AND con.contype = 'f'
            AND a.attnum = ANY(con.conkey)
        ) as foreign_key_info
    FROM pg_catalog.pg_attribute a
    JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
        AND a.attnum > 0
        AND NOT a.attisdropped
        AND c.relkind = 'r';
$function$
;


