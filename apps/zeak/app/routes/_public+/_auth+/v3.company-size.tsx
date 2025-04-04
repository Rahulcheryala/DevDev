import { CompanySizeForm } from "~/modules/auth/components";
import { ZeakLogo } from "@zeak/icons";
import { BsX } from "react-icons/bs";
import { motion } from "framer-motion";

export default function OnboardingPage() {
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
      <CompanySizeForm />
    </div>
  );
}

function AnimatedBackground() {
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
          filter="url(#filter0_f_1040_7137)"
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
            d="M972.145 1209.67C1091.7 1226.95 1201.2 1337.2 1247.41 1278.48L2000.55 -118.948L28.5437 -404L-38.6806 61.0618C-30.387 19.9963 143.967 261.849 102.133 124.915C26.5233 -122.578 579.317 465.754 886.623 510.174C1193.93 554.595 822.699 1188.06 972.145 1209.67Z"
            fill="url(#paint0_linear_1040_7137)"
            animate={{
              d: [
                "M972.145 1209.67C1091.7 1226.95 1201.2 1337.2 1247.41 1278.48L2000.55 -118.948L28.5437 -404L-38.6806 61.0618C-30.387 19.9963 143.967 261.849 102.133 124.915C26.5233 -122.578 579.317 465.754 886.623 510.174C1193.93 554.595 822.699 1188.06 972.145 1209.67Z",
                "M1072.145 1259.67C1191.7 1276.95 1301.2 1387.2 1347.41 1328.48L2100.55 -68.948L128.544 -354L61.3194 111.062C69.613 69.9963 243.967 311.849 202.133 174.915C126.523 -72.578 679.317 515.754 986.623 560.174C1293.93 604.595 922.699 1238.06 1072.145 1259.67Z",
                "M872.145 1159.67C991.7 1176.95 1101.2 1287.2 1147.41 1228.48L1900.55 -168.948L-71.4563 -454L-138.681 11.0618C-130.387 -30.0037 43.967 211.849 2.133 74.915C-73.4767 -172.578 479.317 415.754 786.623 460.174C1093.93 504.595 722.699 1138.06 872.145 1159.67Z",
                "M972.145 1209.67C1091.7 1226.95 1201.2 1337.2 1247.41 1278.48L2000.55 -118.948L28.5437 -404L-38.6806 61.0618C-30.387 19.9963 143.967 261.849 102.133 124.915C26.5233 -122.578 579.317 465.754 886.623 510.174C1193.93 554.595 822.699 1188.06 972.145 1209.67Z",
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
            id="filter0_f_1040_7137"
            x="-338.681"
            y="-704"
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
              result="effect1_foregroundBlur_1040_7137"
            />
          </filter>
          <motion.linearGradient
            id="paint0_linear_1040_7137"
            x1="1960.74"
            y1="156.413"
            x2="-11.2603"
            y2="-128.639"
            gradientUnits="userSpaceOnUse"
            animate={{
              x1: ["1960.74", "2060.74", "1860.74", "1960.74"],
              y1: ["156.413", "206.413", "106.413", "156.413"],
              x2: ["-11.2603", "88.7397", "-111.26", "-11.2603"],
              y2: ["-128.639", "-78.639", "-178.639", "-128.639"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1],
            }}
          >
            <stop stopColor="#00FF99" />
            <stop offset="0.58" stopColor="#00FFFF" />
            <stop offset="0.965" stopColor="#E0F403" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
