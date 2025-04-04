import { VStack } from "@zeak/react";
import {
  ValidatedForm,
  validationError,
  validator,
} from "@zeak/remix-validated-form";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Submit, ClearableInput } from "~/components/Form";
import { getUserByEmail } from "~/modules/users/users.server";
import { forgotPasswordValidator, SuccessPageNameMap } from "~/services/auth";
import { sendPasswordRecoveryEmail } from "~/services/auth/auth.server";
import { flash, getAuthSession } from "~/services/session.server";
import type { FormActionData } from "~/types";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error } from "~/utils/result";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Xcelpros | Forgot Password",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const authSession = await getAuthSession(request);
  if (authSession) throw redirect(path.to.authenticatedRoot);
  return null;
}

export async function action({ request }: ActionFunctionArgs): FormActionData {
  assertIsPost(request);
  const validation = await validator(forgotPasswordValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { email } = validation.data;
  const user = await getUserByEmail(email);

  if (user.data && user.data.active) {
    // const authSession = await sendMagicLink(email);
    const url = new URL(request.url);
    const authSession = await sendPasswordRecoveryEmail(
      email,
      `${url.protocol}//${url.host}/callback`,
    );

    if (authSession?.error) {
      return redirect(
        path.to.forgotPasswordV2,
        await flash(request, error(authSession, "Failed to send magic link")),
      );
    }
  }

  return redirect(
    path.to.success(encodeURI(email), SuccessPageNameMap.FORGOT_PASSWORD),
  );
}

export default function ForgotPasswordV2Route() {
  return (
    <div className="grow">
      <div className="max-w-[464px] mx-auto">
        <div className="pb-[40px]">
          <h1 className="text-4xl text-accent-dark font-semibold">
            Forgot your password?
          </h1>
          <p className="mt-4 text-sm">
            Receive an email with password reset instructions.
          </p>
        </div>
        <ValidatedForm validator={forgotPasswordValidator} method="post">
          <VStack className="space-y-[40px]">
            <ClearableInput
              name="email"
              label="Email"
              placeholder="david@xcelpros.com"
            />
            <div className="pt-5 w-full">
              <Submit
                size="lg"
                className="w-full h-[56px] rounded-sm text-sm tracking-wider text-white bg-accent"
              >
                Reset Password
              </Submit>
            </div>
          </VStack>
        </ValidatedForm>
      </div>
    </div>
  );
}
