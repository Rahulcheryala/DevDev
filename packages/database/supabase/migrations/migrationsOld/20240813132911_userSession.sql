create type "public"."loginStatus" as enum ('Logged In', 'Logged Out');
create type "public"."activityStatus" as enum ('Active', 'Inactive');

CREATE TABLE "userSession" (
  "id" TEXT NOT NULL DEFAULT xid(),
  "userId" TEXT,
  "location" JSONB NOT NULL,
  "device" JSONB NOT NULL,
  "ipAddress" TEXT NOT NULL,
  "status" "loginStatus" NOT NULL,
  "sessionActivity" "activityStatus" NOT NULL,
  "metadata" JSONB NOT NULL,
  "createdBy" TEXT NOT NULL,
  "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "endedOn" TIMESTAMP WITH TIME ZONE,
  "modifiedBy" TEXT,
  "modifiedOn" TIMESTAMP WITH TIME ZONE,
  "deletedBy" TEXT,
  "deletedOn" TIMESTAMP WITH TIME ZONE,

  CONSTRAINT "userSession_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "userSession_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id"),
  CONSTRAINT "userSession_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "user"("id"),
  CONSTRAINT "userSession_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id")
);

CREATE UNIQUE INDEX "userSessionInfo_pkey" ON public."userSession" USING btree (id);
