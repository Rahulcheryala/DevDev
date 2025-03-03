import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import TanstackTable from '../TanstackTable/components';
import React, {
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStoreStateValue } from "@scena/react-store";
import { $actionManager, $layers } from "../../stores/stores";
import {
  ActiveCell,
  CellBorder,
  DataRow,
  MergeRule,
  MergeRules,
  TableCss,
} from "../../types";
import ReactQuill from "react-quill";
import { useLayers } from "../../context/LayersContext";
import { useEditor } from "../../context/EditorContext";
import { TanstackTable } from ".";
import {
  addColumns,
  addRow,
  applyBorderPropertiesToSelectedCells,
  applyBorderToSelectedCells,
  changeCellColor,
  deleteColumns,
  deleteRow,
  demergeCells,
  handleRowClick,
  mergeCells,
  resizeCell,
} from "../../utils";
import { initialColumns } from "../../consts/table";
import { initialData } from "../../consts";

const TableV2 = forwardRef<any, any>((props, ref) => {
  const { rows = initialData, columns = initialColumns } = props;
  const [rowsDetails, setRowsDetails] = useState<Array<DataRow>>(rows);
  const [cellColors, setCellColors] = useState<{ [key: string]: string }>(
    props.cellColors || {},
  );
  const [colsDetails, setColsDetails] =
    useState<Array<ColumnDef<DataRow, any>>>(columns);
  const [isRowsDeleted, setIsRowsDeleted] = useState(false);
  const [isColsDeleted, setIsColsDeleted] = useState(false);
  const [cellSizes, setCellSizes] = useState<any>(props.cellSizes || {});
  const [cellBorders, setCellBorders] = useState<CellBorder>(
    props.cellBorders || {},
  );

  const [activeCellIds, setActiveCellIds] = useState<Array<ActiveCell>>([]);
  const { undoStack, setUndoStack, redoStack, setRedoStack } = useLayers();

  const allLayers = useStoreStateValue($layers);
  const { dimensions } = useEditor();
  const actionManager = useStoreStateValue($actionManager);
  const rowsRef = useRef(rowsDetails);
  const colsRef = useRef(colsDetails);
  const selectedRowIdxRef = useRef<Array<number>>([]);
  const selectedColKeyRef = useRef<Array<string>>([]);
  const [isCommandPressed, setIsCommandPressed] = useState<boolean>(false);

  const [headerVisible, setHeaderVisible] = useState<boolean>(false); // State to control header visibility
  const [tableCss, setTableCss] = useState(props.tableCss);
  const [mergeRules, setMergeRules] = useState<any>({
    horizontalMerges: [], // Each item: { row: rowIndex, startCol: startIndex, endCol: endIndex }
    verticalMerges: [], // Each item: { col: colIndex, startRow: startIndex, endRow: endIndex }
  });
  const [selectedTableCell, setSelectedTableCell] = useState<{
    current: ReactQuill | null;
  }>({ current: null });

  const isUndoTriggeredRef = useRef(false);

  const table = useReactTable({
    data: rowsDetails,
    columns: colsDetails,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    meta: {
      setTableCellQuill: (quillRef: RefObject<ReactQuill>) => {
        setSelectedTableCell({ current: quillRef.current });
      },
      updateData: (
        rowIndex: number,
        columnId: any,
        value: any,
        quillRef: any,
      ) =>
        setRowsDetails((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                  [columnId + "Ref"]: quillRef,
                }
              : row,
          ),
        ),
    },
  });

  useEffect(() => {
    if (isRowsDeleted) {
      selectedRowIdxRef.current = [];
      setIsRowsDeleted(false);
    }
  }, [isRowsDeleted]);

  useEffect(() => {
    if (isColsDeleted) {
      selectedColKeyRef.current = [];
      setIsColsDeleted(false);
    }
  }, [isColsDeleted]);

  useEffect(() => {
    rowsRef.current = rowsDetails;
    colsRef.current = colsDetails;
    updateTableDetails();
  }, [rowsDetails, colsDetails]);

  useEffect(() => {
    isUndoTriggeredRef.current = true;
    setRowsDetails(props.rows);
    setColsDetails(props.columns);
  }, [props.rows, props.columns]);

  useEffect(() => {
    if (!isUndoTriggeredRef.current) {
      actionManager.act("addToUndo", {
        allLayers,
        undoStack,
        setUndoStack,
        redoStack,
        setRedoStack,
        dimensions,
      });
    }
    // Reset the ref value after the operation
    isUndoTriggeredRef.current = false;
  }, [mergeRules, rowsDetails, colsDetails, isColsDeleted, isRowsDeleted]);

  React.useImperativeHandle(ref, () => {
    return {
      componentName: "EditableTable",
      getRows: () => rowsRef.current,
      getCols: () =>
        colsRef.current.map((col) => ({
          colsDetails,
          header: col.header,
        })),
      getHeaders: () => [],
      getMergedCells: () => mergeRules,
      resizeCell: (cellId: string, width: number, height: number) => {
        resizeCell(cellId, width, height, setCellSizes);
      },
      addRow: (position: string) =>
        addRow(position, activeCellIds, setRowsDetails),
      addColumns: (position: string) =>
        addColumns(activeCellIds, setColsDetails, position),
      deleteRow: () => {
        deleteRow(
          selectedRowIdxRef,
          setActiveCellIds,
          setIsRowsDeleted,
          setRowsDetails,
        );
      },
      deleteColumns: () => {
        deleteColumns(
          selectedColKeyRef,
          setActiveCellIds,
          setIsColsDeleted,
          setColsDetails,
        );
      },
      mergeCells: () => {
        mergeCells(activeCellIds, mergeRules, setActiveCellIds, setMergeRules);
      },
      demergeCells: () => {
        demergeCells(activeCellIds, setMergeRules, setActiveCellIds);
      },
      toggleHeaderVisibility: () => {
        setHeaderVisible((prev) => !prev);
      },
      getHeaderVisibility: () => headerVisible,
      setHeaderVisibility: (value: boolean) => {
        setHeaderVisible(value);
      },
      setMergedCells: (mergeRules: MergeRules) => {
        setMergeRules(mergeRules);
      },
      updateTableCss: (newTableCss: any) => {
        setTableCss(newTableCss);
      },
      fetchTableSkin: () => tableCss,
      clearAllBorders: () => {
        const newCellBorders = { ...cellBorders };
        activeCellIds.forEach((cellDetail: any) => {
          const cellId = cellDetail.cellId;
          if (newCellBorders[cellId]) {
            newCellBorders[cellId] = {
              top: false,
              right: false,
              bottom: false,
              left: false,
            };
          }
        });
        setCellBorders(newCellBorders);
      },
      getTableCss: () => {
        return {
          cellBorders,
          cellColors,
          cellSizes,
        };
      },
      setTableCellCss: (
        cellBorders: CellBorder,
        cellColors: { [key: string]: string },
      ) => {
        setCellBorders(cellBorders);
        setCellColors(cellColors);
      },
      clearAllFormatting: () => {
        setCellColors({});
        setCellBorders({});
        // Add any other formatting reset logic here
      },
      applyBorderToSelectedCells: (borderType: string) => {
        applyBorderToSelectedCells(
          cellBorders,
          activeCellIds,
          setCellBorders,
          borderType,
        );
      },
      applyBorderPropertiesToSelectedCells: (
        borderColor?: string,
        borderThickness?: string,
        borderOpacity?: number,
        borderStyle?: string,
      ) => {
        applyBorderPropertiesToSelectedCells(
          cellBorders,
          activeCellIds,
          setCellBorders,
          borderColor,
          borderThickness,
          borderOpacity,
          borderStyle,
        );
      },
      // For clearing cell selection onBlur
      clearCellSelection: () => {
        // Clear the active cell IDs
        setActiveCellIds([]);
      },

      //exposing active cells details and setCellColor state
      selectedCells: () => activeCellIds,
      setCellBgColor: (cellIds: string[], color: string) => {
        setCellColors((prevColors) => {
          const newColors = { ...prevColors };
          cellIds.forEach((cellId) => {
            newColors[cellId] = color;
          });
          return newColors;
        });
      },
      getTextRef: () => {
        return selectedTableCell?.current;
      },

      setTableProperties: (
        columns: Array<ColumnDef<DataRow, any>>,
        rows: DataRow[],
        tableCss: TableCss,
        mergeRules: MergeRule = { horizontalMerges: [], verticalMerges: [] },
      ) => {
        isUndoTriggeredRef.current = true;

        setRowsDetails(rows);
        setColsDetails(columns);
        setTableCss(tableCss);
        setMergeRules(mergeRules);
      },
      updateData: (
        rowIndex: number,
        columnId: string,
        value: string,
        quillRef: any,
      ) => {
        setRowsDetails((prevRows) =>
          prevRows.map((row, index) =>
            index === rowIndex
              ? { ...row, [columnId]: value, [columnId + "Ref"]: quillRef }
              : row,
          ),
        );
      },
    };
  }, [
    rowsDetails,
    colsDetails,
    headerVisible,
    activeCellIds,
    mergeRules,
    cellColors,
    cellBorders,
    tableCss,
    selectedTableCell,
  ]);

  const updateTableDetails = () => {
    actionManager.act("table.update", {
      rows: rowsRef.current,
      cols: colsRef.current,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        setIsCommandPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) {
        setIsCommandPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <TanstackTable.Table table={table}>
      <TanstackTable.TBody
        onRowClick={(cell, rowIndex, colIndex) =>
          handleRowClick(
            cell,
            rowIndex,
            colIndex,
            activeCellIds,
            setActiveCellIds,
            selectedRowIdxRef,
            selectedColKeyRef,
            isCommandPressed,
          )
        }
        activeCellIds={activeCellIds.map((id) => id.cellId)}
        tableCss={tableCss}
        mergeRules={mergeRules}
        cellColors={cellColors}
        changeCellColor={changeCellColor}
        cellSizes={cellSizes}
        cellBorders={cellBorders}
      />
    </TanstackTable.Table>
  );
});

TableV2.displayName = "TableV2";
export default TableV2;
