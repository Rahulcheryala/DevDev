create type "public"."labelStatusType" as enum ('Draft', 'Submitted', 'Approved', 'Not Approved', 'Hold');

create type "public"."labelType" as enum ('Label', 'Document');

CREATE TABLE "labelsreports" (
  "id" TEXT NOT NULL DEFAULT xid(),
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
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "customFields" JSONB,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "labelsreports_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsreports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreports_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreports_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreports_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "labelsreports_companyId_idx" ON "labelsreports" ("companyId");

ALTER TABLE "labelsreports" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with labelsreports_view can view labelsreports" ON "labelsreports"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('labelsreports_view', "companyId")
  );

CREATE POLICY "Employees with labelsreports_create can insert labelsreports" ON "labelsreports"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('labelsreports_create', "companyId")
);

CREATE POLICY "Employees with labelsreports_update can update labelsreports" ON "labelsreports"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('labelsreports_update', "companyId")
  );

CREATE POLICY "Employees with labelsreports_delete can delete labelsreports" ON "labelsreports"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('labelsreports_delete', "companyId")
  );

