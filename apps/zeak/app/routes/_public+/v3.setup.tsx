import { ZeakLogo } from "@zeak/icons";
import { Progress } from "@zeak/react";
import { GradientAnimationBackground } from "~/components/Auth";

export default function SetUpPage() {
  return (
    <div className="w-full relative min-h-screen flex items-center justify-center ">
      <GradientAnimationBackground />
      <div className="absolute top-5 left-5">
        <ZeakLogo />
      </div>
      <div className="rounded-[12px] flex flex-col items-center gap-5 p-[80px] w-[640px] z-50 relative bg-white">
        <h1 className="text-center font-semibold text-3xl">
          Lets get started.
        </h1>
        <div className="">
          <svg
            width="45"
            height="52"
            viewBox="0 0 45 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 13.9779V37.8214C2 37.9641 2.07598 38.0959 2.19941 38.1675L21.934 49.6064V25.8787C21.934 25.7388 22.0072 25.609 22.1269 25.5365L42.5495 13.1749L22.3198 1.61429C22.196 1.54354 22.0439 1.54404 21.9206 1.61561L2.19924 13.0593C2.07591 13.1309 2 13.2627 2 13.4053V13.9779Z"
              stroke="#101828"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M21.5645 49.7752L42.6302 37.4427V13.25L21.5645 26.1917"
              stroke="#101828"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M10.6064 42.152V19.6265L31.8241 7.14648"
              stroke="#101828"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="">
          <p>Generating your environment...</p>
        </div>

        <Progress className="w-[300px] h-2 " value={50} />
      </div>
    </div>
  );
}
