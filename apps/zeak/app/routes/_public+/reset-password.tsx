import { Button, HStack, VStack } from "@zeak/react";
import {
  ValidatedForm,
  validationError,
  validator,
} from "@zeak/remix-validated-form";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Password, Submit } from "~/components/Form";
import { resetPassword } from "~/modules/users/users.server";
import { resetPasswordValidator } from "~/services/auth";
import { flash, requireAuthSession } from "~/services/session.server";
import { assertIsPost } from "~/utils/http";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuthSession(request);
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const validation = await validator(resetPasswordValidator).validate(
    await request.formData(),
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  const { password } = validation.data;

  const { userId } = await requireAuthSession(request, { verify: true });
  const updatePassword = await resetPassword(userId, password);

  if (updatePassword.error) {
    return json(
      {},
      await flash(
        request,
        error(updatePassword.error, "Failed to update password"),
      ),
    );
  }

  throw redirect(
    path.to.authenticatedRoot,
    await flash(request, success("Password updated")),
  );
}

export default function ResetPasswordRoute() {
  const navigate = useNavigate();

  return (
    <>
      <img
        src="/zeak-logo-dark.png"
        alt="Zeak Logo"
        className="block dark:hidden max-w-[100px] mb-3"
      />
      <img
        src="/zeak-logo-light.png"
        alt="Zeak Logo"
        className="hidden dark:block max-w-[100px] mb-3"
      />

      <div className="rounded-lg bg-background shadow-lg p-8 w-[380px]">
        <ValidatedForm
          method="post"
          action={path.to.resetPassword}
          validator={resetPasswordValidator}
        >
          <VStack spacing={4}>
            <p>Please select a new password.</p>

            <Password name="password" label="New Password" />
            <HStack spacing={4}>
              <Submit>Reset Password</Submit>
              <Button
                variant="secondary"
                onClick={() => navigate(path.to.authenticatedRoot)}
              >
                Skip
              </Button>
            </HStack>
          </VStack>
        </ValidatedForm>
      </div>
    </>
  );
}
