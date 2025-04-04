import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@zeak/react";
import { SlidersHorizontal } from "lucide-react";

interface ColumnVisibilityProps<TData> {
  table: Table<TData>;
}

export function ColumnVisibility<TData>({ table }: ColumnVisibilityProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-full h-[56px] px-6 hover:bg-[#F2F2F7] flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Columns
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.columnDef.meta?.name}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
