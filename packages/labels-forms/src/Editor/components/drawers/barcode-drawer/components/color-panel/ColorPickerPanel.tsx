import React from "react";
import { EyeIcon } from "../../../icons";
import ColorPickerInput from "../text-panel/ColorPickerInput";
import NumericInput from "../../../../shared/NumericInput";

interface ColorPickerPanelProps {
  value: string;
  onChange: (hex: string) => void;
  numericValue?: number;
  onNumericChange: (value: number) => void;
  className?: string;
}

const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({
  value,
  onChange,
  numericValue = 0,
  onNumericChange,
  className,
}) => {
  return (
    <div className={`pb-[24px] ${className || "px-[20px]"}`}>
      <div className="flex">
        <div className="w-[calc(100%_-_134px)] pr-[14px]">
          <ColorPickerInput value={value} onChange={onChange} />
        </div>
        <div className="w-[134px] flex">
          <NumericInput
            value={numericValue}
            onChange={onNumericChange}
            min={0}
            max={100}
            step={1}
            className="numeric-input"
          />
          <div
            className="w-[40px] h-[40px] border border-stroke-secondary 
          rounded-[10px] flex items-center justify-center ml-[14px]"
          >
            <EyeIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerPanel;
