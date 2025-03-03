import React, { useEffect, useState } from "react";
import { Input } from "@zeak/react";

import { type TLogin, LoginSchema } from "~/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link , Form } from "@remix-run/react";
import { MicrosoftLogo } from "@zeak/icons";
import { Hidden } from "~/components/Form";
import axios from "axios";
import Bowser from "bowser";
import { FaExclamation } from "react-icons/fa6";
import AuthFormCard from "./AuthFormCard";
import Title from "./Title";
import AuthButton from "./Button";

export default function LoginForm({
  onSubmit,
  errorsData,
}: {
  onSubmit: (data: TLogin) => void;
  errorsData?: string;
}) {
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [locationInfo, setLocationInfo] = useState<any>({});
  const [extraErrors, setExtraErrors] = useState<Array<string>>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const API_KEY = "d819646c7f0546d785c3f6d9b490bcc3";
        const { data: ipData } = await axios.get(
          "https://api.ipgeolocation.io/getip",
        );
        const { data: locationData } = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipData.ip}`,
        );

        setLocationInfo(locationData);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setExtraErrors((prevErrors) => [
          ...(prevErrors || []),
          "Failed to fetch location data",
        ]);
      }
    };

    setDeviceInfo(Bowser.parse(window.navigator.userAgent));
    fetchLocationData();
  }, []);
  return (
    <Form
      method="post"
      id="login-form"
      action="/v3/login"
      className="z-50 w-[640px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthFormCard>
        <Title className="mb-10">Log in to your account</Title>
        <div className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="email">Work Email</label>
            <Input
              placeholder="youremail@company.com"
              {...register("email")}
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <label htmlFor="password">Password</label>
            <Input
              placeholder="Enter password"
              {...register("password")}
              className="border-0 focus-within:outline-none focus:ring-0 focus:border-0 focus:shadow-md focus:bg-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div className="flex justify-between">
              <div className="w-2/3">
                {errorsData && (
                  <div className="flex items-center gap-2">
                    <FaExclamation className="text-red-500 bg-red-500 text-white rounded-full h-6 w-6 p-1" />
                    <p className="text-red-500 text-sm w-5/6">{errorsData}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  to="/v3/security-question"
                  className="text-primary-blue text-sm font-normal text-right "
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <input
            name="deviceInfo"
            value={JSON.stringify(deviceInfo)}
            type="hidden"
          />
          <input
            name="locationInfo"
            value={JSON.stringify(locationInfo)}
            type="hidden"
          />
        </div>
      </AuthFormCard>
      <div className="my-5">
        <AuthButton>Sign in</AuthButton>
      </div>
      <div className="flex items-center gap-5">
        <div className="h-[2px] w-[calc(50%-20px)] bg-stroke-primary"></div>
        or
        <div className="h-[2px] w-[calc(50%-20px)] bg-stroke-primary"></div>
      </div>
      <button className="flex mt-5 items-center gap-3 bg-white shadow-md h-[56px] justify-center rounded-[12px] text-center z-50 w-full">
        <MicrosoftLogo />
        Sign in with Microsoft
      </button>
      <div className="flex gap-4 mt-5 items-center justify-center">
        <h1>Don't have an account yet?</h1>
        <Link to="/v3/signup" className="text-primary-blue text-sm font-normal">
          Sign up
        </Link>
      </div>
    </Form>
  );
}
