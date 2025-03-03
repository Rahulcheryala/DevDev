CREATE TYPE component_type_enum AS ENUM ('data_types', 'data_layer', 'code', 'user_interface', 'analytics', 'reports', 'business_process', 'event', 'trigger', 'configuration', 'label_file', 'form', 'security', 'service', 'menu');

-- Create the table
CREATE TABLE allComponents (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(), -- Supabase generated Unique ID
    "componentId" TEXT NOT NULL, -- Id from Azure DevOps
    "componentName" TEXT NOT NULL,
    "componentType" component_type_enum NOT NULL,
    
    -- Uncomment and add when necessary
    -- "moduleId" TEXT, -- Id from Azure DevOps
    -- "releaseId" TEXT, -- Id from Azure DevOps

    "releaseNumber" TEXT NOT NULL,
    "environment" environment_enum, -- Enum for environment (DEV, UAT, PROD)
    "active" BOOLEAN DEFAULT TRUE, -- Default value for active status
    
    "createdBy" TEXT NOT NULL,
    "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "modifiedBy" TEXT,
    "modifiedOn" TIMESTAMP WITH TIME ZONE,
    "deletedBy" TEXT,
    "deletedOn" TIMESTAMP WITH TIME ZONE,
    "metaData" JSONB, -- Metadata field as JSONB for flexible storage
    
    PRIMARY KEY ("id")
);

-- Indexes can be created for better search performance
CREATE INDEX idx_componentId ON allComponents("componentId");
CREATE INDEX idx_environment ON allComponents("environment");
