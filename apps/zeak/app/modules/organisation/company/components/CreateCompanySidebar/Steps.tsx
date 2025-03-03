"use client";

import { cn } from "@zeak/react";
import { Check, ChevronDown } from "lucide-react";
import { useCompanyStore } from "../../utils/useCompanyStore";
import { stepsList } from "../constants";
interface StepperItem {
  title: string;
  content: string;
}

interface StepperProps {
  items?: StepperItem[];
}

export default function Stepper() {
  const { activeStep, setActiveStep } = useCompanyStore();

  return (
    <div className="w-full   ">
      {stepsList.map((item, index) => (
        <div
          key={index}
          className={cn(" rounded-lg transition-all bg-white p-[22px]", {
            "bg-[#FFDF41] rounded-t-none": activeStep === index,
            "rounded-none": activeStep > index,
          })}
        >
          <button
            onClick={() => setActiveStep(index)}
            className={cn(
              "flex items-center justify-between w-full  text-left ",
              {
                "mb-[22px]": activeStep === index,
              }
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium text-[#101828]",
                  {
                    "bg-white": activeStep === index,
                  }
                )}
              >
                {index + 1}
              </div>
              {activeStep !== index && (
                <h3 className="text-[#101828] font-[400] text-[16px]">
                  {item.title}
                </h3>
              )}
              {item.isRequired && activeStep !== index && (
                <span className=" text-lg font-sans font-semibold text-[#F56B1E] -ml-2">
                  *
                </span>
              )}
            </div>
            {activeStep > index ? (
              <Check className="text-[#28CD41]" />
            ) : (
              <span className="flex items-center gap-6">
                {item.isRequired && activeStep === index && (
                  <span className="text-sm font-sans font-normal text-[#F56B1E] -ml-2">
                    Required
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200 text-[#101828]",
                    activeStep === index && "rotate-180"
                  )}
                />
              </span>
            )}
          </button>
          {activeStep === index && (
            <div className="">
              <h1 className="text-[#475467] font-normal text-[26px] font-sans mb-[22px] tracking-[0.2px]">
                {item.title}
              </h1>
              <p className="text-sm font-normal font-sans text-[#475467]">
                {item.subTitle}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
