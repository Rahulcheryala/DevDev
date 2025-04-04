import { Search } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { cn } from "../../utils";

interface SearchBoxProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    iconClassName?: string;
}

export default function SearchBox({
    value,
    onChange,
    placeholder = "Search",
    className,
    inputClassName,
    iconClassName
}: SearchBoxProps) {
    const [internalValue, setInternalValue] = useState(value || "");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <div className={cn("relative px-4", className)}>
            <Search className={cn("absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#475467]", iconClassName)} />
            <input
                value={value !== undefined ? value : internalValue}
                onChange={handleChange}
                type="search"
                placeholder={placeholder}
                className={cn("w-full pl-12 h-12 bg-[#F0F4FD] border-none text-lg rounded-[8px] outline-none", inputClassName)}
            />
        </div>
    );
}