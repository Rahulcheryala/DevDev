import { VStack, Checkbox, HStack } from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { Link, useSearchParams } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Password, Submit, ClearableInput } from "~/components/Form";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Signup" }];
};

export default function LoginV2Route() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  return (
    <div className="grow">
      <div className="max-w-[464px] mx-auto">
        <div className="pb-[40px]">
          <h1 className="text-[28px] leading-[31px] font-semibold">
            Welcome to Platform X
          </h1>
          <p className="mt-4 text-sm leading-[24px]">
            To ensure account security, please set a strong password. Once your
            password is chosen, click 'Finish Sign Up' to proceed.
          </p>
        </div>
        <ValidatedForm
          // validator={signupValidator}
          defaultValues={{ redirectTo }}
          method="post"
        >
          <div className="space-y-[60px] mb-[127px]">
            <VStack className="space-y-[39px]">
              <ClearableInput
                name="company"
                label="Company"
                placeholder="Company name"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
              />
              <ClearableInput
                name="domain"
                label="Domain"
                placeholder="Domain"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
                domain=".my.projectx.com"
              />
              <ClearableInput
                name="name"
                label="Name"
                placeholder="David"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
              />
              <ClearableInput
                name="email"
                type="email"
                label="Email"
                placeholder="david@xcelpros.com"
                className="text-primary"
                labelClasses="mb-1"
                clearIconClasses="text-muted-foreground"
              />

              <Password
                name="password"
                label="Password"
                type="password"
                placeholder="Create new password"
                className="text-primary"
                // externalErrors={extraErrors}
                // handleExtraErrorOnError={() => setExtraErrors([])}
                showPasswordHelper={true}
              />

              <HStack className="w-full">
                <Checkbox
                  id="tos"
                  data-testid="tos"
                  className="rounded-full h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                  // isChecked={item.isChecked}
                  // onCheckedChange={() => onToggleChecked(item)}
                />

                <label
                  htmlFor="tos"
                  className="font-light text-sm tracking-[1px]"
                >
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
            </VStack>

            <Submit
              size="lg"
              className="w-full h-14 rounded-[56px] text-sm tracking-wider text-white bg-accent"
            >
              Next
            </Submit>
          </div>
        </ValidatedForm>
      </div>
    </div>
  );
}
