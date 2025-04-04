import { Input, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { XIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
  width?: number;
  onDelete: (option: string) => void;
}

export default function MultiSelect({ options, selectedOptions, onSelect, width, onDelete }: MultiSelectProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center justify-between relative w-full">
          <div className={`flex w-[${width}px] gap-3 bg-[#F7F7F8] items-center h-[56px] px-4 rounded-[12px] text-muted-foreground border border-input`}>
            {selectedOptions?.length === 0 ? (
              <div className="flex items-center">Select a Company(s)</div>
            ) : (
              <>
                {selectedOptions?.slice(0, 2).map((option) => (
                  <div key={option} className={`flex items-center h-[33px] gap-2 py-[6px] px-2 rounded-[12px] justify-center bg-white text-[#101828]`}>
                    {option}
                    <XIcon onClick={() => onDelete(option)} className="w-5 h-5 text-[#101828]" />
                  </div>
                ))}
                {selectedOptions?.length > 2 && (
                  <div className={`flex items-center h-[33px] gap-2 py-[6px] px-2 rounded-[12px] justify-center bg-white text-[#101828]`}>
                    +{selectedOptions.length - 2}
                  </div>
                )}
              </>
            )}
          </div>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 text-[#475467]" />
        </div>
      </PopoverTrigger>
      <PopoverContent className={`w-[${width}px] p-4`}>
        <div className="flex gap-3">
          {options?.map((option) => (
            <div key={option} onClick={() => onSelect(option)} className="flex p-3 flex-col justify-center items-start gap-[NaNpx] rounded-[12px] bg-[#F7F7F8]">
              {option}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
