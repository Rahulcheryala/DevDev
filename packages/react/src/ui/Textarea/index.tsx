import React, { useState } from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    required?: boolean
    maxLength?: number
    className?: string
    spellCheck?: boolean
}

export function Textarea({
    label,
    required = false,
    maxLength,
    className,
    value,
    onChange,
    spellCheck = true,
    placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.",
    ...props
}: TextareaProps) {
    const [currentLength, setCurrentLength] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value
        if (maxLength && text.length > maxLength) {
            return
        }
        setCurrentLength(text.length)
        onChange?.(e)
    }

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <div className="flex items-center gap-1">
                    <LabelPrimitive.Root
                        className={cn(
                            "font-['Suisse_Int\\'l'] text-sm font-medium leading-5 tracking-[0.2px]",
                            "bg-[#475467] bg-clip-text text-transparent",
                            "text-underline-position-from-font text-decoration-skip-ink-none"
                        )}
                    >
                        {label}
                        {required && (
                            <span className="text-red-500 ml-0.5">*</span>
                        )}
                    </LabelPrimitive.Root>
                </div>
            )}
            <div className="relative">
                <textarea
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    spellCheck={spellCheck}
                    lang="en"
                    className={cn(
                        "w-[410px] h-[176px] max-w-[508px] p-4",
                        "bg-white border-2 border-[#007AF5]",
                        "shadow-[0px_0px_15px_0px_rgba(0,122,245,0.2)]",
                        "font-['Suisse_Int\\'l'] text-base font-[450] leading-6 tracking-[0.2px]",
                        "text-[#0D0C22] placeholder:text-[#475467]/60",
                        "resize-none focus:outline-none",
                        "rounded-[12px_12px_0_12px]",
                        className
                    )}
                    style={{
                        paddingBottom: '2.5rem' // Make space for the counter
                    }}
                    {...props}
                />
                <div className="absolute inset-[2px] pointer-events-none">
                    <div className="absolute right-0 bottom-1 flex items-end">
                        {maxLength && (
                            <div
                                className={cn(
                                    "font-['Suisse_Int\\'l'] text-sm",
                                    "bg-[#475467] bg-clip-text text-transparent"
                                )}
                            >
                                {currentLength}/{maxLength}
                            </div>
                        )}
                        <div
                            className="w-4 h-4 relative ml-1"
                            style={{
                                background: 'linear-gradient(135deg, transparent 50%, #007AF5 50%)',
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                            }}
                        >
                            <div
                                className="absolute bottom-0 right-0 w-4 h-4"
                                style={{
                                    background: 'linear-gradient(135deg, transparent 48%, #007AF5 48%, #007AF5 52%, #007AF5 52%)',
                                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Textarea