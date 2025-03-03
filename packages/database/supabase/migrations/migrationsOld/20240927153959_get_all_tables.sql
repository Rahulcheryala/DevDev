set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_all_tables()
 RETURNS TABLE(table_name text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT tablename::text  -- Explicitly cast to text
  FROM pg_catalog.pg_tables
  WHERE schemaname = 'public';
END; $function$
;


