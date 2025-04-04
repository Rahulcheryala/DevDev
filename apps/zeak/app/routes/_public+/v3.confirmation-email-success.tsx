import { motion } from "framer-motion";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { AuthButton, GradientAnimationBackground } from "~/components/Auth";

export default function ResetSuccess() {
  return (
    <div className="w-full relative min-h-screen flex items-center justify-center">
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

      <div className="z-50 w-[640px] flex flex-col  items-center justify-center text-center ">
        <div className="bg-white rounded-lg p-10 text-center flex flex-col items-center justify-center mb-5 w-full">
          <div className=" bg-green-500 rounded-full w-16 h-16 flex items-center justify-center text-white mb-8">
            <FaCheck size={40} className="text-white" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-suisse text-4xl font-semibold leading-[1.1] tracking-[0.2px]  flex gap-2 text-center ">
              We’ve sent a confirmation <br /> email to{" "}
            </h1>

            <div className="my-6">
              <p className="text-[18px] font-[500]">User@company.com</p>
            </div>
            <div className="p-6 w-full bg-yellow-50">
              <p>
                To complete your sign-up, click on the confirmation{" "}
                <span className="text-primary-blue">link</span> we sent to your
                email. This step keeps you safe and helps us verify your
                account.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <GoClock size={20} />
              <span>Redirecting to sign in page in 15s.</span>
            </div>
          </div>
        </div>
        <AuthButton>Reset Password</AuthButton>
      </div>
    </div>
  );
}
