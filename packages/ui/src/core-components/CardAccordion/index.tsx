import React, { useState } from 'react'
import { cn } from "../../utils/cn"
import { ChevronDown, ChevronUp } from "lucide-react"
import { EditIcon3 } from "@zeak/icons"

export interface CardAccordionProps {
    title?: string;
    defaultExpanded?: boolean;
    className?: string;
    children?: React.ReactNode
    showEditIcon?: boolean;
    onEditIconClick?: () => void;
}

export const CardAccordion: React.FC<CardAccordionProps> = ({
    title = "Title",
    defaultExpanded = true,
    className,
    children,
    showEditIcon = false,
    onEditIconClick
}) => {
    const [isEnabled, setIsEnabled] = useState(defaultExpanded);
    const handleEditIconClick = () => {
        if (onEditIconClick) {
            onEditIconClick();
        }
    }
    return (
        <section className={cn("w-full bg-[#F7F7F8] rounded-zeak", className)}>
            <div
                className={cn(
                    "w-full flex items-center justify-between bg-[#E5EAF2] pl-6 py-4 pr-6 rounded-t-zeak",
                    {
                        "rounded-b-zeak": !isEnabled,
                    }
                )}
            >
                <div className="flex items-center gap-2">
                    <label className="text-[#0D0C22] text-[20px] font-['Suisse Int\'l'] font-medium">
                        {title}
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    {showEditIcon && <div onClick={handleEditIconClick}><EditIcon3 className="w-6 h-6 inline-block mr-2 " color="#475467" /></div>}
                    <button
                        type="button"
                        onClick={() => setIsEnabled(!isEnabled)}
                    >
                        {isEnabled ? (
                            <ChevronDown className="w-6 h-6" />
                        ) : (
                            <ChevronUp className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
            {isEnabled && children}
        </section>
    )
}

export default CardAccordion;
