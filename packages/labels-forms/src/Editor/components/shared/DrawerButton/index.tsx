import React from "react";
import { Button } from "antd";

type DrawerButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

const DrawerButton: React.FC<DrawerButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  return (
    <Button
      type="text"
      shape="round"
      onClick={onClick}
      className={`text-accent-primary border border-stroke-primary h-[48px] 
      flex items-center justify-center w-full mt-[20px] text-sm leading-[20px] custom-ant-button ${className}`}
    >
      {label}
    </Button>
  );
};

export default DrawerButton;
