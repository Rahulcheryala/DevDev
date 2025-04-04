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
import { getUser, getPermissionCacheKey } from "~/modules/users/users.server";
import {
  destroyAuthSession,
  updateCompanySession,
} from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { onboardingValidator, updatePublicAccount } from "~/modules/account";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { getCompany, insertCompany, seedCompany } from "~/modules/settings";
import { insertEmployeeJob } from "~/modules/resources";
import logger from "~/lib/logger";
import { redis } from "@zeak/redis";
import { path } from "~/utils/path";
import { type z } from "zod";
import { RiErrorWarningLine } from "react-icons/ri";
import slugify from "slugify";
import { companyStatusMap } from "~/modules/access-settings";
import { triggerSeed } from "~/modules/settings/setting.trigger";

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

  const slugifiedDomainUrl = slugify(name, {
    lower: true, // convert to lowercase
    remove: /[*+~.()'"!:@#$%^&?/<>;:"'-]/g, // remove special characters
  });

  const companyInsert = await insertCompany(supabaseClient, {
    name: name,
    domainUrl: `${originUrl}/${slugifiedDomainUrl}`,
    status: companyStatusMap.ACTIVE,
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

  const seed = await seedCompany(supabaseClient, companyId, userId);
  if (seed.error) {
    logger.error(seed.error);
    throw new Error("Fatal: failed to seed company");
  }

  const [job] = await Promise.all([
    insertEmployeeJob(supabaseClient, {
      id: userId,
      companyId,
    }),
    redis.del(getPermissionCacheKey(userId)),
  ]);

  if (job.error) {
    logger.error(job.error);
    throw new Error("Fatal: failed to insert job");
  }
  if (!companyId) {
    await destroyAuthSession(request);
  }

  await triggerSeed(userId, companyId);

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
    console.log('user data', user)
    initialValues.email = user.email;
    initialValues.name = user.firstName;
    initialValues.lastName = user.lastName;
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
              {/* <ClearableInput
                name="companyName"
                label="Company name"
                placeholder="Xcelpros"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
              /> */}

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

              <DatePicker name="dateofbirth" label="Date of Birth" />

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
