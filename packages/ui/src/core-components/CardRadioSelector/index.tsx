import { ReactNode } from "react";

import { cn } from "../../utils";
import { RadioGroup, RadioGroupItem } from "../RadioGroup";

export type CardRadioItem = {
    value: string;
    label: string;
    description: string;
    icon?: ReactNode;
    badgeColor?: string;
    badgeText?: string;
    className?: string;
};

export type CardRadioSelectorProps = {
    selected: string;
    items: CardRadioItem[];
    label?: string;
    isRequired?: boolean;
    className?: string;
    onChange?: (value: string) => void;
};

export default function CardRadioSelector({
    selected,
    items,
    label,
    isRequired = false,
    className,
    onChange,
}: CardRadioSelectorProps) {
    return (
        <RadioGroup value={selected} onValueChange={onChange as any}>
            {label && (
                <h3 className="text-[20px] font-[450] tracking-[0px] mb-8 text-[#475467]">
                    {label}
                    {isRequired && <span className="text-red-500 ml-0.5">*</span>}
                </h3>
            )}
            <div className={cn("grid gap-4 grid-cols-3", className)}>
                {items.map((item) => (
                    <div
                        key={item.value}
                        className={cn(
                            "relative bg-[#F0F4FD] p-6 rounded-zeak transition-colors",
                            {
                                "bg-white border-2 border-[#007AF5]": selected === item.value,
                            },
                            item.className,
                        )}
                    >
                        <label
                            htmlFor={item.value}
                            className="block w-full cursor-pointer"
                        >
                            {/* Icon and Label */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="overflow-hidden overflow-ellipsis text-[20px] font-medium tracking-[0px] text-[#101828]">
                                    {item.label}
                                </span>
                                {item.icon}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-500 mt-2">{item.description}</p>

                            {/* Badge and Radio */}
                            <div className="flex items-center justify-between mt-6 py-1">
                                {(item.badgeText || item.badgeColor) && (
                                    <div
                                        className={cn(
                                            "text-xs font-medium uppercase rounded-[32px] py-[6px] shadow-none px-3",
                                            item.badgeColor && {
                                                [`text-[${item.badgeColor}] bg-[${item.badgeColor}] bg-opacity-[15%]`]: true,
                                            }
                                        )}
                                    >
                                        {item.badgeText || item.label}
                                    </div>
                                )}

                                <RadioGroupItem value={item.value} id={item.value} />
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </RadioGroup>
    );
}

;
