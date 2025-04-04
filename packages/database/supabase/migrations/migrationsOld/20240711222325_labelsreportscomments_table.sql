-- Table to store comment card
CREATE TABLE "labelsreportscommentscard" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "labelId" TEXT NOT NULL,
  "pinLocation" JSONB,
  "isSubmitted" BOOLEAN DEFAULT FALSE,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,
 
  CONSTRAINT "labelsreportscommentscard_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsreportscommentscard_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "labelsreports"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreportscommentscard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscommentscard_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscommentscard_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

-- Table to store comments
CREATE TABLE "labelsreportscomments" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "labelId" TEXT NOT NULL,
  "content" JSONB,
  "pinLocation" JSONB,  -- JSONB field to store the canvas location
  "pinned" BOOLEAN DEFAULT FALSE,
  "resolved" BOOLEAN DEFAULT FALSE,
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,
  "commentBoxId" TEXT NOT NULL,

  CONSTRAINT "labelsreportscomments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsreportscomments_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "labelsreports"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreportscomments_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscomments_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscomments_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscomments_commentBoxId_fkey" FOREIGN KEY ("commentBoxId") REFERENCES "labelsreportscommentscard"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table to store threaded replies
CREATE TABLE "labelsreportscommentsreplies" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "commentId" TEXT NOT NULL,
  "content" JSONB,
  "companyId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,
 
  CONSTRAINT "labelsreportscommentsreplies_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsreportscommentsreplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "labelsreportscomments"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreportscommentsreplies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscommentsreplies_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsreportscommentsreplies_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);
 
-- Table to handle user tagging in comments
CREATE TABLE "labelsreportscommentstags" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "commentId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
 
  CONSTRAINT "labelsreportscommentstags_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsreportscommentstags_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "labelsreportscomments"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsreportscommentstags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id")
);
 

 
-- Enable row-level security for the labelsreportscomments table
ALTER TABLE "labelsreportscomments" ENABLE ROW LEVEL SECURITY;
 
-- Enable row-level security for the labelsreportscommentsreplies table
ALTER TABLE "labelsreportscommentsreplies" ENABLE ROW LEVEL SECURITY;
 
-- Enable row-level security for the labelsreportscommentstags table
ALTER TABLE "labelsreportscommentstags" ENABLE ROW LEVEL SECURITY;
 
-- Enable row-level security for the labelsreportscommentscard table
ALTER TABLE "labelsreportscommentscard" ENABLE ROW LEVEL SECURITY;
 
-- Security policies for the comments table
CREATE POLICY "Employees with labelsreports_view can view comments" ON "labelsreportscomments"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsreports_view', "companyId"));
 
CREATE POLICY "Employees with labelsreports_create can insert comments" ON "labelsreportscomments"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsreports_create', "companyId"));
 
CREATE POLICY "Employees with labelsreports_update can update comments" ON "labelsreportscomments"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsreports_update', "companyId"));
 
CREATE POLICY "Employees with labelsreports_delete can delete comments" ON "labelsreportscomments"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsreportscomments', "companyId"));
 
-- Security policies for the comment_replies table
CREATE POLICY "Employees with labelsreports_view can view comment_replies" ON "labelsreportscommentsreplies"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsreports_view', "companyId"));
 
CREATE POLICY "Employees with labelsreports_create can insert comment_replies" ON "labelsreportscommentsreplies"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsreports_create', "companyId"));
 
CREATE POLICY "Employees with labelsreports_update can update comment_replies" ON "labelsreportscommentsreplies"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsreports_update', "companyId"));
 
CREATE POLICY "Employees with labelsreports_delete can delete comment_replies" ON "labelsreportscommentsreplies"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsreportscomments', "companyId"));
 
-- Security policies for the comment_tags table
CREATE POLICY "Employees with labelsreports_view can view comment_tags" ON "labelsreportscommentstags"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsreports_view', "companyId"));
 
CREATE POLICY "Employees with labelsreports_create can insert comment_tags" ON "labelsreportscommentstags"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsreports_create', "companyId"));
 
CREATE POLICY "Employees with labelsreports_update can update comment_tags" ON "labelsreportscommentstags"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsreports_update', "companyId"));
 
CREATE POLICY "Employees with labelsreports_delete can delete comment_tags" ON "labelsreportscommentstags"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsreportscomments', "companyId"));
 
-- Security policies for the comment_cards table
CREATE POLICY "Employees with labelsreports_view can view comment_cards" ON "labelsreportscommentscard"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsreports_view', get_company_id_from_foreign_key("labelId", 'labelsreports')));
 
CREATE POLICY "Employees with labelsreports_create can insert comment_cards" ON "labelsreportscommentscard"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsreports_create', get_company_id_from_foreign_key("labelId", 'labelsreports')));
 
CREATE POLICY "Employees with labelsreports_update can update comment_cards" ON "labelsreportscommentscard"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsreports_update', get_company_id_from_foreign_key("labelId", 'labelsreports')));
 
CREATE POLICY "Employees with labelsreports_delete can delete comment_cards" ON "labelsreportscommentscard"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsreportscomments', get_company_id_from_foreign_key("labelId", 'labelsreports')));
 
-- Indexes to optimize queries
CREATE INDEX "comments_labelId_idx" ON "labelsreportscomments" ("labelId");
CREATE INDEX "comment_replies_commentId_idx" ON "labelsreportscommentsreplies" ("commentId");
CREATE INDEX "comment_tags_commentId_idx" ON "labelsreportscommentstags" ("commentId");
CREATE INDEX "comments_commentBoxId_idx" ON "labelsreportscomments" ("commentBoxId");