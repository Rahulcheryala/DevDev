import React from "react";
import { PrintSectionProps } from "../../../../types";

const PrintSection: React.FC<PrintSectionProps> = ({ heading, children }) => {
  return (
    <div className="flex flex-row space-x-4 flex-wrap">
      <div
        className={`flex flex-col w-full gap-2 mb-[15px] border-t pt-4 pb-1 border-[rgb(233,_233,_238)] 
`}
      >
        <p className={"text-[14px] text-[#19110B] mb-2"}>{heading}</p>
        {children}
      </div>
    </div>
  );
};

export default PrintSection;
