create type "public"."labelStatusType" as enum ('Draft', 'Submitted', 'Approved', 'Not Approved', 'Hold');

create type "public"."labelType" as enum ('Label', 'Document');

CREATE TABLE "public"."labelsReports" (
  "id" uuid not null default uuid_generate_v4(),
  "name" TEXT,
  "height" FLOAT NOT NULL DEFAULT 0.0,
  "width" FLOAT NOT NULL DEFAULT 0.0,
  "size" TEXT,
  "configuration" JSONB,
  "isArchived" BOOLEAN NOT NULL DEFAULT false,
  "isFavorite" BOOLEAN NOT NULL DEFAULT false,
  "previewUrl" TEXT,
  "category" TEXT,
  "status" "labelStatusType" NOT NULL DEFAULT 'Draft',
  "labelType" "labelType" NOT NULL DEFAULT 'Label',
  "companyId" UUID NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdBy" UUID NOT NULL,
  "updatedAt" timestamp with time zone,
  "lastUpdatedBy" UUID,
  "customFields" JSONB,
  "deletedAt" timestamp with time zone,
  "deletedBy" UUID,
  CONSTRAINT "labelsReports_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsReports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "labelsReports_companyId_idx" ON "labelsReports" ("companyId");

ALTER TABLE "labelsReports" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with labelsReports_view can view labelsReports" ON "labelsReports"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('labelsReports_view', "companyId")
  );

CREATE POLICY "Employees with labelsReports_create can insert labelsReports" ON "labelsReports"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('labelsReports_create', "companyId")
);

CREATE POLICY "Employees with labelsReports_update can update labelsReports" ON "labelsReports"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('labelsReports_update', "companyId")
  );

CREATE POLICY "Employees with labelsReports_delete can delete labelsReports" ON "labelsReports"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('labelsReports_delete', "companyId")
  );

