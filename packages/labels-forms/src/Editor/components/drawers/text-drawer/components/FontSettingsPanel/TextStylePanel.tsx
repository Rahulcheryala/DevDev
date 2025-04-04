import React, { forwardRef, RefObject } from "react";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import { QuillValue, TextType } from "../../../../../types";
import { textFormattingOptions } from "../../../../../consts/text";

type TextStylePanelProps = {
  applyFormat: (
    quillRef: RefObject<ReactQuill>,
    format: string,
    value: QuillValue,
  ) => void;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  textFormatting: TextType;
};

const TextStylePanel = forwardRef<ReactQuill, TextStylePanelProps>(
  ({ applyFormat, setTextFormatting, textFormatting }, quillRef) => {
    const styleOptions = [
      {
        format: textFormattingOptions.BOLD,
        icon: <BoldOutlined />,
        active: textFormatting.bold,
      },
      {
        format: textFormattingOptions.ITALIC,
        icon: <ItalicOutlined />,
        active: textFormatting.italic,
      },
      {
        format: textFormattingOptions.UNDERLINE,
        icon: <UnderlineOutlined />,
        active: textFormatting.underline,
      },
      {
        format: textFormattingOptions.STRIKE,
        icon: <StrikethroughOutlined />,
        active: textFormatting.strike,
      },
    ];

    const handleStyleClick = (format: string, isActive: boolean) => {
      applyFormat(quillRef as RefObject<ReactQuill>, format, !isActive);
      setTextFormatting(format, !isActive);
    };

    return (
      <div className="flex items-center">
        <div className="w-[112px]">
          <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
            Style
          </p>
        </div>
        <div className="w-[calc(100%_-_112px)] ps-[8px]">
          <div className="bg-[rgb(244,_244,_244)] p-[2px] rounded-[10px] flex space-x-2">
            {styleOptions.map(({ format, icon, active }) => (
              <button
                key={format}
                onClick={() => handleStyleClick(format, active)}
                className={`w-[33.33%] flex items-center justify-center py-[10px] px-[10px] ${
                  active && "bg-[#19110B] text-white"
                } rounded-[8px]`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

TextStylePanel.displayName = "TextStylePanel";

export default TextStylePanel;
