-- Table to store comment card
CREATE TABLE "public"."labelsReportsCommentsCard" (
  "id" uuid not null default uuid_generate_v4(),
  "labelId" uuid not null,
  "pinLocation" JSONB,
  "isSubmitted" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdBy" UUID NOT NULL,
  "updatedAt" timestamp with time zone,
  "lastUpdatedBy" UUID,
  "deletedAt" timestamp with time zone,
  "deletedBy" UUID,
  CONSTRAINT "labelsReportsCommentsCard_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsReportsCommentsCard_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "labelsReports"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsCommentsCard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsCard_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsCard_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

-- Table to store comments
CREATE TABLE "public"."labelsReportsComments" (
  "id" uuid not null default uuid_generate_v4(),
  "labelId" UUID NOT NULL,
  "content" JSONB,
  "pinLocation" JSONB,  -- JSONB field to store the canvas location
  "pinned" BOOLEAN DEFAULT FALSE,
  "resolved" BOOLEAN DEFAULT FALSE,
  "companyId" UUID NOT NULL,
  "commentBoxId" UUID NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdBy" UUID NOT NULL,
  "updatedAt" timestamp with time zone,
  "lastUpdatedBy" UUID,
  "deletedAt" timestamp with time zone,
  "deletedBy" UUID,
  CONSTRAINT "labelsReportsComments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsReportsComments_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "labelsReports"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsComments_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsComments_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsComments_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsComments_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsComments_commentBoxId_fkey" FOREIGN KEY ("commentBoxId") REFERENCES "labelsReportsCommentsCard"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table to store threaded replies
CREATE TABLE "public"."labelsReportsCommentsReplies" (
  "id" uuid not null default uuid_generate_v4(),
  "commentId" uuid not null,
  "content" JSONB,
  "companyId" uuid not null,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdBy" UUID NOT NULL,
  "updatedAt" timestamp with time zone,
  "lastUpdatedBy" UUID,
  "deletedAt" timestamp with time zone,
  "deletedBy" UUID,
  CONSTRAINT "labelsReportsCommentsReplies_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsReportsCommentsReplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "labelsReportsComments"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsCommentsReplies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsCommentsReplies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsReplies_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsReplies_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);
 
-- Table to handle user tagging in comments
CREATE TABLE "labelsReportsCommentsTags" (
  "id" uuid not null default uuid_generate_v4(),
  "commentId" uuid not null,
  "userId" UUID not null,
  "companyId" uuid not null,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdBy" UUID NOT NULL,
  "updatedAt" timestamp with time zone,
  "lastUpdatedBy" UUID,
  "deletedAt" timestamp with time zone,
  "deletedBy" UUID,
  CONSTRAINT "labelsReportsCommentsTags_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labelsReportsCommentsTags_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "labelsReportsComments"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsCommentsTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsTags_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "labelsReportsCommentsReplies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsReplies_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "user"("id"),
  CONSTRAINT "labelsReportsCommentsReplies_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);
 

 
-- Enable row-level security for the labelsreportscomments table
ALTER TABLE "labelsReportsComments" ENABLE ROW LEVEL SECURITY;
 
-- Enable row-level security for the labelsreportscommentsreplies table
ALTER TABLE "labelsReportsCommentsReplies" ENABLE ROW LEVEL SECURITY;
 
-- Enable row-level security for the labelsreportscommentstags table
ALTER TABLE "labelsReportsCommentsTags" ENABLE ROW LEVEL SECURITY;
 
-- Enable row-level security for the labelsreportscommentscard table
ALTER TABLE "labelsReportsCommentsCard" ENABLE ROW LEVEL SECURITY;
 
-- Security policies for the comments table
CREATE POLICY "Employees with labelsReports_view can view comments" ON "labelsReportsComments"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsReports_view', "companyId"));
 
CREATE POLICY "Employees with labelsReports_create can insert comments" ON "labelsReportsComments"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsReports_create', "companyId"));
 
CREATE POLICY "Employees with labelsReports_update can update comments" ON "labelsReportsComments"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsReports_update', "companyId"));
 
CREATE POLICY "Employees with labelsReports_delete can delete comments" ON "labelsReportsComments"
  FOR DELETE
USING (has_role('employee') AND has_company_permission('delete_labelsReportsComments', "companyId"));
 
-- Security policies for the comment_replies table
CREATE POLICY "Employees with labelsReports_view can view comment_replies" ON "labelsReportsCommentsReplies"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsReports_view', "companyId"));
 
CREATE POLICY "Employees with labelsReports_create can insert comment_replies" ON "labelsReportsCommentsReplies"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsReports_create', "companyId"));
 
CREATE POLICY "Employees with labelsReports_update can update comment_replies" ON "labelsReportsCommentsReplies"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsReports_update', "companyId"));
 
CREATE POLICY "Employees with labelsReports_delete can delete comment_replies" ON "labelsReportsCommentsReplies"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsReportsComments', "companyId"));
 
-- Security policies for the comment_tags table
CREATE POLICY "Employees with labelsReports_view can view comment_tags" ON "labelsReportsCommentsTags"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsReports_view', "companyId"));
 
CREATE POLICY "Employees with labelsReports_create can insert comment_tags" ON "labelsReportsCommentsTags"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsReports_create', "companyId"));
 
CREATE POLICY "Employees with labelsReports_update can update comment_tags" ON "labelsReportsCommentsTags"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsReports_update', "companyId"));
 
CREATE POLICY "Employees with labelsReports_delete can delete comment_tags" ON "labelsReportsCommentsTags"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsReportsComments', "companyId"));
 
-- Security policies for the comment_cards table
CREATE POLICY "Employees with labelsReports_view can view comment_cards" ON "labelsReportsCommentsCard"
  FOR SELECT
  USING (has_role('employee') AND has_company_permission('labelsReports_view', get_company_id_from_foreign_key("labelId", 'labelsReports')));
 
CREATE POLICY "Employees with labelsReports_create can insert comment_cards" ON "labelsReportsCommentsCard"
  FOR INSERT
  WITH CHECK (has_role('employee') AND has_company_permission('labelsReports_create', get_company_id_from_foreign_key("labelId", 'labelsReports')));
 
CREATE POLICY "Employees with labelsReports_update can update comment_cards" ON "labelsReportsCommentsCard"
  FOR UPDATE
  USING (has_role('employee') AND has_company_permission('labelsReports_update', get_company_id_from_foreign_key("labelId", 'labelsReports')));
 
CREATE POLICY "Employees with labelsReports_delete can delete comment_cards" ON "labelsReportsCommentsCard"
  FOR DELETE
  USING (has_role('employee') AND has_company_permission('delete_labelsReportsComments', get_company_id_from_foreign_key("labelId", 'labelsReports')));
 
-- Indexes to optimize queries
CREATE INDEX "comments_labelId_idx" ON "labelsReportsComments" ("labelId");
CREATE INDEX "comment_replies_commentId_idx" ON "labelsReportsCommentsReplies" ("commentId");
CREATE INDEX "comment_tags_commentId_idx" ON "labelsReportsCommentsTags" ("commentId");
CREATE INDEX "comments_commentBoxId_idx" ON "labelsReportsComments" ("commentBoxId");