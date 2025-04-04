import React from "react";
import { AngleDownIcon, AngleUpIcon, MoveVertical } from "../../icons";
import NumericInput from "../../../shared/NumericInput";

type HeightAndMarginComponentProps = {
  height: number;
  margin: number;
  onHeightChange: (e: number) => void;
  onMarginChange: (e: number) => void;
};

const HeightAndMarginPanel: React.FC<HeightAndMarginComponentProps> = ({
  height,
  margin,
  onHeightChange,
  onMarginChange,
}) => {
  return (
    <div className="flex flex-row mx-[-8px]">
      {/* Height Input */}
      <div className="mt-[24px] px-[8px] w-full">
        <p className="text-sm leading-[20px] text-accent-primary font-suisseIntl mb-[12px] ">
          Height
        </p>
        <NumericInput
          value={height}
          onChange={onHeightChange} // Passed from props
          min={0} // Minimum height value
          incrementIcon={<AngleUpIcon />} // Increment icon
          decrementIcon={<AngleDownIcon />} // Decrement icon
          iconBeforeInput={<MoveVertical color="#19110B" />} // Icon before the input
          className="w-full" // Additional styling if needed
        />
      </div>

      {/* Margin Input */}
      <div className="mt-[24px] px-[8px] w-full">
        <p className="text-sm leading-[20px] text-accent-primary font-suisseIntl mb-[12px]">
          Margin
        </p>
        <NumericInput
          value={margin}
          onChange={onMarginChange} // Passed from props
          min={0} // Minimum margin value
          incrementIcon={<AngleUpIcon />} // Increment icon
          decrementIcon={<AngleDownIcon />} // Decrement icon
          iconBeforeInput={<MoveVertical color="#19110B" />} // Icon before the input
          className="w-full" // Additional styling if needed
        />
      </div>
    </div>
  );
};

export default HeightAndMarginPanel;
