import Image from "../../../Image";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

type TypePillProps = {
  type: string;
  className?: string;
};

const TypePill: React.FC<TypePillProps> = ({ type, className }: TypePillProps) => {
  return (
    <>
      {type === "System" ? (
        <div className={`w-fit flex items-center gap-2 rounded-md ${className}`}>
          <Image
            src="/zeak-z-logo.png"
            alt="Zeak Logo"
            className="w-4 h-4"
          />
          {type}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FaRegUserCircle />
          {type}
        </div>
      )}
    </>
  );
};

export default TypePill;
