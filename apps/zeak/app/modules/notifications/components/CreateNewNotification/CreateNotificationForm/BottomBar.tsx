import { Button, cn} from "@zeak/react";


export const BottomBar = ({activeStep, setActiveStep}: {activeStep: number, setActiveStep: (step: number) => void}) => {
  return (
    <div className="py-4">
      <div className="flex justify-between">
          <Button disabled={activeStep === 0} className={cn(" p-3 w-[160px] h-[56px] cursor-pointer hover:bg-gray-200")} variant="ghost" onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button className={cn("bg-[#0D0844] p-3 w-[160px] h-[56px]")} onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </div>
    </div>
  );
};
