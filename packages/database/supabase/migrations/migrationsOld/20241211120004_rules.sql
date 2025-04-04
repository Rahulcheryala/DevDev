create table "public"."rulecategories" (
    "categoryid" uuid not null default uuid_generate_v4(),
    "categoryname" character varying(255) not null,
    "categorydescription" text,
    "createdat" timestamp with time zone default now(),
    "updatedat" timestamp with time zone default now()
);


create table "public"."ruleexecutionlogs" (
    "logid" uuid not null default uuid_generate_v4(),
    "ruleid" uuid,
    "executionstatus" character varying(50) not null,
    "executionresult" jsonb,
    "executedat" timestamp with time zone default now(),
    "errormessage" text
);


create table "public"."rulestable" (
    "ruleid" uuid not null default uuid_generate_v4(),
    "rulename" character varying(255) not null,
    "ruledescription" text,
    "ruletype" character varying(50) not null,
    "creationmethod" character varying(50) not null,
    "triggertype" character varying(50) not null,
    "triggerconfig" jsonb,
    "conditionsconfig" jsonb,
    "actionsconfig" jsonb,
    "isactive" boolean default false,
    "rulepriority" integer default 0,
    "rulescope" character varying(50) default 'local'::character varying,
    "createdat" timestamp with time zone default now(),
    "updatedat" timestamp with time zone default now(),
    "createdby" uuid,
    "versionnumber" integer default 1
);


create table "public"."ruletagrelations" (
    "ruleid" uuid not null,
    "tagid" uuid not null
);


create table "public"."ruletags" (
    "tagid" uuid not null default uuid_generate_v4(),
    "tagname" character varying(255) not null,
    "createdat" timestamp with time zone default now()
);


create table "public"."ruletemplates" (
    "templateid" uuid not null default uuid_generate_v4(),
    "templatename" character varying(255) not null,
    "templatedescription" text,
    "templateconfig" jsonb,
    "categoryid" uuid,
    "createdat" timestamp with time zone default now(),
    "updatedat" timestamp with time zone default now()
);


CREATE UNIQUE INDEX rulecategories_pkey ON public.rulecategories USING btree (categoryid);

CREATE UNIQUE INDEX ruleexecutionlogs_pkey ON public.ruleexecutionlogs USING btree (logid);

CREATE UNIQUE INDEX rulestable_pkey ON public.rulestable USING btree (ruleid);

CREATE UNIQUE INDEX ruletagrelations_pkey ON public.ruletagrelations USING btree (ruleid, tagid);

CREATE UNIQUE INDEX ruletags_pkey ON public.ruletags USING btree (tagid);

CREATE UNIQUE INDEX ruletags_tagname_key ON public.ruletags USING btree (tagname);

CREATE UNIQUE INDEX ruletemplates_pkey ON public.ruletemplates USING btree (templateid);

alter table "public"."rulecategories" add constraint "rulecategories_pkey" PRIMARY KEY using index "rulecategories_pkey";

alter table "public"."ruleexecutionlogs" add constraint "ruleexecutionlogs_pkey" PRIMARY KEY using index "ruleexecutionlogs_pkey";

alter table "public"."rulestable" add constraint "rulestable_pkey" PRIMARY KEY using index "rulestable_pkey";

alter table "public"."ruletagrelations" add constraint "ruletagrelations_pkey" PRIMARY KEY using index "ruletagrelations_pkey";

alter table "public"."ruletags" add constraint "ruletags_pkey" PRIMARY KEY using index "ruletags_pkey";

alter table "public"."ruletemplates" add constraint "ruletemplates_pkey" PRIMARY KEY using index "ruletemplates_pkey";

alter table "public"."ruleexecutionlogs" add constraint "ruleexecutionlogs_ruleid_fkey" FOREIGN KEY (ruleid) REFERENCES rulestable(ruleid) not valid;

alter table "public"."ruleexecutionlogs" validate constraint "ruleexecutionlogs_ruleid_fkey";

alter table "public"."rulestable" add constraint "rulestable_createdby_fkey" FOREIGN KEY (createdby) REFERENCES auth.users(id) not valid;

alter table "public"."rulestable" validate constraint "rulestable_createdby_fkey";

alter table "public"."ruletagrelations" add constraint "ruletagrelations_ruleid_fkey" FOREIGN KEY (ruleid) REFERENCES rulestable(ruleid) ON DELETE CASCADE not valid;

alter table "public"."ruletagrelations" validate constraint "ruletagrelations_ruleid_fkey";

alter table "public"."ruletagrelations" add constraint "ruletagrelations_tagid_fkey" FOREIGN KEY (tagid) REFERENCES ruletags(tagid) ON DELETE CASCADE not valid;

alter table "public"."ruletagrelations" validate constraint "ruletagrelations_tagid_fkey";

alter table "public"."ruletags" add constraint "ruletags_tagname_key" UNIQUE using index "ruletags_tagname_key";

alter table "public"."ruletemplates" add constraint "ruletemplates_categoryid_fkey" FOREIGN KEY (categoryid) REFERENCES rulecategories(categoryid) not valid;

alter table "public"."ruletemplates" validate constraint "ruletemplates_categoryid_fkey";

grant delete on table "public"."rulecategories" to "anon";

grant insert on table "public"."rulecategories" to "anon";

grant references on table "public"."rulecategories" to "anon";

grant select on table "public"."rulecategories" to "anon";

grant trigger on table "public"."rulecategories" to "anon";

grant truncate on table "public"."rulecategories" to "anon";

grant update on table "public"."rulecategories" to "anon";

grant delete on table "public"."rulecategories" to "authenticated";

grant insert on table "public"."rulecategories" to "authenticated";

grant references on table "public"."rulecategories" to "authenticated";

grant select on table "public"."rulecategories" to "authenticated";

grant trigger on table "public"."rulecategories" to "authenticated";

grant truncate on table "public"."rulecategories" to "authenticated";

grant update on table "public"."rulecategories" to "authenticated";

grant delete on table "public"."rulecategories" to "service_role";

grant insert on table "public"."rulecategories" to "service_role";

grant references on table "public"."rulecategories" to "service_role";

grant select on table "public"."rulecategories" to "service_role";

grant trigger on table "public"."rulecategories" to "service_role";

grant truncate on table "public"."rulecategories" to "service_role";

grant update on table "public"."rulecategories" to "service_role";

grant delete on table "public"."ruleexecutionlogs" to "anon";

grant insert on table "public"."ruleexecutionlogs" to "anon";

grant references on table "public"."ruleexecutionlogs" to "anon";

grant select on table "public"."ruleexecutionlogs" to "anon";

grant trigger on table "public"."ruleexecutionlogs" to "anon";

grant truncate on table "public"."ruleexecutionlogs" to "anon";

grant update on table "public"."ruleexecutionlogs" to "anon";

grant delete on table "public"."ruleexecutionlogs" to "authenticated";

grant insert on table "public"."ruleexecutionlogs" to "authenticated";

grant references on table "public"."ruleexecutionlogs" to "authenticated";

grant select on table "public"."ruleexecutionlogs" to "authenticated";

grant trigger on table "public"."ruleexecutionlogs" to "authenticated";

grant truncate on table "public"."ruleexecutionlogs" to "authenticated";

grant update on table "public"."ruleexecutionlogs" to "authenticated";

grant delete on table "public"."ruleexecutionlogs" to "service_role";

grant insert on table "public"."ruleexecutionlogs" to "service_role";

grant references on table "public"."ruleexecutionlogs" to "service_role";

grant select on table "public"."ruleexecutionlogs" to "service_role";

grant trigger on table "public"."ruleexecutionlogs" to "service_role";

grant truncate on table "public"."ruleexecutionlogs" to "service_role";

grant update on table "public"."ruleexecutionlogs" to "service_role";

grant delete on table "public"."rulestable" to "anon";

grant insert on table "public"."rulestable" to "anon";

grant references on table "public"."rulestable" to "anon";

grant select on table "public"."rulestable" to "anon";

grant trigger on table "public"."rulestable" to "anon";

grant truncate on table "public"."rulestable" to "anon";

grant update on table "public"."rulestable" to "anon";

grant delete on table "public"."rulestable" to "authenticated";

grant insert on table "public"."rulestable" to "authenticated";

grant references on table "public"."rulestable" to "authenticated";

grant select on table "public"."rulestable" to "authenticated";

grant trigger on table "public"."rulestable" to "authenticated";

grant truncate on table "public"."rulestable" to "authenticated";

grant update on table "public"."rulestable" to "authenticated";

grant delete on table "public"."rulestable" to "service_role";

grant insert on table "public"."rulestable" to "service_role";

grant references on table "public"."rulestable" to "service_role";

grant select on table "public"."rulestable" to "service_role";

grant trigger on table "public"."rulestable" to "service_role";

grant truncate on table "public"."rulestable" to "service_role";

grant update on table "public"."rulestable" to "service_role";

grant delete on table "public"."ruletagrelations" to "anon";

grant insert on table "public"."ruletagrelations" to "anon";

grant references on table "public"."ruletagrelations" to "anon";

grant select on table "public"."ruletagrelations" to "anon";

grant trigger on table "public"."ruletagrelations" to "anon";

grant truncate on table "public"."ruletagrelations" to "anon";

grant update on table "public"."ruletagrelations" to "anon";

grant delete on table "public"."ruletagrelations" to "authenticated";

grant insert on table "public"."ruletagrelations" to "authenticated";

grant references on table "public"."ruletagrelations" to "authenticated";

grant select on table "public"."ruletagrelations" to "authenticated";

grant trigger on table "public"."ruletagrelations" to "authenticated";

grant truncate on table "public"."ruletagrelations" to "authenticated";

grant update on table "public"."ruletagrelations" to "authenticated";

grant delete on table "public"."ruletagrelations" to "service_role";

grant insert on table "public"."ruletagrelations" to "service_role";

grant references on table "public"."ruletagrelations" to "service_role";

grant select on table "public"."ruletagrelations" to "service_role";

grant trigger on table "public"."ruletagrelations" to "service_role";

grant truncate on table "public"."ruletagrelations" to "service_role";

grant update on table "public"."ruletagrelations" to "service_role";

grant delete on table "public"."ruletags" to "anon";

grant insert on table "public"."ruletags" to "anon";

grant references on table "public"."ruletags" to "anon";

grant select on table "public"."ruletags" to "anon";

grant trigger on table "public"."ruletags" to "anon";

grant truncate on table "public"."ruletags" to "anon";

grant update on table "public"."ruletags" to "anon";

grant delete on table "public"."ruletags" to "authenticated";

grant insert on table "public"."ruletags" to "authenticated";

grant references on table "public"."ruletags" to "authenticated";

grant select on table "public"."ruletags" to "authenticated";

grant trigger on table "public"."ruletags" to "authenticated";

grant truncate on table "public"."ruletags" to "authenticated";

grant update on table "public"."ruletags" to "authenticated";

grant delete on table "public"."ruletags" to "service_role";

grant insert on table "public"."ruletags" to "service_role";

grant references on table "public"."ruletags" to "service_role";

grant select on table "public"."ruletags" to "service_role";

grant trigger on table "public"."ruletags" to "service_role";

grant truncate on table "public"."ruletags" to "service_role";

grant update on table "public"."ruletags" to "service_role";

grant delete on table "public"."ruletemplates" to "anon";

grant insert on table "public"."ruletemplates" to "anon";

grant references on table "public"."ruletemplates" to "anon";

grant select on table "public"."ruletemplates" to "anon";

grant trigger on table "public"."ruletemplates" to "anon";

grant truncate on table "public"."ruletemplates" to "anon";

grant update on table "public"."ruletemplates" to "anon";

grant delete on table "public"."ruletemplates" to "authenticated";

grant insert on table "public"."ruletemplates" to "authenticated";

grant references on table "public"."ruletemplates" to "authenticated";

grant select on table "public"."ruletemplates" to "authenticated";

grant trigger on table "public"."ruletemplates" to "authenticated";

grant truncate on table "public"."ruletemplates" to "authenticated";

grant update on table "public"."ruletemplates" to "authenticated";

grant delete on table "public"."ruletemplates" to "service_role";

grant insert on table "public"."ruletemplates" to "service_role";

grant references on table "public"."ruletemplates" to "service_role";

grant select on table "public"."ruletemplates" to "service_role";

grant trigger on table "public"."ruletemplates" to "service_role";

grant truncate on table "public"."ruletemplates" to "service_role";

grant update on table "public"."ruletemplates" to "service_role";


