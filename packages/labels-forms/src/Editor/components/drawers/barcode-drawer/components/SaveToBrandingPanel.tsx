import React from "react";
import { Button, Radio } from "antd";
import { InfoIcon } from "../../icons";

const SaveToBrandingPanel: React.FC = () => {
  return (
    <div className="py-[24px] px-[20px] border-t border-stroke-secondary">
      <div className="flex flex-row items-center space-x-1">
        <Radio />
        <div className="text-sm leading-[20px]">Reuse this Bar Code</div>
        <InfoIcon />
      </div>
      <Button
        type="text"
        shape="default"
        className="text-accent-primary border border-stroke-primary h-[36px] 
        flex items-center justify-center w-full text-sm leading-[20px]
        rounded-[10px] mt-[24px] custom-ant-button"
      >
        Save to Branding
      </Button>
    </div>
  );
};

export default SaveToBrandingPanel;
