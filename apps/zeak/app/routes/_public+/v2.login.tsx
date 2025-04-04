import { VStack, Button, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@zeak/react";
import {
  validator,
  validationError,
  ValidatedForm,
} from "@zeak/remix-validated-form";
import {
  Link,
  json,
  redirect,
  useActionData,
  useSearchParams,
  Form,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import Bowser from "bowser";
import { Password, Submit, ClearableInput, Hidden } from "~/components/Form";
import {
  signInWithEmail,
  verifyAuthSession,
} from "~/services/auth/auth.server";
import type { FormActionData, Result } from "~/types";
import { commitAnySession, commitAuthSession, getAuthSession, getSession } from "~/services/session.server";
import { assertIsPost, safeRedirect } from "~/utils/http";
import { error } from "~/utils/result";
import { path } from "~/utils/path";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { useEffect, useState } from "react";
import { loginValidator } from "~/services/auth";
import axios from "axios";
import { getUser } from "~/modules/users/users.server";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Login" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const authSession = await getAuthSession(request);
  // Get the regular session to check 2FA setup choice
  const session = await getSession(request);

  if (authSession && (await verifyAuthSession(authSession))) {
    const userData = await getUser(getSupabaseServiceRole(), authSession?.userId);
    const is2FAEnabled = userData.data?.["2FAEnabled"];

    // Check if user has made 2FA choice from session
    const has2FAChoice = session.has("2FAChoice");

    // If 2FA is enabled or user has made their choice, redirect appropriately
    if (is2FAEnabled || has2FAChoice) {
      const redirectPath = is2FAEnabled ? path.to.mfa :
        (session.get("redirectTo") || path.to.authenticatedRoot);
      return redirect(redirectPath);
    }

    // Return data for showing 2FA choice modal
    return json({
      authSession,
      is2FAEnabled,
      showModal: !is2FAEnabled && !has2FAChoice
    });
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs): FormActionData {
  assertIsPost(request);

  // Handle 2FA setup choice
  if (request.url.includes('setup2FA')) {
    const formData = await request.formData();
    const setup2FA = formData.get("setup2FA") === "true";
    const redirectTo = formData.get("redirectTo")?.toString() || path.to.authenticatedRoot;

    // Get both auth session and regular session
    const authSession = await getAuthSession(request);
    const session = await getSession(request);

    if (!authSession) {
      return json({ success: false, error: "No active session" }, { status: 400 });
    }

    // Store the 2FA choice and redirect path in session
    session.set("2FAChoice", setup2FA);
    session.set("redirectTo", redirectTo);

    // Redirect based on choice
    throw redirect(setup2FA ? path.to.mfa : redirectTo, {
      headers: {
        "Set-Cookie": await commitAnySession(session),
      },
    });
  }

  // Handle initial login
  const validation = await validator(loginValidator).validate(
    await request.formData()
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { email, password, redirectTo, deviceInfo, locationInfo } = validation.data;

  const authSession = await signInWithEmail(
    email,
    password,
    deviceInfo,
    locationInfo
  );

  if (!authSession) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return json(
      error(
        authSession,
        "Invalid email or password format. Please check your credentials and try again."
      ),
      { status: 500 }
    );
  }

  const userData = await getUser(getSupabaseServiceRole(), authSession.userId);
  const is2FAEnabled = userData.data?.["2FAEnabled"];

  // Return success response with auth session
  return json(
    {
      success: true,
      is2FAEnabled,
      authSession
    },
    {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession,
        }),
      },
    }
  );
}

export default function LoginV2Route() {
  const result = useActionData<Result>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const [extraErrors, setExtraErrors] = useState<Array<string>>();
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [locationInfo, setLocationInfo] = useState<any>({});
  const [show2FADialog, setShow2FADialog] = useState(false);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const API_KEY = "d819646c7f0546d785c3f6d9b490bcc3";
        const { data: ipData } = await axios.get(
          "https://api.ipgeolocation.io/getip"
        );
        const { data: locationData } = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipData.ip}`
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
    if (result?.success) {
      if (!result.is2FAEnabled) {
        setShow2FADialog(true);
      } else {
        window.location.href = path.to.mfa;
      }
    } else if (result?.message) {
      setExtraErrors(result.message.trim().split(". ") || undefined);
    }
  }, [result]);

  return (
    <div className="grow">
      <div className="max-w-[464px] mx-auto">
        <div className="pb-10">
          <h1 className="text-4xl text-accent-dark font-semibold">
            Log in to your account
          </h1>
        </div>

        <ValidatedForm
          validator={loginValidator}
          defaultValues={{ redirectTo, deviceInfo, locationInfo }}
          method="post"
        >
          <VStack className="space-y-[40px]">
            <ClearableInput
              name="email"
              label="Work Email"
              placeholder="youremail@company.com"
            />
            <Password
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              rightBottomElement={
                <Link
                  to={path.to.forgotPasswordV2}
                  className="text-[#0477d3] text-[14px] landing-[20px] inline-block p-0"
                >
                  Forgot password?
                </Link>
              }
              externalErrors={extraErrors}
              handleExtraErrorOnError={() => setExtraErrors([])}
            />
            <Hidden name="redirectTo" value={redirectTo} type="hidden" />
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
            <div className="pt-10 w-full">
              <Submit
                size="lg"
                className="w-full h-[56px] rounded-sm text-sm tracking-wider text-white bg-accent"
              >
                Sign In
              </Submit>
            </div>
          </VStack>
        </ValidatedForm>

        <div className="text-center my-[60px] relative">
          <div className="bg-stroke w-full h-[1px] absolute top-[50%]"></div>
          <div className="text-muted-foreground text-sm bg-white p-2 w-[50px] mx-auto z-index-[2] relative">
            or
          </div>
        </div>

        <div className="text-center my-[60px] relative">
          <Button
            variant="secondary"
            onClick={() => {/* Handle Microsoft sign in */ }}
            className="w-full h-[56px] rounded-sm text-sm bg-white text-foreground tracking-[0.5px] flex items-center hover:bg-transparent shadow-none font-normal"
          >
            <img
              src="/images/microsoft.png"
              alt="Microsoft Logo"
              className="mr-[8px] w-[20px]"
            />
            Sign in with Microsoft
          </Button>
        </div>

        <div className="text-center mt-[60px]">
          <p className="text-accent tracking-[0.5px]">
            Don't have an account yet?{" "}
            <Link
              to={path.to.signup}
              className="text-accent-primary inline-block font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        <Modal open={show2FADialog} onOpenChange={setShow2FADialog}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Enable Two-Factor Authentication?</ModalTitle>
              <ModalDescription>
                Enhance your account security with two-factor authentication. Would you like to set it up now?
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Form method="post" action="?setup2FA=true">
                <input type="hidden" name="setup2FA" value="false" />
                <input type="hidden" name="redirectTo" value={redirectTo || ""} />
                <Button type="submit" variant="secondary">
                  Skip for now
                </Button>
              </Form>
              <Form method="post" action="?setup2FA=true" className="ml-2">
                <input type="hidden" name="setup2FA" value="true" />
                <input type="hidden" name="redirectTo" value={redirectTo || ""} />
                <Button type="submit" variant="primary">
                  Set up 2FA
                </Button>
              </Form>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}