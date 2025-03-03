import { cn } from "@zeak/react";
import React from "react";
import IntegrationForm from "~/modules/integrations/components/CreateFlow/IntegrationForm";
import { IntegrationFlow } from "~/modules/integrations/context";
import { Integration } from "~/modules/integrations/models/constants";

type DetailsSectionProps = {
  title: string;
  items: { title: string; value: string | number | boolean | null | React.ReactNode }[];
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
          <div className="grid grid-cols-[1fr_1fr] gap-x-10 gap-y-6">
            {items
              .filter((item) => item.value)
              .map((item) => (
                <div key={item.title}>
                  <p className="text-sm text-secondary-tertiary font-medium">
                    {item.title}
                  </p>
                  <div className="text-[16px] text-text-dark mt-1 font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsSection;
