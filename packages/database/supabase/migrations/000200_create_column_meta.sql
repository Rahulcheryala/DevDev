-- Create enum for column types
CREATE TYPE "columnTypeEnum" AS ENUM ('System', 'User Defined');

-- Create sequence for user defined columns
CREATE SEQUENCE IF NOT EXISTS user_defined_column_seq;

-- Create the zeakColumnMeta table
CREATE TABLE "zeakColumnMeta" (
    "columnId" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "columnName" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "description" TEXT,
    "columnType" "columnTypeEnum" NOT NULL,
    "dataType" TEXT NOT NULL,
    "numberOfDecimals" INTEGER,
    "defaultValue" TEXT,
    "lengthRestriction" BOOLEAN DEFAULT FALSE,
    "nullable" BOOLEAN NOT NULL,
    "uniqueValue" BOOLEAN NOT NULL DEFAULT FALSE,
    "calculatedField" BOOLEAN NOT NULL DEFAULT FALSE,
    "dataValidation" BOOLEAN NOT NULL DEFAULT FALSE,
    "display" BOOLEAN NOT NULL DEFAULT TRUE,
    "toolTip" TEXT,
    "isInTableFilter" BOOLEAN NOT NULL DEFAULT FALSE,
    "requiredField" BOOLEAN NOT NULL DEFAULT FALSE,
    "formulaForCalculatedFields" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_zeakColumnMeta_updated_at
    BEFORE UPDATE ON "zeakColumnMeta"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RPC to populate column metadata from information schema
CREATE OR REPLACE FUNCTION populate_column_metadata(schema_name text, table_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO "zeakColumnMeta" (
        "columnName",
        "columnLabel",
        "columnType",
        "dataType",
        "numberOfDecimals",
        "defaultValue",
        "nullable",
        "uniqueValue",
        "requiredField"
    )
    SELECT 
        c.column_name,
        c.column_name, -- Default columnLabel same as columnName
        'System'::"columnTypeEnum", -- Default type for existing columns
        c.data_type,
        CASE 
            WHEN c.numeric_precision IS NOT NULL THEN c.numeric_scale
            ELSE NULL
        END,
        c.column_default,
        CASE WHEN c.is_nullable = 'YES' THEN true ELSE false END,
        CASE WHEN tc.constraint_type = 'UNIQUE' THEN true ELSE false END,
        CASE WHEN c.is_nullable = 'NO' THEN true ELSE false END
    FROM information_schema.columns c
    LEFT JOIN information_schema.key_column_usage kcu
        ON c.table_schema = kcu.table_schema
        AND c.table_name = kcu.table_name
        AND c.column_name = kcu.column_name
    LEFT JOIN information_schema.table_constraints tc
        ON kcu.constraint_name = tc.constraint_name
        AND kcu.table_schema = tc.table_schema
        AND kcu.table_name = tc.table_name
    WHERE c.table_schema = schema_name
    AND c.table_name = table_name
    ON CONFLICT ("columnName") DO UPDATE
    SET 
        "dataType" = EXCLUDED."dataType",
        "numberOfDecimals" = EXCLUDED."numberOfDecimals",
        "defaultValue" = EXCLUDED."defaultValue",
        "nullable" = EXCLUDED."nullable",
        "uniqueValue" = EXCLUDED."uniqueValue",
        "requiredField" = EXCLUDED."requiredField",
        "updatedAt" = NOW();
END;
$$;

-- Create function to generate user defined column names
CREATE OR REPLACE FUNCTION generate_user_defined_column_name(prefix text)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    new_sequence_val bigint;
BEGIN
    new_sequence_val := nextval('user_defined_column_seq');
    RETURN prefix || '_UD' || new_sequence_val::text;
END;
$$;

-- Enable RLS
ALTER TABLE "zeakColumnMeta" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to authenticated users" ON "zeakColumnMeta"
    FOR SELECT
    TO authenticated
    USING (true);

-- CREATE POLICY "Allow insert to users with admin access" ON "zeakColumnMeta"
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (has_any_company_permission('settings_create'));

-- CREATE POLICY "Allow update to users with admin access" ON "zeakColumnMeta"
--     FOR UPDATE
--     TO authenticated
--     USING (has_any_company_permission('settings_update'));

-- Create indexes
CREATE INDEX idx_zeakcolumnmeta_columnname ON "zeakColumnMeta" ("columnName");
CREATE INDEX idx_zeakcolumnmeta_columntype ON "zeakColumnMeta" ("columnType");

-- Grant permissions
GRANT SELECT ON "zeakColumnMeta" TO authenticated;
GRANT EXECUTE ON FUNCTION populate_column_metadata TO authenticated;
GRANT EXECUTE ON FUNCTION generate_user_defined_column_name TO authenticated; 

-- Create trigger function to capture new column additions
CREATE OR REPLACE FUNCTION handle_new_column()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
DECLARE
    obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands()
    LOOP
        IF obj.command_tag = 'ALTER TABLE' AND obj.object_type = 'table column' THEN
            -- Extract schema and table name from the object identity
            PERFORM populate_column_metadata(
                split_part(split_part(obj.object_identity, '.', 1), '"', 2),
                split_part(split_part(obj.object_identity, '.', 2), '"', 2)
            );
        END IF;
    END LOOP;
END;
$$;

-- Create trigger function to capture column updates
CREATE OR REPLACE FUNCTION handle_column_update()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
DECLARE
    obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands()
    LOOP
        IF obj.command_tag = 'ALTER TABLE' AND obj.object_type = 'table column' THEN
            -- Extract schema and table name from the object identity
            PERFORM populate_column_metadata(
                split_part(split_part(obj.object_identity, '.', 1), '"', 2),
                split_part(split_part(obj.object_identity, '.', 2), '"', 2)
            );
        END IF;
    END LOOP;
END;
$$;

-- Create trigger function to capture column deletions
CREATE OR REPLACE FUNCTION handle_column_deletion()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
DECLARE
    obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
    LOOP
        IF obj.object_type = 'table column' THEN
            -- Delete the corresponding metadata
            DELETE FROM "zeakColumnMeta" 
            WHERE "columnName" = split_part(obj.object_identity, '.', 3);
        END IF;
    END LOOP;
END;
$$;

-- Create event triggers
-- CREATE EVENT TRIGGER capture_new_columns
-- ON ddl_command_end
-- WHEN TAG IN ('ALTER TABLE')
-- EXECUTE FUNCTION handle_new_column();

-- CREATE EVENT TRIGGER capture_column_updates
-- ON ddl_command_end
-- WHEN TAG IN ('ALTER TABLE')
-- EXECUTE FUNCTION handle_column_update();

-- CREATE EVENT TRIGGER capture_column_deletions
-- ON sql_drop
-- EXECUTE FUNCTION handle_column_deletion();

-- -- Populate initial data for all existing columns
-- DO $$
-- DECLARE
--     schema_rec record;
--     table_rec record;
-- BEGIN
--     FOR schema_rec IN 
--         SELECT schema_name 
--         FROM information_schema.schemata 
--         WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
--     LOOP
--         FOR table_rec IN 
--             SELECT table_name 
--             FROM information_schema.tables 
--             WHERE table_schema = schema_rec.schema_name 
--             AND table_type = 'BASE TABLE'
--         LOOP
--             PERFORM populate_column_metadata(schema_rec.schema_name, table_rec.table_name);
--         END LOOP;
--     END LOOP;
-- END;
-- $$; 