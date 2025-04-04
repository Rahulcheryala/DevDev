CREATE OR REPLACE FUNCTION clone_schema_tables(new_schema_name TEXT)
RETURNS void AS
$$
DECLARE
    tab RECORD;
    enum_type RECORD;
    func RECORD;
    sql_command TEXT;
BEGIN
    IF new_schema_name IS NULL THEN
        RAISE EXCEPTION 'new_schema_name cannot be null';
    END IF;

    -- Create the new schema
    sql_command := format('CREATE SCHEMA IF NOT EXISTS %I', new_schema_name);
    RAISE NOTICE 'Creating schema with command: %', sql_command;
    EXECUTE sql_command;

    -- Grant schema usage and create permissions
    sql_command := format('GRANT USAGE, CREATE ON SCHEMA %I TO authenticated, service_role', new_schema_name);
    RAISE NOTICE 'Granting schema permissions with command: %', sql_command;
    EXECUTE sql_command;
    
    -- Clone ENUMs
    FOR enum_type IN 
        SELECT 
            t.typname,
            string_agg(quote_literal(e.enumlabel), ', ' ORDER BY e.enumsortorder) AS enum_values
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        JOIN pg_namespace n ON t.typnamespace = n.oid
        WHERE n.nspname = 'golden'
        GROUP BY t.typname
    LOOP
        BEGIN
            IF enum_type.enum_values IS NOT NULL THEN
                sql_command := format(
                    'CREATE TYPE %I.%I AS ENUM (%s)',
                    new_schema_name,
                    enum_type.typname,
                    enum_type.enum_values
                );
                RAISE NOTICE 'Creating ENUM with command: %', sql_command;
                EXECUTE sql_command;
            END IF;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error creating ENUM %: %', enum_type.typname, SQLERRM;
            -- Continue with the next enum instead of failing
        END;
    END LOOP;

    -- Clone all tables from golden schema
    FOR tab IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'golden' 
        AND table_type = 'BASE TABLE'
    LOOP
        BEGIN
            -- Create the table with all constraints, indexes, etc.
            sql_command := format(
                'CREATE TABLE %I.%I (LIKE golden.%I INCLUDING ALL)',
                new_schema_name,
                tab.table_name,
                tab.table_name
            );
            RAISE NOTICE 'Creating table with command: %', sql_command;
            EXECUTE sql_command;
            
            -- Grant permissions
            sql_command := format(
                'GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE %I.%I TO authenticated, service_role',
                new_schema_name,
                tab.table_name
            );
            RAISE NOTICE 'Granting table permissions with command: %', sql_command;
            EXECUTE sql_command;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error processing table %: %', tab.table_name, SQLERRM;
            -- Continue with the next table instead of failing
        END;
    END LOOP;

    -- Clone functions that don't depend on tables
    FOR func IN 
        SELECT 
            p.proname,
            pg_get_functiondef(p.oid) AS definition
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'golden'
    LOOP
        BEGIN
            IF func.definition IS NOT NULL THEN
                sql_command := regexp_replace(
                    func.definition,
                    'golden\.',
                    format('%I.', new_schema_name),
                    'g'
                );
                RAISE NOTICE 'Creating function with command: %', sql_command;
                EXECUTE sql_command;
            END IF;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error creating function %: %', func.proname, SQLERRM;
            -- Continue with the next function instead of failing
        END;
    END LOOP;

    -- Create view after all tables are created
    BEGIN
        sql_command := format(
            'CREATE OR REPLACE VIEW %I.vwActiveContactRelationships AS 
            SELECT 
                cr."id",
                cr."contactId",
                cr."entityType",
                cr."entityId",
                cr."relationshipType",
                cr."entityTypeSearch",
                cr."relationshipTypeSearch",
                cr."createdAt",
                cr."createdBy",
                cr."updatedAt",
                cr."lastUpdatedBy",
                cr."deletedAt",
                cr."deletedBy",
                cr."syncData"
            FROM %I.contactRelationships cr
            WHERE cr."deletedAt" IS NULL',
            new_schema_name,
            new_schema_name
        );
        RAISE NOTICE 'Creating view with command: %', sql_command;
        EXECUTE sql_command;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error creating view: %', SQLERRM;
    END;

    -- Create companies view
    BEGIN
        sql_command := format(
            'CREATE OR REPLACE VIEW %I.companies AS
            SELECT DISTINCT
                "cm"."id",
                "cm"."name",
                "cm"."description",
                "cm"."companyCode",
                "cm"."industry",
                "cm"."companyType",
                "cm"."status",
                "cm"."isActive",
                "cm"."deletedAt",
                "cu"."departmentId",
                "cu"."roleInDepartment",
                "cu"."startDate",
                "cu"."endDate",
                "cu"."userId",
                "cm"."domainUrl",
                "et"."name" AS "employeeType"
                FROM "public"."companyUsers" "cu"
                INNER JOIN "public"."companyMaster" "cm"
                ON "cm"."id" = "cu"."companyId"
                INNER JOIN %I."employeeMaster" "em"
                ON "em"."id" = "cu"."userId" AND "em"."companyId" = "cu"."companyId"
                INNER JOIN "public"."employeeType" "et"
                ON "et"."id" = "em"."employeeTypeId";',
            new_schema_name,
            new_schema_name
        );
        RAISE NOTICE 'Creating view with command: %', sql_command;
        EXECUTE sql_command;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error creating view: %', SQLERRM;
    END;

    -- Grant default privileges
    sql_command := format(
        'ALTER DEFAULT PRIVILEGES IN SCHEMA %I 
         GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated, service_role',
        new_schema_name
    );
    RAISE NOTICE 'Granting default privileges with command: %', sql_command;
    EXECUTE sql_command;
    
    -- Grant sequence permissions
    sql_command := format(
        'GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA %I TO authenticated, service_role',
        new_schema_name
    );
    RAISE NOTICE 'Granting sequence permissions with command: %', sql_command;
    EXECUTE sql_command;
    
    -- Grant sequence default privileges
    sql_command := format(
        'ALTER DEFAULT PRIVILEGES IN SCHEMA %I 
         GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO authenticated, service_role',
        new_schema_name
    );
    RAISE NOTICE 'Granting sequence default privileges with command: %', sql_command;
    EXECUTE sql_command;

EXCEPTION WHEN OTHERS THEN
    -- Log the error and re-raise it
    RAISE NOTICE 'Error in clone_schema_tables: %', SQLERRM;
    RAISE;
END;
$$ LANGUAGE plpgsql;