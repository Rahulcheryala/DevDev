import React, { forwardRef, RefObject } from "react";
import { Select, InputNumber } from "antd";
import ReactQuill from "react-quill";
import { DefaultOptionType } from "antd/es/select";
import { QuillValue, TextType } from "../../../../../types";
import { DownArrowIcon, MoveVertical } from "../../../icons";
import { quillOperation } from "../../../../../consts/text";

type FontSizePanelProps = {
  fontSizeOptions: DefaultOptionType[];
  applyFormat: (
    quillRef: RefObject<ReactQuill>,
    format: string,
    value: QuillValue,
  ) => void;
  applySpacingAndFontSizeFormat: (
    quillRef: RefObject<ReactQuill>,
    format: string,
    value: QuillValue,
  ) => void;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  setCustomFontSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  textFormatting: TextType;
  customFontSizeRef: React.MutableRefObject<HTMLInputElement | null>;
};

const FontSizePanel = forwardRef<ReactQuill, FontSizePanelProps>(
  (
    {
      fontSizeOptions,
      applyFormat,
      setTextFormatting,
      setCustomFontSize,
      applySpacingAndFontSizeFormat,
      textFormatting,
      customFontSizeRef,
    },
    quillRef,
  ) => {
    const handleFontSizeChange = (fontSize: string | number) => {
      applyFormat(
        quillRef as RefObject<ReactQuill>,
        quillOperation.SIZE,
        fontSize,
      );
      setTextFormatting(quillOperation.SIZE, fontSize);
    };

    const handleCustomFontSizeChange = (fontSize: number | null) => {
      if (customFontSizeRef && customFontSizeRef.current && fontSize !== null) {
        setCustomFontSize(fontSize);
        applySpacingAndFontSizeFormat(
          quillRef as RefObject<ReactQuill>,
          quillOperation.SIZE,
          fontSize.toString() + "px",
        );
        customFontSizeRef.current.focus();
      }
    };

    return (
      <div className="flex items-center mb-[16px]">
        <div className="w-[112px]">
          <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
            Size
          </p>
        </div>
        <div className="w-full ps-[8px]">
          <div className="w-full pl-7 flex flex-row space-x-2">
            <Select
              options={fontSizeOptions}
              defaultValue="16px"
              style={{ height: 40, minWidth: 86, width: "100%" }}
              onChange={handleFontSizeChange}
              value={textFormatting.size ?? "16px"}
              className="ant-custom-select"
              suffixIcon={<DownArrowIcon />}
            />
            <InputNumber
              ref={customFontSizeRef}
              prefix={<MoveVertical />}
              type="number"
              min={0}
              max={500}
              onChange={handleCustomFontSizeChange}
              className="w-full text-[14px] leading-[20px] outline-none py-[0px] h-[40px] ps-[12px] 
              border border-[rgb(233,_233,_238)] rounded-[10px] appearance-none overflow-hidden"
            />
          </div>
        </div>
      </div>
    );
  },
);
FontSizePanel.displayName = "FontSizePanel";

export default FontSizePanel;
