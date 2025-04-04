import { ReactNode } from "react";
import { Zlogo, UserCircleIcon } from "@zeak/icons";
import { cn } from "../../utils";

export type TypePillVariant = "system" | "user";

interface TypePillProps {
    variant?: TypePillVariant;
    label?: string;
    className?: string;

    textClassName?: string;
}

export default function TypePill({
    variant = "system",
    label,
    className,

    textClassName
}: TypePillProps) {
    // Default icon based on variant
    let icon = <Zlogo />;
    let defaultLabel = "System";

    if (variant === "user") {
        icon = <UserCircleIcon />;
        defaultLabel = "User Defined";
    }

    const displayLabel = label || defaultLabel;

    return (
        <div className={cn("flex items-center gap-2 py-4 px-3 rounded-md", className)}>
            {icon}
            <p className={cn("text-[#0D0C22] truncate text-[14px]", textClassName)}>{displayLabel}</p>
        </div>
    );
}