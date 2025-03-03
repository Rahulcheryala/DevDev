import { InputNumber } from "antd";
import React from "react";
import { BorderRadiusItem, RadiusType } from "../../../../types";

type RadiusSettingsProps = {
  handleCorners: (corner: string, radius: RadiusType) => void;
  inputArray: BorderRadiusItem[];
};

const RadiusSettings: React.FC<RadiusSettingsProps> = ({
  handleCorners,
  inputArray,
}) => {
  return (
    <>
      <div
        className={`flex flex-col w-full gap-2 mb-[15px] border-t pt-6 pb-4 border-[rgb(233,_233,_238)] p-[1em]`}
      >
        <p className="text-14">Rounding</p>
        <div className="grid grid-cols-2 gap-2">
          {inputArray.map(({ corner, icon, value }, index) => (
            <div key={index} className="flex gap-2">
              <InputNumber
                addonBefore={icon}
                value={value || 0}
                min={0}
                max={100}
                step={1}
                onChange={(value) => handleCorners(corner, value)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RadiusSettings;
