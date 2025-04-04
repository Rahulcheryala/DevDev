import { ChevronLeft } from "lucide-react";
import { cn } from "../../utils";

interface BackGradiantButtonProps {

    label?: string;
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    onClick?: () => void;
}

export default function BackGradiantButton({

    label = "Back",
    className,
    iconClassName,
    textClassName,
    onClick
}: BackGradiantButtonProps) {
    return (
        <div className={cn("pl-[18px] py-4", className)}>
            <button onClick={onClick}>
                <div className="flex items-center gap-2">
                    <ChevronLeft className={cn("h-6 w-6 text-[#475467]", iconClassName)} />
                    <span style={{
                        background: "linear-gradient(151deg, #677281 29.06%, #00FF7B 108.6%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }} className={cn("text-[14px] font-medium tracking-[0px]", textClassName)}>{label}</span>
                </div>
            </button>
        </div>
    );
}
