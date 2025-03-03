create type "public"."teamStatus" as enum ('Active', 'Inactive');

CREATE TABLE "team" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "status" "teamStatus" NOT NULL DEFAULT 'Active',
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "team_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "team_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "team_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "team_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "team_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "team_companyId_idx" ON "team" ("companyId");

ALTER TABLE "team" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view team" ON "team"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

CREATE POLICY "Employees with users_create can insert team" ON "team"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
);

CREATE POLICY "Employees with users_update can update team" ON "team"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

CREATE POLICY "Employees with users_delete can delete team" ON "team"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );








create type "public"."teamMemberStatus" as enum ('Active', 'Inactive');

CREATE TABLE "teamMember" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "teamId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "employeeId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "status" "teamMemberStatus" NOT NULL DEFAULT 'Active',
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "teamMember_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "teamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id"),
  CONSTRAINT "teamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id"),
  CONSTRAINT "teamMember_employeeId_fkey" FOREIGN KEY ("employeeId", "companyId") REFERENCES "employee"("id", "companyId"),
  CONSTRAINT "teamMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "teamMember_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "teamMember_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "teamMember_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "teamMember_companyId_idx" ON "teamMember" ("companyId");

ALTER TABLE "teamMember" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view teamMember" ON "teamMember"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', "companyId")
  );

CREATE POLICY "Employees with users_create can insert teamMember" ON "teamMember"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', "companyId")
);

CREATE POLICY "Employees with users_update can update teamMember" ON "teamMember"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
  );

CREATE POLICY "Employees with users_delete can delete teamMember" ON "teamMember"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', "companyId")
  );








CREATE TABLE "teamChat" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "teamId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "teamChat_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "teamChat_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id"),
  CONSTRAINT "teamChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id"),
  CONSTRAINT "teamChat_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "teamChat_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "teamChat_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE INDEX "teamChat_teamId_idx" ON "teamChat" ("teamId");

ALTER TABLE "teamChat" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view teamChat" ON "teamChat"
  FOR SELECT
  USING (
    has_role('employee') AND
    has_company_permission('users_view', get_company_id_from_foreign_key("teamId", 'team'))
  );

CREATE POLICY "Employees with users_create can insert teamChat" ON "teamChat"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('users_create', get_company_id_from_foreign_key("teamId", 'team'))
);

CREATE POLICY "Employees with users_update can update teamChat" ON "teamChat"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('users_update', get_company_id_from_foreign_key("teamId", 'team'))
  );

CREATE POLICY "Employees with users_delete can delete teamChat" ON "teamChat"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('users_delete', get_company_id_from_foreign_key("teamId", 'team'))
  );

