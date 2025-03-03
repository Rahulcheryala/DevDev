import React from "react";
import { CheckIcon } from "@zeak/icons";
import { FaCheck } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; description: string }[];
  onStepClick?: (stepIndex: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div
              className={`relative flex flex-col items-center ${
                onStepClick ? "cursor-pointer hover:opacity-80" : ""
              }`}
              onClick={() => onStepClick?.(index)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } ${onStepClick ? "cursor-pointer hover:opacity-80" : ""}`}
                onClick={() => onStepClick?.(index)}
              >
                {index < currentStep ? (
                  <IoCheckmark className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  index < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
