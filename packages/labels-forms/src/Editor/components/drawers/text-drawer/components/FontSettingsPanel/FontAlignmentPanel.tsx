import React, { forwardRef, RefObject } from "react";
import ReactQuill from "react-quill";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
} from "../../../icons";
import { TextType } from "../../../../../types";
import { alignmentType } from "../../../../../consts/text";

type FontAlignmentPanelProps = {
  applyAlignFormat: (quillRef: RefObject<ReactQuill>, type: string) => void;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  textFormatting: TextType;
};

const alignOptions = [
  {
    type: alignmentType.LEFT.toUpperCase(),
    icon: <AlignLeft />,
    format: alignmentType.LEFT,
  },
  {
    type: alignmentType.CENTER.toUpperCase(),
    icon: <AlignCenter />,
    format: alignmentType.CENTER,
  },
  {
    type: alignmentType.RIGHT.toUpperCase(),
    icon: <AlignRight />,
    format: alignmentType.RIGHT,
  },
  {
    type: alignmentType.JUSTIFY.toUpperCase(),
    icon: <AlignJustify />,
    format: alignmentType.JUSTIFY,
  },
];

const FontAlignmentPanel = forwardRef<ReactQuill, FontAlignmentPanelProps>(
  ({ applyAlignFormat, setTextFormatting, textFormatting }, quillRef) => {
    const handleAlignClick = (alignType: string) => {
      const newAlign = textFormatting.align === alignType ? "" : alignType;
      applyAlignFormat(quillRef as RefObject<ReactQuill>, alignType);
      setTextFormatting("align", newAlign);
    };

    return (
      <div className="flex items-center mb-[16px]">
        <div className="w-[112px]">
          <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
            Alignment
          </p>
        </div>
        <div className="w-[calc(100%_-_112px)] ps-[8px]">
          <div className="bg-[rgb(244,_244,_244)] p-[2px] rounded-[10px] flex">
            {alignOptions.map(({ type, icon, format }) => (
              <button
                key={type}
                onClick={() => handleAlignClick(format)}
                className={`w-1/4 py-[8px] flex items-center justify-center px-[10px] ${
                  textFormatting.align === format && "bg-[#19110B]"
                } rounded-[8px]`}
              >
                {React.cloneElement(icon, {
                  color: textFormatting.align === format ? "#fff" : undefined,
                })}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
FontAlignmentPanel.displayName = "FontAlignmentPanel";

export default FontAlignmentPanel;
