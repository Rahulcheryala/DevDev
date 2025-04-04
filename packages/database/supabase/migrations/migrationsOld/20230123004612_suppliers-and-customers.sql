CREATE TABLE "country" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "code" TEXT NOT NULL
);

CREATE TABLE "contact" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "fullName" TEXT GENERATED ALWAYS AS ("firstName" || ' ' || "lastName") STORED,
  "email" TEXT NOT NULL,
  "title" TEXT,
  "mobilePhone" TEXT,
  "homePhone" TEXT,
  "workPhone" TEXT,
  "fax" TEXT,
  "addressLine1" TEXT,
  "addressLine2" TEXT,
  "city" TEXT,
  "state" TEXT,
  "postalCode" TEXT,
  "countryCode" INTEGER,
  "birthday" DATE,
  "notes" TEXT,
  "companyId" TEXT NOT NULL,

  CONSTRAINT "contact_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "contact_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "contact_companyId_idx" ON "contact" ("companyId");

CREATE TABLE "address" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "addressLine1" TEXT,
  "addressLine2" TEXT,
  "city" TEXT,
  "state" TEXT,
  "postalCode" TEXT,
  "countryCode" INTEGER,
  "phone" TEXT,
  "fax" TEXT,
  "companyId" TEXT NOT NULL,

  CONSTRAINT "address_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "address_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "address_companyId_idx" ON "address" ("companyId");
