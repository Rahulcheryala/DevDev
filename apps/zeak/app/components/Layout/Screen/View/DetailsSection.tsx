import { cn } from "@zeak/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import IntegrationForm from "~/modules/integrations/components/CreateFlow/Integration/IntegrationForm";
import { IntegrationFlow, UnifiedAction } from "~/modules/integrations/context";
import { IIntegrationModel } from "~/modules/integrations/models/integration.model";
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
  selectedIntegration?: IIntegrationModel;
  className?: string;
  currentFlow?: IntegrationFlow;
  dispatch?: React.Dispatch<UnifiedAction>;
};

const DetailsSection: React.FC<DetailsSectionProps> = ({
  title,
  items,
  selectedIntegration,
  className,
  currentFlow,
  dispatch,
}: DetailsSectionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

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
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative overflow-hidden"
              >
                <div className="grid grid-cols-[1fr_1fr] gap-x-10 gap-y-6">
                  {items.map((item) => (
                    <div key={item.title}>
                      <p className="text-sm text-secondary-tertiary font-medium">
                        {item.title}
                      </p>
                      <div
                        className={`${keyClasses[item.title] ? keyClasses[item.title] : "text-text-dark flex items-center"} text-[16px] mt-1`}
                      >
                        {item.icon && (
                          <img
                            src={
                              item.icon ? item.icon : "/images/dynamics365.png"
                            }
                            alt={item.title}
                            className="w-8 h-w-8 -ml-1.5 inline"
                          />
                        )}
                        <span className="text-accent-dark font-[500]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-0 right-0 flex items-center gap-2">
                  <button
                    className="disabled:opacity-50 disabled:cursor-default"
                    onClick={() => {
                      dispatch!({ type: "SET_INTEGRATION_FLOW", payload: "edit" });
                    }}
                    disabled={selectedIntegration?.integrationType === "System"}
                  >
                    <PenLine className="h-5 w-5 mr-1.5 text-text-tertiary" />
                  </button>
                  <button onClick={() => setIsOpen(false)}>
                    <ChevronUp
                      className="w-6 h-6 text-text-tertiary transition-transform duration-200"
                    />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <button onClick={() => setIsOpen(true)}>
                    <ChevronDown
                      className="w-6 h-6 text-text-tertiary transition-transform duration-200"
                    />
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default DetailsSection;
