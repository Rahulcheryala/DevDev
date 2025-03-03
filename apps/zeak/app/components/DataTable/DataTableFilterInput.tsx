/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Column } from "@tanstack/react-table";
import React from "react";
import DebouncedInput from "./DebounceInput";
import { IoCheckmark, IoClose, IoFilterOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "@zeak/react";

export default function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue: any = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant],
  );

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        //dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : filterVariant === "boolean" ? (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2">
            <div className="w-16 h-5 mt-2 rounded-md bg-gray-200"></div>
            <IoFilterOutline />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-20">
          <div className="flex flex-col gap-2 ">
            <button onClick={() => column.setFilterValue(undefined)}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={columnFilterValue === undefined}
                />
                All
              </div>
            </button>
            <button
              className="flex"
              onClick={() => column.setFilterValue(true)}
            >
              <input type="checkbox" checked={columnFilterValue === true} />
              {/* Ticked mark */}
              <IoCheckmark />
            </button>
            <button
              className="flex"
              onClick={() => column.setFilterValue(false)}
            >
              <input type="checkbox" checked={columnFilterValue === false} />
              {/* Cross mark */}
              <IoClose />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  ) : filterVariant === "text" ? 
  (
    <div>
      <DebouncedInput type="text" 
      value={columnFilterValue?.filterValue.toString()} 
      onChange={(value) => column.setFilterValue({filterType: columnFilterValue.filterType, filterValue: value})} />
    </div>
  )
  
  
  : (
    <>
      <div className="flex items-center gap-4">
        <DebouncedInput
          type="text"
          className="h-8 rounded-md placeholder:text-gray-400 font-normal focus-within:outline-none placeholder:text-sm bg-transparent px-3 w-3/4"
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search`}
          list={column.id + "list"}
        />
        <div className="">
          <Popover>
            <PopoverTrigger>
              <IoFilterOutline />
            </PopoverTrigger>
            <PopoverContent>
              <div className="">
                <ScrollArea className="h-40">
                  {sortedUniqueValues.map((value: any, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        checked={value === columnFilterValue}
                        onChange={() => {
                          if (value === columnFilterValue) {
                            column.setFilterValue(undefined);
                          } else {
                            column.setFilterValue(value);
                          }
                        }}
                      />
                      {value}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
