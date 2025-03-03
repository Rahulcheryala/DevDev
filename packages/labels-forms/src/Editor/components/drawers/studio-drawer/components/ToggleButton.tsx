import { Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";
import React, { FC } from "react";

type ToggleButtonProps = {
  onChange: SwitchChangeEventHandler | undefined;
  children: React.ReactNode;
  value: boolean;
};

const ToggleButton: FC<ToggleButtonProps> = ({ onChange, children, value }) => (
  <div
    className={`border-stroke-secondary  flex flex-row justify-between items-center`}
  >
    <div className="text-[14px] font-[400] font-suisseIntl ">{children}</div>
    <div>
      <Switch value={value} onChange={onChange} />
    </div>
  </div>
);

export default ToggleButton;
