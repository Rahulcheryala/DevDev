-- Table definition for "workflowLogs"
CREATE TABLE "workflowLogs" (
  "runId" TEXT NOT NULL,                                       -- Unique Run ID from Trigger.dev
  "workflowName" TEXT NOT NULL,                                -- Workflow Name (identifier)
  "description" TEXT,                                          -- Description of the workflow
  "environment" TEXT,                                          -- Environment (e.g., 'development', 'production')
  "status" TEXT,                                               -- Status of the run (e.g., 'COMPLETED', 'FAILED')
  "startedAt" TIMESTAMP WITH TIME ZONE,                        -- Timestamp when the run started
  "durationMs" INTEGER,                                        -- Duration of the run in milliseconds
  "executionTimeMs" INTEGER,                                   -- Execution time in milliseconds
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),  -- Timestamp when the record was created
  "costInCents" INTEGER,                                       -- Cost of the run in cents
  "logs" JSONB,                                                -- JSON object of the entire run logs
  "companyId" TEXT NOT NULL,                                   -- Company ID (foreign key)
  "createdBy" TEXT NOT NULL,                                   -- User who created the record
  "modifiedBy" TEXT,                                           -- User who last modified the record
  "modifiedOn" TIMESTAMP WITH TIME ZONE,                       -- Timestamp when the record was last modified
  "deletedBy" TEXT,                                            -- User who deleted the record
  "deletedOn" TIMESTAMP WITH TIME ZONE,                        -- Timestamp when the record was deleted

  -- Constraints
  CONSTRAINT "workflowLogsPkey" PRIMARY KEY ("runId"),
  CONSTRAINT "workflowLogsCompanyIdFkey" FOREIGN KEY ("companyId")
    REFERENCES "company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Enable Row-Level Security (RLS)
ALTER TABLE "workflowLogs" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for "workflowLogs"

-- View policy: Employees with 'users_view' permission can select rows
CREATE POLICY "Employees with users_view can view workflowLogs" ON "workflowLogs"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

-- Insert policy: Employees with 'users_create' permission can insert rows
CREATE POLICY "Employees with users_create can insert workflowLogs" ON "workflowLogs"
  FOR INSERT
  WITH CHECK (
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
  );

-- Update policy: Employees with 'users_update' permission can update rows
CREATE POLICY "Employees with users_update can update workflowLogs" ON "workflowLogs"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

-- Delete policy: Employees with 'users_delete' permission can delete rows
CREATE POLICY "Employees with users_delete can delete workflowLogs" ON "workflowLogs"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );

-- Allow SELECT for authenticated users
CREATE POLICY "Allow SELECT for authenticated users"
ON public."workflowLogs"
FOR SELECT
USING (auth.role() = 'authenticated');

-- Enable real-time subscriptions for the "workflowLogs" table.
CREATE POLICY "Allow real-time for all users"
ON public."workflowLogs"
FOR ALL
USING (true);

-- Allow SELECT for all users, including unauthenticated users.
CREATE POLICY "Allow all users to SELECT"
ON public."workflowLogs"
FOR SELECT
USING (true);
