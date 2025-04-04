import React from "react";
import { Dropdown, Space } from "antd";

type MenuDropdownProps = {
  menuRender: React.ReactNode;
  triggerDropdown: boolean;
  setTriggerDropdown: (open: boolean) => void;
  menuName: string;
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  menuRender,
  triggerDropdown,
  setTriggerDropdown,
  menuName,
}) => {
  return (
    <Dropdown
      trigger={["click"]}
      dropdownRender={() => (
        <div className="custom-dropdown-menu">
          {menuRender} {/* Render items via the menuRender prop */}
        </div>
      )}
      open={triggerDropdown}
      onOpenChange={(flag) => setTriggerDropdown(flag)}
      className="cursor-pointer"
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          setTriggerDropdown(true);
        }}
        className="min-w-[40px] h-[40px] flex items-center justify-center p-[8px] 
                     text-[14px] text-accent-primary tracking-wider leading-5 font-suisseIntl font-normal 
                     ant-dropdown-active rounded-[10px]"
      >
        <Space>{menuName}</Space>
      </div>
    </Dropdown>
  );
};

export default MenuDropdown;
