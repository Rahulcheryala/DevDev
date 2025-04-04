import React from "react";
import "./custom-radio.css"; // Make sure to create this CSS file with the styles provided

type CustomRadioProps = {
  label?: string;
  checked?: boolean;
  onChange: any;
  name?: string;
  id?: string;
};
const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  checked,
  onChange,
  name,
  id,
}) => {
  return (
    <label className="container" htmlFor={id}>
      {label}
      <input
        type="radio"
        checked={checked}
        name={name}
        onChange={onChange}
        id={id}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CustomRadio;
