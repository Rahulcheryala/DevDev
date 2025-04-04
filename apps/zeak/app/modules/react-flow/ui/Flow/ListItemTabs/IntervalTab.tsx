import { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { z } from "zod";
import "@xyflow/react/dist/style.css";

export const IntervalTab = ({
  data,
  changeHandler,
  onBackClick,
  onNextClick,
}: any) => {
  const [radioValue, setRadioValue] = useState("perMin");
  const [customMinute, setCustomMinute] = useState("0");

  return (
    <>
      <div className="mt-[-20px]">
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
          <h3 className="text-lg text-left pb-[10px] font-medium p-8 border border-input rounded-t-[10px]">
            {radioValue !== "perHour" ? "Minutes" : "Hours"}
          </h3>

          <div className="p-4 mb-3 rounded-b-[10px] border border-input">
            <ValidatedForm validator={z.object({})}>
              <div className="[&>div>div]:border-none [&>div>div>div>button]:w-5 [&>div>div>div>button]:h-5 mb-5">
                <FormControl>
                  <RadioGroup name="minutes" orientation="vertical">
                    {[
                      { label: "Every Minute", value: "perMin" },
                      { label: "Every Even Minute", value: "evenMin" },
                      { label: "Every Odd Minute", value: "oddMin" },
                      { label: "Every 5 Minutes", value: "5min" },
                      { label: "Every 30 Minutes", value: "30min" },
                      { label: "Once Per Hour", value: "perHour" },
                      { label: "For the following minutes:", value: "custom" },
                    ].map(({ label, value }, idx) => (
                      <div
                        key={value}
                        className="flex items-center gap-2 space-x-2 border-none !p-0 !m-0 mb-1"
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

                <Input
                  disabled={radioValue !== "custom"}
                  value={customMinute}
                  onChange={(evt) => setCustomMinute((evt.target as any).value)}
                  placeholder="0"
                  name="customMin"
                  size="sm"
                />
              </div>
            </ValidatedForm>
          </div>

          <hr />
          <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
            <Button
              variant="ghost"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onNextClick}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
