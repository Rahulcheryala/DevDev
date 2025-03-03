import React from "react";
import { BsX } from "react-icons/bs";
import { ZeakLogo } from "@zeak/icons";
import {
  TenantSingupFrom,
  GradientAnimationBackground,
} from "~/components/Auth";

export default function Invitation() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
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
      <TenantSingupFrom />
    </div>
  );
}
