import React, { forwardRef, ForwardedRef } from "react";
import { MoveHorizontal, Rotational } from "../../icons";
import { NumericInput } from "../../../shared";
import { lineConsts } from "../../../../consts";
import useUndoRedo from "../../../../hooks/useUndoRedo";
import { DefaultLineValues } from "../../../../types";
import Moveable from "react-moveable";

// Ensure valueKey is keyof DefaultLineValues
const inputFields: Array<{
  label: string;
  icon: JSX.Element;
  valueKey: keyof DefaultLineValues;

  handleValueChange: (
    value: number,
    handleLineValues: (key: string, value: number | string) => void,
    rRef: ForwardedRef<HTMLInputElement> | undefined, // Update to ForwardedRef
    moveableRef: React.MutableRefObject<Moveable<{}> | null>,
    addToUndo: () => void,
  ) => void;
  min?: number;
  max?: number;
  step?: number;
}> = [
  {
    label: "Size",
    icon: <MoveHorizontal />,
    valueKey: "width",
    min: 0,
    step: 1,
    handleValueChange: (
      value: number,
      handleLineValues: (key: string, value: number | string) => void,
      rRef: ForwardedRef<HTMLInputElement> | undefined,
      moveableRef: React.MutableRefObject<Moveable<{}> | null>,
      addToUndo: () => void,
    ) => {
      handleLineValues(lineConsts.WIDTH, value);

      // Add moveable request for resizing
      moveableRef.current?.request(
        "resizable",
        { offsetWidth: value as number, offsetHeight: 11 },
        true,
      );

      addToUndo();
    },
  },
  {
    label: "Rotation",
    icon: <Rotational />,
    valueKey: "rotation",
    min: 0,
    max: 360,
    step: 1,
    handleValueChange: (
      value: number,
      handleLineValues: (key: string, value: number | string) => void,
      rRef: ForwardedRef<HTMLInputElement> | undefined,
      moveableRef: React.MutableRefObject<Moveable<{}> | null>,
      addToUndo: () => void,
    ) => {
      if (value && value < 0) {
        value = 359;
      }
      if (rRef && "current" in rRef && rRef.current) {
        rRef.current.focus();
      }
      moveableRef.current?.request("rotatable", { rotate: value }, true);
      addToUndo();
      handleLineValues(lineConsts.ROTATION, value);
    },
  },
];

type LineInputProps = {
  lineValues: DefaultLineValues;
  handleLineValues: (key: string, value: number | string) => void;
  moveableRef: React.MutableRefObject<Moveable<{}> | null>;
};

const LineInputPanel = forwardRef<HTMLInputElement, LineInputProps>(
  ({ lineValues, handleLineValues, moveableRef }, rRef) => {
    const { addToUndo } = useUndoRedo();

    return (
      <div className="flex flex-row w-full space-x-4 px-[20px] mb-4">
        {inputFields.map((field, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <span>{field.label}</span>
            <div>
              <NumericInput
                ref={field.valueKey === "rotation" ? rRef : undefined}
                iconBeforeInput={field.icon}
                value={parseFloat(lineValues[field.valueKey].toString())}
                onChange={(value) =>
                  field.handleValueChange(
                    value,
                    handleLineValues,
                    field.valueKey === "rotation" ? rRef : undefined, // Pass ForwardedRef
                    moveableRef,
                    addToUndo,
                  )
                }
                min={field?.min || 0}
                max={field?.max || 10000}
                step={field?.step || 1}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
);

LineInputPanel.displayName = "LineInputPanel";

export default LineInputPanel;
