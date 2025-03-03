/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Column } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandItem,
  CommandList,
} from "@zeak/react";
import { IoChevronDownSharp } from "react-icons/io5";

import { useState } from "react";
interface DataTableFacetFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export default function DataTableFacetFilter<TData, TValue>({
  column,
}: DataTableFacetFilterProps<TData, TValue>) {
  if (!column) throw new Error("Column is required.");
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue();
  return (
    <div className="flex flex-col  gap-2">
      <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <div>
                <span className="uppercase text-blue-500">
                  {typeof column.columnDef.header === "function"
                    ? column.columnDef.header({} as any)
                    : column.columnDef.header}
                </span>
                <div>
                  {filterValue === undefined
                    ? "All"
                    : filterValue
                      ? "Active"
                      : "Inactive"}
                </div>
              </div>
              <IoChevronDownSharp />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandList>
                <CommandItem
                  onSelect={() => {
                    column.setFilterValue(undefined);
                    setIsOpen(false);
                  }}
                >
                  All
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    column.setFilterValue(true);
                    setIsOpen(false);
                  }}
                  value="true"
                >
                  Active
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    column.setFilterValue(false);
                    setIsOpen(false);
                  }}
                  value="false"
                >
                  Inactive
                </CommandItem>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
