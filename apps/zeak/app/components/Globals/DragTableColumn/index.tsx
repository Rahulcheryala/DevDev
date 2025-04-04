import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@zeak/react";

export default function DragTableColumn({direction=undefined}: {direction?: "left" | "right" |undefined}) {
  return (
    <div className="flex items-center w-10  bg-[#101828] px-[5px] h-[20px] rounded-full">
        <ChevronLeft className={cn("h-4 w-4 ", direction ==="right"?"text-gray-400":"text-white")} />
        <ChevronRight className={cn("h-4 w-4", direction === "left" ? "text-gray-400" : "text-white")} />
      
    </div>
  );
}
