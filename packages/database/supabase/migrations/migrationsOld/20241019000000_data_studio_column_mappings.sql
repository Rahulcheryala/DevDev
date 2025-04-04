CREATE TABLE public."integrationTableMappings" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "integrationId" UUID NOT NULL,
  "tableName" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  "userId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  CONSTRAINT fk_integration FOREIGN KEY ("integrationId") REFERENCES public."integrations"("id") ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."user"("id"),
  -- CONSTRAINT fk_company FOREIGN KEY ("companyId") REFERENCES public."userToCompany"("companyId"),
  CONSTRAINT fk_company FOREIGN KEY ("companyId") REFERENCES public."company"("id"),
  CONSTRAINT unique_integration_table UNIQUE ("integrationId", "tableName", "companyId")
);

CREATE TABLE public."integrationColumnMappings" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "tableMappingId" UUID NOT NULL,
  "sourceColumnName" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "dataType" TEXT NOT NULL,
  "isVisible" BOOLEAN DEFAULT true,
  "sortOrder" INTEGER,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_table_mapping FOREIGN KEY ("tableMappingId") 
    REFERENCES public."integrationTableMappings"("id") ON DELETE CASCADE,
  CONSTRAINT unique_column_mapping UNIQUE ("tableMappingId", "sourceColumnName")
);

-- Enable RLS
ALTER TABLE public."integrationTableMappings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."integrationColumnMappings" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for integrationTableMappings
CREATE POLICY "Users can view their own table mappings" ON public."integrationTableMappings"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert their own table mappings" ON public."integrationTableMappings"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update their own table mappings" ON public."integrationTableMappings"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- RLS Policies for integrationColumnMappings (inherited through tableMappingId)
CREATE POLICY "Users can manage their column mappings" ON public."integrationColumnMappings"
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public."integrationTableMappings" tm 
      WHERE tm.id = "tableMappingId" 
      AND tm."userId" = auth.uid()::text
    )
  );

-- Grants
GRANT ALL ON public."integrationTableMappings" TO authenticated;
GRANT ALL ON public."integrationColumnMappings" TO authenticated;
GRANT ALL ON public."integrationTableMappings" TO service_role;
GRANT ALL ON public."integrationColumnMappings" TO service_role;