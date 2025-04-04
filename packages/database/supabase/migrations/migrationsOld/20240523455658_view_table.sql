create type "public"."entityName" as enum ('None', 'LabelsReports', 'Company', 'Team', 'Department');
create type "public"."privacyEnum" as enum ('Public', 'Private');
create type "public"."defaultViewEnum" as enum ('Yes', 'No');

CREATE TABLE "view" (
  "id" TEXT NOT NULL DEFAULT xid(),
  -- ENTITY_ID	
  -- SUB_ENTITY_ID	
  "entity" "entityName" NOT NULL DEFAULT 'None',
  "name" TEXT,
  "defaultView" "defaultViewEnum" NOT NULL DEFAULT 'No',
  "privacy" "privacyEnum" NOT NULL DEFAULT 'Public',
  "sharePreference" TEXT,
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "view_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "view_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "view_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "view_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "view_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "view_companyId_idx" ON "view" ("companyId");

ALTER TABLE "view" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view view" ON "view"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

CREATE POLICY "Employees with users_create can insert view" ON "view"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
);

CREATE POLICY "Employees with users_update can update view" ON "view"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

CREATE POLICY "Employees with users_delete can delete view" ON "view"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );











CREATE TABLE "viewDetail" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "viewId" TEXT NOT NULL,
  "params" JSONB,
  "tableConf" JSONB,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "viewDetail_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "viewDetail_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "view"("id"),
  CONSTRAINT "viewDetail_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "viewDetail_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "viewDetail_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "viewDetail_viewId_idx" ON "viewDetail" ("viewId");

ALTER TABLE "viewDetail" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view viewDetail" ON "viewDetail"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
  );

CREATE POLICY "Employees with users_create can insert viewDetail" ON "viewDetail"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
);

CREATE POLICY "Employees with users_update can update viewDetail" ON "viewDetail"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
  );

CREATE POLICY "Employees with users_delete can delete viewDetail" ON "viewDetail"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
  );











CREATE TABLE "viewShare" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "viewId" TEXT NOT NULL,
  "sharedWith" TEXT NOT NULL,
  "sharedBy" TEXT NOT NULL,
  "sharedOn" TIMESTAMP WITH TIME ZONE,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "viewShare_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "viewShare_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "view"("id"),
  CONSTRAINT "viewShare_sharedWith_fkey" FOREIGN KEY ("sharedWith") REFERENCES "user"("id"),
  CONSTRAINT "viewShare_sharedBy_fkey" FOREIGN KEY ("sharedBy") REFERENCES "user"("id"),
  CONSTRAINT "viewShare_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "viewShare_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "viewShare_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "viewShare_viewId_idx" ON "viewShare" ("viewId");

ALTER TABLE "viewShare" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view viewShare" ON "viewShare"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
  );

CREATE POLICY "Employees with users_create can insert viewShare" ON "viewShare"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
);

CREATE POLICY "Employees with users_update can update viewShare" ON "viewShare"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
  );

CREATE POLICY "Employees with users_delete can delete viewShare" ON "viewShare"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("viewId", 'view'))
  );








-- create type "public"."tableNameEnum" as enum ('None', 'LabelsReports', 'Company', 'Team', 'Department');
-- create type "public"."privacyEnum" as enum ('Public', 'Private');

-- CREATE TABLE "view" (
--   "id" TEXT NOT NULL DEFAULT xid(),
--   "name" TEXT,
--   "params" JSONB,
--   "tableConf" JSONB,
--   "table" "tableNameEnum" NOT NULL DEFAULT 'None',
--   "privacy" "privacyEnum" NOT NULL DEFAULT 'Public',
--   "companyId" TEXT NOT NULL,
--   "createdBy" TEXT NOT NULL,
--   "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
--   "modifiedBy" TEXT,
--   "modifiedOn" TIMESTAMP WITH TIME ZONE,
--   "deletedBy" TEXT,
--   "deletedOn" TIMESTAMP WITH TIME ZONE,
--   "share" TEXT[] DEFAULT ARRAY[]::TEXT[],

--   CONSTRAINT "view_pkey" PRIMARY KEY ("id"),
--   CONSTRAINT "view_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
--   CONSTRAINT "view_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
--   CONSTRAINT "view_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
--   CONSTRAINT "view_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
-- );

-- CREATE INDEX "view_companyId_idx" ON "view" ("companyId");

-- ALTER TABLE "view" ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Employees with users_view can view view" ON "view"
--   FOR SELECT
--   USING (
--     has_role('employee') AND
--     has_company_permission('users_view', "companyId")
--   );

-- CREATE POLICY "Employees with users_create can insert view" ON "view"
--   FOR INSERT
--   WITH CHECK (   
--     has_role('employee') AND
--     has_company_permission('users_create', "companyId")
-- );

-- CREATE POLICY "Employees with users_update can update view" ON "view"
--   FOR UPDATE
--   USING (
--     has_role('employee') AND
--     has_company_permission('users_update', "companyId")
--   );

-- CREATE POLICY "Employees with users_delete can delete view" ON "view"
--   FOR DELETE
--   USING (
--     has_role('employee') AND
--     has_company_permission('users_delete', "companyId")
--   );

