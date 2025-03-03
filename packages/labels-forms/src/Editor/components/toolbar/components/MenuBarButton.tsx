import { Tooltip } from "antd";
import React from "react";

type MenuBarButtonType = {
  onClick: () => void;
  isToggled: boolean;
  icon: JSX.Element;
  tooltipText: string;
  disabled?: boolean;
};

const MenuBarButton: React.FC<MenuBarButtonType> = ({
  onClick,
  isToggled,
  icon,
  disabled = false,
  tooltipText,
}) => {
  return (
    <Tooltip placement="top" title={tooltipText}>
      <li
        onClick={!disabled ? onClick : undefined}
        className={`px-[10px] hover:bg-[#000000] hover:bg-opacity-[6%] grid place-content-center h-[30px] w-[30px] rounded-[8px] ${
          isToggled ? "bg-[#D4E4ED]" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <button disabled={disabled}>{icon}</button>
      </li>
    </Tooltip>
  );
};

export default MenuBarButton;
