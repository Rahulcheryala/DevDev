import { cn } from "@zeak/react";
import React from "react";
import IntegrationForm from "~/modules/integrations/components/CreateFlow/IntegrationForm";
import { IntegrationFlow } from "~/modules/integrations/context";
import { Integration } from "~/modules/integrations/models/constants";
import { ChevronDown, ChevronUp, PenLine } from "lucide-react";

const keyClasses: Record<string, string> = {
  "Environment Type": "bg-[#FC0] w-fit px-4 py-1 rounded-zeak text-white",
  "Environment URL": "text-blue-500 font-medium tracking-wider",
  "Connection status": "text-green-500",
};

type DetailsSectionProps = {
  title: string;
  items: {
    title: string;
    value: string | number | boolean | null | React.ReactNode;
    icon?: string | null;
  }[];
  selectedIntegration?: Integration;
  className?: string;
  currentFlow?: IntegrationFlow;
};

const DetailsSection: React.FC<DetailsSectionProps> = ({
  title,
  items,
  selectedIntegration,
  className,
  currentFlow,
}: DetailsSectionProps): JSX.Element => {
  return (
    <section className="flex">
      <div
        className={cn(
          "w-[30%] p-6 bg-[#D5E0ED] rounded-[12px] rounded-r-none",
          className
        )}
      >
        <p className="text-secondary-tertiary text-[26px]">{title}</p>
      </div>
      <div className="flex-1 px-10 py-6 pr-6 rounded-[12px] bg-white rounded-l-none">
        {currentFlow === "edit" ? (
          <div className="flex flex-col gap-2">
            <IntegrationForm
              currentFlow={currentFlow}
              selectedIntegration={selectedIntegration}
            />
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-[1fr_1fr] gap-x-10 gap-y-6">
              {items
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.title}>
                    <p className="text-sm text-secondary-tertiary font-medium">
                      {item.title}
                    </p>
                    <div
                      className={`${keyClasses[item.title] ? keyClasses[item.title] : "text-text-dark"} text-[16px] mt-1`}
                    >
                      {item.icon ? (
                        <img
                          src={item.icon ? item.icon : ""}
                          alt={item.title}
                          className="w-4 h-w-4 mr-2 inline"
                        />
                      ) : (
                        ""
                      )}
                      <span>{item.value}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="absolute top-0 right-0 flex items-center gap-2">
              <PenLine className="h-5 w-5 mr-1.5 text-text-tertiary" />
              <ChevronDown className="w-6 h-6 text-text-tertiary" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsSection;
