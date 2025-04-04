import { Button } from "@zeak/react";
import type { PropsWithChildren } from "react";
import { CreationWizardItem } from "../access-settings/ui/creation-wizard";
import { getStepsList } from "./business";

export type Props = {
  id: number;
  onNextClick?: () => void;
  onBackClick?: () => void;
};

export default function NotificationLayout({
  id,
  onNextClick,
  onBackClick,
  children,
}: PropsWithChildren<Props>) {
  const steps = getStepsList(id);
  const step = steps.find((step) => step.id === id)!;
  return (
    <>
      <div className="xxxl:w-[500px] w-[360px] bg-white p-[60px] rounded-tl-md rounded-tr-md max-h-[calc(100vh_-_218px)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-y-4">
          {steps.map((step, index) => (
            <CreationWizardItem
              key={`CreationWizardItem-${index}`}
              stepItem={step}
            />
          ))}
        </div>
      </div>
      <div className="xxxl:w-[calc(100%_-_500px)] w-[calc(100%_-_360px)] bg-white rounded-tl-md rounded-tr-md flex flex-col">
        <div className="grow max-h-[calc(100vh_-_302px)] overflow-y-auto">
          <div className="flex items-center justify-between py-6 px-[60px] border-b border-stroke">
            <div className="">
              <span className="text-accent-pink text-xs mb-2">
                Step {step.id} of 4
              </span>
              <h4 className="text-xl text-accent-dark font-medium">
                {step.title}
              </h4>
            </div>
          </div>
          <div className="px-[60px] py-10">{children}</div>
        </div>
        <div className="py-4 px-[60px] flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
          <Button
            onClick={onBackClick}
            variant="ghost"
            className="px-8 py-4 h-auto text-secondary"
          >
            Back
          </Button>
          <Button
            variant="primary"
            className="px-8 py-4 h-auto rounded-sm min-w-[160px]"
            onClick={onNextClick}
            type="submit"
          >
            {id === 4 ? "Activate" : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
}
