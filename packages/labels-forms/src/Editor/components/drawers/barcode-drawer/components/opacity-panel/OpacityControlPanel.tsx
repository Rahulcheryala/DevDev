import React from "react";
import IconButton from "./IconButton";
import { EyeIcon } from "../../../icons";
import NumericInput from "../../../../shared/NumericInput";

type OpacityControlPanel = {
  value: number;
  onChange: (value: number) => void;
};
const OpacityControlPanel: React.FC<OpacityControlPanel> = ({
  value,
  onChange,
}) => {
  return (
    <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
      <div className="flex flex-row flex-wrap items-center">
        <p className="text-sm leading[20px] text-accent-primary font-suisseIntl mr-auto">
          Opacity
        </p>
        <NumericInput
          value={value}
          onChange={(newOpacity) => onChange(newOpacity)}
          min={0}
          max={1}
          step={0.1}
        />
        <IconButton icon={<EyeIcon />} />
      </div>
    </div>
  );
};

export default OpacityControlPanel;
