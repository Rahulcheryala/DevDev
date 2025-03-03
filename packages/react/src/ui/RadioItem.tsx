import { ReactNode } from "react";
import { RadioGroupItem } from "../Radio";
import { Badge } from "../Badge";
import { cn } from "../utils/cn";

type RadioItemProps = {
    selected: string;
    value: string;
    label: string;
    description: string;
    icon?: ReactNode;
    badgeClassName?: string;
    className?: string;
};

const RadioItem = ({
    selected,
    value,
    label,
    description,
    icon,
    badgeClassName,
    className
}: RadioItemProps) => {
    return (
        <div
            className={cn(
                "relative bg-[#F0F4FD] p-6 rounded-zeak transition-colors",
                {
                    "bg-white border-2 border-[#007AF5]": selected === value,
                },
                className
            )}
        >
            <label
                htmlFor={value}
                className="block w-full cursor-pointer"
            >
                {/* Icon and Label */}
                <div className="flex items-center justify-between mb-6">
                    <span className="overflow-hidden overflow-ellipsis text-[20px] font-medium tracking-[0px] text-[#101828]">
                        {label}
                    </span>
                    {icon}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2">{description}</p>

                {/* Badge and Radio */}
                <div className="flex items-center justify-between mt-6 py-1">
                    <Badge
                        variant="blue"
                        className={cn(
                            "uppercase text-xs rounded-full",
                            badgeClassName
                        )}
                    >
                        {label}
                    </Badge>

                    <RadioGroupItem value={value} id={value} />
                </div>
            </label>
        </div>
    );
};

export default RadioItem;
