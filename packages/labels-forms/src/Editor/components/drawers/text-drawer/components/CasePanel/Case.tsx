import React, { ReactNode } from "react";

type CaseProps = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  content: ReactNode;
  isSelected: boolean;
};
const Case: React.FC<CaseProps> = ({ onClick, content, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-1 w-[40px] h-[40px] font-semibold cursor-pointer
                                 rounded-[10px]  border border-[#E9E9EE] flex items-center justify-center ${
                                   isSelected && "bg-[#19110B] text-white"
                                 }`}
    >
      {content}
    </div>
  );
};

export default Case;
