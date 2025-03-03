import React from "react";
import { Segmented } from "antd"; // Assuming you are using Ant Design for Segmented

type UnitSelectorProps = {
  unit: string;
  dimensionUnits: {
    IN: string;
    CM: string;
    PX: string;
  };
  onUnitChange?: (value: string) => void;
};

const UnitSelector: React.FC<UnitSelectorProps> = ({
  unit,
  onUnitChange,
  dimensionUnits,
}) => {
  return (
    <div className="px-[10px]">
      <div className="secondary-custom-tabs w-[157px]">
        <Segmented
          value={unit}
          onChange={onUnitChange}
          options={[dimensionUnits.IN, dimensionUnits.CM, dimensionUnits.PX]}
        />
      </div>
    </div>
  );
};

export default UnitSelector;
