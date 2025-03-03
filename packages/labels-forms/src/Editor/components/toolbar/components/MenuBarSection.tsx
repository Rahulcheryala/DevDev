import React from "react";
import MenuBarButton from "./MenuBarButton";

type MenuBarButtonConfig = {
  onClick: () => void;
  isToggled: boolean;
  icon: JSX.Element;
  disabled?: boolean;
  tooltip?: string;
};

type MenuBarSectionProps = {
  buttons: Array<MenuBarButtonConfig>;
  borderRight?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const MenuBarSection: React.FC<MenuBarSectionProps> = ({
  buttons,
  borderRight = true,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`px-[18px] ${
        borderRight ? "border-r border-[rgb(233,_233,_238)]" : ""
      } ${className}`}
      style={style}
    >
      <ul className="flex items-center mx-[-8px] space-x-2">
        {buttons.map((button, index) => (
          <div key={index} className="relative group">
            <MenuBarButton
              onClick={button.onClick}
              isToggled={button.isToggled}
              icon={button.icon}
              disabled={button.disabled || false}
              tooltipText={button.tooltip || "Tooltip"}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MenuBarSection;
