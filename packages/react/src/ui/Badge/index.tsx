import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeItem {
    label: string;
    value: string;
    selected?: boolean;
}

interface BadgeProps {
    type?: "button" | "submit";
    className?: string;
    items?: BadgeItem[];
    onSelect?: (value: string) => void;
    showIcon?: boolean;
    iconColor?: string;
}

export const Badge = ({
    type = "button",
    className,
    items = [{ label: "Active", value: "active", selected: true }],
    onSelect,
    showIcon = false,
    iconColor = "#31DE4B",
}: BadgeProps) => {
    const handleClick = (value: string) => {
        onSelect?.(value);
    };

    return (
        <div className="flex gap-2">
            {items.map((item) => (
                <button
                    key={item.value}
                    type={type}
                    className={cn(
                        "flex h-8 px-3 py-1 justify-center items-center gap-2 rounded-xl font-['Suisse_Int'l'] text-sm font-medium leading-[18px] tracking-[0.2px] capitalize",
                        "bg-white text-secondary",
                        item.selected && "bg-yellow-300 text-[#101828] hover:bg-yellow-300 hover:text-[#101828]",
                        className
                    )}
                    onClick={() => handleClick(item.value)}
                >
                    {showIcon && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1.5" y="1.5" width="9" height="9" rx="4.5" stroke={iconColor} strokeWidth="3" />
                            <circle cx="6" cy="6" r="3.75" fill={iconColor} stroke="white" strokeWidth="1.5" />
                        </svg>
                    )}
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default Badge;