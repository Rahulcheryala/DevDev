import { motion } from "framer-motion";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { AuthButton } from "~/components/Auth";

export default function ResetLinkSend() {
  return (
    <div className="w-full relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />
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
        <div className="bg-white rounded-lg p-10 text-center flex flex-col items-center justify-center mb-5">
          <div className=" bg-green-500 rounded-full w-16 h-16 flex items-center justify-center text-white mb-8">
            <FaCheck size={40} className="text-white" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-suisse text-4xl font-semibold leading-[1.1] tracking-[0.2px] mb-5 flex gap-2 text-center ">
              Password reset link sent!
            </h1>
            <p className="text-[14px] text-center font-[450]">
              Password reset instructions have been sent to [name@email.com].
              Please review your email and follow the provided steps.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <GoClock size={20} />
              <span>Redirecting to sign in page in 15s.</span>
            </div>
          </div>
        </div>
        <AuthButton>Sign in</AuthButton>
      </div>
    </div>
  );
}

const AnimatedBackground = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <motion.svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.g
          filter="url(#filter0_f_1043_24727)"
          animate={{
            x: [0, -100, 100, 0],
            scale: [1, 1.05, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.75, 1],
          }}
        >
          <motion.path
            d="M972.141 1209.66C1091.7 1226.95 1201.19 1337.2 1247.4 1278.47L2000.54 -118.95L28.5396 -404.002L-38.6848 61.0595C-30.3912 19.994 143.963 261.847 102.129 124.912C26.5192 -122.58 579.313 465.751 886.619 510.172C1193.93 554.593 822.694 1188.06 972.141 1209.66Z"
            fill="url(#paint0_linear_1043_24727)"
            animate={{
              d: [
                "M972.141 1209.66C1091.7 1226.95 1201.19 1337.2 1247.4 1278.47L2000.54 -118.95L28.5396 -404.002L-38.6848 61.0595C-30.3912 19.994 143.963 261.847 102.129 124.912C26.5192 -122.58 579.313 465.751 886.619 510.172C1193.93 554.593 822.694 1188.06 972.141 1209.66Z",
                "M1072.141 1309.66C1191.7 1326.95 1301.19 1437.2 1347.4 1378.47L2100.54 -18.95L128.54 -304.002L61.3152 161.0595C69.6088 119.994 243.963 361.847 202.129 224.912C126.519 -22.58 679.313 565.751 986.619 610.172C1293.93 654.593 922.694 1288.06 1072.141 1309.66Z",
                "M872.141 1109.66C991.7 1126.95 1101.19 1237.2 1147.4 1178.47L1900.54 -218.95L-71.4604 -504.002L-138.685 -38.9405C-130.391 -80.006 43.963 161.847 2.12891 24.912C-73.4808 -222.58 479.313 365.751 786.619 410.172C1093.93 454.593 722.694 1088.06 872.141 1109.66Z",
                "M972.141 1209.66C1091.7 1226.95 1201.19 1337.2 1247.4 1278.47L2000.54 -118.95L28.5396 -404.002L-38.6848 61.0595C-30.3912 19.994 143.963 261.847 102.129 124.912C26.5192 -122.58 579.313 465.751 886.619 510.172C1193.93 554.593 822.694 1188.06 972.141 1209.66Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          />
        </motion.g>
        <defs>
          <filter
            id="filter0_f_1043_24727"
            x="-338.685"
            y="-704.002"
            width="2639.23"
            height="2299.54"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur_1043_24727"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1043_24727"
            x1="1960.74"
            y1="156.411"
            x2="-11.2645"
            y2="-128.641"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FF99" />
            <stop offset="0.58" stopColor="#00FFFF" />
            <stop offset="0.965" stopColor="#E0F403" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};
