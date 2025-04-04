import React from "react";
import { Radio } from "antd";
import { InfoIcon } from "../../icons";

const BarcodeSequencingPanel: React.FC = () => {
  return (
    <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
      <div className="flex flex-row items-center space-x-1">
        <Radio />
        <div className="text-sm leading-[20px]">Barcode sequencing</div>
        <InfoIcon />
      </div>
    </div>
  );
};

export default BarcodeSequencingPanel;
