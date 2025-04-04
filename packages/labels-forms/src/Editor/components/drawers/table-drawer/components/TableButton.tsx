import React from "react";

interface TableButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  className?: string; // Optional className prop for customization
}

const TableButton: React.FC<TableButtonProps> = ({
  onClick,
  icon,
  className = "",
}) => (
  <div className="px-[4px] mb-[4px]">
    <div
      onClick={onClick}
      className={`border border-[#EBEBEB] w-[42px] h-[40px] rounded-[10px] 
            p-[8px] hover:bg-[rgba(14,_119,_211,_0.08)] hover:border-transparent 
            cursor-pointer flex items-center justify-center ${className}`}
    >
      {icon}
    </div>
  </div>
);

export default TableButton;
