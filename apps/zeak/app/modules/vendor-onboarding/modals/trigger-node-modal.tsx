import { XCloseIcon } from "@zeak/icons";
import { Button, ChipInput, IconButton, Input } from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaWpforms } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ClearableInput } from "~/components/Form";

// import "react-quill/dist/quill.snow.css";

type FormData = {
  emailSubject: string;
  emailContent: string;
};
interface Props {
  isModalOpen: boolean;
  setIsTriggerModalOpen: (value: boolean) => void;
}

const TriggerNodeModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [triggerKeywords, setTriggerKeywords] = useState<string[]>([
    "vendor-onboarding",
  ]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const handleClose = () => {
    props.setIsTriggerModalOpen(false);
  };

  const handleChipChange = (chips: string[]) => {
    setTriggerKeywords(chips);
  };

  return (
    <>
      {props.isModalOpen && (
        <React.Fragment>
          <div
            id="default-modal"
            aria-hidden="true"
            className={`overflow-y-auto overflow-x-hidden bg-[hsl(var(--foreground),_0.5)] fixed top-1/2 left-1/2 translate-1/2 z-50 justify-center items-center w-full md:inset-0 max-h-full ${props.isModalOpen ? "flex" : "hidden"}`}
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-sm flex justify-center items-center">
                      <FaWpforms className="text-white" />
                    </div>
                    <span className="text-accent-green text-sm font-medium ml-3">
                      Trigger Properties
                    </span>
                  </div>
                  <IconButton
                    variant="ghost"
                    aria-label="closeModal"
                    onClick={handleClose}
                    icon={<XCloseIcon />}
                  />
                </div>
                <ValidatedForm validator={[]}>
                  <div className="p-4 md:p-5 space-y-4">
                    <ChipInput
                      name="triggerKeywords"
                      label="Trigger Keywords"
                      placeholder="Enter trigger keywords here"
                      value={triggerKeywords}
                      suggestions={["vendor", "vendor-onboarding"]} // Add your suggestions here
                      onChange={(chips) => handleChipChange(chips)}
                    />
                  </div>
                </ValidatedForm>
                <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button size="lg" variant="destructive" onClick={handleClose}>
                    Cancel
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button size="lg" variant="ghost">
                      Trigger Manually
                    </Button>
                    <Button size="lg" variant="primary">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default TriggerNodeModal;
