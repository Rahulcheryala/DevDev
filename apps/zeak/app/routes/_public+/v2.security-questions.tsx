import { VStack } from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import type { MetaFunction } from "@remix-run/node";
import { Submit, ClearableInput, Select } from "~/components/Form";
import { loginValidator } from "~/services/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Xcelpros | Security question" }];
};
export const securityQuestionOptions = [
  {
    label: "pet",
    value: "What is your first pet name?",
  },
  {
    label: "college",
    value: "What is your first college name?",
  },
  {
    label: "city",
    value: "What is your first city where you lived in?",
  },
];

export default function SecurityQuestions() {
  return (
    <div className="grow">
      <div className="max-w-[464px] mx-auto">
        <div className="pb-10">
          <h1 className="text-4xl text-accent-dark font-semibold">
            Security questions
          </h1>
          <p className="text-base text-accent-dark mt-4 font-medium">
            Secure your account by creating a new password.
          </p>
        </div>
        <ValidatedForm validator={loginValidator}>
          <VStack className="space-y-[40px]">
            <Select
              placeholder="What is your first pet name?"
              name="securityQuestion"
              label="Question 1"
              options={securityQuestionOptions}
              isReadOnly={false}
            />
            <ClearableInput name="answer" label="Answer" placeholder="Answer" />

            <div className="pt-10 w-full">
              <Submit
                size="lg"
                className="w-full h-[56px] rounded-sm text-sm tracking-wider text-white bg-accent"
              >
                Submit
              </Submit>
            </div>
          </VStack>
        </ValidatedForm>
      </div>
    </div>
  );
}
