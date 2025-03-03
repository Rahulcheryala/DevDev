import { ColorPicker, InputNumber, Select } from "antd";
import React from "react";
import { BorderWidthTypes } from "../../../icons/BorderWidthTypes";
import { SelectArrowDown } from "../../../icons/SelectArrowDown";
import { borderStyles } from "../../../../consts";

type BorderSettingsProps = {
  handleBorderColor: (value: string) => void;
  handleBorderStyle: (value: string) => void;
  handleBorderWidth: (value: number) => void;
  borderColor: string;
  borderStyle: string;
  borderWidth: number;
  strokeWidth: number;
};
const BorderSettings: React.FC<BorderSettingsProps> = ({
  borderColor,
  borderWidth,
  strokeWidth,
  borderStyle,
  handleBorderColor,
  handleBorderStyle,
  handleBorderWidth,
}) => {
  return (
    <>
      <div
        className={`flex flex-col gap-2 mb-[15px] cursor-pointer border-t pt-6 pb-4 border-[rgb(233,_233,_238)] p-[1em]`}
      >
        <p className="text-14">Border</p>
        <div className="flex gap-2 mb-[8px]">
          <ColorPicker
            value={borderColor}
            onChange={(_, hex) => handleBorderColor(hex)}
            showText
            className="w-full"
            style={{ padding: "8px 126px 8px 12px", height: 40 }}
          />
        </div>
        <div className="flex justify-between gap-2">
          <Select
            defaultValue="Line"
            style={{ height: 40, minWidth: 136, width: "100%" }}
            onChange={(e) => {
              handleBorderStyle(e);
            }}
            options={borderStyles}
            suffixIcon={<SelectArrowDown />}
            value={borderStyle}
          />
          <InputNumber
            min={0}
            step={1}
            size="large"
            keyboard
            addonBefore={<BorderWidthTypes />}
            className="w-full"
            value={borderWidth || strokeWidth}
            onChange={(value) => {
              handleBorderWidth(value as number);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BorderSettings;
