import React from "react";
import { BleedAreaProps } from "../../../../types";
import { dimensionUnits } from "../../../../consts";

const Bleed: React.FC<Partial<BleedAreaProps>> = ({
  dimensions,
  bleedValue,
  onChange,
}) => {
  return (
    <>
      <div
        className={`border-stroke-secondary flex flex-row justify-between items-center mt-2`}
      >
        <div className="text-[14px] font-[400] font-suisseIntl ">
          Bleed size
        </div>
        <div className="flex flex-row space-x-2 w-[150px]">
          <div
            className="relative border border-[rgb(233,_233,_238) 
                rounded-[10px] flex items-center px-[12px] py-[8px] "
          >
            <input
              type="number"
              min={0}
              max={100}
              step={dimensions?.unit === dimensionUnits.IN ? 0.1 : 1}
              value={bleedValue}
              defaultValue={0}
              onChange={onChange}
              className="w-full text-[14px] leading[20px] outline-none 
                              border-0 rounded-0 h-full"
            />
          </div>
          <div
            className="relative border border-[rgb(233,_233,_238) 
                rounded-[10px] flex items-center px-[12px] py-[8px] w-1/2"
          >
            <input
              type="text"
              value={dimensions?.unit}
              disabled
              className="w-full text-[14px] leading[20px] outline-none 
                              border-0 rounded-0 h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bleed;
