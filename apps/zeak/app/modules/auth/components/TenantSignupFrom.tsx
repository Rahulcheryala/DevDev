import * as React from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import AuthButton from "./Button";
import { useForm } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";
import * as Checkbox from "@radix-ui/react-checkbox";

import { Input } from "@zeak/react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@remix-run/react";
import { type TInvitationForm, InvitationFormSchema } from "~/types/auth";
import Title from "./Title";
import AuthFormCard from "./AuthFormCard";
import SubTitle from "./SubTitle";
import AccountExistWarning from "./AccountExistWarning";

export default function TenantSingupFrom() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isAccountExist, setIsAccountExist] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInvitationForm>({
    resolver: zodResolver(InvitationFormSchema),
    defaultValues: {
      password: "",

      email: "",
      firstName: "",
      lastName: "",
      company: "",
    },
  });

  const onSubmit = async (data: TInvitationForm) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50" onSubmit={handleSubmit(onSubmit)}>
      <AuthFormCard>
        <div className="mb-10">
          <Title className="mb-4">Complete your Sign-up</Title>
          <SubTitle>
            Automate, Optimize, and Scale - all in one platform.
          </SubTitle>
        </div>
        {isAccountExist && <AccountExistWarning />}
        <div className="space-y-6">
          <div className="space-y-2"></div>
          {/* company name */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="" htmlFor="company">
                Company Name
              </label>
              <Input
                id="company"
                placeholder="Zeak"
                className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                {...register("company")}
              />
              {errors.company && (
                <p className="text-xs text-red-500">{errors.company.message}</p>
              )}
            </div>
            {/* Name */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="" htmlFor="firstName">
                  First Name
                </label>
                <Input
                  id="firstName"
                  placeholder="David"
                  className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white w-full"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="" htmlFor="lastName">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                placeholder="youremail@company.com"
                className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="h-4 w-4" />
                  ) : (
                    <IoEyeOutline className="h-4 w-4" />
                  )}
                </button>
                <PasswordStrengthIndicator
                  className="-top-[120px] -left-[400px]"
                  errors={errors}
                  watch={watch}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[640px]"></div>
        </div>
      </AuthFormCard>
      <div className="flex items-start my-5 space-x-3 justify-center">
        <Checkbox.Root
          id="terms"
          className="flex items-center justify-center w-6 h-6 rounded-full  bg-white focus:outline-none  data-[state=checked]:bg-black"
        >
          <Checkbox.Indicator>
            <IoMdCheckmark className="h-4 w-4 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          By checking this box, you explicitly agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      <AuthButton onClick={() => setIsAccountExist(true)} type="submit">
        Sign Up
      </AuthButton>
      <div className="flex items-center justify-center mt-5 gap-4">
        <h1>Already have an Account?</h1>
        <Link className="text-primary-blue" to="/v3/login">
          Sign-in
        </Link>
      </div>
    </form>
  );
}
