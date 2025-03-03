import React from "react";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import { cn } from "@zeak/react";
import { GradientAnimationBackground } from "~/components/Auth";

import { IoClose } from "react-icons/io5";
export default function AccountBlocked() {
  return (
    <div className="w-full relative min-h-screen flex items-center justify-center ">
      <GradientAnimationBackground />
      <div className="absolute top-5 left-5">
        <ZeakLogo />
      </div>
      <div className="absolute top-5 right-5 z-50 cursor-pointer">
        <div className="flex items-center gap-5">
          <h1>Need Help?</h1>
          <BsX size={40} />
        </div>
      </div>
      <div className="z-50 relative space-y-6">
        <div className=" w-[640px] bg-white z-50 relative p-[80px] flex flex-col items-center gap-5 justify-center rounded-[12px]">
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <IoClose
              size={60}
              className="text-white bg-red-500 rounded-full p-2 "
            />
            <h1 className="text-center text-[28px] font-semibold text-accent-dark">
              Your account has been locked
            </h1>
            <p className="text-center text-[16px] text-accent-dark font-[450] font-suisse">
              Your account has been locked after too many failed attempts. You
              will receive an email with a link to unlock it.
            </p>
          </div>
        </div>
        <div className="mt-10 w-full">
          <button className="bg-[#0D0844] h-[56px] w-full text-white rounded-[12px]">
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
