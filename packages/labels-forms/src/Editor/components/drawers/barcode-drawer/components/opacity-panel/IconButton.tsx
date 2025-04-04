import React from "react";

type IconButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <div
      className="w-[40px] h-[40px] border border-stroke-secondary rounded-[10px] 
      flex items-center justify-center ml-[14px]"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default IconButton;
