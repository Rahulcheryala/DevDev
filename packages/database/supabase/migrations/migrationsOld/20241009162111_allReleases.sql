-- Table to store Releases data

-- Create Enum type for releaseStatus and environment if needed
CREATE TYPE release_status_enum AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');
CREATE TYPE environment_enum AS ENUM ('DEV', 'UAT', 'PROD');
CREATE TYPE cumulative_or_single_enum AS ENUM ('cumulative', 'single');

-- Create the table
CREATE TABLE allReleases (
    "id" TEXT NOT NULL DEFAULT xid(), -- Supabase generated Unique ID
    "releaseId" TEXT NOT NULL,
    "releaseName" TEXT NOT NULL,
    "releaseStatus" release_status_enum NOT NULL, -- Enum for release status
    "componentId" TEXT NOT NULL, 
    "componentType" TEXT NOT NULL,
    "cumulativeOrSingle" cumulative_or_single_enum NOT NULL, -- Enum for release status
    "defectId" TEXT,
    "defectDescription" TEXT,
    "environment" environment_enum, -- Enum for environment (DEV, UAT, PROD)
    "developedBy" TEXT,
    "prSubmittedDate" TIMESTAMP,
    "prApprovedBy" TEXT,
    "prApprovedDate" TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "modifiedBy" TEXT,
    "modifiedOn" TIMESTAMP WITH TIME ZONE,
    "deletedBy" TEXT,
    "deletedOn" TIMESTAMP WITH TIME ZONE,
    "metaData" JSONB -- Metadata field as JSONB for flexible storage
);


