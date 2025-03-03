CREATE TABLE "font" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "name" TEXT NOT NULL,
  "assetUrl" TEXT,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "font_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "font_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "font_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);


ALTER TABLE "font" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees with users_view can view font" ON "font"
  FOR SELECT
  USING (
    has_role('employee')
  );

CREATE POLICY "Employees with users_create can insert font" ON "font"
  FOR INSERT
  WITH CHECK (   
    has_role('employee')
  );

CREATE POLICY "Employees with users_update can update font" ON "font"
  FOR UPDATE
  USING (
    has_role('employee')
  );

CREATE POLICY "Employees with users_delete can delete font" ON "font"
  FOR DELETE
  USING (
    has_role('employee')
  );
