import { ColumnDef } from "@tanstack/react-table";
import ReactQuill from "react-quill";
import { DataRow, TableCss } from "./shared";

export type ICellBorder = {
  [key: string]: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    borderColor?: string;
    borderThickness?: string;
    borderOpacity?: number;
    borderStyle?: string;
  };
};

export type TableV2Props = {
  rows?: DataRow[];
  columns?: Array<ColumnDef<DataRow, any>>;
  cellColors?: { [key: string]: string };
  cellSizes?: { [key: string]: { width?: number; height?: number } };
  cellBorders?: ICellBorder;
  tableCss?: TableCss;
};

export type ActiveCell = {
  cellId: string;
  rowIdx: number;
  columnId: string;
  rowIndex: number;
  colIndex: number;
  quillRef: ReactQuill;
};
export type ITableCellText = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  color: string;
  font: string;
  fontMedium: string;
  size: string;
  align: string;
};
export type CellSpacing = {
  cellWidth: number;
  cellHeight: number;
};

export type BorderStyleKey =
  | "borderColor"
  | "borderOpacity"
  | "borderThickness"
  | "borderStyles";
export type CellBorder = {
  [key: string]: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    borderColor?: string;
    borderThickness?: string;
    borderOpacity?: number;
    borderStyle?: string;
  };
};
