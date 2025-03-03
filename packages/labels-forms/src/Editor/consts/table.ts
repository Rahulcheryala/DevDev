import { ColumnDef } from "@tanstack/react-table";

import { DataRow } from "../types";
import Table01 from "../assets/icons/table/table-01.png";
import Table02 from "../assets/icons/table/table-02.png";
import Table03 from "../assets/icons/table/table-03.png";
import Table04 from "../assets/icons/table/table-04.png";

export const defaultTextProperties = {
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  color: "#000000",
  font: "",
  fontMedium: "normal",
  size: "16px",
  align: "left",
};

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export type DefaultCellBorderStyles = {
  borderColor: string;
  borderThickness: string;
  borderOpacity: string;
  borderStyle: string;
};
export const defaultCellBorderStyles: DefaultCellBorderStyles = {
  borderColor: "transparent",
  borderThickness: "1px",
  borderOpacity: "1",
  borderStyle: "solid",
};

export enum CellBorderStyles {
  BorderColor = "borderColor", // Default to 'transparent'
  BorderThickness = "borderThickness", // Default to '1px'
  BorderOpacity = "borderOpacity", // Default opacity to 1
  BorderStyle = "borderStyle",
}

export const initialColumns: Array<ColumnDef<DataRow, any>> = [
  { id: "col1", header: "Column 1", enableResizing: true, accessorKey: "col1" },
  { id: "col2", header: "Column 2", enableResizing: true, accessorKey: "col2" },
  { id: "col3", header: "Column 3", enableResizing: true, accessorKey: "col3" },
];

export const initialData: DataRow[] = [
  { col1: "col1", col2: "Column 1", col3: "col1" },
  { col1: "col2", col2: "Column 2", col3: "col2" },
  { col1: "col3", col2: "Column 3", col3: "col3" },
  { col1: "col4", col2: "Column 4", col3: "col4" },
];

export const imageOptions = [
  { src: Table01, alt: "Table Style 1" },
  { src: Table02, alt: "Table Style 2" },
  { src: Table03, alt: "Table Style 3" },
  { src: Table04, alt: "Table Style 4" },
  { src: Table04, alt: "Table Style 5" },
];
