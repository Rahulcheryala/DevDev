import { useNavigate } from "@remix-run/react";
import { SaveButton, Button, cn } from "@zeak/ui";
import { path } from "~/utils/path";

export const BottomBar = ({
  activeStep,
  setActiveStep,
  onFinish,
  disabled,
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
  onFinish: (saveAndCreateAnother?: boolean) => void;
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
          className={cn(
            " min-w-[160px] px-[24px] py-[12px] h-[56px] cursor-pointer hover:bg-[#E5EAF2] font-['Suisse Int\'l'] text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#677281]",
            activeStep === 0 && "disabled:opacity-80 disabled:cursor-not-allowed"
          )}
          variant="ghost"
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== 3 && (
          <SaveButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setActiveStep(activeStep + 1);
            }}
            buttonName="Next"
          // options={["Save & Add Another", "Save As Draft"]}
          // onOptionClick={(option) => {
          //   if (option === "Save & Add Another") {
          //     handleSaveAndNew();
          //   } else if (option === "Save As Draft") {
          //     handleSaveAsDraft();
          //   }
          // }}
          />
        )}
        {activeStep === 3 && (
          <SaveButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onFinish();
            }}
            buttonName="Save & Assign Users"
            options={["Save & Create Another", "Save & Close"]}
            onOptionClick={(option) => {
              if (option === "Save & Create Another") {
                onFinish(true);
              } else if (option === "Save & Close") {
                onFinish();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
