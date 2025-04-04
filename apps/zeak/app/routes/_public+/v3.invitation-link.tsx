import React from "react";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import { cn } from "@zeak/react";
import { GradientAnimationBackground } from "~/components/Auth";

export default function InvitationLink() {
  const [state, setState] = React.useState(false);
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
        <div className=" w-[640px] bg-white z-50 relative p-[40px] flex flex-col items-center gap-5 justify-center rounded-[12px]">
          <div className="flex flex-col justify-center items-center gap-8 w-full">
            {state ? (
              <IoCheckmark
                size={60}
                className="text-white bg-green-500 rounded-full p-2 "
              />
            ) : (
              <IoClose
                size={60}
                className="text-white bg-red-600 rounded-full p-2 "
              />
            )}
            <div className="space-y-4">
              <h1 className="text-center text-[28px] font-suisse font-semibold">
                Invitation Link Expired
              </h1>
              <p className="text-center text-base text-accent-dark font-[450]">
                The invitation link you clicked has expired. Please contact your
                system administrator to request a new invitation link.
              </p>
            </div>
          </div>
          <div className="mt-[60px]">
            {state ? (
              <div className="flex items-center gap-2 py-3">
                <FaRegClock size={20} />
                Redirecting to home page in 15s
              </div>
            ) : (
              <div className="py-3">Skip</div>
            )}
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() => setState(!state)}
            className="bg-[#0D0844] h-[56px] w-full text-white rounded-[12px]"
          >
            {state ? "Sign up" : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
}
