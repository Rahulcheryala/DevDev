import "@tanstack/react-table";
import type { ColumnFilterData } from "./components/Filter/types";
import type { CellContext } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends unknown, TValue> {
    filter?: ColumnFilterData;
    pluralHeader?: string;
    getCellContext?: (context: CellContext<TData, TValue>) => any;
  }
}
export interface TableAction<T> {
  label: string;
  onClick: (rows: T[]) => void;
  disabled?: boolean;
  icon?: JSX.Element;
}
