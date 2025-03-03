import React from "react";
import { AngleDownIcon, AngleUpIcon, MoveHorizontal } from "../../icons";
import { CellSpacing } from "../../../../types";
import { MoveVertical } from "../../icons";
import NumericInput from "../../../shared/NumericInput";

interface CellSpacingPanelProps {
  resizeCell: (value: number, direction: "height" | "width") => void;
  cellSpacing: CellSpacing;
}

const CellSpacingPanel: React.FC<CellSpacingPanelProps> = ({
  resizeCell,
  cellSpacing,
}) => {
  const spacingInputs = [
    {
      icon: <MoveVertical />,
      onChange: (value: number) => resizeCell(value, "height"),
      value: cellSpacing.cellHeight,
    },
    {
      icon: <MoveHorizontal />,
      onChange: (value: number) => resizeCell(value, "width"),
      value: cellSpacing.cellWidth,
    },
  ];

  return (
    <div className="px-[24px] pb-[20px]">
      <div className="flex mx-[-4px]">
        {spacingInputs.map((input, index) => (
          <div key={index} className="w-1/2 px-[4px] mb-[4px]">
            <NumericInput
              value={input.value}
              onChange={input.onChange}
              min={0}
              max={1000}
              iconBeforeInput={input.icon}
              incrementIcon={<AngleUpIcon />}
              decrementIcon={<AngleDownIcon />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CellSpacingPanel;
