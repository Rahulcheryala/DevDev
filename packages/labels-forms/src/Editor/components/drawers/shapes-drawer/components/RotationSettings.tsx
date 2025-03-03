import React from "react";
import { InputNumber } from "antd";
import { Angle } from "../../../icons/Angle";
import Moveable from "react-moveable";

type RotationSettingsProps = {
  rotation: number;
  moveableRef: React.MutableRefObject<Moveable<{}> | null>;
};

const RotationSettings: React.FC<RotationSettingsProps> = ({
  rotation,
  moveableRef,
}) => {
  const handleRotationChange = (value: number) => {
    moveableRef.current!.request(
      "rotatable",
      {
        rotate: value,
      },
      true,
    );
  };

  return (
    <div className="flex gap-2 mb-[15px] border-t pt-6 pb-4 border-[rgb(233,_233,_238)] p-[1em]">
      <div className="flex flex-col gap-2 w-1/2">
        <p className="text-14">Rotation</p>
        <InputNumber
          step={1}
          value={rotation || 0}
          onChange={(value) => handleRotationChange(value as number)}
          addonBefore={<Angle />}
          precision={2}
        />
      </div>
    </div>
  );
};

export default RotationSettings;
