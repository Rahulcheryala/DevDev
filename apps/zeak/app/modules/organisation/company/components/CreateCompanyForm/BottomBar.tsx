import { Button, cn } from "@zeak/react";

export const BottomBar = ({
  activeStep,
  setActiveStep,
  onFinish,
  disabled,
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
  onFinish: () => void;
  disabled: boolean;
}) => {
  return (
    <div className="py-4 2xl:px-[60px] px-10">
      <div className="flex justify-between">
        <Button
          disabled={activeStep === 0}
          className={cn(
            " p-3 w-[160px] h-[56px] cursor-pointer hover:bg-gray-200"
          )}
          variant="ghost"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>
        {activeStep !== 3 && (
          <Button
            className={cn("bg-[#0D0844] p-3 w-[160px] h-[56px]")}
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </Button>
        )}
        {activeStep === 3 && (
          <Button
            className={cn("bg-[#0D0844] p-3 w-[160px] h-[56px]")}
            onClick={onFinish}
          >
            Save & Create Another
          </Button>
        )}
      </div>
    </div>
  );
};
