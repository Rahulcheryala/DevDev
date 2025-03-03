import React from "react";
import { InputNumber } from "antd";
import { RadiusInputProps } from "../../../../types";

export const RadiusInput: React.FC<RadiusInputProps> = ({
  addonBefore,
  value,
  onChange,
}) => (
  <InputNumber
    addonBefore={addonBefore}
    min={0}
    max={100}
    step={1}
    value={value}
    onChange={onChange}
  />
);
