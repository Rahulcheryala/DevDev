import { useNavigate } from "@remix-run/react";
import { Button, cn } from "@zeak/react";
import { path } from "~/utils/path";

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
  const navigate = useNavigate();

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(path.to.companySettings);
    } else {
      setActiveStep(activeStep - 1);
    }
  }

  return (
    <div className="py-4 px-12">
      <div className="flex justify-between">
        <Button
          // disabled={activeStep === 0}
          className={cn(
            " min-w-[160px] px-[24px] py-[12px] h-[56px] cursor-pointer hover:bg-[#E5EAF2] font-['Suisse Int\'l'] text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#677281]"
          )}
          variant="ghost"
          onClick={handleBack}
        >
          {/* {activeStep === 0 ? "Cancel" : "Back"} */}
          Back
        </Button>
        {activeStep !== 3 && (
          <Button
            className={cn("bg-[#0D0844] px-[24px] py-[12px] min-w-[160px] h-[56px] font-['Suisse Int\'l'] text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#FFFFFF] hover:bg-[#0D0844] hover:text-[#FFFFFF]")}
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </Button>
        )}
        {activeStep === 3 && (
          <Button
            className={cn("bg-[#0D0844] px-[24px] py-[12px] min-w-[160px] h-[56px] font-['Suisse Int\'l'] text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#FFFFFF] hover:bg-[#0D0844] hover:text-[#FFFFFF]")}
            onClick={onFinish}
          >
            Save & Create Another
          </Button>
        )}
      </div>
    </div>
  );
};
