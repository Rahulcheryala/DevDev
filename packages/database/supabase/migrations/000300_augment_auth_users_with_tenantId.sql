-- -- Migration: Add tenantId column to auth.users table
-- -- Migration ID: 000300_augment_auth_users_with_tenantId.sql

-- BEGIN;

-- -- Step 1: Add tenantId column to auth.users table
-- ALTER TABLE auth.users
-- ADD COLUMN IF NOT EXISTS tenantId UUID NOT NULL;

-- -- Step 3: Add a foreign key constraint to link tenantId to tenants table (optional)
-- -- Uncomment and modify the below line if a tenants table exists.
-- -- ALTER TABLE auth.users ADD CONSTRAINT fk_users_tenant FOREIGN KEY (tenantId) REFERENCES common.tenants (tenantId);

-- -- Step 4: Create an index on the tenantId column for faster queries
-- CREATE INDEX IF NOT EXISTS idx_users_tenantId ON auth.users (tenantId);

-- -- Step 5: Enable RLS for auth.users if not already enabled (optional)
-- -- Uncomment the below lines if Row Level Security (RLS) is required for multi-tenancy.
-- -- ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
-- -- CREATE POLICY tenant_isolation ON auth.users
-- --     USING (tenantId = public.get_user_tenant_id());

-- COMMIT;
