-- Migration: 000100_preSetup_create_schemas.sql
-- Purpose: Create the `common` and `goldentenant` schemas for the multi-tenant architecture.

-- Create the `common` schema
CREATE SCHEMA IF NOT EXISTS common;

-- Create the `goldentenant` schema
CREATE SCHEMA IF NOT EXISTS golden;

-- Grant appropriate permissions for the schemas
-- Grant usage of `common` schema to authenticated users
GRANT USAGE ON SCHEMA common TO authenticated;

-- Revoke all permissions for the `goldentenant` schema
-- This schema is a template and not directly accessible
REVOKE ALL ON SCHEMA golden FROM public;
GRANT ALL ON ALL TABLES IN SCHEMA golden TO authenticated;


-- -- Grant schema creation permission to the authenticated role
GRANT CREATE ON DATABASE postgres TO authenticated;
GRANT CREATE ON DATABASE postgres TO service_role;

-- -- If you need to grant usage on the golden schema
GRANT USAGE ON SCHEMA golden TO authenticated;
GRANT USAGE ON SCHEMA golden TO service_role;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


