import GeneralInfoForm from "./GeneralInfoForm";
import { Button } from "@zeak/react";
import { useNotificationStore } from "~/modules/notifications/hooks";
import FrequencyEfficiencyForm from "./FrequencyEfficiency";
import TargetAudience from "./TargetAudience";
import NotificationChannels from "./NotificationChannels";
import {cn} from "@zeak/react"
import { BottomBar } from "./BottomBar";
export default function CreateNotificationForm() {
  const { setActiveStep, activeStep } = useNotificationStore();

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <GeneralInfoForm />;
      case 1:
        return <FrequencyEfficiencyForm />;
      case 2:
        return <TargetAudience />;
      case 3:
        return <NotificationChannels />;
      default:
        return null;
    }
  };

  return (
    <form className="flex relative flex-col gap-4 bg-white rounded-zeak  w-full">
      {renderStep()}
      <div className="mt-10">
        <BottomBar activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
         
    </form>
  );
}
