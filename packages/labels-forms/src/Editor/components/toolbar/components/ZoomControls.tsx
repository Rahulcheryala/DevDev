import React from "react";
import { Minus, PlusIcon } from "../../drawers/icons";

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoomValue?: string;
};

const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomValue,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div className="px-[10px]">
      <div className="w-[100px]">
        <div className="flex items-center py-[3px] px-[8px] border border-[rgb(220,_220,_224)] rounded-[8px]">
          <button onClick={onZoomOut} className="pr-[2px]">
            <Minus />
          </button>
          <input
            type="text"
            className="outline-none w-full border-l border-r border-[rgb(220,_220,_224)] 
            px-[4px] text-center text-[12px] leading-[20px] font-medium"
            value={zoomValue}
            readOnly
          />
          <button onClick={onZoomIn} className="pl-[2px]">
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomControls;
