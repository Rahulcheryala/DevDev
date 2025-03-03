import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  RadioGroup,
  RadioGroupItem,
} from "@zeak/react";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function AccountProfile() {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <Modal
      open={showSaveModal}
      // onOpenChange={(open) => {
      //   if (!open) onCancel();
      // }}
    >
      <ModalContent size="small" hideCloseBtn>
        <ModalBody className="p-8">
          <h4 className="font-semibold text-2xl">Address validation</h4>
          <p className="font-light text-sm text-secondary mt-1">
            The address you entered appears to be incorrect or incomplete.
            please verify your address.
          </p>
          <div className="my-6">
            <FormControl>
              <RadioGroup className="gap-4" name="address">
                <label className="relative w-full flex gap-[7px] p-4 cursor-pointer">
                  <RadioGroupItem
                    value={"value-1"}
                    className="border-stroke mt-0.5  data-[state=checked]:border-accent peer"
                    icon={
                      <IoIosCheckmarkCircle className="h-full w-[18px] absolute fill-current text-current z-10" />
                    }
                    defaultChecked
                  />
                  <span className="flex flex-col gap-2 text-sm">
                    <span className="font-medium">Use Entered Address</span>
                    <span className="max-w-[200px]">
                      Willis Tower, 233 S Wacker Dr, Chicago, IL 60606
                    </span>
                  </span>
                  <div className="peer-data-[state=checked]:bg-muted rounded-lg absolute inset-0 pointer-events-none z-[-1]"></div>
                </label>
                <label className="relative w-full flex gap-[7px] p-4 cursor-pointer">
                  <RadioGroupItem
                    value={"value-2"}
                    className="border-stroke mt-0.5  data-[state=checked]:border-accent peer"
                    icon={
                      <IoIosCheckmarkCircle className="h-full w-[18px] absolute fill-current text-current z-10" />
                    }
                  />
                  <span className="flex flex-col gap-2 text-sm">
                    <span className="font-medium">Use Suggested Address</span>
                    <span className="max-w-[200px]">
                      Hyde Park, 5301 S Hyde Park Blvd,Chicago, IL 60637
                    </span>
                  </span>
                  <div className="peer-data-[state=checked]:bg-muted rounded-lg absolute inset-0 pointer-events-none z-[-1]"></div>
                </label>
              </RadioGroup>
            </FormControl>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="rounded-[100px] font-normal bg-muted hover:bg-muted border border-stroke w-full h-[48px] p-[16px] text-base tracking-wider leading-[24px] text-accent"
              onClick={() => setShowSaveModal(false)}
            >
              Edit
            </Button>
            <Button
              className="rounded-[100px] font-normal border border-stroke w-full h-[48px] p-[16px] text-base tracking-wider leading-[24px] text-white"
              onClick={() => setShowSaveModal(false)}
            >
              Confirm
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
