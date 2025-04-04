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
import { json, redirect } from "@remix-run/node";
import { Submit, Password } from "~/components/Form";
import { resetPasswordValidatorV2, SuccessPageNameMap } from "~/services/auth";
import {
  commitAuthSession,
  flash,
  requireAuthSession,
} from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error } from "~/utils/result";
import { resetPassword } from "~/modules/users/users.server";
import logger from "~/lib/logger";

export const meta: MetaFunction = () => {
  return [
    {
      title: "XcelPros | Reset Password",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  logger.info("Reset Password loader entered");
  await requireAuthSession(request);
  logger.info("Reset Password loader exited");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  logger.info("Reset Password action entered");
  assertIsPost(request);
  const validation = await validator(resetPasswordValidatorV2).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { confirmPassword } = validation.data;

  const authSession = await requireAuthSession(request, { verify: true });
  const updatePassword = await resetPassword(
    authSession.userId,
    confirmPassword,
  );

  if (updatePassword.error) {
    return json(
      {},
      await flash(
        request,
        error(updatePassword.error, "Failed to update password"),
      ),
    );
  }
  logger.info("Reset Password action exiting");
  return redirect(path.to.success("", SuccessPageNameMap.RESET_PASSWORD), {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession,
      }),
    },
  });
}

export default function ResetPasswordV2Route() {
  return (
    <div className="grow">
      <div className="max-w-[464px] mx-auto">
        <div className="pb-[32px]">
          <h1 className="text-[28px] leading-[31px] font-semibold">
            Reset your password
          </h1>
          <p className="text-[14px] mt-[16px] leading-[24px] font-medium">
            Secure your account by creating a new password.
          </p>
        </div>
        <ValidatedForm
          validator={resetPasswordValidatorV2}
          action={path.to.resetPasswordV2}
          method="post"
        >
          <VStack className="space-y-[40px]">
            <Password
              name="createPassword"
              label="Create password"
              type="password"
              showPasswordHelper={true}
            />
            <Password
              name="confirmPassword"
              label="Confirm password"
              type="password"
            />
            <Submit
              size="lg"
              className="w-full h-[56px] rounded-sm text-sm tracking-wider text-white bg-accent"
            >
              Reset password
            </Submit>
          </VStack>
        </ValidatedForm>
      </div>
    </div>
  );
}
