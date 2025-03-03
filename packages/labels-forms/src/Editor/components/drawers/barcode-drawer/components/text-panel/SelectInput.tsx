import React from "react";
import { Select, Space } from "antd";
import { DownArrowIcon } from "../../../icons";

type SelectInputProps = {
  options: any;
  defaultValue: string;
  onChange: (value: string) => void;
  value?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  defaultValue,
  onChange,
  value,
}) => (
  <Select
    options={options}
    defaultValue={defaultValue}
    style={{ height: 40, width: "100%" }}
    onChange={onChange}
    value={value}
    className="ant-custom-select"
    suffixIcon={<DownArrowIcon />}
  >
    <Space className="flex justify-between">
      <div>{defaultValue}</div>
    </Space>
  </Select>
);

export default SelectInput;
