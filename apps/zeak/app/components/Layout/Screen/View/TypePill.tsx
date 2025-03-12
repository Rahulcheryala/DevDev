import Image from "../../../Image";
import React from "react";
import { cn } from "@zeak/react";
import { FaRegUserCircle } from "react-icons/fa";

type TypePillProps = {
  type: string;
  className?: string;
};

const TypePill: React.FC<TypePillProps> = ({
  type,
  className,
}: TypePillProps) => {
  return (
    <>
      {type === "System" ? (
        <div
          className={cn(
            "w-fit flex items-center gap-2 rounded-md font-semibold text-secondary",
            className
          )}
        >
          <Image src="/zeak-z-logo.png" alt="Zeak Logo" className="w-5 h-5" />
          <span className="text-accent-dark font-[500]">{type}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 uppercase">
          <FaRegUserCircle />
          {type}
        </div>
      )}
    </>
  );
};

export default TypePill;
