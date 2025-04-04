import React from "react";

type TextAlignButtonProps = {
  onClick: () => void;
  align: string;
  currentAlign: string;
  icon: React.ReactNode;
};

const TextAlignButton: React.FC<TextAlignButtonProps> = ({
  onClick,
  align,
  currentAlign,
  icon,
}) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-[10px] border border-[#E9E9EE] flex items-center justify-center w-full h-[40px] ${
      currentAlign === align ? "bg-black border-black" : ""
    }`}
  >
    {icon}
  </div>
);

export default TextAlignButton;
