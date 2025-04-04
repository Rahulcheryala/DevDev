import React from "react";
import { Radio } from "antd"; // Assuming you're using Ant Design
import { ScenaElementLayer } from "../../../../types";
import { textOperation } from "../../../../consts/text";

type AutoFitScalePanelProps = {
  isAutoFitEnabled: boolean;
  setIsAutoFitEnabled: (value: React.SetStateAction<boolean>) => void;
  isAutoScaleEnabled: boolean;
  handleAutoScale: () => void;
  addToUndo: (config?: {
    operation?: string | null;
    addedLayer?: {} | ScenaElementLayer | null;
    allLayerList?: ScenaElementLayer[] | null;
  }) => void;
};

const AutoFitScalePanel: React.FC<AutoFitScalePanelProps> = ({
  isAutoFitEnabled,
  setIsAutoFitEnabled,
  isAutoScaleEnabled,
  handleAutoScale,
  addToUndo,
}) => {
  return (
    <div className="pt-[24px] pl-[24px] pb-[0px] pr-[24px] border-[rgb(233,_233,_238)]">
      {[
        {
          label: textOperation.AUTO_FIT,
          checked: isAutoFitEnabled,
          disabled: isAutoScaleEnabled,
          onClick: () => {
            setIsAutoFitEnabled(!isAutoFitEnabled);
            addToUndo();
          },
        },
        {
          label: textOperation.AUTO_SCALE,
          checked: isAutoScaleEnabled,
          disabled: isAutoFitEnabled,
          onClick: handleAutoScale,
        },
      ].map(({ label, checked, disabled, onClick }) => (
        <div key={label} className="mb-4 flex flex-row space-x-2">
          <div>
            <Radio checked={checked} disabled={disabled} onClick={onClick} />
          </div>
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default AutoFitScalePanel;
