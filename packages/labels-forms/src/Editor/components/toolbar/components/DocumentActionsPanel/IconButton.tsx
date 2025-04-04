import React from "react";

type IconButtonProps = {
  icon: string;
  width: string;
  height: string;
  onClick?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  width,
  height,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-[40px] h-[40px] rounded-[10px] flex 
        items-center justify-center hover:bg-[#000000] hover:bg-opacity-[6%]"
    >
      <img src={icon} width={width} height={height} />
    </div>
  );
};

export default IconButton;
