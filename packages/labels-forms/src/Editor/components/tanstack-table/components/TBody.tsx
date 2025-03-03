import React from "react";
import { Cell } from "@tanstack/react-table";
import useTable from "../useTable";
import TCell from "./TCell";

export interface IProps {
  onRowClick: (
    cell: Cell<any, any>,
    rowIndex: number,
    colIndex: number,
  ) => void;
  activeCellIds: Array<string>;
  tableCss?: any;
  mergeRules?: any;
  cellColors?: any;
  changeCellColor?: any;
  cellSizes?: any;
  cellBorders?: {
    [key: string]: {
      top?: boolean;
      right?: boolean;
      bottom?: boolean;
      left?: boolean;
    };
  };
}

const TBody: React.FC<IProps> = ({
  onRowClick,
  cellSizes,
  activeCellIds,
  tableCss,
  mergeRules,
  cellColors,
  changeCellColor,
  cellBorders,
}) => {
  const table = useTable();

  if (!table) return null;

  // Function to check if a cell should be hidden due to merging
  const isCellHidden = (rowIndex: any, colIndex: any) => {
    // Check horizontal merges
    for (const merge of mergeRules.horizontalMerges) {
      if (
        rowIndex === merge.row &&
        colIndex > merge.startCol &&
        colIndex <= merge.endCol
      ) {
        return true;
      }
    }
    // Check vertical merges
    for (const merge of mergeRules.verticalMerges) {
      if (
        colIndex === merge.col &&
        rowIndex > merge.startRow &&
        rowIndex <= merge.endRow
      ) {
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (
    cell: Cell<any, any>,
    rowIndex: number,
    colIndex: number,
  ) => {
    onRowClick(cell, rowIndex, colIndex);
  };

  const getSpan = (rowIndex: any, colIndex: any) => {
    let colSpan = 1;
    let rowSpan = 1;
    // Determine colSpan from horizontal merges
    for (const merge of mergeRules.horizontalMerges) {
      if (rowIndex === merge.row && colIndex === merge.startCol) {
        colSpan = merge.endCol - merge.startCol + 1;
      }
    }
    // Determine rowSpan from vertical merges
    for (const merge of mergeRules.verticalMerges) {
      if (colIndex === merge.col && rowIndex === merge.startRow) {
        rowSpan = merge.endRow - merge.startRow + 1;
      }
    }
    return { colSpan, rowSpan };
  };

  return (
    <tbody>
      {table.getRowModel().rows.map((row, rowIndex) => (
        <tr
          key={row.id}
          className={`${
            rowIndex % 2 === 0 ? tableCss.primaryRowBg : tableCss.secondaryRowBg
          } border-b border-black h-auto w-auto`}
        >
          {row.getVisibleCells().map((cell, colIndex) => {
            if (isCellHidden(rowIndex, colIndex)) return null; // Skip rendering hidden cells
            const { colSpan, rowSpan } = getSpan(rowIndex, colIndex);
            const cellSize = cellSizes[cell.id] || {};
            const cellBorder = cellBorders ? cellBorders[cell.id] : undefined;
            return (
              <TCell
                key={cell.id}
                cell={cell}
                onCellClick={() => handleCellClick(cell, rowIndex, colIndex)}
                isActive={activeCellIds.includes(cell.id)}
                styles={tableCss}
                colSpan={colSpan}
                rowSpan={rowSpan}
                cellColor={cellColors ? cellColors[cell.id] : ""}
                changeCellColor={changeCellColor}
                width={cellSize.width}
                height={cellSize.height}
                cellBorder={cellBorder}
                row={row}
              />
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
