import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from "@zeak/react";
import {
  useControlField,
  useField,
  ValidatedForm,
  validationError,
  validator,
} from "@zeak/remix-validated-form";
import { json, Link, redirect, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Boolean, ClearableInput, Hidden, Password, Submit } from "~/components/Form";
import { path } from "~/utils/path";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { getUser } from "~/modules/users/users.server";
import { assertIsPost, safeRedirect } from "~/utils/http";
import { commitAuthSession } from "~/services/session.server";
import { error } from "~/utils/result";
import { signUpWithEmail } from "~/services/auth/auth.server";
import { signUpValidator } from "~/services/auth";
import { ActionFunctionArgs } from "@remix-run/node";
import { FormActionData, Result } from "~/types";
import Bowser from "bowser";
import axios from "axios";



export async function action({ request }: ActionFunctionArgs): FormActionData {
  console.log('here action funcxtion from signup')
  assertIsPost(request);
  const validation = await validator(signUpValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { email, password, redirectTo, userType, deviceInfo, locationInfo, firstName, lastName } =
    validation.data;

  const authSession = await signUpWithEmail(
    email,
    password,
    deviceInfo,
    locationInfo,
    firstName,
    lastName
  );

  if (!authSession) {
    // delay on incorrect password as minimal brute force protection
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return json(
      error(
        authSession,
        "Invalid email or password format. Please check your credentials and try again.",
      ),
      {
        status: 500,
      },
    );
  }

  const userData = await getUser(getSupabaseServiceRole(), authSession.userId)

  const is2FAEnabled = userData.data?.["2FAEnabled"]

  throw redirect(safeRedirect(is2FAEnabled ? path.to.mfa : (userType === 'Indivisual' ? path.to.indivisualOnboarding : redirectTo)), {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession,
      }),
    },
  });
}

const SignUp = () => {
  const [userBySelf] = useState<boolean>(true);
  const result = useActionData<Result>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const [extraErrors, setExtraErrors] = useState<Array<string>>();
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [locationInfo, setLocationInfo] = useState<any>({});

  const [userType, setUserType] = useState('Indivisual')

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const API_KEY = "d819646c7f0546d785c3f6d9b490bcc3";
        const { data: ipData } = await axios.get(
          "https://api.ipgeolocation.io/getip",
        );
        const { data: locationData } = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipData.ip}`,
        );

        setLocationInfo(locationData);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setExtraErrors((prevErrors) => [
          ...(prevErrors || []),
          "Failed to fetch location data",
        ]);
      }
    };

    setDeviceInfo(Bowser.parse(window.navigator.userAgent));
    fetchLocationData();
  }, []);

  useEffect(() => {
    setExtraErrors(result?.message?.trim().split(". ") || undefined);
  }, [result]);

  return (
    <div className="grow">
      <div className="max-w-[600px] mx-auto">
        <div className="pb-10">
          <h1 className="text-4xl text-accent-dark font-semibold">
            {userBySelf ? "Sign-up for Free Trial" : "Complete your Sign-up "}
          </h1>
          <p className="mt-4 text-accent-dark text-sm font-normal">
            Start exploring all our features with no commitment, sign-up for
            your free trial today and experience the difference!
          </p>
        </div>
        <ValidatedForm validator={signUpValidator} defaultValues={{ redirectTo, deviceInfo, locationInfo }}
          method="post">
          <VStack className="grid grid-cols-2 gap-x-10 gap-y-8">
            <div className="col-span-2">
              {/* <ClearableInput
                name="companyName"
                label="Company name"
                placeholder="Xcelpros"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
              /> */}
              <Button variant={userType === 'Indivisual' ? 'primary' : 'secondary'} onClick={() => setUserType('Indivisual')}>
                Individual
              </Button>
              <Button variant={userType === 'Enterprise' ? 'primary' : 'secondary'} onClick={() => setUserType('Enterprise')}>
                Enterprise
              </Button>
            </div>
            <ClearableInput
              name="firstName"
              label="First name"
              placeholder="Miller"
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
            <div className="col-span-2">
              <ClearableInput
                name="email"
                type="email"
                label="Email"
                placeholder="david@xcelpros.com"
                className="text-primary rounded-[10px]"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
                hideClose={true}
              />
            </div>
            <div className="col-span-2">
              <Password
                name="password"
                label="Password"
                type="password"
                placeholder="Enter at least 8 characters"
                className="text-primary"
                showPasswordHelper={true}
                showInfoIcon={true}
              />
            </div>
            <div className="col-span-2">
              <TermsCheckBox name="terms" />
            </div>
          </VStack>
          <Hidden name="redirectTo" value={redirectTo} type="hidden" />
          <Hidden name="userType" value={userType} type="hidden" />
          <Hidden
            name="deviceInfo"
            value={JSON.stringify(deviceInfo)}
            type="hidden"
          />
          <Hidden
            name="locationInfo"
            value={JSON.stringify(locationInfo)}
            type="hidden"
          />
          <div className="pt-[60px] w-full">
            <Submit
              variant="primary"
              className="w-full h-[56px] rounded-sm text-sm tracking-wider text-white bg-accent"
            >
              Next
            </Submit>
          </div>
        </ValidatedForm>
        <div className="text-center my-8 py-3">
          <p className="text-sm font-normal">
            Already have an Account?{" "}
            <Link className="text-accent-primary" to={path.to.login}>
              Sign-in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

const TermsCheckBox = ({ name }: { name: string }) => {
  const { error, validate } = useField(name);
  const [value, setValue] = useControlField<string>(name);

  return (
    <FormControl isInvalid={!!error}>
      <HStack className="w-full items-start">
        <Checkbox
          name={name}
          id="tos"
          data-testid="tos"
          className="h-[18px] w-[18px] custom__checkbox !text-white mt-1"
          isChecked={value == "on"}
          onCheckedChange={(e) => {
            setValue(e ? "on" : "off");
            validate();
          }}
        />

        <label
          htmlFor={name}
          className="text-sm font-light text-accent-dark tracking-[1px]"
        >
          By checking this box, you explicitly agree to our{" "}
          <Link to={"#"} target="_blank" className="text-accent-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to={"#"} target="_blank" className="text-accent-primary">
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
