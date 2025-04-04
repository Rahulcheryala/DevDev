import React from "react";
import "./custom-checkbox.css"; // Make sure to create this CSS file with the styles provided

type CustomCheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange: any;
};
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="container">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark"></span>
    </label>
  );
};

export default CustomCheckbox;
