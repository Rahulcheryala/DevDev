import { Input } from "@zeak/react";
import AuthButton from "./AuthButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type TForgetPassword, ForgetPassowrdSchema } from "~/types/auth";
import AuthCard from "./AuthCard";
import Title from "./Title";
import SubTitle from "./SubTitle";

export default function ForgotPassowrdForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TForgetPassword>({
    resolver: zodResolver(ForgetPassowrdSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TForgetPassword) => {
    console.log(data);
  };
  return (
    <form className=" w-[640px] z-50" onSubmit={handleSubmit(onSubmit)}>
      <AuthCard>
        <Title className="mb-4">Forgot your password?</Title>
        <div className="mb-10">
          <SubTitle>
            Receive an email with password reset instructions.
          </SubTitle>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="email">Email</label>
            <Input
              placeholder="youremail@xcelpros.com"
              {...register("email")}
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
            />
          </div>
        </div>
      </AuthCard>
      <div className="my-5">
        <AuthButton>Reset password</AuthButton>
      </div>
    </form>
  );
}
