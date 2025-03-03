import { ColorPicker } from "antd";
import React from "react";

type FillSettingsProps = {
  fill: string;
  setColor: (value: string) => Promise<void>;
};

const FillSettings: React.FC<FillSettingsProps> = ({ fill, setColor }) => {
  return (
    <>
      <div
        className={`flex flex-col gap-2 mb-[15px] border-t pt-6 pb-4 border-[rgb(233,_233,_238)] p-[1em]`}
      >
        <p className={"text-14"}>Fill</p>
        <div className={"flex  gap-2"}>
          <ColorPicker
            value={fill}
            showText
            onChange={(_, hex) => setColor(hex)}
            className="w-full"
            style={{ padding: "8px 126px 8px 12px", height: 40 }}
          />
        </div>
      </div>
    </>
  );
};

export default FillSettings;
