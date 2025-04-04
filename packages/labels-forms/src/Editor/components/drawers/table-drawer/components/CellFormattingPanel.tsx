import React from "react";
import TableButton from "./TableButton";
import { TableCellPadding, TableCellSpacing } from "../../icons";

interface CellFormattingPanelProps {
  handleMergeCells: () => void;
  handleDemergeCells: () => void;
}

const CellFormattingPanel: React.FC<CellFormattingPanelProps> = ({
  handleMergeCells,
  handleDemergeCells,
}) => {
  const buttons = [
    { onClick: handleMergeCells, icon: <TableCellSpacing /> },
    { onClick: handleDemergeCells, icon: <TableCellPadding /> },
  ];

  return (
    <div className="px-[24px] pb-[20px]">
      <div className="flex flex-wrap mx-[-4px]">
        {buttons.map((button, index) => (
          <TableButton
            key={index}
            onClick={button.onClick}
            icon={button.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CellFormattingPanel;
