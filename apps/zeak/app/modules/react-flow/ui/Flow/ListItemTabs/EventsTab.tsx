import { useState } from "react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  FormControl,
  RadioGroup,
  RadioGroupItem,
  Button,
} from "@zeak/react";
import "@xyflow/react/dist/style.css";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { z } from "zod";

export const EventsTab = ({ data, changeHandler, onBackClick }: any) => {
  const [radioValue, setRadioValue] = useState("Create");
  const [dropdownValue1, setDropdownValue1] = useState("All");
  const [dropdownValue2, setDropdownValue2] = useState("CustomerV2");

  return (
    <>
      <div className="mt-[-20px]">
        <h3 className="text-sm bg-[#F18F010F] flex items-center justify-center pb-[10px] font-light mb-3">
          This trigger will fire when this event happens
        </h3>

        <div className="relative mb-5">
          <h3 className="text-sm text-left pb-[10px] font-normal">Name</h3>
          <Input
            value={data?.name}
            onChange={changeHandler}
            placeholder="Get New Customer Info"
            name="name"
            size="md"
          />
        </div>

        <div>
          <h3 className="text-sm text-left pb-[10px] font-normal">
            Event happens on
          </h3>

          <ValidatedForm validator={z.object({})}>
            <div className="[&>div>div]:flex [&>div>div]:border-none [&>div>div>div>button]:w-5 [&>div>div>div>button]:h-5 mb-5">
              <FormControl>
                <RadioGroup
                  className="border-b border-[#E9E9EE]"
                  name="rad"
                  orientation="vertical"
                >
                  {[
                    { label: "Create", value: "Create" },
                    { label: "Update", value: "Update" },
                    { label: "Delete", value: "Delete" },
                  ].map(({ label, value }, idx) => (
                    <div
                      key={value}
                      className="flex items-center space-x-2 pr-10"
                    >
                      <RadioGroupItem
                        checked={radioValue === label}
                        value={value}
                        id={`${idx}:${value}`}
                        onClick={() => setRadioValue(label)}
                      />
                      <label
                        className="cursor-pointer"
                        htmlFor={`${idx}:${value}`}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </ValidatedForm>

          <div className="flex items-center justify-between gap-5">
            <div className="flex-[1] grow">
              <h3 className="text-sm text-left pb-[10px] font-normal">
                Data entity
              </h3>

              <Select value={dropdownValue2} onValueChange={setDropdownValue2}>
                <SelectTrigger className="bg-white pl-[16px]">
                  <div className="flex flex-col text-left">
                    <span className="text-sm leading-[15px] tracking-wider text-accent text-base">
                      {dropdownValue2}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="hover:bg-[#0E77D314]"
                >
                  <SelectItem
                    value="CustomerV0"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    CustomerV0
                  </SelectItem>
                  <SelectItem
                    value="CustomerV1"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    CustomerV1
                  </SelectItem>
                  <SelectItem
                    value="CustomerV2"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    CustomerV2
                  </SelectItem>
                  <SelectItem
                    value="CustomerV3"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    CustomerV3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-[1] grow">
              <h3 className="text-sm text-left pb-[10px] font-normal">
                Data entity
              </h3>

              <Select value={dropdownValue1} onValueChange={setDropdownValue1}>
                <SelectTrigger className="bg-white pl-[16px]">
                  <div className="flex flex-col text-left">
                    <span className="text-sm leading-[15px] tracking-wider text-accent text-base">
                      {dropdownValue1}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="hover:bg-[#0E77D314]"
                >
                  <SelectItem
                    value="dataAreaId"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    dataAreaId
                  </SelectItem>
                  <SelectItem
                    value="VendorAccountNumber"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    VendorAccountNumber
                  </SelectItem>
                  <SelectItem
                    value="AddressBrazilianCNPJOrCPF"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    AddressBrazilianCNPJOrCPF
                  </SelectItem>
                  <SelectItem
                    value="VendorPortalCollaborationMethod"
                    className="!text-base py-4 hover:bg-[#0E77D314]"
                  >
                    CustomerV3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="my-3">
            <Button
              onClick={console.log}
              variant="link"
              className="text-[#0E77D3] flex items-center gap-2 !no-underline"
            >
              <span className="text-lg">+</span>
              Add condition
            </Button>
          </div>

          <hr />
          <div className="flex justif4y-between items-center pt-[20px] pb-4 px-4">
            <Button
              variant="ghost"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onBackClick}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
