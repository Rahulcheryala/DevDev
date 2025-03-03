import React from "react";
import { Input } from "@zeak/react";
import AuthButton from "./Button";
import { type TResetPassword, ResetPasswordSchema } from "~/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import Title from "./Title";
import AuthFormCard from "./AuthFormCard";
import SubTitle from "./SubTitle";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TResetPassword) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50" onSubmit={handleSubmit(onSubmit)}>
      <AuthFormCard>
        <div className="mb-10">
          <Title className="mb-4">Reset your Password</Title>
          <SubTitle>Secure your account by creating a new password.</SubTitle>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="password">Create Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
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
                className="-left-[400px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <Input
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <IoEyeOutline className="h-4 w-4" />
                ) : (
                  <IoEyeOffOutline className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </AuthFormCard>
      <div className="my-5">
        <AuthButton>Reset Password</AuthButton>
      </div>
    </form>
  );
}
