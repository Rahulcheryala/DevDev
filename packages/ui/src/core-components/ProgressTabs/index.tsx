import { cn } from "../../utils";
import { Check } from "lucide-react";

interface TabItem {
    label: string;
    id: number;
}

interface ProgressTabsProps {
    tabs: TabItem[];
    activeStep: number;
    className?: string;
}

export default function ProgressTabs({ tabs, activeStep, className }: ProgressTabsProps) {
    return <div className={className}>
        <div className="flex border-b mb-6">
            {tabs.map((tab, index) => (
                <div
                    key={tab.id}
                    className="relative border-primary px-4 pb-2 flex items-center gap-2"
                >
                    <span className="text-primary font-medium">{`${tab.id}. ${tab.label}`}</span>
                    {activeStep > tab.id && <Check className="h-4 w-4 text-[#28CD41]" />}
                    <div
                        className={cn(
                            "absolute bottom-0 left-0 right-0 h-[4px]",
                            index === 0 ? "rounded-tl-zeak" : "",
                            index === tabs.length - 1 ? "rounded-tr-zeak" : "",
                            activeStep >= tab.id ? "bg-[#FFDF41]" : "bg-[#9BA2AC]/20"
                        )}
                    ></div>
                </div>
            ))}
        </div>
    </div>;
}
