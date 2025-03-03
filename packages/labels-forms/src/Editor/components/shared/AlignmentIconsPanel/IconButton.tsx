// IconButton.tsx
import React from "react";

type IconButtonProps = {
  icon: React.ReactNode;
  isActive?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, isActive = false }) => {
  return (
    <div className="px-[7px] mb-[14px]">
      <div
        className={`cursor-pointer rounded-[10px] border border-[#E9E9EE] flex items-center justify-center w-[40px] h-[40px] ${
          isActive ? "bg-black border-black" : ""
        }`}
      >
        {icon}
      </div>
    </div>
  );
};

export default IconButton;
