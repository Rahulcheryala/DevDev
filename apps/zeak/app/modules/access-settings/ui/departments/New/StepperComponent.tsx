import { memo } from "react";
import { StepperItem } from ".";

type StepperProps = Array<{
  id: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  label: string;
}>;
const StepperComponent = memo(({ stepsList }: { stepsList: StepperProps }) => {
  return (
    <div className="mx-auto max-w-[1240px] pb-4">
      <div className="flex items-center">
        {stepsList.map((step, index) => (
          <>
            <StepperItem
              stepItem={step}
              listLength={stepsList.length}
              index={index}
            />
          </>
        ))}
      </div>
    </div>
  );
});

StepperComponent.displayName = "StepperComponent";

export default StepperComponent;
