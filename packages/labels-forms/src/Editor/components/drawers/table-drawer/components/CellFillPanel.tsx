import React from "react";
import { ColorPickerPanel } from "../../barcode-drawer/components";

interface CellFillPanelProps {
  handleSetCellFill: (color: string) => void;
}

const CellFillPanel: React.FC<CellFillPanelProps> = ({ handleSetCellFill }) => {
  return (
    <div className="px-[24px] pb-[24px]">
      <div className="flex mx-[-4px]">
        {/* Doppler Button */}

        <ColorPickerPanel
          value=""
          onChange={(hex) => handleSetCellFill(hex)}
          onNumericChange={() => {}}
          className="px-0 "
        />
      </div>
    </div>
  );
};

export default CellFillPanel;
