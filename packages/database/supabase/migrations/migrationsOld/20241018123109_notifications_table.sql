-- https://miro.com/app/board/uXjVKjZVMsA=/

create type "public"."notfChannel" as enum ('web', 'sms', 'email');

create type "public"."notfType" as enum ('manual', 'time', 'event');

create type "public"."notfQueueStatus" as enum ('unread', 'read', 'deleted');

create type "public"."notfPriority" as enum ('low', 'normal', 'high', 'critical');

create type "public"."notfStatus" as enum ('draft', 'active', 'inactive', 'blocked');

create type "public"."notfRecurrence" as enum ('oneTime', 'hourly', 'daily', 'weekly', 'monthly', 'yearly');

create type "public"."notfPurpose" as enum ('Marketing', 'Alerts', 'SystemAlerts', 'UserEngagement');

create type "public"."notfAudience" as enum ('all', 'none', 'customized');

create type "public"."notfColor" as enum ('yellow', 'red', 'green');

create type "public"."notfCustomizedAudienceType" as enum ('user', 'department', 'team');

create table "public"."notfMaster" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "purpose" "notfPurpose" not null,
    "type" "notfType" not null,
    "priority" "notfPriority" not null,
    "color" "notfColor",
    "status" "notfStatus" default 'draft',
    "recurrence" "notfRecurrence",
    "startDateTime" timestamp,
    "startDateTimezone" text,
    "endDateTime" timestamp,
    "endDateTimezone" text,
    "occurences" int,
    "audience" "notfAudience",
    "isWebDelivery" boolean default false,
    "isEmailDelivery" boolean default false,
    "isSMSDelivery" boolean default false,
    "webContent" text,
    "webVariables" jsonb default '{}',
    "webConfig" jsonb default '{}',
    "emailContent" text,
    "emailVariables" jsonb default '{}',
    "emailConfig" jsonb default '{}',
    "smsContent" text,
    "smsVariables" jsonb default '{}',
    "smsConfig" jsonb default '{}',
    "version" bigint not null default 1,
    "scheduleId" text,
    "createdOn" timestamp with time zone not null default now(),
    "modifiedOn" timestamp with time zone,
    "createdBy" text not null,
    "modifiedBy" text,
    "deletedOn" timestamp with time zone,
    primary key ("id"),
    foreign key ("createdBy") references "user"("id") not valid,
    foreign key ("modifiedBy") references "user"("id") not valid
);

create table "public"."notfCompanyMapping" (
    "id" uuid not null default gen_random_uuid(),
    "companyId" text not null,
    "notificationId" uuid not null,
    primary key ("id"),
    foreign key ("notificationId") references "notfMaster"("id"),
    foreign key ("companyId") references "company"("id")
);

create table "public"."notfCustomizedAudience" (
    "id" uuid not null default gen_random_uuid(),
    "companyId" text not null,
    "notificationId" uuid not null,
    "entityType" "notfCustomizedAudienceType" not null,
    "entityId" text not null,
    primary key ("id"),
    foreign key ("notificationId") references "notfMaster"("id"),
    foreign key ("companyId") references "company"("id")
);

create table "public"."notfQueue" (
    "id" uuid not null default gen_random_uuid(),
    "companyId" text not null,
    "notificationId" uuid not null,
    "userId" text not null,
    "webContent" text,
    "emailContent" text,
    "smsContent" text,
    "status" "notfQueueStatus" default 'unread',
    "createdOn" timestamp with time zone not null default now(),
    primary key ("id"),
    foreign key ("userId") references "user"("id") not valid,
    foreign key ("notificationId") references "notfMaster"("id"),
    foreign key ("companyId") references "company"("id")
);