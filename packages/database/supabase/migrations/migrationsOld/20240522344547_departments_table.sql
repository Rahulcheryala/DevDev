create type "public"."departmentStatus" as enum ('Active', 'Inactive', 'Draft', 'Blocked');

CREATE TABLE "department" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "departmentCode" TEXT NOT NULL,
  "description" TEXT,
  "logo" TEXT,
  "supervisor" TEXT,
  "status" "departmentStatus" NOT NULL DEFAULT 'Active',
  "effectiveStartDate" TIMESTAMP WITH TIME ZONE,
  "effectiveEndDate" TIMESTAMP WITH TIME ZONE,
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "department_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "department_supervisor_fkey" FOREIGN KEY ("supervisor") REFERENCES "user"("id"),
  CONSTRAINT "department_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "department_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "department_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "department_companyId_idx" ON "department" ("companyId");
CREATE INDEX "department_departmentCode_idx" ON "department" ("departmentCode");

ALTER TABLE "department" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view department" ON "department"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

CREATE POLICY "Employees with users_create can insert department" ON "department"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
);

CREATE POLICY "Employees with users_update can update department" ON "department"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

CREATE POLICY "Employees with users_delete can delete department" ON "department"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );








create type "public"."departmentMemberStatus" as enum ('Active', 'Inactive');

CREATE TABLE "departmentMember" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "departmentId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "status" "departmentMemberStatus" NOT NULL DEFAULT 'Active',
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "departmentMember_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "departmentMember_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id"),
  CONSTRAINT "departmentMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id"),
  CONSTRAINT "departmentMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "departmentMember_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "departmentMember_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "departmentMember_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "departmentMember_companyId_idx" ON "departmentMember" ("companyId");

ALTER TABLE "departmentMember" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view departmentMember" ON "departmentMember"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

CREATE POLICY "Employees with users_create can insert departmentMember" ON "departmentMember"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
);

CREATE POLICY "Employees with users_update can update departmentMember" ON "departmentMember"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

CREATE POLICY "Employees with users_delete can delete departmentMember" ON "departmentMember"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );








CREATE TABLE "departmentChat" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "departmentId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "departmentChat_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "departmentChat_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id"),
  CONSTRAINT "departmentChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id"),
  CONSTRAINT "departmentChat_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "departmentChat_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "departmentChat_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "departmentChat_departmentId_idx" ON "departmentChat" ("departmentId");

ALTER TABLE "departmentChat" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view departmentChat" ON "departmentChat"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("departmentId", 'department'))
  );

CREATE POLICY "Employees with users_create can insert departmentChat" ON "departmentChat"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', get_company_id_from_foreign_key("departmentId", 'department'))
);

CREATE POLICY "Employees with users_update can update departmentChat" ON "departmentChat"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', get_company_id_from_foreign_key("departmentId", 'department'))
  );

CREATE POLICY "Employees with users_delete can delete departmentChat" ON "departmentChat"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', get_company_id_from_foreign_key("departmentId", 'department'))
  );

