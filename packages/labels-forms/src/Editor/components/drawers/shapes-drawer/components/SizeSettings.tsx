import React from "react";
import { InputNumber } from "antd";
import { SpacingHorizontal } from "../../../icons/SpacingHorizontal";
import { SpacingVertical } from "../../../icons/SpacingVertical";
import { Unlock } from "../../../icons/Unlock";
import { Lock } from "../../../icons/Lock";
import useUndoRedo from "../../../../hooks/useUndoRedo";
import { SizeEnums } from "../../../../utils/config";
import Moveable from "react-moveable";

type SizeSettingsProps = {
  width: number;
  height: number;
  moveableRef: React.MutableRefObject<Moveable<{}> | null>;
  keepRatio: boolean;
  handleRatio: () => void;
};

const SizeSettings: React.FC<SizeSettingsProps> = ({
  width,
  height,
  moveableRef,
  keepRatio,
  handleRatio,
}) => {
  const { addToUndo } = useUndoRedo();

  const handleSizeChange = (
    dimension: SizeEnums.Width | SizeEnums.Height,
    value: number,
  ) => {
    if (!moveableRef.current) return;

    const sizeDimension =
      dimension === SizeEnums.Width
        ? SizeEnums.OffsetWidth
        : SizeEnums.OffsetHeight;

    moveableRef.current.request(
      SizeEnums.Resizable,
      {
        keepRatio,
        [sizeDimension]: value,
      },
      true,
    );

    addToUndo();
  };

  return (
    <div className="flex flex-col gap-2 mb-[15px] border-t py-4 border-[rgb(233,_233,_238)] p-[1em]">
      <p className="text-14">Size (px)</p>
      <div className="flex justify-between gap-2">
        <InputNumber
          value={width}
          min={10}
          step={10}
          keyboard
          onChange={(value) =>
            handleSizeChange(SizeEnums.Width, value as number)
          }
          addonBefore={<SpacingHorizontal />}
          precision={2}
        />
        <InputNumber
          value={height}
          min={10}
          step={10}
          keyboard
          onChange={(value) =>
            handleSizeChange(SizeEnums.Height, value as number)
          }
          addonBefore={<SpacingVertical />}
          precision={2}
        />
        <div
          onClick={handleRatio}
          className={`${
            keepRatio ? "bg-[#F0F0F0]" : ""
          } cursor-pointer hover:bg-[#F0F0F0] rounded-[8px] p-1 px-2 border-[1px] border-[#E9E9EE]`}
        >
          {keepRatio ? <Lock className="w-4" /> : <Unlock className="w-4" />}
        </div>
      </div>
    </div>
  );
};

export default SizeSettings;
