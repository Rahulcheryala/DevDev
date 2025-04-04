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

export default function DataTableFacetFilterTeams<TData, TValue>({
  column,
}: DataTableFacetFilterProps<TData, TValue>) {
  if (!column) throw new Error("Column is required.");
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue();

  // Count of active filters (in this case, just one possible filter)
  const activeFilterCount = filterValue !== undefined ? 1 : 0;

  return (
    <div className="relative">
      <div className="flex items-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 font-semibold">
                SMART FILTERS
              </span>
              <span className="bg-gray-100 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {activeFilterCount}
              </span>
            </div>
            <IoChevronDownSharp className="text-gray-400" />
          </PopoverTrigger>

          <PopoverContent className="w-48 p-0 shadow-lg rounded-lg border border-gray-200">
            <Command className="rounded-lg overflow-hidden">
              <CommandList className="max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <CommandItem
                  onSelect={() => {
                    column.setFilterValue(undefined);
                    setIsOpen(false);
                  }}
                  className="hover:bg-gray-50 py-2.5 px-4 cursor-pointer data-[selected=true]:bg-gray-50"
                >
                  All
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    column.setFilterValue(true);
                    setIsOpen(false);
                  }}
                  value="true"
                  className="hover:bg-gray-50 py-2.5 px-4 cursor-pointer data-[selected=true]:bg-gray-50"
                >
                  Active
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    column.setFilterValue(false);
                    setIsOpen(false);
                  }}
                  value="false"
                  className="hover:bg-gray-50 py-2.5 px-4 cursor-pointer data-[selected=true]:bg-gray-50"
                >
                  Inactive
                </CommandItem>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* Gradient border at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600"></div>
    </div>
  );
}