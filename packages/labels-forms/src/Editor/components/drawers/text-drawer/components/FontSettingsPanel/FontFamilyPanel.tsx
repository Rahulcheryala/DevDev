import React, { forwardRef, RefObject } from "react";
import { Select, Space } from "antd";
import ReactQuill from "react-quill";
import { DefaultOptionType } from "antd/es/select";
import { QuillValue, TextType } from "../../../../../types";
import { DownArrowIcon } from "../../../icons";

type FontFamilyPanelProps = {
  applyFormat: (
    quillRef: RefObject<ReactQuill>,
    format: string,
    value: QuillValue,
  ) => void;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  textFormatting: TextType;
  fontOptions: DefaultOptionType[];
};

const FontFamilyPanel = forwardRef<ReactQuill, FontFamilyPanelProps>(
  (
    { applyFormat, setTextFormatting, textFormatting, fontOptions },
    quillRef,
  ) => {
    return (
      <div className="flex items-center mb-[16px]">
        <div className="w-[112px]">
          <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
            Font Family
          </p>
        </div>
        <div className="w-full ps-[8px]">
          <div className="w-full pl-7">
            <Select
              options={fontOptions as DefaultOptionType[]}
              defaultValue="Sans Serif"
              style={{ height: 40, minWidth: 136, width: "100%" }}
              onChange={(font) => {
                applyFormat(quillRef as RefObject<ReactQuill>, "font", font);
                setTextFormatting("font", font);
              }}
              value={textFormatting.font ? textFormatting.font : "Sans Serif"}
              className="ant-custom-select"
              suffixIcon={<DownArrowIcon />}
            >
              <Space className="flex justify-between">
                <div>Montserrat</div>
              </Space>
            </Select>
          </div>
        </div>
      </div>
    );
  },
);

FontFamilyPanel.displayName = "FontFamilyPanel";

export default FontFamilyPanel;
