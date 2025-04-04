set check_function_bodies = off;

create type "public"."column_definition" as ("name" text, "type" text, "default_value" text);

CREATE OR REPLACE FUNCTION public.create_table_with_columns(table_name text, column_definitions column_definition[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  create_table_sql text;
  column_def column_definition;
begin
  -- Start building the CREATE TABLE SQL
  create_table_sql := format('CREATE TABLE IF NOT EXISTS %I (', table_name);
  
  -- Add the UUID primary key
  create_table_sql := create_table_sql || 'id uuid DEFAULT gen_random_uuid() PRIMARY KEY';
  
  -- Add each column
  foreach column_def in array column_definitions loop
    create_table_sql := create_table_sql || format(
      ', %I %s', 
      column_def.name, 
      column_def.type
    );
    
    -- Add default value if specified
    if column_def.default_value is not null then
      create_table_sql := create_table_sql || ' DEFAULT ' || column_def.default_value;
    end if;
  end loop;
  
  -- Close the statement
  create_table_sql := create_table_sql || ');';
  
  -- Execute the CREATE TABLE statement
  execute create_table_sql;
end;
$function$
;


