-- Table definition for "triggerCategories"
CREATE TABLE "triggerCategories" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "category" TEXT NOT NULL CHECK (char_length("category") <= 100),
  "categoryDesc" TEXT CHECK (char_length("categoryDesc") <= 255),
  "logoImage" TEXT,     -- URL or path to the logo image
  "background" TEXT,     -- Background color or style
  "clientId" TEXT,       -- Client ID for authentication
  "clientSecret" TEXT,   -- Client secret for authentication (ensure secure handling)
  "resourceUrl" TEXT,    -- URL of the associated resource
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "triggerCategories_pkey" PRIMARY KEY ("id")
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "triggerCategories" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for "triggerCategories"

-- View policy: Employees with 'users_view' permission can select rows
CREATE POLICY "Employees with users_view can view triggerCategories" ON "triggerCategories"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with users_create can insert triggerCategories" ON "triggerCategories"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

-- Update policy: Employees with 'users_update' permission can update rows
CREATE POLICY "Employees with users_update can update triggerCategories" ON "triggerCategories"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

-- Delete policy: Employees with 'users_delete' permission can delete rows
CREATE POLICY "Employees with users_delete can delete triggerCategories" ON "triggerCategories"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );

-- Table definition for "whensTriggerRows"
CREATE TABLE "whensTriggerRows" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "description" TEXT,                -- Description of the trigger
  "showSecondaryOptions" BOOLEAN DEFAULT FALSE,  -- Flag to show secondary options
  "isDisabled" BOOLEAN DEFAULT FALSE,             -- Flag to indicate if the trigger is disabled
  "imageUrl" TEXT,                  -- URL or path to the image representing the trigger
  "metadata" JSONB,                  -- Additional metadata in JSON format
  "categoryId" TEXT NOT NULL,       -- Foreign key to "triggerCategories"
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "whensTriggerRows_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "whensTriggerRows_categoryId_fkey" FOREIGN KEY ("categoryId")
    REFERENCES "triggerCategories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "whensTriggerRows" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for "whensTriggerRows"

-- View policy: Employees with 'users_view' permission can select rows
CREATE POLICY "Employees with users_view can view whensTriggerRows" ON "whensTriggerRows"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with users_create can insert whensTriggerRows" ON "whensTriggerRows"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

-- Update policy: Employees with 'users_update' permission can update rows
CREATE POLICY "Employees with users_update can update whensTriggerRows" ON "whensTriggerRows"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

-- Delete policy: Employees with 'users_delete' permission can delete rows
CREATE POLICY "Employees with users_delete can delete whensTriggerRows" ON "whensTriggerRows"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );

-- Table definition for "triggerEvents"
CREATE TABLE "triggerEvents" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "eventName" TEXT NOT NULL CHECK (char_length("eventName") <= 100),  -- Name of the event
  "eventDesc" TEXT CHECK (char_length("eventDesc") <= 255),           -- Description of the event
  "eventLogo" TEXT,          -- URL or path to the event logo
  "icon" TEXT,                -- Icon associated with the event
  "showSearchBar" BOOLEAN DEFAULT FALSE,  -- Flag to show search bar
  "placeholder" TEXT,         -- Placeholder text for input fields
  "titleBg" TEXT,            -- Background styling for the title
  "titleColor" TEXT,         -- Color of the title text
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "triggerEvents_pkey" PRIMARY KEY ("id")
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "triggerEvents" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for "triggerEvents"

-- View policy: Employees with 'users_view' permission can select rows
CREATE POLICY "Employees with users_view can view triggerEvents" ON "triggerEvents"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with users_create can insert triggerEvents" ON "triggerEvents"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

-- Update policy: Employees with 'users_update' permission can update rows
CREATE POLICY "Employees with users_update can update triggerEvents" ON "triggerEvents"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

-- Delete policy: Employees with 'users_delete' permission can delete rows
CREATE POLICY "Employees with users_delete can delete triggerEvents" ON "triggerEvents"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );

-- Table definition for "eventsTriggerRows"
CREATE TABLE "eventsTriggerRows" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "metadata" JSONB,
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "eventsTriggerRows_pkey" PRIMARY KEY ("id")
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "eventsTriggerRows" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view eventsTriggerRows" ON "eventsTriggerRows"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

CREATE POLICY "Employees with users_create can insert eventsTriggerRows" ON "eventsTriggerRows"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

CREATE POLICY "Employees with users_update can update eventsTriggerRows" ON "eventsTriggerRows"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

CREATE POLICY "Employees with users_delete can delete eventsTriggerRows" ON "eventsTriggerRows"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );




-- Table definition for "workflowsTriggerRows" with camelCase and JSONB column for reactFlowJson

CREATE TABLE "workflowsTriggerRows" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "category" TEXT,
  "workflowJson" JSONB,        -- JSONB field for react flow data
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "workflowsTriggerRows_pkey" PRIMARY KEY ("id")
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "workflowsTriggerRows" ENABLE ROW LEVEL SECURITY;

-- View policy: Employees with 'users_view' permission can select rows
CREATE POLICY "Employees with users_view can view workflowsTriggerRows" ON "workflowsTriggerRows"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with users_create can insert workflowsTriggerRows" ON "workflowsTriggerRows"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

-- Update policy: Employees with 'users_update' permission can update rows
CREATE POLICY "Employees with users_update can update workflowsTriggerRows" ON "workflowsTriggerRows"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

-- Delete policy: Employees with 'users_delete' permission can delete rows
CREATE POLICY "Employees with users_delete can delete workflowsTriggerRows" ON "workflowsTriggerRows"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );

-- Table definition for "triggerDataAlreadyProcessedRows"

CREATE TABLE "triggerDataAlreadyProcessedRows" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "workflowId" INTEGER,
  "headerId" INTEGER,
  "lineId" INTEGER,
  "line" TEXT,
  "header" TEXT,
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "triggerDataAlreadyProcessedRows_pkey" PRIMARY KEY ("id")
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "triggerDataAlreadyProcessedRows" ENABLE ROW LEVEL SECURITY;

-- View policy: Employees with 'users_view' permission can select rows
CREATE POLICY "Employees with users_view can view triggerDataAlreadyProcessedRows" ON "triggerDataAlreadyProcessedRows"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with users_create can insert triggerDataAlreadyProcessedRows" ON "triggerDataAlreadyProcessedRows"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

-- Update policy: Employees with 'users_update' permission can update rows
CREATE POLICY "Employees with users_update can update triggerDataAlreadyProcessedRows" ON "triggerDataAlreadyProcessedRows"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

-- Delete policy: Employees with 'users_delete' permission can delete rows
CREATE POLICY "Employees with users_delete can delete triggerDataAlreadyProcessedRows" ON "triggerDataAlreadyProcessedRows"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );
