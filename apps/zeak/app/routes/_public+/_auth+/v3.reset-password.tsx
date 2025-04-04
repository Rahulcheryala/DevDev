import React from "react";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import {
  ResetPasswordForm,
  GradientAnimationBackground,
} from "~/components/Auth";
import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    {
      title: "XcelPros | Reset Password",
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
      <ResetPasswordForm />
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center overflow-hidden absolute inset-0">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1869 1080"
        fill="none"
        initial="svg1"
        animate="svg2"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <motion.g filter="url(#filter0_f)">
          <motion.path
            variants={{
              svg1: {
                d: "M1248.98 269.222C1304.5 116.574 1415.16 -20.7978 1395.19 -81.4782L790.788 -1081.79L-125 1436.02L144.53 1534.05C121.609 1522.37 339.815 1305.33 237.477 1355.38C52.5137 1445.84 631.29 753.112 774.001 360.751C916.712 -31.6093 1179.58 460.032 1248.98 269.222Z",
              },
              svg2: {
                d: "M1556 804C1675.84 788.785 1805.41 823.754 1838 784L2276.63 -91.9999L300 158.968L332.308 413.425C331.747 390.48 552 480.5 482.585 418.034C357.127 305.133 1017.97 498.11 1326 459C1634.03 419.891 1406.2 823.02 1556 804Z",
              },
            }}
            fill="url(#gradient)"
          />
        </motion.g>
        <defs>
          <filter
            id="filter0_f"
            x="-425"
            y="-1381.79"
            width="2701.63"
            height="3215.84"
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
              result="effect1_foregroundBlur"
            />
          </filter>
          <motion.linearGradient
            id="gradient"
            x1="950.376"
            y1="-1023.74"
            x2="34.5873"
            y2="1494.06"
            gradientUnits="userSpaceOnUse"
            animate={{
              x1: ["950.376", "2295.76"],
              y1: ["-1023.74", "58.6632"],
              x2: ["34.5873", "319.129"],
              y2: ["1494.06", "309.631"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <motion.stop
              animate={{
                stopColor: ["#E600FF", "#F2FF00"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.stop
              offset="0.58"
              animate={{
                stopColor: ["#FF9D00", "#D000FF"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.stop
              offset="0.965"
              animate={{
                stopColor: ["#00FF99", "#03A9F4"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
