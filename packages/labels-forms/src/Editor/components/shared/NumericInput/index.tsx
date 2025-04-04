import React, { forwardRef } from "react";
import { AngleDownIcon, AngleUpIcon } from "../../drawers/icons";

type NumericInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  incrementIcon?: React.ReactNode;
  decrementIcon?: React.ReactNode;
  iconBeforeInput?: React.ReactNode; // New prop for an icon before the input
  className?: string; // For additional styling flexibility
};

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (
    {
      value,
      onChange,
      min = 0, // Default min value is 0
      max = 100, // Default max value is 100
      step = 1, // Default step is 1
      incrementIcon = <AngleUpIcon />, // Default increment icon
      decrementIcon = <AngleDownIcon />, // Default decrement icon
      iconBeforeInput, // Default icon before input
      className = "", // Allow for additional styles
    },
    ref,
  ) => {
    return (
      <div
        className={`relative border border-[rgb(233,_233,_238)] rounded-[10px] 
        flex items-center px-[8px] py-[8px] ${className}`}
      >
        {/* Icon before the input */}
        {iconBeforeInput && (
          <span className="w-[16px] mr-[8px]">{iconBeforeInput}</span>
        )}

        {/* Input element */}
        <input
          ref={ref} // Attach ref here, will be undefined if no ref is provided
          value={value}
          type="number"
          min={min}
          max={max}
          step={step}
          className={`w-full text-[14px] leading-[20px] outline-none 
          border-0 rounded-0 h-full px-[8px] ${
            iconBeforeInput && "border-l border-[#DCDCE0]"
          } `}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (newValue >= min && newValue <= max) {
              onChange(newValue);
            }
          }}
        />

        {/* Increment and Decrement buttons */}
        <div className="w-[16px] flex justify-center items-center flex-col">
          <button
            type="button"
            className="w-[16px] h-[12px] flex items-center justify-center"
            onClick={() => onChange(Math.min(max, value + step))}
          >
            {incrementIcon}
          </button>
          <button
            type="button"
            className="w-[16px] h-[12px] flex items-center justify-center"
            onClick={() => onChange(Math.max(min, value - step))}
          >
            {decrementIcon}
          </button>
        </div>
      </div>
    );
  },
);

NumericInput.displayName = "NumericInput";

export default NumericInput;
