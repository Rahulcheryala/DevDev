import React from "react";
import { Button, IconButton } from "@zeak/react";
import { XCloseIcon } from "@zeak/icons";
import { LuZap } from "react-icons/lu";
import { Link } from "@remix-run/react";

interface Props {
  isModalOpen: boolean;
  setIsTriggerModalOpen: (value: boolean) => void;
}

const FormBuilderModal = (props: Props) => {
  const handleClose = () => {
    props.setIsTriggerModalOpen(false);
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
            <div className="relative p-4 w-full max-w-4xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-sm flex justify-center items-center">
                      <LuZap className="text-white" />
                    </div>
                    <span className="text-accent-green text-sm font-medium ml-3">
                      Form Properties
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconButton
                      variant="ghost"
                      aria-label="closeModal"
                      onClick={handleClose}
                      icon={<XCloseIcon />}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-8">
                    <Link to="/x/form-builder">Go to Form Builder</Link>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button size="lg" variant="destructive" onClick={handleClose}>
                    Cancel
                  </Button>
                  <div className="flex items-center space-x-2">
                    {/* <Button size="lg" variant="secondary">
                      Test Email
                    </Button> */}
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

export default FormBuilderModal;
