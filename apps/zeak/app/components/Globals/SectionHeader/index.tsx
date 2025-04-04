import { ChevronDownIcon } from 'lucide-react';
import {cn} from "@zeak/react"
interface SectionHeaderProps {
    title: string;
    isExpanded: boolean;
    expandedHeight?: number;
    className?: string;
    
}
export default function SectionHeader({title, isExpanded, expandedHeight = 400, className}: SectionHeaderProps) {
  return (
    <div className={cn("rounded-l-zeak bg-white p-6 w-96", isExpanded && `h-[${expandedHeight}px]` , className)}>
        <h2 className="text-[26px] font-[450] text-[#677281]">{title}</h2>
    </div>
  )
}
