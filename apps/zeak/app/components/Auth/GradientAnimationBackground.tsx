"use client";

import { motion } from "framer-motion";

export default function AnimatedSVG() {
  return (
    <div className="w-full h-full absolute inset-0">
      <motion.svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 1869 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.g
          filter="url(#filter0_f_1041_25692)"
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
            d="M1556 803.999C1675.84 788.784 1805.41 823.753 1838 783.999L2276.63 -92.0008L300 158.967L332.308 413.424C331.747 390.479 552 480.499 482.585 418.033C357.127 305.132 1017.97 498.109 1326 458.999C1634.03 419.89 1406.2 823.019 1556 803.999Z"
            fill="url(#paint0_linear_1041_25692)"
            animate={{
              d: [
                "M1556 803.999C1675.84 788.784 1805.41 823.753 1838 783.999L2276.63 -92.0008L300 158.967L332.308 413.424C331.747 390.479 552 480.499 482.585 418.033C357.127 305.132 1017.97 498.109 1326 458.999C1634.03 419.89 1406.2 823.019 1556 803.999Z",
                "M1656 850C1775.84 834.785 1905.41 869.754 1938 829.999L2376.63 -46.0008L400 204.967L432.308 459.424C431.747 436.479 652 526.499 582.585 464.033C457.127 351.132 1117.97 544.109 1426 504.999C1734.03 465.89 1506.2 869.019 1656 850Z",
                "M1456 780C1575.84 764.785 1705.41 799.754 1738 759.999L2176.63 -116.001L200 134.967L232.308 389.424C231.747 366.479 452 456.499 382.585 394.033C257.127 281.132 917.97 474.109 1226 434.999C1534.03 395.89 1306.2 799.019 1456 780Z",
                "M1556 803.999C1675.84 788.784 1805.41 823.753 1838 783.999L2276.63 -92.0008L300 158.967L332.308 413.424C331.747 390.479 552 480.499 482.585 418.033C357.127 305.132 1017.97 498.109 1326 458.999C1634.03 419.89 1406.2 823.019 1556 803.999Z",
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
            id="filter0_f_1041_25692"
            x="-200"
            y="-592.001"
            width="2976.63"
            height="1896.65"
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
              result="effect1_foregroundBlur_1041_25692"
            />
          </filter>
          <motion.linearGradient
            id="paint0_linear_1041_25692"
            x1="2295.76"
            y1="58.6622"
            x2="319.129"
            y2="309.63"
            gradientUnits="userSpaceOnUse"
            animate={{
              x1: ["2295.76", "2100", "2500", "2295.76"],
              y1: ["58.6622", "100", "0", "58.6622"],
              x2: ["319.129", "500", "150", "319.129"],
              y2: ["309.63", "400", "200", "309.63"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1],
            }}
          >
            <stop stopColor="#F2FF00" />
            <stop offset="0.58" stopColor="#D000FF" />
            <stop offset="0.965" stopColor="#03A9F4" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
