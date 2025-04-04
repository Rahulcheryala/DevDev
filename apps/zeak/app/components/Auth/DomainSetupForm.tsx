import React from "react";
import AuthButton from "./AuthButton";
import { Input ,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@zeak/react";
import type { TOnboarding } from "~/types/auth";
import { OnboardingSchema } from "~/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@remix-run/react";

import { useForm } from "react-hook-form";
import Title from "./Title";
import SubTitle from "./SubTitle";
import AuthCard from "./AuthCard";

export default function DomainSetupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TOnboarding>({
    resolver: zodResolver(OnboardingSchema),
  });

  const onSubmit = (data: TOnboarding) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50 " onSubmit={handleSubmit(onSubmit)}>
      <AuthCard>
        <div className="space-y-8" />
        <div className="space-y-4 mb-10">
          <Title className="mb-4">Complete your Sign-up</Title>
          <SubTitle>
            Automate, optimize, and scale - all in one platform.
          </SubTitle>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="company">Company</label>
            <Input
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>
          <TooltipProvider>
            <div className="space-y-2 flex flex-col gap-2">
              <label htmlFor="domain">Domain</label>
              <Tooltip>
                <div className="relative">
                  <Input
                    className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                    {...register("domain")}
                  />
                  <TooltipTrigger asChild>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      .xcelpros.com
                    </span>
                  </TooltipTrigger>
                </div>
                <TooltipContent className="bg-white p-4 text-gray-500 w-[224px]">
                  <p>
                    You can customize the Domain if needed, but it should be
                    unique to your company.
                  </p>
                </TooltipContent>
              </Tooltip>
              {errors.domain && (
                <p className="text-sm text-red-500">{errors.domain.message}</p>
              )}
            </div>
          </TooltipProvider>
        </div>
      </AuthCard>
      <div className="mt-5">
        <p>
          We’ve pre-filled your domain with{" "}
          <span className="text-blue-500">companyname.zeak.io.</span> This is
          the unique URL your team will use to access your Zeak account.
        </p>
      </div>
      <div className="mt-5">
        <AuthButton>Confrim and Create Account</AuthButton>
      </div>
      <div className="flex gap-2 mt-5 items-center justify-center">
        <h1>Already have an account?</h1>
        <Link to="/v3/login" className="text-primary-blue text-sm font-normal">
          Sign-in
        </Link>
      </div>
    </form>
  );
}
