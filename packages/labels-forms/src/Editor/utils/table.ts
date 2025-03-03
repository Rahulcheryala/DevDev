import { Cell, ColumnDef } from "@tanstack/react-table";
import { ActiveCell, DataRow, ICellBorder, MergeRules } from "../types";
import { TableBorderConfig } from "./config";

export const getColumnRef = (obj: Record<string, any>, columnId: string) => {
  if (!obj || !columnId) return null;

  const refPropertyName = `${columnId}Ref`;

  return obj[refPropertyName] ?? null;
};

export const changeCellColor = (
  cellId: string,
  color: string,
  setCellColors: (
    value: React.SetStateAction<{
      [key: string]: string;
    }>,
  ) => void,
) => {
  setCellColors((prevColors) => ({
    ...prevColors,
    [cellId]: color,
  }));
};

export const demergeCells = (
  activeCellIds: Array<ActiveCell>,
  setMergeRules: (value: React.SetStateAction<MergeRules>) => void,
  setActiveCellIds: (value: React.SetStateAction<ActiveCell[]>) => void,
) => {
  if (activeCellIds.length === 0) {
    return;
  }

  const rows = activeCellIds.map((id) => id.rowIndex);
  const cols = activeCellIds.map((id) => id.colIndex);

  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);

  setMergeRules((prev: any) => ({
    ...prev,
    horizontalMerges: prev.horizontalMerges.filter(
      (merge: any) =>
        !(
          merge.row >= minRow &&
          merge.row <= maxRow &&
          merge.startCol <= minCol &&
          merge.endCol >= maxCol
        ),
    ),
    verticalMerges: prev.verticalMerges.filter(
      (merge: any) =>
        !(
          merge.col >= minCol &&
          merge.col <= maxCol &&
          merge.startRow <= minRow &&
          merge.endRow >= maxRow
        ),
    ),
  }));

  setActiveCellIds([]);
};

export const resizeCell = (
  cellId: any,
  width: any,
  height: any,
  setCellSizes: (
    value: React.SetStateAction<{
      [key: string]: {
        width: number;
        height: number;
      };
    }>,
  ) => void,
) => {
  setCellSizes((prevSizes: any) => {
    const prevSize = prevSizes[cellId] || {};
    return {
      ...prevSizes,
      [cellId]: {
        width: !width ? prevSize.width : width,
        height: !height ? prevSize.height : height,
      },
    };
  });
};

export const addRow = (
  position: string,
  activeCellIds: ActiveCell[],
  setRowsDetails: (value: React.SetStateAction<DataRow[]>) => void,
) => {
  const selectedRowIdx = parseInt(activeCellIds[0].cellId.split("")[0]);
  setRowsDetails((currentRows) => {
    const newData = [...currentRows];
    const newRow: DataRow = { col1: "", col2: "" };
    const insertIndex = position === "up" ? selectedRowIdx : selectedRowIdx + 1;

    // Insert the new row at the determined position
    newData.splice(insertIndex, 0, newRow);
    return newData;
  });
};

export const applyBorderPropertiesToSelectedCells = (
  cellBorders: ICellBorder,
  activeCellIds: ActiveCell[],
  setCellBorders: (value: React.SetStateAction<ICellBorder>) => void,
  borderColor?: string,
  borderThickness?: string,
  borderOpacity?: number,
  borderStyle?: string,
) => {
  const newCellBorders = { ...cellBorders };

  activeCellIds.forEach((cellDetail: any) => {
    const cellId = cellDetail.cellId;
    if (newCellBorders[cellId]) {
      if (newCellBorders[cellId].top) {
        newCellBorders[cellId].borderColor =
          borderColor || newCellBorders[cellId].borderColor;
        newCellBorders[cellId].borderThickness =
          borderThickness || newCellBorders[cellId].borderThickness;
        newCellBorders[cellId].borderOpacity =
          borderOpacity !== undefined
            ? borderOpacity
            : newCellBorders[cellId].borderOpacity;
        newCellBorders[cellId].borderStyle =
          borderStyle || newCellBorders[cellId].borderStyle;
      }
      if (newCellBorders[cellId].right) {
        newCellBorders[cellId].borderColor =
          borderColor || newCellBorders[cellId].borderColor;
        newCellBorders[cellId].borderThickness =
          borderThickness || newCellBorders[cellId].borderThickness;
        newCellBorders[cellId].borderOpacity =
          borderOpacity !== undefined
            ? borderOpacity
            : newCellBorders[cellId].borderOpacity;
        newCellBorders[cellId].borderStyle =
          borderStyle || newCellBorders[cellId].borderStyle;
      }
      if (newCellBorders[cellId].bottom) {
        newCellBorders[cellId].borderColor =
          borderColor || newCellBorders[cellId].borderColor;
        newCellBorders[cellId].borderThickness =
          borderThickness || newCellBorders[cellId].borderThickness;
        newCellBorders[cellId].borderOpacity =
          borderOpacity !== undefined
            ? borderOpacity
            : newCellBorders[cellId].borderOpacity;
        newCellBorders[cellId].borderStyle =
          borderStyle || newCellBorders[cellId].borderStyle;
      }
      if (newCellBorders[cellId].left) {
        newCellBorders[cellId].borderColor =
          borderColor || newCellBorders[cellId].borderColor;
        newCellBorders[cellId].borderThickness =
          borderThickness || newCellBorders[cellId].borderThickness;
        newCellBorders[cellId].borderOpacity =
          borderOpacity !== undefined
            ? borderOpacity
            : newCellBorders[cellId].borderOpacity;
        newCellBorders[cellId].borderStyle =
          borderStyle || newCellBorders[cellId].borderStyle;
      }
    }
  });
  setCellBorders(newCellBorders);

  // Log the border property application (you can remove this in production)
};

// Define separate functions for each border type application
const applyTopBorder = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  minRow: number,
) => {
  if (cellDetail.rowIndex === minRow)
    newCellBorders[cellDetail.cellId].top = true;
};

const applyRightBorder = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  maxCol: number,
) => {
  if (cellDetail.colIndex === maxCol)
    newCellBorders[cellDetail.cellId].right = true;
};

const applyBottomBorder = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  maxRow: number,
) => {
  if (cellDetail.rowIndex === maxRow)
    newCellBorders[cellDetail.cellId].bottom = true;
};

const applyLeftBorder = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  minCol: number,
) => {
  if (cellDetail.colIndex === minCol)
    newCellBorders[cellDetail.cellId].left = true;
};

const applyAllBorders = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
) => {
  newCellBorders[cellDetail.cellId] = {
    top: true,
    right: true,
    bottom: true,
    left: true,
  };
};

const applyOuterBorders = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  minRow: number,
  maxRow: number,
  minCol: number,
  maxCol: number,
) => {
  if (cellDetail.rowIndex === minRow)
    newCellBorders[cellDetail.cellId].top = true;
  if (cellDetail.rowIndex === maxRow)
    newCellBorders[cellDetail.cellId].bottom = true;
  if (cellDetail.colIndex === minCol)
    newCellBorders[cellDetail.cellId].left = true;
  if (cellDetail.colIndex === maxCol)
    newCellBorders[cellDetail.cellId].right = true;
};

const applyInnerBorders = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  minRow: number,
  maxRow: number,
  minCol: number,
  maxCol: number,
) => {
  if (cellDetail.rowIndex !== minRow)
    newCellBorders[cellDetail.cellId].top = true;
  if (cellDetail.rowIndex !== maxRow)
    newCellBorders[cellDetail.cellId].bottom = true;
  if (cellDetail.colIndex !== minCol)
    newCellBorders[cellDetail.cellId].left = true;
  if (cellDetail.colIndex !== maxCol)
    newCellBorders[cellDetail.cellId].right = true;
};

const applyInnerVerticalBorders = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  maxCol: number,
) => {
  if (cellDetail.colIndex !== maxCol)
    newCellBorders[cellDetail.cellId].right = true;
};

const applyInnerHorizontalBorders = (
  cellDetail: ActiveCell,
  newCellBorders: ICellBorder,
  maxRow: number,
) => {
  if (cellDetail.rowIndex !== maxRow)
    newCellBorders[cellDetail.cellId].bottom = true;
};

// Define a map for border type functions
const borderFunctions = {
  [TableBorderConfig.BORDER_TOP]: applyTopBorder,
  [TableBorderConfig.BORDER_RIGHT]: applyRightBorder,
  [TableBorderConfig.BORDER_BOTTOM]: applyBottomBorder,
  [TableBorderConfig.BORDER_LEFT]: applyLeftBorder,
  [TableBorderConfig.BORDER_ALL]: applyAllBorders,
  [TableBorderConfig.BORDER_OUTER]: applyOuterBorders,
  [TableBorderConfig.BORDER_INNER]: applyInnerBorders,
  [TableBorderConfig.BORDER_INNER_VERTICAL]: applyInnerVerticalBorders,
  [TableBorderConfig.BORDER_INNER_HORIZONTAL]: applyInnerHorizontalBorders,
};

export const applyBorderToSelectedCells = (
  cellBorders: ICellBorder,
  activeCellIds: ActiveCell[],
  setCellBorders: (value: React.SetStateAction<ICellBorder>) => void,
  borderType: string,
) => {
  const newCellBorders = { ...cellBorders };

  // Find the min and max row and column indices
  const minRow = Math.min(...activeCellIds.map((cell) => cell.rowIndex));
  const maxRow = Math.max(...activeCellIds.map((cell) => cell.rowIndex));
  const minCol = Math.min(...activeCellIds.map((cell) => cell.colIndex));
  const maxCol = Math.max(...activeCellIds.map((cell) => cell.colIndex));

  activeCellIds.forEach((cellDetail: ActiveCell) => {
    const cellId = cellDetail.cellId;
    newCellBorders[cellId] = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };

    // Apply the border function based on borderType
    const applyBorder = borderFunctions[borderType];
    if (applyBorder) {
      applyBorder(cellDetail, newCellBorders, minRow, maxRow, minCol, maxCol);
    }
  });

  setCellBorders(newCellBorders);
};

export const mergeCells = (
  activeCellIds: ActiveCell[],
  mergeRules: any,
  setActiveCellIds: (value: React.SetStateAction<ActiveCell[]>) => void,
  setMergeRules: (value: React.SetStateAction<any>) => void,
) => {
  if (activeCellIds.length === 0) {
    return;
  }

  const rows = activeCellIds.map((id) => id.rowIndex);
  const cols = activeCellIds.map((id) => id.colIndex);

  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);

  // Check if all selected cells form a rectangular block
  const isRectangular = activeCellIds.every(
    (id) =>
      id.rowIndex >= minRow &&
      id.rowIndex <= maxRow &&
      id.colIndex >= minCol &&
      id.colIndex <= maxCol,
  );

  if (!isRectangular) {
    throw new Error(
      "Selected cells cannot be merged. Please select a rectangular block of cells.",
    );
  }

  // Create a copy of the current merge rules
  const newMergeRules = { ...mergeRules };

  // Add horizontal merges for each row in the selection
  for (let row = minRow; row <= maxRow; row++) {
    const newHorizontalMerge = { row, startCol: minCol, endCol: maxCol };
    newMergeRules.horizontalMerges = [
      ...newMergeRules.horizontalMerges,
      newHorizontalMerge,
    ];
  }

  // Add vertical merges for each column in the selection
  for (let col = minCol; col <= maxCol; col++) {
    const newVerticalMerge = { col, startRow: minRow, endRow: maxRow };
    newMergeRules.verticalMerges = [
      ...newMergeRules.verticalMerges,
      newVerticalMerge,
    ];
  }

  // Update the state with the new merge rules
  setMergeRules(newMergeRules);

  // Clear the active cell IDs
  setActiveCellIds([]);
};

export const handleRowClick = (
  cell: Cell<any, any>,
  rowIndex: number,
  colIndex: number,
  activeCellIds: ActiveCell[],
  setActiveCellIds: (value: React.SetStateAction<ActiveCell[]>) => void,
  selectedRowIdxRef: React.MutableRefObject<number[]>,
  selectedColKeyRef: React.MutableRefObject<string[]>,
  isCommandPressed: boolean,
) => {
  let newActiveCellIds;

  if (isCommandPressed) {
    // If command is pressed, toggle the clicked cell's selection
    if (activeCellIds.some((detail) => detail.cellId === cell.id)) {
      // If the cell is already selected, remove it (toggle off)
      newActiveCellIds = activeCellIds.filter(
        (detail) => detail.cellId !== cell.id,
      );
      selectedRowIdxRef.current = selectedRowIdxRef.current.filter(
        (idx) => idx !== cell.row.index,
      );
      selectedColKeyRef.current = selectedColKeyRef.current.filter(
        (id) => id !== cell.column.id,
      );
    } else {
      // If the cell is not selected, add it
      newActiveCellIds = [
        ...activeCellIds,
        {
          cellId: cell.id,
          rowIdx: cell.row.index,
          columnId: cell.column.id,
          rowIndex,
          colIndex,
          quillRef: (cell as any)?.metaData?.quillRef || {},
        },
      ];
      selectedRowIdxRef.current.push(Number(cell.row.index));
      selectedColKeyRef.current.push(cell.column.id);
    }
  } else {
    // If command is not pressed, select only the clicked cell and prevent toggling the same cell off
    if (!activeCellIds.some((detail) => detail.cellId === cell.id)) {
      // If the clicked cell is not already selected, select it
      newActiveCellIds = [
        {
          cellId: cell.id,
          rowIdx: cell.row.index,
          columnId: cell.column.id,
          rowIndex,
          colIndex,
          quillRef: (cell as any)?.metaData?.quillRef || {},
        },
      ];
      selectedRowIdxRef.current = [Number(cell.row.index)];
      selectedColKeyRef.current = [cell.column.id];
    } else {
      // If the cell is already selected, keep it selected (no action)
      newActiveCellIds = activeCellIds;
    }
  }

  setActiveCellIds(newActiveCellIds);
};

export const deleteColumns = (
  selectedColKeyRef: React.MutableRefObject<string[]>,
  setActiveCellIds: (value: React.SetStateAction<ActiveCell[]>) => void,
  setIsColsDeleted: (value: React.SetStateAction<boolean>) => void,
  setColsDetails: (
    value: React.SetStateAction<ColumnDef<DataRow, any>[]>,
  ) => void,
) => {
  setColsDetails((currentCols) => {
    if (
      currentCols?.length >= 1 ||
      currentCols?.length - selectedColKeyRef.current.length >= 1
    ) {
      const list = !selectedColKeyRef.current.length
        ? currentCols
        : currentCols.filter((c) => {
            return !selectedColKeyRef.current.includes(c.id as string);
          });
      setActiveCellIds((activeCellIds) => {
        setIsColsDeleted(true);
        return activeCellIds.filter(
          (detail) => !selectedColKeyRef.current.includes(detail.columnId),
        );
      });
      return list;
    }
    return currentCols;
  });
};

export const deleteRow = (
  selectedRowIdxRef: React.MutableRefObject<number[]>,
  setActiveCellIds: (value: React.SetStateAction<ActiveCell[]>) => void,
  setIsRowsDeleted: (value: React.SetStateAction<boolean>) => void,
  setRowsDetails: (value: React.SetStateAction<DataRow[]>) => void,
) => {
  setRowsDetails((currentRows) => {
    if (
      currentRows?.length >= 1 ||
      currentRows?.length - selectedRowIdxRef.current.length >= 1
    ) {
      const list = !selectedRowIdxRef.current?.length
        ? currentRows
        : currentRows.filter((r, i) => {
            return !selectedRowIdxRef.current.includes(i);
          });

      setActiveCellIds((activeCellIds) => {
        setIsRowsDeleted(true);
        return activeCellIds.filter(
          (detail) => !selectedRowIdxRef.current.includes(detail.rowIdx),
        );
      });
      return list;
    }
    return currentRows;
  });
};

export const addColumns = (
  activeCellIds: ActiveCell[],
  setColsDetails: (
    value: React.SetStateAction<ColumnDef<DataRow, any>[]>,
  ) => void,
  position?: string,
) => {
  if (!activeCellIds.length) {
    return null;
  }
  const activeCellId = activeCellIds[0].columnId;

  setColsDetails((currentCols) => {
    // Find the index of the column that matches the activeCellId
    const columnIndex = currentCols.findIndex((col) => col.id === activeCellId);

    // Determine the new column's ID based on the position
    const newColumnIdIndex =
      position === "left" ? columnIndex : columnIndex + 1;
    const newColumnId = Date.now().toString();

    // Create the new column object
    const newColumn = {
      id: newColumnId,
      header: `Column ${newColumnIdIndex + 1}`,
      name: `Column ${newColumnIdIndex + 1}`,
      enableResizing: true,
      accessorKey: newColumnId,
    };

    // Insert the new column at the determined position
    const newCols = [...currentCols];
    newCols.splice(newColumnIdIndex, 0, newColumn);
    return newCols;
  });
};
