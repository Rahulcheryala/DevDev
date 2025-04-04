import React, { useState, useEffect } from "react";
import { ZeakLogo } from "@zeak/icons";
import { LoginForm , GradientAnimationBackground } from "~/components/Auth";
import { commitAuthSession, getAuthSession } from "~/services/session.server";

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { path } from "~/utils/path";
import {
  json,
  redirect,
  useActionData,
  useSearchParams,
  useNavigation,
} from "@remix-run/react";
import {
  signInWithEmail,
  verifyAuthSession,
} from "~/services/auth/auth.server";

import { error } from "~/utils/result";

import type { TLogin } from "~/types/auth";
import { safeRedirect } from "~/utils/http";
export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Login" }];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const authSession = await getAuthSession(request);
  if (authSession && (await verifyAuthSession(authSession))) {
    if (authSession) return redirect(path.to.authenticatedRoot);
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const deviceInfo = formData.get("deviceInfo") as string;
  const locationInfo = formData.get("locationInfo") as string;

  const authSession = await signInWithEmail(
    email,
    password,
    deviceInfo,
    locationInfo,
  );
  if (!authSession) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return json({
      success: false,
      message:
        "Invalid email or password. Please check your credentials and try again.",
    });
  }
  throw redirect(safeRedirect("/"), {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession,
      }),
    },
  });
}

export default function LoginPage() {
  const [errors, setErrors] = useState<string>();
  const response = useActionData<typeof action>();

  const navigation = useNavigation();
  useEffect(() => {
    if (response?.success) {
      console.log(response);
    }
  }, [response]);

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  const onSubmit = async (data: TLogin) => {
    const form = document.getElementById("login-form") as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };
  useEffect(() => {
    if (!response?.success) {
      setErrors(response?.message);
    }
  }, [response]);

  return (
    <div className="w-full relative min-h-screen flex items-center justify-center ">
      <GradientAnimationBackground />
      <div className="absolute top-5 left-5">
        <ZeakLogo />
      </div>

      <LoginForm onSubmit={onSubmit} errorsData={errors} />
    </div>
  );
}
