import React, {
  forwardRef,
  RefObject,
  MutableRefObject,
  useImperativeHandle,
} from "react";
import ReactQuill from "react-quill";
import { QuillValue, TextType } from "../../../../types";
import { MoveHorizontal, MoveVertical, Rotational } from "../../icons";
import InputNumber from "antd/es/input-number"; // Assuming you're using Ant Design InputNumber
import Moveable from "react-moveable";
import { spacingConsts } from "../../../../consts/text";

interface SpacingPanelProps {
  textFormatting: TextType;
  rotation: number;
  setTextFormatting: (name: string, value: string | number | boolean) => void;
  applySpacingAndFontSizeFormat: (
    quillRef: RefObject<ReactQuill>,
    format: string,
    value: QuillValue,
  ) => void;
  addToUndo: (config?: { operation?: string | null }) => void;
  moveableRef: MutableRefObject<Moveable | null>;
  quillRef: RefObject<ReactQuill>;
}

const SpacingPanel = forwardRef<
  {
    lineSpacingRef: HTMLInputElement | null;
    letterSpacingRef: HTMLInputElement | null;
    rRef: HTMLInputElement | null;
  },
  SpacingPanelProps
>(
  (
    {
      textFormatting,
      rotation,
      setTextFormatting,
      applySpacingAndFontSizeFormat,
      addToUndo,
      moveableRef,
      quillRef,
    },
    ref,
  ) => {
    const lineSpacingRef = React.useRef<HTMLInputElement | null>(null);
    const letterSpacingRef = React.useRef<HTMLInputElement | null>(null);
    const rRef = React.useRef<HTMLInputElement | null>(null);

    // Use `useImperativeHandle` to expose the refs to the parent
    useImperativeHandle(ref, () => ({
      lineSpacingRef: lineSpacingRef.current,
      letterSpacingRef: letterSpacingRef.current,
      rRef: rRef.current,
    }));

    // Config for spacing input fields
    const spacingOptions = [
      {
        label: spacingConsts.VERTICAL,
        ref: lineSpacingRef,
        icon: MoveVertical,
        value: textFormatting.lineSpacing || 0,
        format: spacingConsts.LINE_SPACING,
        onChange: (value: number | null) => {
          applySpacingAndFontSizeFormat(
            quillRef as RefObject<ReactQuill>,
            spacingConsts.LINE_SPACING,
            `${value ? value + 16 : 0}px`,
          );
          setTextFormatting(spacingConsts.LINE_SPACING, value || 0);
          lineSpacingRef.current?.focus();
        },
      },
      {
        label: spacingConsts.HORIZONTAL,
        ref: letterSpacingRef,
        icon: MoveHorizontal,
        value: textFormatting.letterSpacing || 0,
        format: spacingConsts.LETTER_SPACING,
        onChange: (value: number | null) => {
          applySpacingAndFontSizeFormat(
            quillRef as RefObject<ReactQuill>,
            spacingConsts.LETTER_SPACING,
            `${value}px`,
          );
          setTextFormatting(spacingConsts.LETTER_SPACING, value || 0);
          letterSpacingRef.current?.focus();
        },
      },
      {
        label: "Rotation",
        ref: rRef,
        icon: Rotational,
        value: rotation || 0,
        format: "rotation",
        onChange: (value: number | null) => {
          if (value && value < 0) {
            value = 359;
          }
          rRef.current?.focus();
          moveableRef.current!.request(
            "rotatable",
            { rotate: value || 0 },
            true,
          );
          addToUndo();
        },
      },
    ];

    return (
      <div className="flex flex-col items-center pb-[24px] pl-[24px] pr-[24px]">
        {spacingOptions.map(
          ({ label, ref, icon: Icon, value, onChange }, index) => (
            <div key={index} className="flex items-center mb-[16px]">
              <div className="w-[112px]">
                <p className="text-[14px] text-[rgb(138,_138,_143)] leading-[20px]">
                  {label}
                </p>
              </div>
              <div className="w-[calc(100%_-_112px)] ps-[8px]">
                <div className="relative">
                  <InputNumber
                    ref={ref}
                    prefix={<Icon />}
                    type="number"
                    value={value}
                    onChange={onChange}
                    min={0}
                    max={500}
                    className="w-full text-[14px] leading-[20px] outline-none py-[0px] h-[40px] ps-[12px] 
                  border border-[rgb(233,_233,_238)] rounded-[10px] appearance-none overflow-hidden"
                  />
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    );
  },
);

SpacingPanel.displayName = "SpacingPanel";

export default SpacingPanel;
