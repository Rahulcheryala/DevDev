-- Enable Row-Level Security on the "contact" table
ALTER TABLE "contact" ENABLE ROW LEVEL SECURITY;

-- Policy: Employees with relevant permissions can view contacts
CREATE POLICY "Employees can view contacts" ON "contact"
  FOR SELECT
  USING (
    has_role('employee')
    AND has_company_permission('contacts_view', "companyId")
  );

-- Policy: Employees with relevant permissions can create contacts
CREATE POLICY "Employees can create contacts" ON "contact"
  FOR INSERT
  WITH CHECK (
    has_role('employee')
    AND has_company_permission('contacts_create', "companyId")
  );

-- Policy: Employees with relevant permissions can update contacts
CREATE POLICY "Employees can update contacts" ON "contact"
  FOR UPDATE
  USING (
    has_role('employee')
    AND has_company_permission('contacts_update', "companyId")
  );

-- Policy: Employees with relevant permissions can delete contacts
CREATE POLICY "Employees can delete contacts" ON "contact"
  FOR DELETE
  USING (
    has_role('employee')
    AND has_company_permission('contacts_delete', "companyId")
  );

