-- Migration: Create userProfile Table in golden Schema
-- Migration ID: 100400_create_userProfile_table.sql

BEGIN;

-- Step 1: Create the userProfile table
CREATE TABLE IF NOT EXISTS golden.userProfile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    authUserId UUID NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMPTZ DEFAULT NULL,
    deletedBy UUID DEFAULT NULL
);

-- Step 2: Add Foreign Key Constraints
-- Assuming authUserId references auth.users(id)
ALTER TABLE golden.userProfile
ADD CONSTRAINT fk_auth_user FOREIGN KEY (authUserId) REFERENCES auth.users (id) ON DELETE CASCADE;

-- Step 3: Add Triggers for Timestamps
CREATE OR REPLACE FUNCTION golden.update_userProfile_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_userProfile_timestamps
BEFORE UPDATE ON golden.userProfile
FOR EACH ROW
EXECUTE FUNCTION golden.update_userProfile_timestamps();

-- Step 4: Create Indexes
CREATE INDEX IF NOT EXISTS idx_userProfile_authUserId ON golden.userProfile (authUserId);
CREATE INDEX IF NOT EXISTS idx_userProfile_deletedAt ON golden.userProfile (deletedAt);

COMMIT;
