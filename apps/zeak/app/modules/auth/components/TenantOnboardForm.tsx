import * as React from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import AuthButton from "./Button";
import { useForm } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";
import * as Checkbox from "@radix-ui/react-checkbox";
import { SignupSchema } from "~/types/auth";
import type { TSignupForm } from "~/types/auth";
import AuthFormCard from "./AuthFormCard";

import { cn, Input, Button } from "@zeak/react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "./Title";
import SubTitle from "./SubTitle";

export default function TenantOnboardForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignupForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  const onSubmit = async (data: TSignupForm) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50" onSubmit={handleSubmit(onSubmit)}>
      <AuthFormCard>
        <div className="">
          <div className="mb-10">
            <Title className="mb-4">Welcome</Title>
            <SubTitle>
              To ensure account security, please set a strong password. Once
              your password is chosen, click Finish Sign Up to proceed.
              You&apos;ll receive a verification email with a link to click to
              activate your account and finish the setup process.
            </SubTitle>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="" htmlFor="firstName">
                First Name
              </label>
              <Input
                id="firstName"
                placeholder="David"
                className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="" htmlFor="email1">
                Email
              </label>
              <Input
                id="email1"
                type="email"
                placeholder="david@xcelpros.com"
                className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-3">
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
                    <IoEyeOutline className="h-4 w-4" />
                  ) : (
                    <IoEyeOffOutline className="h-4 w-4" />
                  )}
                </button>
                <PasswordStrengthIndicator
                  errors={errors}
                  watch={watch}
                  className="-left-[420px]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="" htmlFor="password">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline className="h-4 w-4" />
                  ) : (
                    <IoEyeOutline className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
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
      <AuthButton type="submit">Sign Up</AuthButton>
    </form>
  );
}
