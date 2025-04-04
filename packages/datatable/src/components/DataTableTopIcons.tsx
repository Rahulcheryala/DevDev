import React from 'react';

import { cn } from "../utils/cn";




interface DataTableTopIconsItem {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
}

interface DataTableTopIconsProps {
    items: DataTableTopIconsItem[];
    className?: string;
    labelClassName?: string;
}

export default function DataTableTopIcons({
    items,
    className,
    labelClassName,
}: DataTableTopIconsProps) {
    return (
        <div className={cn("flex items-center gap-4 justify-center", className)}>
            {items.map((item) => (
                <div
                    className={cn("flex items-center gap-3 border-r pr-[28px] cursor-pointer", item.className)}
                    onClick={item.onClick}
                >
                    {item.icon}
                    <span className={cn("text-sm font-medium", labelClassName)}>{item.label}</span>
                </div>
            ))}
        </div>
    );
}

