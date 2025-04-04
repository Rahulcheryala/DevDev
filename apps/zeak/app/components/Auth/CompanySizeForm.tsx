import React from "react";
import AuthButton from "./AuthButton";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@zeak/react";
import type { TCompanySize } from "~/types/auth";
import { CompanySizeSchema } from "~/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartyIcon } from "@zeak/icons";

import { useForm, Controller } from "react-hook-form";
import AuthCard from "./AuthCard";
import Title from "./Title";
import SubTitle from "./SubTitle";
export default function CompnaySize() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TCompanySize>({
    resolver: zodResolver(CompanySizeSchema),
  });

  const onSubmit = (data: TCompanySize) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50 " onSubmit={handleSubmit(onSubmit)}>
      <AuthCard>
        <div className="" />
        <div className="mb-10">
          <Title className="mb-4">
            A few more questions, David <PartyIcon />
          </Title>
          <SubTitle>
            You’re almost done. Lets setup your account. Lorem ipsum dolor sit
            amet consectetur. Blandit enim eros id nec faucibus et. Vitae
            senectus ipsum gravida maecenas elementum
          </SubTitle>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="type">How large is your company?</label>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="bg-[#F7F7F8]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pixels">50</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="text-center text-secondary p-3 w-full ">
            Skip
          </button>
        </div>
      </AuthCard>
      <div className="mt-5">
        <AuthButton>Sign Up</AuthButton>
      </div>
    </form>
  );
}
