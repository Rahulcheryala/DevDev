import React from "react";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import {
  ForgotPasswordForm,
  
} from "~/components/Auth";
import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Xcelpros | Forgot Password",
    },
  ];
};
export default function ForgetPassword() {
  return (
    <div className="w-full relative min-h-screen flex items-center justify-center ">
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
      <ForgotPasswordForm />
    </div>
  );
}

const AnimatedBackground = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <motion.svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 1729 1064"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.g
          filter="url(#filter0_f_1043_23826)"
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
            d="M1052.11 718.699C1159.81 664.004 1293.6 653.281 1310.89 604.873L1428.79 -367.686L-347.773 534.465L-231.636 763.167C-239.894 741.751 -2.18947 752.315 -88.5898 716.883C-244.747 652.843 442.481 611.928 719.331 471.341C996.18 330.755 917.47 787.068 1052.11 718.699Z"
            fill="url(#paint0_linear_1043_23826)"
            animate={{
              d: [
                "M1052.11 718.699C1159.81 664.004 1293.6 653.281 1310.89 604.873L1428.79 -367.686L-347.773 534.465L-231.636 763.167C-239.894 741.751 -2.18947 752.315 -88.5898 716.883C-244.747 652.843 442.481 611.928 719.331 471.341C996.18 330.755 917.47 787.068 1052.11 718.699Z",
                "M1152.11 768.699C1259.81 714.004 1393.6 703.281 1410.89 654.873L1528.79 -317.686L-247.773 584.465L-131.636 813.167C-139.894 791.751 97.81053 802.315 11.4102 766.883C-144.747 702.843 542.481 661.928 819.331 521.341C1096.18 380.755 1017.47 837.068 1152.11 768.699Z",
                "M952.11 668.699C1059.81 614.004 1193.6 603.281 1210.89 554.873L1328.79 -417.686L-447.773 484.465L-331.636 713.167C-339.894 691.751 -102.189 702.315 -188.59 666.883C-344.747 602.843 342.481 561.928 619.331 421.341C896.18 280.755 817.47 737.068 952.11 668.699Z",
                "M1052.11 718.699C1159.81 664.004 1293.6 653.281 1310.89 604.873L1428.79 -367.686L-347.773 534.465L-231.636 763.167C-239.894 741.751 -2.18947 752.315 -88.5898 716.883C-244.747 652.843 442.481 611.928 719.331 471.341C996.18 330.755 917.47 787.068 1052.11 718.699Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1],
            }}
          />
        </motion.g>
        <defs>
          <filter
            id="filter0_f_1043_23826"
            x="-647.773"
            y="-667.687"
            width="2376.56"
            height="1730.85"
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
              result="effect1_foregroundBlur_1043_23826"
            />
          </filter>
          <motion.linearGradient
            id="paint0_linear_1043_23826"
            x1="1497.55"
            y1="-232.273"
            x2="-279.01"
            y2="669.879"
            gradientUnits="userSpaceOnUse"
            animate={{
              x1: ["1497.55", "1300", "1700", "1497.55"],
              y1: ["-232.273", "-200", "-300", "-232.273"],
              x2: ["-279.01", "-100", "-400", "-279.01"],
              y2: ["669.879", "800", "500", "669.879"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1],
            }}
          >
            <stop stopColor="#95FF00" />
            <stop offset="0.58" stopColor="#FF7B00" />
            <stop offset="0.965" stopColor="#F4E003" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};
