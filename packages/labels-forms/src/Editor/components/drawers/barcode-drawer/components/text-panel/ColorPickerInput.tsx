import { ColorPicker } from "antd";
import React from "react";

type ColorPickerInputProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  value,
  onChange,
}) => (
  <ColorPicker
    showText
    style={{
      padding: "3px 8px",
      height: 40,
      width: "100%",
      borderRadius: 10,
      justifyContent: "flex-start",
    }}
    value={value}
    onChange={(_, hex) => onChange(hex)}
  />
);

export default ColorPickerInput;
