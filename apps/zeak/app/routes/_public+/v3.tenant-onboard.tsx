import {
  TenantOnboardForm,
  GradientAnimationBackground,
} from "~/components/Auth";
import { BsX } from "react-icons/bs";
import { ZeakLogo } from "@zeak/icons";

export default function SignupPage() {
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

      <TenantOnboardForm />
    </div>
  );
}
