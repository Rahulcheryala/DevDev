create type "public"."complianceType" as enum ('GDPR', 'HIPAA', 'PCI-DSS');
create type "public"."tableType" as enum ('System', 'Application', 'Temp', 'Tenant');

create table "public"."allTables" (
    "id" uuid not null default uuid_generate_v4(),
    "tableName" character varying(255) not null,
    "schemaName" character varying(255) not null,
    "module" character varying(100),
    "purpose" text,
    "nullable" boolean not null,
    "parentTable" character varying(255),
    "foreignKeys" jsonb,
    "includeInTenantSchema" boolean not null default false,
    "isTenantSpecific" boolean default false,
    "referenceTenantId" uuid,
    "containsPii" boolean not null default false,
    "dataRetentionDays" integer,
    "tableType" "tableType",
    "encryptionRequired" boolean not null default false,
    "complianceTag" "complianceType",
    "createdAt" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "createdBy" uuid not null,
    "updatedAt" timestamp with time zone,
    "lastUpdatedBy" uuid,
    "deletedAt" timestamp with time zone,
    "deletedBy" uuid
);

CREATE UNIQUE INDEX "allTables_pkey" ON public."allTables" USING btree (id);
CREATE INDEX "idxAllTablesContainsPii" ON public."allTables" USING btree ("containsPii");
CREATE INDEX "idxAllTablesDeletedAt" ON public."allTables" USING btree ("deletedAt");
CREATE INDEX "idxAllTablesModule" ON public."allTables" USING btree ("module");
CREATE INDEX "idxAllTablesSchemaName" ON public."allTables" USING btree ("schemaName");
CREATE INDEX "idxAllTablesTableName" ON public."allTables" USING btree ("tableName");
CREATE INDEX "idxAllTablesTableType" ON public."allTables" USING btree ("tableType");
CREATE INDEX "idxAllTablesTenantSpecific" ON public."allTables" USING btree ("isTenantSpecific");
CREATE UNIQUE INDEX "idxUniqueActiveTableSchema" ON public."allTables" USING btree ("tableName", "schemaName") WHERE ("deletedAt" IS NULL);

alter table "public"."allTables" add constraint "allTables_pkey" PRIMARY KEY using index "allTables_pkey";

grant delete on table "public"."allTables" to "anon";
grant insert on table "public"."allTables" to "anon";
grant references on table "public"."allTables" to "anon";
grant select on table "public"."allTables" to "anon";
grant trigger on table "public"."allTables" to "anon";
grant truncate on table "public"."allTables" to "anon";
grant update on table "public"."allTables" to "anon";

grant delete on table "public"."allTables" to "authenticated";
grant insert on table "public"."allTables" to "authenticated";
grant references on table "public"."allTables" to "authenticated";
grant select on table "public"."allTables" to "authenticated";
grant trigger on table "public"."allTables" to "authenticated";
grant truncate on table "public"."allTables" to "authenticated";
grant update on table "public"."allTables" to "authenticated";

grant delete on table "public"."allTables" to "service_role";
grant insert on table "public"."allTables" to "service_role";
grant references on table "public"."allTables" to "service_role";
grant select on table "public"."allTables" to "service_role";
grant trigger on table "public"."allTables" to "service_role";
grant truncate on table "public"."allTables" to "service_role";
grant update on table "public"."allTables" to "service_role";

CREATE TRIGGER "updateAllTablesTimestamp" BEFORE UPDATE ON public."allTables" FOR EACH ROW EXECUTE FUNCTION "golden"."updateupdatedatcolumn"();