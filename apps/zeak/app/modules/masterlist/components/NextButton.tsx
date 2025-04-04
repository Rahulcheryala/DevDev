import { useState } from "react";
import { Button } from "@zeak/react";
import { cn } from "@zeak/react";
import { ChevronDown } from "lucide-react";

interface NextButtonProps {
    onClick: () => void;
}

export default function NextButton({ onClick }: NextButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative ">
            {open && (
                <div className="absolute bottom-full h-[56px] w-full bg-white text-black px-6 py-2 rounded-t-zeak shadow-md">
                    Save As Draft
                </div>
            )}
            <div className="flex  h-[56px]  overflow-hidden border border-transparent">
                <button
                    type="submit"
                    className={cn("bg-[#0D0844] px-6 py-3 w-[192px] text-white flex-1 rounded-l-[12px] ", open && "rounded-tl-none")}
                    onClick={onClick}
                >
                    Next
                </button>
                <div className="bg-white w-0.5 h-full" />
                <button
                    className={cn("bg-[#0D0844] text-white rounded-r-[12px] px-3 py-3", open && "rounded-tr-none")}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <ChevronDown />
                </button>
            </div>
        </div>
    );
}
