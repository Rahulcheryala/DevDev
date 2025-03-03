import React from "react";
import {
  AngleDownIcon,
  AngleUpIcon,
  ClearTableBorder,
  HorizontalDoubleBar,
  VerticalDoubleBar,
  TableFormateDown,
  TableFormateLeft,
  TableFormateRight,
  TableFormateUp,
} from "../../icons";
import { Direction } from "../../../../consts";
import TableButton from "./TableButton";
import { NumericInput } from "../../../shared";

interface TableFormattingPanelProps {
  resizeCell: (value: number, target: string) => void;
  handleAddRow: (position: Direction.Up | Direction.Down) => void;
  handleAddColumn: (position: Direction.Left | Direction.Right) => void;
  clearTableFormatting: () => void;
}

const actionButtons = [
  {
    onClick: "handleAddRow",
    direction: Direction.Up,
    icon: <TableFormateUp />,
    type: "row",
  },
  {
    onClick: "handleAddColumn",
    direction: Direction.Right,
    icon: <TableFormateRight />,
    type: "column",
  },
  {
    onClick: "handleAddRow",
    direction: Direction.Down,
    icon: <TableFormateDown />,
    type: "row",
  },
  {
    onClick: "handleAddColumn",
    direction: Direction.Left,
    icon: <TableFormateLeft />,
    type: "column",
  },
];

const TableFormattingPanel: React.FC<TableFormattingPanelProps> = ({
  resizeCell,
  handleAddRow,
  handleAddColumn,
  clearTableFormatting,
}) => (
  <>
    <div className="px-[24px] pb-[20px]">
      <div className="flex mx-[-4px]">
        {[
          { label: "Columns", icon: <HorizontalDoubleBar />, target: "width" },
          { label: "Rows", icon: <VerticalDoubleBar />, target: "height" },
        ].map(({ label, icon, target }) => (
          <div key={target} className="w-1/2 px-[4px]">
            <label className="text-[14px] leading-[20px] tracking-[0.5px] text-[#19110B] mb-[12px] block">
              {label}
            </label>
            <NumericInput
              value={0}
              onChange={(value) => resizeCell(value, target)}
              iconBeforeInput={icon}
              incrementIcon={<AngleUpIcon />}
              decrementIcon={<AngleDownIcon />}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="px-[24px] pb-[20px]">
      <div className="flex flex-wrap mx-[-4px]">
        {actionButtons.map(({ direction, icon, type }) => (
          <TableButton
            key={direction}
            onClick={() =>
              type === "row"
                ? handleAddRow(direction as Direction.Up | Direction.Down)
                : handleAddColumn(direction as Direction.Left | Direction.Right)
            }
            icon={icon}
          />
        ))}
        <TableButton
          onClick={clearTableFormatting}
          icon={<ClearTableBorder />}
        />
      </div>
    </div>
  </>
);

export default TableFormattingPanel;
