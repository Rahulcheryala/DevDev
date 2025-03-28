import type { CSSProperties } from "react";
import React from "react";
import type { Header, Table, ColumnResizeMode } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Popover, PopoverTrigger, PopoverContent } from "@zeak/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { LiaLayerGroupSolid } from "react-icons/lia";
import DataTableFilterInput from "./DataTableFilterInput";
import { LuChevronsUpDown, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useDatatableStore } from "./useDatatableStore";
import { cn } from "@zeak/react";
import { getPinningStyles } from "./utils";
import { useNotificationStore } from "~/modules/notifications";
import {ConditionalRendering} from "./ConditionalRendering";
interface TableHeadProps<TData, TValue> {
  header: Header<TData, TValue>;
  table: Table<TData>;
}

const TableHead = ({ header, table }: TableHeadProps<any, any>) => {
  const { setChartType, chartType,  } = useNotificationStore();
  const { showColumnSearch } = useDatatableStore();
  const { column } = header;
  const isPinned = column.getIsPinned();
  const isLastLeftPinned = isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinned = isPinned === "right" && column.getIsFirstColumn("right");
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");

  const { 
    attributes, 
    isDragging, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
    transition,
    width: header.column.getSize(),
    borderRight: table.getAllColumns().length - 1 === header.column.getIndex() 
      ? "none" 
      : "2px solid #f3f4f6",
  };

  return (
    <motion.th
      initial={{ display: 'block', width: 0 }}
      animate={{
        display: showColumnSearch ? 'block' : 'flex',
        width: header.column.getSize()
      }}
      exit={{ width: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      data-pinned={isPinned || undefined}
      data-last-col={
        isLastLeftPinned ? "left" : isFirstRightPinned ? "right" : undefined
      }
      className={cn(
        "relative px-3 py-2",
        "[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0",
        "[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0",
        "[&[data-pinned=left][data-last-col=left]]:border-r",
        "[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0",
        "[&[data-pinned=right][data-last-col=right]]:border-l",
        "[&[data-pinned][data-last-col]]:border-border",
        "[&[data-pinned]]:bg-muted/90",
        "[&[data-pinned]]:backdrop-blur-sm"
      )}
      key={header.id}
      colSpan={header.colSpan}
      style={{
        ...getPinningStyles(column),
        ...style,
      }}
      ref={setNodeRef}
    >
      <div className="flex items-center gap-2 w-full">
        {!header.isPlaceholder && (
          <div className="flex justify-between items-center w-full">
            <div
              onClick={header.column.getToggleSortingHandler()}
              className="flex gap-2 items-center"
            >
              <div {...attributes} {...listeners}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
              
              {header.column.getCanSort() && (
                <div className="flex items-center">
                  {{
                    asc: <LuChevronUp />,
                    desc: <LuChevronDown />,
                  }[header.column.getIsSorted() as string] ?? <LuChevronsUpDown />}
                </div>
              )}
            </div>

            {header.column.getCanGroup() && (
              <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger>
                  <HiEllipsisVertical />
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    {header.column.getCanGroup() && (
                      <div className="hover:bg-gray-100 py-1 px-3">
                        <button
                          onClick={header.column.getToggleGroupingHandler()}
                          className="flex items-center cursor-pointer"
                        >
                          <LiaLayerGroupSolid className="mr-3 h-5 w-5" />
                          {header.column.getIsGrouped() ? "Un-group" : "Group"}
                        </button>
                      </div>
                    )}

                    {header.column.getCanPin() && (
                      <>
                        <div className="hover:bg-gray-100 py-1 px-3">
                          <button
                            onClick={() => {
                              header.column.getIsPinned() !== "left"
                                ? header.column.pin("left")
                                : header.column.pin(false);
                            }}
                          >
                            {header.column.getIsPinned() !== "left" ? "Pin Left" : "Unpin Left"}
                          </button>
                        </div>

                        <div className="hover:bg-gray-100 py-1 px-3">
                          <button
                            onClick={() => {
                              header.column.getIsPinned() !== "right"
                                ? header.column.pin("right")
                                : header.column.pin(false);
                            }}
                          >
                            {header.column.getIsPinned() !== "right" ? "Pin Right" : "Unpin Right"}
                          </button>
                        </div>
                      </>
                    )}

                    {header.column.columnDef.meta?.dataType === "chart" && (
                      <div className="hover:bg-gray-100 py-1 px-3 flex flex-col gap-4">
                        <button onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}>
                          {chartType === "bar" ? "Line" : "Bar"}
                        </button>
                      </div>
                    )}

                    { header.column.columnDef.meta?.dataType === "string" || "number" ?
                      <ConditionalRendering colId={header.column.id} dataType={header.column.columnDef.meta?.dataType} />
                    : null}
                    <div className="hover:bg-gray-100 py-1 px-3">
                      <button onClick={() => header.column.toggleSorting(undefined)}>
                        Sort Undefined
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>

      {showColumnSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {header.column.getCanFilter() && <DataTableFilterInput column={header.column} />}
        </motion.div>
      )}

      {header.column.getCanResize() && (
        <div
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px"
        />
      )}
    </motion.th>
  );
};

export default TableHead;
