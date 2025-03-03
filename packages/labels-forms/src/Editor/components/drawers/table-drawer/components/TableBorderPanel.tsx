import React from "react";
import TableButton from "./TableButton";
import {
  TableBorder,
  TableOuterBorder,
  TableInnerBorder,
  TableTopBorder,
  TableHorizontalBorder,
  TableBottomBorder,
  TableLeftBorder,
  TableVerticalBorder,
  TableRightBorder,
  ClearTableBorder,
} from "../../icons";
import { TableBorderConfig } from "../../../../utils/config";

interface TableBorderPanelProps {
  handleTableBorder: (borderType: string) => void;
  handleTableClearBorder: () => void;
}

const TableBorderPanel: React.FC<TableBorderPanelProps> = ({
  handleTableBorder,
  handleTableClearBorder,
}) => {
  const borderButtons = [
    {
      icon: <TableBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_ALL),
    },
    {
      icon: <TableOuterBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_OUTER),
    },
    {
      icon: <TableInnerBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_INNER),
    },
    {
      icon: <TableTopBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_TOP),
    },
    {
      icon: <TableHorizontalBorder />,
      action: () =>
        handleTableBorder(TableBorderConfig.BORDER_INNER_HORIZONTAL),
    },
    {
      icon: <TableBottomBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_BOTTOM),
    },
    {
      icon: <TableLeftBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_LEFT),
    },
    {
      icon: <TableVerticalBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_INNER_VERTICAL),
    },
    {
      icon: <TableRightBorder />,
      action: () => handleTableBorder(TableBorderConfig.BORDER_RIGHT),
    },
    { icon: <ClearTableBorder />, action: handleTableClearBorder },
  ];

  return (
    <div className="px-[24px] pb-[20px]">
      <div className="flex flex-wrap mx-[-4px]">
        {borderButtons.map((button, index) => (
          <TableButton key={index} onClick={button.action} icon={button.icon} />
        ))}
      </div>
    </div>
  );
};

export default TableBorderPanel;
