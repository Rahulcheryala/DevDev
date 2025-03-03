import React from "react";
import type { ButtonProps } from "@zeak/react";
import { Button } from "@zeak/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

interface AuthButtonProps extends ButtonProps {}

export default function AuthButton(props: AuthButtonProps) {
  return (
    <motion.div
      whileHover={{
        width: "620px", // Slightly reduced from original 600px for smoother effect
      }}
      className="h-[56px] w-[640px] overflow-hidden"
    >
      <Button
        {...props}
        type="submit"
        className="group relative h-full w-full bg-[#101828] text-white flex items-center justify-center overflow-hidden"
      >
        <div className="flex items-center justify-center  w-full">
          {/* Button Text */}
          <span className="transition-all duration-300 group-hover:mr-2">
            {props.children}
          </span>

          {/* Arrow Icon Animation */}

          <FaArrowRightLong className="text-white h-4 group-hover:w-4 w-0 transition-all duration-300 opacity-0 group-hover:opacity-100" />
        </div>
      </Button>
    </motion.div>
  );
}
