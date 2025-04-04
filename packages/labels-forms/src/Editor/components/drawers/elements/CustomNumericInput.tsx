import React, { useRef } from "react";
import { AngleDownIcon, AngleUpIcon } from "../icons";

type CustomNumericInputProps = {
  icon: React.ReactNode;
  onChange: (number: number) => void;
  step: number;
  min?: number;
  max?: number;
  value?: number;
  unit?: string;
  disabled?: boolean;
};

const CustomNumericInput = ({
  icon,
  onChange,
  step,
  min,
  max,
  value,
  unit,
  disabled,
}: CustomNumericInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseFloat(event.target.value));

  const handleIncrement = () => {
    if (typeof inputRef?.current?.value === "string") {
      const newValue = parseFloat(inputRef?.current?.value) + step;
      if (max !== undefined && newValue > max) return;
      onChange(parseFloat(newValue.toFixed(1)));
    }
  };

  const handleDecrement = () => {
    if (typeof inputRef?.current?.value === "string") {
      const newValue = parseFloat(inputRef?.current?.value) - step;
      if (min !== undefined && newValue < min) return;
      onChange(parseFloat(newValue.toFixed(1)));
    }
  };

  return (
    <div className=" px-[8px]">
      <div
        className="relative border border-[rgb(233,233,238)] 
                rounded-[10px] flex items-center px-[12px] py-[8px]"
      >
        <span className="w-[16px] mr-[8px] text-[#8A8A8F]">{icon}</span>
        <input
          type="number"
          className="w-full text-[14px] leading-[20px]
            outline-none px-[8px] border-0 rounded-0 h-full border-l border-[#DCDCE0]"
          {...(min !== undefined && { min })}
          {...(max !== undefined && { max })}
          {...(value !== undefined && { value })}
          step={step || 1}
          onChange={handleChange}
          disabled={!!disabled}
          ref={inputRef}
        />
        <div className="absolute right-[35px]">{unit}</div>
        {/* eslint-disable-next-line max-len */}
        <div className="w-[16px] flex justify-center items-center flex-col">
          <button
            type="button"
            className={`w-[16px] h-[12px] flex items-center justify-center`}
            onClick={handleIncrement}
          >
            <AngleUpIcon />
          </button>
          <button
            type="button"
            className={`w-[16px] h-[12px] flex items-center justify-center`}
            onClick={handleDecrement}
          >
            <AngleDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomNumericInput;
