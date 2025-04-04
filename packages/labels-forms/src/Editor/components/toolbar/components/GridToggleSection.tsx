import React from "react";
import MenuBarButton from "./MenuBarButton";
import { DotGridIcon, NetworkIcon } from "../../drawers/icons";
import { gridTypeEnum } from "../../../consts";

type GridToggleSectionProps = {
  gridType: gridTypeEnum;
  handleGridClick: (gridType: gridTypeEnum) => void;
};

const GridToggleSection: React.FC<GridToggleSectionProps> = ({
  gridType,
  handleGridClick,
}) => {
  const gridOptions = [
    {
      type: gridTypeEnum.Gridline,
      icon: <NetworkIcon />,
    },
    {
      type: gridTypeEnum.Griddot,
      icon: <DotGridIcon />,
    },
  ];

  return (
    <ul className="gridToggle flex border mr-4 rounded-lg items-center">
      {gridOptions.map(({ type, icon }) => (
        <MenuBarButton
          key={type}
          onClick={() => handleGridClick(type)}
          isToggled={gridType === type}
          icon={icon}
        />
      ))}
    </ul>
  );
};

export default GridToggleSection;
