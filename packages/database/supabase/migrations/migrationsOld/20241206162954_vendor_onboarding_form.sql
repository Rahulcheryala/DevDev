create table
  public."vendorOnboardingForm" (
    created_at timestamp with time zone not null default now(),
    "Name" character varying null,
    "Description" character varying null,
    updated_at timestamp with time zone null default now(),
    id uuid not null default gen_random_uuid (),
    constraint vendorOnboardingForm_pkey primary key (id)
  ) tablespace pg_default;
  

  create table
  public."vendorOnboardingFormQuestionType" (
    created_at timestamp with time zone not null default now(),
    type text null,
    id uuid not null default gen_random_uuid (),
    constraint vendorOnboardingFormQuestionType_pkey primary key (id)
  ) tablespace pg_default;


    INSERT INTO public."vendorOnboardingFormQuestionType" (id, type)
VALUES
    (gen_random_uuid(), 'Text Area'),
    (gen_random_uuid(), 'Text Box'),
    (gen_random_uuid(), 'Multiple Choice'),
    (gen_random_uuid(), 'Checkbox'),
    (gen_random_uuid(), 'Dropdown'),
    (gen_random_uuid(), 'Date'),
    (gen_random_uuid(), 'Time'),
    (gen_random_uuid(), 'File');


create table
  public."vendorOnboardingFormQuestion" (
    created_at timestamp with time zone not null default now(),
    question_text text null,
    "order" bigint null,
    is_required boolean null,
    id uuid not null default gen_random_uuid (),
    vendor_onboarding_form_assoc uuid null,
    question_type_assoc uuid null,
    constraint vendorOnboardingFormQuestion_pkey primary key (id),
    constraint public_vendorOnboardingFormQuestion_vendor_onboarding_form_asso foreign key (vendor_onboarding_form_assoc) references "vendorOnboardingForm" (id),
    constraint public_vendorOnboardingFormQuestion_question_type_assoc_fkey foreign key (question_type_assoc) references "vendorOnboardingFormQuestionType" (id)
  ) tablespace pg_default;


create table
  public."vendorOnboardingFormQuestionOption" (
    created_at timestamp with time zone not null default now(),
    option_text text null,
    id uuid not null default gen_random_uuid (),
    vendor_onboarding_form_question_assoc uuid null,
    constraint vendorOnboardingFormQuestionOption_pkey primary key (id),
    constraint public_vendorOnboardingFormQuestionOption_vendor_onboarding_for foreign key (vendor_onboarding_form_question_assoc) references "vendorOnboardingFormQuestion" (id)
  ) tablespace pg_default;

 create table
  public."vendorFormResponse" (
    created_at timestamp with time zone not null default now(),
    vendor_email text null,
    id uuid not null default gen_random_uuid (),
    vendor_onboarding_form_assoc uuid null,
    constraint vendorFormResponse_pkey primary key (id),
    constraint public_vendorFormResponse_vendor_onboarding_form_assoc_fkey foreign key (vendor_onboarding_form_assoc) references "vendorOnboardingForm" (id)
  ) tablespace pg_default;

 create table
  public."vendorFormResponseAnswer" (
    created_at timestamp with time zone not null default now(),
    answer text null,
    id uuid not null default gen_random_uuid (),
    vendor_onboarding_response_assoc uuid null,
    constraint vendorFormResponseAnswer_pkey primary key (id),
    constraint public_vendorFormResponseAnswer_vendor_onboarding_response_asso foreign key (vendor_onboarding_response_assoc) references "vendorFormResponse" (id)
  ) tablespace pg_default;

  create table
  public."venderContract" (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    contract_file character varying null,
    is_approved boolean null,
    vendor_action character varying null,
    vendor_email character varying null,
    vendor_onboarding_form_assoc uuid null,
    constraint venderContract_pkey primary key (id),
    constraint public_venderContract_vendor_onboarding_form_assoc_fkey foreign key (vendor_onboarding_form_assoc) references "vendorOnboardingForm" (id)
  ) tablespace pg_default;