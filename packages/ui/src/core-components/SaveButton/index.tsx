import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "../../utils";

export interface SaveButtonProps {
  onClick: () => void;
  buttonName?: string;
  options?: string[];
  onOptionClick?: (option: string) => void;
}

export default function SaveButton({
  onClick,
  buttonName = "Next",
  options = ["Save As Draft"],
  onOptionClick
}: SaveButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onOptionClick?.(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      {open && (
        <div className="absolute bottom-full min-w-full whitespace-nowrap bg-white text-black rounded-[12px_12px_0px_12px] shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)]">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full flex h-[50px] pl-6 items-center gap-4 text-left text-[#101828] font-[450] text-sm leading-5 tracking-[0.2px] hover:bg-gray-100 border-b border-[#E4E7EC] last:border-b-0"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <div className="flex h-[56px] overflow-hidden border border-transparent">
        <button
          type="submit"
          className={cn("bg-[#0D0844] px-6 py-3 w-[192px] text-white flex-1 rounded-l-[12px] ", open && "rounded-tl-none")}
          onClick={onClick}
        >
          {buttonName}
        </button>
        <div className="bg-white w-0.5 h-full" />
        <button
          className={cn("bg-[#0D0844] text-white rounded-r-[12px] px-3 py-3", open && "rounded-tr-none")}
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown className={cn(
            "transition-transform duration-200 ease-in-out",
            open && "rotate-180"
          )} />
        </button>
      </div>
    </div>
  );
}
