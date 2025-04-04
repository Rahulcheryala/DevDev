import { useState, ReactNode, ButtonHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils";

interface TopButtonOption {
    text: string;
    onClick?: () => void;
}

interface DualButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    onSecondaryClick?: () => void;
    primaryText?: string;
    secondaryText?: string;
    topButtonOptions?: TopButtonOption[];
    width?: string;
    height?: string;
    primaryClassName?: string;
    secondaryClassName?: string;
    dropdownClassName?: string;
    type?: "submit" | "button" | "reset";
    children?: ReactNode;
}

export default function DualButton({
    onClick,
    primaryText = "Next",
    secondaryText = "Save As Draft",
    topButtonOptions = [],
    width = "216px",
    height = "56px",
    primaryClassName,
    secondaryClassName,
    dropdownClassName,
    type = "submit",
    onSecondaryClick,
    children,
    ...props
}: DualButtonProps) {
    const [open, setOpen] = useState(false);

    // Use secondaryOptions if provided, otherwise create a single option from secondaryText
    const options = topButtonOptions.length > 0
        ? topButtonOptions
        : [{ text: secondaryText, onClick: onSecondaryClick }];

    return (
        <div className={`relative w-[${width}]`}>
            {open && (
                <div className="absolute bottom-full w-full">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setOpen(false);
                                option.onClick?.();
                            }}
                            className={cn(
                                "cursor-pointer flex items-center w-full bg-white text-black px-6 py-2 hover:bg-gray-100",
                                `h-[${height}]`,
                                index === 0 && "rounded-t-zeak",
                                dropdownClassName
                            )}>
                            {option.text}
                        </button>
                    ))}
                </div>
            )}
            <div className={`flex overflow-hidden border border-transparent h-[${height}]`}>
                <button
                    type={type}
                    className={cn(
                        "bg-[#0D0844] px-6 py-3 text-white flex-1 rounded-l-[12px]",
                        open && "rounded-tl-none",
                        primaryClassName
                    )}
                    onClick={onClick}
                    {...props}
                >
                    {children || primaryText}
                </button>
                <div className="bg-white w-0.5 h-full" />
                <div
                    className={cn(
                        "bg-[#0D0844] text-white rounded-r-[12px] px-3 py-3",
                        open && "rounded-tr-none",
                        secondaryClassName
                    )}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <ChevronDown />
                </div>
            </div>
        </div>
    );
}