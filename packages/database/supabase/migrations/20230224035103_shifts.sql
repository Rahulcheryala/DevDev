CREATE TABLE "location" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "addressLine1" TEXT NOT NULL,
  "addressLine2" TEXT,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "postalCode" TEXT NOT NULL,
  "countryCode" TEXT,
  "timezone" TEXT NOT NULL,
  "latitude" NUMERIC,
  "longitude" NUMERIC,
  "companyId" UUID NOT NULL,
  "createdBy" UUID NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "lastUpdatedBy" UUID,
  "updatedAt" TIMESTAMP,
  "customFields" JSONB,

  CONSTRAINT "location_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "location_name_unique" UNIQUE ("name", "companyId")
);

CREATE INDEX "location_name_idx" ON "location" ("name");
CREATE INDEX "location_companyId_idx" ON "location" ("companyId");

ALTER TABLE "location" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view locations for their companies" ON "location"
  FOR SELECT
  USING (
    has_role('employee') 
    AND "companyId" = ANY(
      select "companyId" from "companyUsers" where "userId" = auth.uid()
    )
  );

CREATE POLICY "Employees with resources_create can insert locations" ON "location"
  FOR INSERT
  WITH CHECK (   
    has_company_permission('resources_create', "companyId")
    AND has_role('employee')
);

CREATE POLICY "Employees with resources_update can update locations" ON "location"
  FOR UPDATE
  USING (
    has_company_permission('resources_update', "companyId")
    AND has_role('employee')
  );

CREATE POLICY "Employees with resources_delete can delete locations" ON "location"
  FOR DELETE
  USING (
    has_company_permission('resources_delete', "companyId")
    AND has_role('employee')
  );


CREATE TABLE "employeeJob" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "companyId" UUID NOT NULL,
  "locationId" UUID,
  "shiftId" UUID,
  "managerId" UUID,
  "title" TEXT,
  "startDate" DATE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "createdBy" UUID,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "lastUpdatedBy" UUID,
  "deletedAt" TIMESTAMP WITH TIME ZONE,
  "deletedBy" UUID,
  "customFields" JSONB,

  CONSTRAINT "employeeJob_pkey" PRIMARY KEY ("id", "companyId"),
  CONSTRAINT "employeeJob_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "employeeJob_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "employeeJob_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "employeeJob_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "employeeJob_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "employeeJob" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Employees can view employee jobs" ON "employeeJob"
  FOR SELECT
  USING (
    has_role('employee') AND 
    "companyId" = ANY(
        SELECT "companyId" from "companyUsers" where "userId" = auth.uid()
    )
  );

CREATE POLICY "Employees with resources_create can insert employee jobs" ON "employeeJob"
  FOR INSERT
  WITH CHECK (   
    has_role('employee') AND
    has_company_permission('resources_create', "companyId")
);

CREATE POLICY "Employees with resources_update can update employee jobs" ON "employeeJob"
  FOR UPDATE
  USING (
    has_role('employee') AND
    has_company_permission('resources_create', "companyId")
  );

CREATE POLICY "Employees with resources_delete can delete employee jobs" ON "employeeJob"
  FOR DELETE
  USING (
    has_role('employee') AND
    has_company_permission('resources_delete', "companyId")
  );