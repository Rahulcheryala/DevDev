import { RxSlash } from 'react-icons/rx'
import { Check, ChevronDown } from "lucide-react"

import { cn } from "../../utils"

export interface FormStepperProps {
  breadcrumbs: string[],
  description: string,
  currentStep: number,
  steps: {
    id: number,
    title: string,
    description: string,
    isSkipped?: boolean,
    isRequired?: boolean,
    isCompleted?: boolean,
    clickable?: boolean
  }[],
  onStepClick?: (index: number) => void
}

export default function FormStepper({
  breadcrumbs,
  description,
  currentStep,
  steps,
  onStepClick
}: FormStepperProps) {
  return (
    <div className="flex flex-col items-start flex-1 shrink-0 basis-[30%]">
      <div className="bg-white space-y-2 py-[15px] px-[22px] w-full rounded-[10px] rounded-b-none">
        <ul className="grid grid-flow-col auto-cols-max gap-1 text-secondary">
          {breadcrumbs.map((breadcrumb, index) => (
            <div className="flex items-center gap-[0.5]" key={index}>
              <li>
                <span className="font-['Suisse_Int\'l'] text-[14px] font-normal leading-[22px] tracking-[0.2px] text-[#475467] flex items-center justify-center">
                  {breadcrumb}
                </span>
              </li>
              {index !== breadcrumbs.length - 1 && (
                <li>
                  <span className="font-['Suisse_Int\'l'] text-[14px] font-normal leading-[22px] tracking-[0.2px] text-[#475467] flex items-center justify-center">
                    <RxSlash />
                  </span>
                </li>
              )}
            </div>
          ))}
        </ul>
        <h1 className="font-['Suisse_Int\'l'] text-[22px] font-normal leading-[22px] tracking-[0.2px] text-[#475467] flex items-center">{description}</h1>
      </div>

      {steps.map((step, index) => (
        <div
          key={index}
          className={cn("flex flex-col w-full max-h-[210px] p-[22px] items-start rounded-[12px] transition-all bg-white", {
            "bg-[#FFDF41] rounded-t-none": currentStep === index,
            "rounded-none": currentStep !== index && step.isCompleted,
          })}
        >
          <button
            onClick={() => onStepClick?.(index)}
            className={cn(
              "flex items-center justify-between w-full",
              {
                "mb-[22px]": currentStep === index,
              }
            )}
            disabled={!step.clickable}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-[14px] font-normal leading-normal tracking-[0.5px] text-[#475467] bg-[#F1F6F9]",
                  {
                    "bg-white": currentStep === index,
                  }
                )}
              >
                {step.id}
              </div>
              {currentStep !== index && (
                <h3 className="font-['Suisse_Int\'l'] text-[16px] font-normal leading-normal tracking-[0.2px] text-[#101828] capitalize">
                  {step.title}
                </h3>
              )}
              {step.isRequired && currentStep !== index && (
                <span className="font-['Suisse_Int\'l'] text-[18px] font-semibold leading-normal tracking-[0.2px] text-[#F56B1E]">
                  *
                </span>
              )}
            </div>
            {step.isCompleted ? (
              <Check className="text-[#28CD41]" />
            ) : (
              <span className="flex items-center gap-6">
                {step.isRequired && currentStep === index && (
                  <span className="font-['Suisse_Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#F56B1E]">
                    Required
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "h-6 w-6 shrink-0 transition-transform duration-200 text-[#101828]",
                    currentStep === index && "rotate-180"
                  )}
                />
              </span>
            )}
          </button>
          {currentStep === index && (
            <div>
              <h1 className="text-[#475467] font-['Suisse_Int\'l'] text-[26px] font-normal leading-normal tracking-[0.2px] mb-2 capitalize">
                {step.title}
              </h1>
              <p className="font-['Suisse_Int\'l'] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#475467] capitalize">
                {step.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

