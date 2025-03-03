
import AuthButton from "./Button";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@zeak/react";
import type { TOnboarding } from "~/types/auth";
import { OnboardingSchema } from "~/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartyIcon } from "@zeak/icons";

import { useForm, Controller } from "react-hook-form";
import AuthFormCard from "./AuthFormCard";
import Title from "./Title";

export default function OnboardingForm() {
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
      <AuthFormCard>
        <div className="" />
        <div className="space-y-4 mb-10">
          <Title>
            Welcome to Zeak, David <PartyIcon />
          </Title>
          <p>
            You’re almost done. Lets setup your account. Lorem ipsum dolor sit
            amet consectetur. Blandit enim eros id nec faucibus et. Vitae
            senectus ipsum gravida maecenas elementum
          </p>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="company">Company</label>
            <Input
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <label htmlFor="domain">Domain</label>
            <div className="relative">
              <Input
                className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
                {...register("domain")}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                .xcelpros.com
              </span>
            </div>
            {errors.domain && (
              <p className="text-sm text-red-500">{errors.domain.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <label htmlFor="type">What kind of company are you?</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="bg-[#F7F7F8]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pixels">Chemicals</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-10 w-full p-3  rounded-[12px]">
          <button className="text-center text-secondary-gray ">Skip</button>
        </div>
      </AuthFormCard>
      <div className="mt-5">
        <AuthButton>Sign Up</AuthButton>
      </div>
    </form>
  );
}
