

CREATE TABLE public."SalesOrdersStaging" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "salesOrderId" text,
  "customerAccount" text,
  "orderDate" timestamp,
  "modifiedDateTime" timestamp,
  "data" jsonb,
  "insertedAt" timestamp DEFAULT now(),
  "processed" boolean DEFAULT false,
  "userId" text NOT NULL, -- userId references user table
  "companyId" text NOT NULL, -- companyId references userToCompany table
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."user"("id"),
  CONSTRAINT fk_company FOREIGN KEY ("companyId") REFERENCES public."company"("id")
);


CREATE TABLE public."SalesOrders" (
  "id" uuid PRIMARY KEY,
  "salesOrderId" text UNIQUE,
  "customerAccount" text,
  "orderDate" timestamp,
  "modifiedDateTime" timestamp,
  "data" jsonb,
  "insertedAt" timestamp DEFAULT now(),
  "updatedAt" timestamp DEFAULT now(),
  "processed" boolean DEFAULT false,
  "userId" text NOT NULL, -- userId references user table
  "companyId" text NOT NULL, -- companyId references userToCompany table
  CONSTRAINT sales_order_id_unique UNIQUE ("salesOrderId"),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."user"("id"),
  CONSTRAINT fk_company FOREIGN KEY ("companyId") REFERENCES public."company"("id")
);


-- Enable row-level security (RLS) for SalesOrdersStaging
ALTER TABLE public."SalesOrdersStaging" ENABLE ROW LEVEL SECURITY;

-- Enable row-level security (RLS) for SalesOrders
ALTER TABLE public."SalesOrders" ENABLE ROW LEVEL SECURITY;

-- Define RLS policy for authenticated users to select their own records in SalesOrdersStaging
CREATE POLICY "Authenticated users can select their own SalesOrdersStaging records" ON public."SalesOrdersStaging"
FOR SELECT USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for authenticated users to insert into SalesOrdersStaging
CREATE POLICY "Authenticated users can insert their own SalesOrdersStaging records" ON public."SalesOrdersStaging"
FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for authenticated users to update their own records in SalesOrdersStaging
CREATE POLICY "Authenticated users can update their own SalesOrdersStaging records" ON public."SalesOrdersStaging"
FOR UPDATE USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for authenticated users to delete their own records in SalesOrdersStaging
CREATE POLICY "Authenticated users can delete their own SalesOrdersStaging records" ON public."SalesOrdersStaging"
FOR DELETE USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for service_role to manage all records in SalesOrdersStaging
CREATE POLICY "Service role can manage all records in SalesOrdersStaging" ON public."SalesOrdersStaging"
FOR ALL USING (auth.role() = 'service_role');

-- Define RLS policy for authenticated users to select their own records in SalesOrders
CREATE POLICY "Authenticated users can select their own SalesOrders records" ON public."SalesOrders"
FOR SELECT USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for authenticated users to insert into SalesOrders
CREATE POLICY "Authenticated users can insert their own SalesOrders records" ON public."SalesOrders"
FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for authenticated users to update their own records in SalesOrders
CREATE POLICY "Authenticated users can update their own SalesOrders records" ON public."SalesOrders"
FOR UPDATE USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for authenticated users to delete their own records in SalesOrders
CREATE POLICY "Authenticated users can delete their own SalesOrders records" ON public."SalesOrders"
FOR DELETE USING (auth.role() = 'authenticated' AND "userId" = auth.uid()::text);

-- Define RLS policy for service_role to manage all records in SalesOrders
CREATE POLICY "Service role can manage all records in SalesOrders" ON public."SalesOrders"
FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions on SalesOrdersStaging to "anon", "authenticated", and "service_role"
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."SalesOrdersStaging" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."SalesOrdersStaging" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."SalesOrdersStaging" TO service_role;

-- Grant permissions on SalesOrders to "anon", "authenticated", and "service_role"
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."SalesOrders" TO anon;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."SalesOrders" TO authenticated;
GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public."SalesOrders" TO service_role;
