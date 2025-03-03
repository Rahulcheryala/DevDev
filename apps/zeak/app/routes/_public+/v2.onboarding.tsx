import {
  VStack,
  Checkbox,
  HStack,
  FormErrorMessage,
  FormControl,
} from "@zeak/react";
import {
  useControlField,
  useField,
  useIsSubmitting,
  ValidatedForm,
  validationError,
  validator,
} from "@zeak/remix-validated-form";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Password, Submit, ClearableInput, PhoneInputV2, DatePicker } from "~/components/Form";
import { requirePermissions } from "~/services/auth/auth.server";
import { getUser } from "~/modules/users/users.server";
import {
  destroyAuthSession,
  updateCompanySession,
} from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { onboardingValidator, updatePublicAccount } from "~/modules/account";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { getCompany, insertCompany, insertTenant, seedCompany } from "~/modules/settings";
import logger from "~/lib/logger";
import { path } from "~/utils/path";
import { type z } from "zod";
import { RiErrorWarningLine } from "react-icons/ri";
import slugify from "slugify";
import { companyStatusMap } from "~/modules/access-settings";
// import { triggerSeed } from "~/modules/settings/setting.trigger";
import DatePicker2 from "~/components/Form/DatePicker2";
import { fetchCustomSchemaPrismaInstance } from "~/utils/prisma";

const employeesDummyData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    employmentStatus: "Active",
    hireDate: "2023-05-15",
    employeeTypeId: 1,
    companyId: 101,
    createdBy: "Admin01",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    employmentStatus: "Inactive",
    hireDate: "2022-10-20",
    employeeTypeId: 2,
    companyId: 102,
    createdBy: "Admin02",
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    employmentStatus: "Active",
    hireDate: "2023-07-10",
    employeeTypeId: 3,
    companyId: 101,
    createdBy: "Admin03",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    employmentStatus: "Active",
    hireDate: "2021-03-12",
    employeeTypeId: 1,
    companyId: 103,
    createdBy: "Admin01",
  },
  {
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    employmentStatus: "On Leave",
    hireDate: "2020-11-25",
    employeeTypeId: 4,
    companyId: 102,
    createdBy: "Admin02",
  },
  {
    firstName: "Chris",
    lastName: "Lee",
    email: "chris.lee@example.com",
    employmentStatus: "Active",
    hireDate: "2024-01-15",
    employeeTypeId: 2,
    companyId: 104,
    createdBy: "Admin04",
  },
];


export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Signup" }];
};

export async function loader({ request }: ActionFunctionArgs) {
  const { client, userId, companyId } = await requirePermissions(request, {
    update: ["users", "settings"],
  });

  const [
    company,
    //  locations
  ] = await Promise.all([
    getCompany(client, companyId),
    // getLocationsList(client, companyId),
  ]);
  // we don't need to do onboarding if we have a company name or locations
  if (
    company.data?.name
    // && locations.data?.length
  ) {
    throw redirect(path.to.authenticatedRoot);
  }

  const user = await getUser(client, userId);
  if (user.error || !user.data) {
    await destroyAuthSession(request);
  }

  return { user: user.data };
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    update: ["users", "settings"],
  });
  const supabaseClient = getSupabaseServiceRole();

  const validation = await validator(onboardingValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { email, name, password, companyName, mobilePhone, dateofbirth } = validation.data;

  const updatePassword = await supabaseClient.auth.admin.updateUserById(
    userId,
    {
      email,
      password,
    },
  );

  if (updatePassword.error) {
    console.error(updatePassword.error);
    throw new Error("Fatal: failed to update password");
  }

  const wordArr = name.trim().split(" ");
  let firstName = "";
  let lastName = "";
  if (wordArr.length === 1) firstName = wordArr[0];
  else if (wordArr.length > 1) {
    firstName = wordArr[0] ?? "";
    lastName = wordArr.filter((w) => w !== firstName).join(" ");
  }

  const updateAccount = await updatePublicAccount(client, {
    id: userId,
    email,
    firstName: name,
    lastName,
    phno: mobilePhone || '',
    birthday: dateofbirth
  });

  if (updateAccount.error) {
    console.error(updateAccount.error);
    throw new Error("Fatal: failed to update account");
  }

  // Get the origin from the request headers
  const url = new URL(request.url);
  const originUrl = `${url.protocol}//${url.host}`;

  const slugifiedDomainUrl = slugify(companyName, {
    lower: true, // convert to lowercase
    remove: /[*+~.()'"!:@#$%^&?/<>;:"'-]/g, // remove special characters
  });

  const tenantInsert = await insertTenant(supabaseClient, {
    name: companyName,
    status: companyStatusMap.ACTIVE,
    createdBy: userId
  });

  if (tenantInsert.error) {
    logger.error(tenantInsert.error);
    throw new Error("Fatal: failed to insert tenant");
  }

  const { data: createCompanySchemaData, error: createCompanySchemaError } = await supabaseClient.functions.invoke('schema-clone',
    {
      body: { "newSchemaName": tenantInsert.data?.id }
    }
  );

  if (createCompanySchemaError) {
    console.log('createCompanySchemaError', createCompanySchemaError)
    logger.error(createCompanySchemaError);
    throw new Error("Fatal: failed to create company schema");
  }

  if (createCompanySchemaData) {
    console.log('createCompanySchemaData', createCompanySchemaData.data)
  }

  const companyInsert = await insertCompany(supabaseClient, {
    name: companyName??'',
    domainUrl: `${originUrl}/${slugifiedDomainUrl}`,
    status: companyStatusMap.ACTIVE,
    tenantId: tenantInsert.data?.id,
    createdBy: userId,
    lastUpdatedBy: userId,
    primaryContactId: userId,
  });

  if (companyInsert.error) {
    logger.error(companyInsert.error);
    throw new Error("Fatal: failed to insert company");
  }
  let companyId: string | undefined;
  companyId = companyInsert.data?.id;
  if (!companyId) {
    throw new Error("Fatal: failed to get company ID");
  }

  const prisma = fetchCustomSchemaPrismaInstance(tenantInsert.data?.id);

  const departmentsData = await prisma.departments.create({
    data: {
      companyId: companyId,
      name: name,
      createdBy: userId,
      departmentCode: 'DEFAULT'
    }
  });
  logger.info('departmentsData ::', departmentsData);

  const { data: companyUsersData, error: companyUsersError } = await supabaseClient
    .from('companyUsers')
    .insert([
      { userId: userId, companyId: companyId, createdBy: userId, departmentId: departmentsData.id },
    ])
    .select()
  if (companyUsersError) {
    logger.error('companyUsersError ::', companyUsersError);
    throw new Error("Fatal: failed to insert companyUsers");
  }

  const { data: employeeTypeData, error: employeeTypeError } = await supabaseClient
    .from('employeeType')
    .insert([
      { name: name, companyId: companyId },
    ])
    .select()
  if (employeeTypeError) {
    logger.error('employeeTypeError ::', employeeTypeError);
    throw new Error("Fatal: failed to insert employeeType" + JSON.stringify(employeeTypeError));
  }

  const employeeMasterData = await prisma.employeeMaster.create({
    data: {
      id: userId,
      firstName: Buffer.from(name, 'utf-8'),
      lastName: Buffer.from(lastName, 'utf-8'),
      email: Buffer.from(email, 'utf-8'),
      employmentStatus: Buffer.from('Active', 'utf-8'),
      hireDate: Buffer.from(new Date().toISOString(), 'utf-8'),
      employeeTypeId: employeeTypeData[0].id,
      companyId: companyId,
      createdBy: userId
    }
  });

  for (let i = 0; i < employeesDummyData.length; i++) {
    await prisma.employeeMaster.create({
      data: {
        // id: userId + i,
        firstName: Buffer.from(employeesDummyData[i]?.firstName, 'utf-8'),
        lastName: Buffer.from(employeesDummyData[i]?.lastName, 'utf-8'),
        email: Buffer.from(employeesDummyData[i]?.email, 'utf-8'),
        employmentStatus: Buffer.from('Active', 'utf-8'),
        hireDate: Buffer.from(new Date().toISOString(), 'utf-8'),
        employeeTypeId: companyId,
        companyId: companyId,
        createdBy: userId
      }
    });
  }

  logger.info('employeeMasterData ::', employeeMasterData);

  const employeeTypeId = employeeTypeData[0].id;

  // const { data, error: integrationConnectionsError } = await supabaseClient
  //   .from('integrationConnections')
  //   .insert([
  //     { name: 'resend', type: 'email', status: userId, createdBy: userId, description: "Sends Transactional Emails with Resend API" },
  //   ])
  //   .select()

  // if (integrationConnectionsError) {
  //   console.log('integrationConnectionsError: ' + integrationConnectionsError)
  //   logger.error(integrationConnectionsError);
  //   throw new Error("Fatal: failed to insert integrationConnections");
  // }

  const seed = await seedCompany(supabaseClient, companyId, userId, employeeTypeId);
  if (seed.error) {
    logger.error('seed company error: ' + seed.error)
    throw new Error("Fatal: failed to seed company");
  }

  // const [job] = await Promise.all([
  //   insertEmployeeJob(supabaseClient, {
  //     id: userId,
  //     companyId,
  //   }),
  //   redis.del(getPermissionCacheKey(userId)),
  // ]);

  // if (job.error) {
  //   logger.error(job.error);
  //   throw new Error("Fatal: failed to insert job");
  // }

  if (!companyId) {
    await destroyAuthSession(request);
  }

  // await triggerSeed(userId, companyId);

  throw redirect(path.to.chooseSubscription, {
    headers: {
      "Set-Cookie": await updateCompanySession(request, companyId!),
    },
  });
}

type OnboardingFormValues = z.infer<typeof onboardingValidator>;

export default function OnBoarding() {
  const { user } = useLoaderData<typeof loader>();
  const formId = "onboardingForm";

  const initialValues: Partial<OnboardingFormValues> = {};
  if (user) {
    initialValues.email = user.email;
  }
  const isSubmitting = useIsSubmitting(formId);

  return (
    <div className="grow flex items-center justify-center">
      <div className="max-w-[600px] mx-auto">
        <div className="pb-[40px]">
          <h1 className="text-[28px] leading-[31px] font-semibold">
            Complete your account setup
          </h1>
          <p className="mt-4 text-sm leading-[24px]">
            To ensure account security, please set a strong password. Once your
            password is chosen, click 'Finish Sign Up' to proceed. You'll
            receive a verification email with a link to click to activate your
            account and finish the setup process.
          </p>
        </div>
        <ValidatedForm
          validator={onboardingValidator}
          defaultValues={initialValues}
          method="post"
          id={formId}
        >
          <div className="space-y-[60px] mb-[127px]">
            <VStack className="space-y-[39px]">
              <ClearableInput
                name="companyName"
                label="Company name"
                placeholder="Xcelpros"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
              />

              <ClearableInput
                name="email"
                type="email"
                label="Email"
                placeholder="david@xcelpros.com"
                className="text-primary rounded-[10px]"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
                isReadOnly
                hideClose={true}
              />
              <HStack className="w-full">
                <ClearableInput
                  name="name"
                  label="First Name"
                  placeholder="David"
                  className="text-primary"
                  labelClasses="mb-1"
                  clearIconClasses="text-muted-foreground"
                />
                <ClearableInput
                  name="lastName"
                  label="Last name"
                  placeholder="Miller"
                  className="text-primary"
                  labelClasses="mb-1"
                  clearIconClasses="text-muted-foreground"
                />
              </HStack>

              <HStack className="w-full">
                <ClearableInput
                  name="country"
                  label="Country"
                  placeholder="USA"
                  className="text-primary"
                  labelClasses="mb-1"
                  clearIconClasses="text-muted-foreground"
                />
                <ClearableInput
                  name="state"
                  label="State/Province"
                  placeholder="LA"
                  className="text-primary"
                  labelClasses="mb-1"
                  clearIconClasses="text-muted-foreground"
                />
              </HStack>

              <DatePicker2 name="dateofbirth" />

              <PhoneInputV2
                name="mobilePhone"
                label="Phone number"
              // defaultValue={formValue.phno}
              // validateOnChange={props.isSaveBtnClickedOnce}
              // for disabled and hiding the close icon you can use below two property
              // hideClose={!props.editProfile}
              // isReadOnly={!props.editProfile}
              />

              <Password
                autoComplete="new-password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter at least 8 characters"
                className="text-primary"
                showPasswordHelper={true}
                showInfoIcon={true}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8}"
              />

              <TermsCheckBox name="terms" />
            </VStack>

            <Submit
              size="lg"
              className="w-full h-14 rounded-sm text-sm tracking-wider text-white bg-accent"
              disabled={isSubmitting}
            >
              Next
            </Submit>
          </div>
        </ValidatedForm>
      </div>
    </div>
  );
}

const TermsCheckBox = ({ name }: { name: string }) => {
  const { error, validate } = useField(name);
  const [value, setValue] = useControlField<string>(name);

  return (
    <FormControl isInvalid={!!error}>
      <HStack className="w-full">
        <Checkbox
          name={name}
          id="tos"
          data-testid="tos"
          className="rounded-full h-[18px] w-[18px] custom__checkbox !text-white mt-1"
          isChecked={value == "on"}
          onCheckedChange={(e) => {
            setValue(e ? "on" : "off");
            validate();
          }}
        />

        <label htmlFor={name} className="font-light text-sm tracking-[1px]">
          By checking this box, you explicitly agree to our{" "}
          <Link to={"#"} target="_blank" className="text-primary-blue">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to={"#"} target="_blank" className="text-primary-blue">
            Privacy Policy
          </Link>
          .
        </label>
      </HStack>
      {error && (
        <FormErrorMessage className="mt-[12px] flex">
          <RiErrorWarningLine size={20} className="mr-2" />
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
