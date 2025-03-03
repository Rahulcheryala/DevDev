import React from "react";

type IconButtonProps = {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
};

const IconButton: React.FC<IconButtonProps> = ({ onClick, isActive, icon }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-[10px] border border-[#E9E9EE] flex items-center justify-center w-full h-[40px] ${
      isActive ? "bg-black border-black text-white" : ""
    }`}
  >
    {icon}
  </div>
);

export default IconButton;
