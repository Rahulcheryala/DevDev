import { useState } from "react";
import { cn } from "../../utils";

export type FilterOption = string;

interface FilterTabsProps {
    options: FilterOption[];
    defaultSelected?: FilterOption;
    onChange?: (selected: FilterOption) => void;
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
}

export default function FilterTabs({
    options = ["All", "System", "User Defined"],
    defaultSelected = "All",
    onChange,
    className,
    activeClassName = "bg-[#D3DFE8] text-[#475467]",
    inactiveClassName = "text-[#101828] hover:bg-[#D3DFE8]"
}: FilterTabsProps) {
    const [selected, setSelected] = useState<FilterOption>(defaultSelected);

    const handleSelect = (option: FilterOption) => {
        setSelected(option);
        onChange?.(option);
    };

    return (
        <div className={cn("flex gap-4 px-4", className)}>
            {options.map((option) => (
                <button
                    key={option}
                    className={cn(
                        "px-3 py-2.5 rounded-lg text-base font-normal",
                        selected === option ? activeClassName : inactiveClassName
                    )}
                    onClick={() => handleSelect(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
