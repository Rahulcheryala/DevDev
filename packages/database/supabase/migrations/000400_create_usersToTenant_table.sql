-- Migration: Create usersToTenant Table in common Schema
-- Migration ID: 000400_create_usersToTenant_table.sql

BEGIN;

-- Step 1: Create the usersToTenant table
CREATE TABLE IF NOT EXISTS common.usersToTenant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL,
    tenantId UUID NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMPTZ DEFAULT NULL,
    deletedBy UUID DEFAULT NULL,
    CONSTRAINT unique_user_tenant UNIQUE (userId, tenantId)
);

-- Step 2: Add Foreign Key Constraints
-- Assuming userId references auth.users(id) and tenantId references common.tenants(tenantId)
ALTER TABLE common.usersToTenant
ADD CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES auth.users (id) ON DELETE CASCADE;

-- ALTER TABLE common.usersToTenant
-- ADD CONSTRAINT fk_tenant FOREIGN KEY (tenantId) REFERENCES common.tenants (tenantId) ON DELETE CASCADE;

-- Step 3: Create Indexes
CREATE INDEX IF NOT EXISTS idx_userId ON common.usersToTenant (userId);
CREATE INDEX IF NOT EXISTS idx_tenantId ON common.usersToTenant (tenantId);
CREATE INDEX IF NOT EXISTS idx_deletedAt ON common.usersToTenant (deletedAt);

-- Step 4: Enable RLS Policies (Optional)
-- Uncomment and adjust policies if tenant isolation is required
-- ALTER TABLE common.usersToTenant ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY tenant_isolation_policy ON common.usersToTenant
--     USING (tenantId = public.get_user_tenant_id());

COMMIT;
