import React from "react";
import type { Header, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {motion} from "framer-motion"
import { Popover, PopoverTrigger, PopoverContent } from "@zeak/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { LuChevronsUpDown, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { cn } from "@zeak/react";

interface TableHeadProps<TData, TValue> {
  header: Header<TData, TValue>;
  table: Table<TData>;
}

// Draggable Header Component
const TableHead = ({ header, table }: TableHeadProps<any, any>) => {
    
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <motion.th
    initial={{ display: 'block' }}

  transition={{ duration: 1 }}
    className={cn(" px-3 py-2")}
    key={header.id}
      {...{
        
        colSpan: header.colSpan,
        style: {
          width: header.getSize(),
          
        },
      }}
 
    >
      <div className="flex items-center gap-2  w-full ">
      

        {header.isPlaceholder ? null : (
          <div className="flex justify-between items-center w-full ">
            <div
              onClick={header.column.getToggleSortingHandler()}
              className="flex gap-2 items-center  "
             
            >
             <div  className="">
              {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
              
              {/* Sorting indicators */}
              {header.column.getCanSort() && (
                <div className="flex items-center">
                  {{
                    asc: <LuChevronUp />,
                    desc: <LuChevronDown />,
                  }[header.column.getIsSorted() as string] ?? (
                    <LuChevronsUpDown />
                  )}
                </div>
              )}
            </div>
            {header.column.getCanGroup() && (
              <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger>
                  <HiEllipsisVertical />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="">
                    <div className="hover:bg-gray-100 py-1 px-3">
                      {header.column.getCanGroup() ? (
                        <button
                          {...{
                            onClick: header.column.getToggleGroupingHandler(),
                            style: {
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            },
                          }}
                        >
                          <LiaLayerGroupSolid className="mr-3 h-5 w-5" />
                          {header.column.getIsGrouped() ? `Un-group ` : "Group"}
                        </button>
                      ) : null}
                    </div>
                    {header.column.getCanPin() && (
                      <div className="hover:bg-gray-100 py-1 px-3">
                        <button
                          onClick={() => {
                            header.column.getIsPinned() !== "left"
                              ? header.column.pin("left")
                              : header.column.pin(false);
                          }}
                        >
                          {header.column.getIsPinned() !== "left"
                            ? "Pin Left"
                            : "Unpin Left"}
                        </button>
                      </div>
                    )}

                    {header.column.getCanPin() && (
                      <div className="hover:bg-gray-100 py-1 px-3">
                        <button
                          onClick={() => {
                            header.column.getIsPinned() !== "right"
                              ? header.column.pin("right")
                              : header.column.pin(false);
                          }}
                        >
                          {header.column.getIsPinned() !== "right"
                            ? "Pin Right"
                            : "Unpin Right"}
                        </button>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>
     
      
    </motion.th>
  );
};

export default TableHead;
