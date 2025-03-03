import * as React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    icon?: React.ReactNode;
    title?: string;
    required?: boolean;
    width?: string; // New prop for dynamic width
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, icon, title = 'Title*', required, width = '557px', ...props }, ref) => { // Set default width
        return (
            <div className="flex flex-col gap-2">
                {title && (
                    <div className="flex items-center gap-1">
                        <label className="text-[#475467] font-suisse text-sm font-semibold leading-5 tracking-[0.2px]">
                            {title.replace('*', '')}
                        </label>
                        {(required || title.includes('*')) && (
                            <span className="text-red-500">*</span>
                        )}
                    </div>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {icon}
                        </div>
                    )}
                    <input
                        placeholder="Input"
                        style={{ width }} // Apply dynamic width
                        className={cn(
                            "flex h-14 items-center gap-2.5 self-stretch rounded-xl bg-white px-4 py-2 text-base text-[#0D0C22] tracking-[0.2px] font-[450] leading-6 font-suisse placeholder:text-[#9BA2AC] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            error && "border-red-500 focus-visible:ring-red-500",
                            icon && "pl-10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;