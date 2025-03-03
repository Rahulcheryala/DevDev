CREATE OR REPLACE FUNCTION get_types(tname text)
RETURNS SETOF json AS 
$BODY$
BEGIN
    RETURN QUERY 
    SELECT 
        json_build_object(
            'columnName', cols.column_name::text,
            'dataType', 
                CASE 
                    WHEN cols.data_type = 'USER-DEFINED' THEN 
                        (SELECT string_agg(pg_enum.enumlabel, ', ') 
                         FROM pg_enum 
                         WHERE pg_enum.enumtypid = (SELECT pg_type.oid 
                                                    FROM pg_type 
                                                    WHERE pg_type.typname = cols.udt_name))
                    ELSE cols.data_type::text
                END,
            'isRequired', (cols.is_nullable = 'NO'), -- 'NO' means the column is required
            'defaultValue', NULLIF(cols.column_default::text, '')
        )
    FROM 
        information_schema.columns AS cols
    WHERE 
        cols.table_name = tname;
END;
$BODY$
LANGUAGE plpgsql;

NOTIFY pgrst, 'reload schema';