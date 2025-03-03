import React, { forwardRef, RefObject } from "react";
import ReactQuill from "react-quill";
import { caseValues, quillFormatConsts } from "../../../../../consts";
import { QuillValue, TextType } from "../../../../../types";
import Case from "./Case";
import { casePanelConsts } from "../../../../../consts/text";

type CasePanelProps = {
  textFormatting: TextType;
  applyFormat: (
    quillRef: RefObject<ReactQuill>,
    format: string,
    value: QuillValue,
  ) => void;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
};

const CasePanel = forwardRef<ReactQuill, CasePanelProps>(
  ({ textFormatting, applyFormat, setTextFormatting }, quillRef) => {
    // Define cases and scripts with their corresponding props
    const caseOptions = [
      {
        isSelected: textFormatting.case === caseValues.UPPER_CASE,
        content: "AG",
        format: quillFormatConsts.CASE,
        value: caseValues.UPPER_CASE,
        formattingName: casePanelConsts.CASE,
      },
      {
        isSelected: textFormatting.case === caseValues.LOWER_CASE,
        content: "ag",
        format: quillFormatConsts.CASE,
        value: caseValues.LOWER_CASE,
        formattingName: casePanelConsts.CASE,
      },
      {
        isSelected: textFormatting.script === caseValues.SUB_SCRIPT,
        content: (
          <span>
            A<sub>2</sub>
          </span>
        ),
        format: quillFormatConsts.SCRIPT,
        value: caseValues.SUB_SCRIPT,
        formattingName: casePanelConsts.SCRIPT,
      },
      {
        isSelected: textFormatting.script === caseValues.SUP_SCRIPT,
        content: (
          <span>
            A<sup>2</sup>
          </span>
        ),
        format: quillFormatConsts.SCRIPT,
        value: caseValues.SUP_SCRIPT,
        formattingName: casePanelConsts.SCRIPT,
      },
    ];

    return (
      <div className="flex flex-col items-center pb-[24px] pl-[24px] pr-[24px]">
        <div className="flex items-center mb-[16px]">
          <div className="flex flex-row justify-between space-x-4">
            {caseOptions.map(
              ({ isSelected, content, format, value, formattingName }) => (
                <Case
                  key={value}
                  isSelected={isSelected}
                  content={content}
                  onClick={() => {
                    applyFormat(
                      quillRef as RefObject<ReactQuill>,
                      format,
                      value,
                    );
                    setTextFormatting(formattingName, value);
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    );
  },
);
CasePanel.displayName = "CasePanel";

export default CasePanel;
