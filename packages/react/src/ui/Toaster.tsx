import { XIcon } from "lucide-react";
import React from "react";
import { cn } from "../utils/cn";

interface ToasterProps {
    content: string;
    icon?: React.ReactNode;
    title?: string;
    variant?: "warning" | "success" | "error" | "info";
    className?: string;
    onClose?: () => void;
}

const variantStyles = {
    warning: "bg-[#f7d653] text-[#F18F01]",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800"
};

const Toaster: React.FC<ToasterProps> = ({
    content,
    icon,
    title = "Note:",
    variant = "warning",
    className,
    onClose
}) => {
    return (
        <div className={cn(
            "rounded-[12px] p-6 flex justify-between items-center w-full",
            variantStyles[variant],
            className
        )}>
            <div className="flex items-center gap-4">
                {icon}
                <div className="w-full">
                    <h2 className="text-[16px] font-medium">{title}</h2>
                    <span className="">{content}</span>
                </div>
            </div>
            {onClose && (
                <button onClick={onClose} className="ml-4">
                    <XIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default Toaster;