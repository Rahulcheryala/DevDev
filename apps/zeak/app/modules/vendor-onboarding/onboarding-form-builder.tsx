import { Button, Input } from "@zeak/react";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePencil } from "react-icons/hi";
import { LuZap } from "react-icons/lu";

interface Props {
  isTriggerModalOpen: boolean;
  setIsTriggerModalOpen: (value: boolean) => void;
  setModalOpenValue: (value: string) => void;
}

const OnboardingFormBuilder = (props: Props) => {
  const { isTriggerModalOpen, setIsTriggerModalOpen, setModalOpenValue } =
    props;

  const handleStartWorkflow = () => {
    setIsTriggerModalOpen(!isTriggerModalOpen);
    setModalOpenValue("onboarding-form");
  };
  return (
    <>
      <div className="">
        <div className="rounded-lg overflow-hidden shadow-6large">
          <div className="flex items-center justify-between p-3 bg-accent-lightGreen">
            <div className="flex items-center">
              <div className="bg-green-500 w-6 h-6  rounded-sm flex justify-center items-center">
                <LuZap color="#ffffff" />
              </div>
              <span className="text-accent-green text-xs font-normal uppercase ml-3">
                Onboarding page
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={handleStartWorkflow}
              className="w-6 h-6 hover:bg-accent-lightGreen p-0 rounded-full ml-3"
            >
              <HiOutlinePencil />
            </Button>
          </div>

          <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
            <Button
              variant="primary"
              className="px-7 rounded-[100px] w-full"
              size="lg"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingFormBuilder;
