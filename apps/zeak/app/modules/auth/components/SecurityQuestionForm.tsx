import React from "react";
import { Input } from "@zeak/react";
import AuthButton from "./Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SubTitle from "./SubTitle";
import { SecurityQuestionSchema, type TSecurityQuestion } from "~/types/auth";

export default function SecurityQuestionForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSecurityQuestion>({
    resolver: zodResolver(SecurityQuestionSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (data: TSecurityQuestion) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-[40px] rounded-[12px]">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold mb-4">Security questions</h1>
          <SubTitle>Secure your account by creating a new password.</SubTitle>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="question">Question 1</label>
            <Input
              placeholder="What is your first pet name?"
              {...register("question")}
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="answer">Answer</label>
            <Input
              placeholder="Answer"
              {...register("answer")}
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
            />
          </div>
        </div>
        <div className="mt-10 text-center w-full p-3">Skip</div>
      </div>
      <div className="my-5">
        <AuthButton>Sign Up</AuthButton>
      </div>
    </form>
  );
}
