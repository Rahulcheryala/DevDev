CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create type "public"."roleType" as enum ('Default', 'Custom');

-- CreateTable
CREATE TABLE "employeeType" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "roleType" NOT NULL DEFAULT 'Custom',
    "companyId" TEXT NOT NULL,
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "disable" BOOLEAN NOT NULL DEFAULT false,
    "effectiveDate" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT "employeeType_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "employeeType_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "employeeType_companyId_idx" ON "employeeType" ("companyId");

ALTER TABLE "employeeType" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_update can view/modify employee types" ON "employeeType" FOR ALL USING (
    has_role('employee') AND
    has_company_permission('users_update', "companyId")
);



