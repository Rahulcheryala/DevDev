import React from "react";
import { TextType } from "../../../../types";
import { ColorPicker } from "antd";
import { colors } from "../../../../consts";
import { colorPanelConsts } from "../../../../consts/text";

type ColorPanelProps = {
  textFormatting: TextType;
  handleColor: (key: string, value: string) => void;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  addToUndo: () => void;
};

const ColorPanel: React.FC<ColorPanelProps> = ({
  textFormatting,
  handleColor,
  setTextFormatting,
  addToUndo,
}) => {
  const colorOptions = [
    {
      label: colorPanelConsts.FONT,
      value: textFormatting.color || colors.WHITE,
      format: colorPanelConsts.COLOR,
    },
    {
      label: colorPanelConsts.TEXT_BACKGROUND,
      value: textFormatting.background || colors.WHITE,
      format: colorPanelConsts.BACKGROUND,
    },
  ];

  return (
    <div className="flex flex-col items-center pb-[24px] pl-[24px] pr-[24px]">
      {colorOptions.map(({ label, value, format }, index) => (
        <div key={index} className="w-full flex items-center mb-[16px]">
          <div className="w-[112px]">
            <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
              {label}
            </p>
          </div>
          <div className="w-[calc(100%_-_112px)] ps-[8px]">
            <div className="flex">
              <div className="w-[calc(100%_-_40px)] pr-[8px]">
                <ColorPicker
                  showText
                  style={{
                    height: 40,
                    width: "100%",
                  }}
                  onChange={(_, hex) => {
                    handleColor(format, hex);
                    setTextFormatting(format, hex);
                    addToUndo();
                  }}
                  value={value}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPanel;
