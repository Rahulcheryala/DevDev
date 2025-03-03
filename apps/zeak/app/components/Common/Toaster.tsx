
import { XIcon } from "lucide-react";
import React from "react";

interface ToasterProps {
  content: string;
  icon: React.ReactNode;
}

const Toaster: React.FC<ToasterProps> = ({ content, icon }) => {
 

  return (
    <>
    <div className="rounded-[12px] p-6 flex justify-between items-center bg-[#f7d653]  w-full ">
            <div className="flex items-center gap-4">
            {icon}
        <div className="w-full">
        <h2 className="text-[#F18F01] text-[16px] font-medium">Note:</h2>
            <span className="">{content}</span>
        </div>
          </div>
            <button  className="ml-4">
                <XIcon className="w-4 h-4" />
            </button>
    </div>
    </>
  );
};

export default Toaster;