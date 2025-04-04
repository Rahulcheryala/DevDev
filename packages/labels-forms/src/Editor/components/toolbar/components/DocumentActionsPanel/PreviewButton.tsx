import React from "react";
import { Space } from "antd";
import { DropdownArrow } from "../../../drawers/icons";

type PreviewButtonProps = {
  onClick: () => void;
  icon: string;
};

const PreviewButton: React.FC<PreviewButtonProps> = ({ onClick, icon }) => {
  return (
    <div className="cursor-pointer">
      <div
        onClick={onClick}
        className="w-full text-[14px] text-accent-primary tracking-wider 
        leading-5 font-suisseIntl font-normal outline-none py-[9px] px-[18px] 
        border border-[rgb(233,_233,_238)] rounded-full"
      >
        <Space>
          <img src={icon} width={"15px"} height={"15px"} />
          Preview
          <DropdownArrow />
        </Space>
      </div>
    </div>
  );
};

export default PreviewButton;
