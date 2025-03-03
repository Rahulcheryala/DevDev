// Draggable Row Component
import type { Cell, Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { CSSProperties } from "react";
import { getPinningStyles } from "../utils";
import { motion } from "framer-motion"
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { useDatatableStore } from "../hooks/useDataTableStore";
import { cn } from "@zeak/react";

interface TableRowProps<TData> {
  row: Row<TData>;
  isCompact: boolean;
}

const TableRow = <TData extends { id: string | number }>({
  row,
  isCompact,
}: TableRowProps<TData>) => {
  const { enableAlternateRowColor, conditionalRenderingColId, matchValue, matchCondition } = useDatatableStore();
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
    resizeObserverConfig: {
      disabled: true
    }
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    backgroundColor: isDragging ? "#f3f4f6" : "white",
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ height: isCompact ? "48px" : "64px", opacity: 1 }}
      transition={{ duration: isDragging ? 0.2 : 0.5, ease: "easeInOut" }}
      exit={{ y: -10, opacity: 0 }}
      ref={setNodeRef} style={style} className={cn("hover:bg-gray-100 mb-[3px] rounded-zeak", {
        "bg-[#D3DFE8]": enableAlternateRowColor && row.index % 2 === 0,
        "bg-[#F2F2F7]": enableAlternateRowColor && row.index % 2 === 1,
      })}>
      {row.getVisibleCells().map((cell) => {
        const { column } = cell;
        const isPinned = column.getIsPinned();
        const isLastLeftPinned = isPinned === "left" && column.getIsLastColumn("left");
        const isFirstRightPinned = isPinned === "right" && column.getIsFirstColumn("right");
        const cellValue = cell.getValue();
        const hasMatch = () => {
          if (conditionalRenderingColId !== cell.column.id) {
            return false;
          }
          if (!matchValue || !cellValue) return false;
          if (cell.column.columnDef.meta?.dataType === "string") {
            const stringCellValue = String(cellValue).toLowerCase();
            const stringMatchValue = matchValue.toLowerCase();

            switch (matchCondition) {
              case 'contains':
                return stringCellValue.includes(stringMatchValue);
              case 'equals':
                return stringCellValue === stringMatchValue;
              case 'startsWith':
                return stringCellValue.startsWith(stringMatchValue);
              case 'endsWith':
                return stringCellValue.endsWith(stringMatchValue);
              case 'notContains':
                return !stringCellValue.includes(stringMatchValue);
              case 'notEquals':
                return stringCellValue !== stringMatchValue;
              default:
                return false;
            }
          } else if (cell.column.columnDef.meta?.dataType === "number") {
            const numberCellValue = Number(cellValue);
            const numberMatchValue = Number(matchValue);
            switch (matchCondition) {
              case 'greaterThan':
                return numberCellValue > numberMatchValue;
              case 'lessThan':
                return numberCellValue < numberMatchValue;
              case 'equals':
                return numberCellValue === numberMatchValue;
              case 'notEquals':
                return numberCellValue !== numberMatchValue;
            }
          } else if (cell.column.columnDef.meta?.dataType === "boolean") {
            return true;
          } else {
            return false;
          }
        }

        return (
          <motion.td
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: isDragging ? 0.2 : 0.5, ease: "easeInOut" }}
            className={cn(`first:px-0 text-center first:rounded-l-zeak last:rounded-r-zeak flex items-center transition-all ease-linear text-ellipsis text-nowrap overflow-hidden [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border [&[data-pinned]]:bg-background/90 [&[data-pinned]]:backdrop-blur-sm`, {
              "bg-[#D3DFE8] first:bg-gray-100": row.getIsSelected(),
              "h-[48px]": isCompact,
              "bg-[#D3DFE8]": enableAlternateRowColor && row.index % 2 === 0 && !hasMatch(),
              "bg-[#F2F2F7]": enableAlternateRowColor && row.index % 2 === 1 && !hasMatch(),
              "bg-green-100": hasMatch()
            })}
            data-pinned={isPinned || undefined}
            data-last-col={
              isLastLeftPinned ? "left" : isFirstRightPinned ? "right" : undefined
            }
            key={cell.id}
            {...{
              style: {
                width: cell.column.getSize(),
                maxWidth: cell.column.getSize(),
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                ...getPinningStyles(column),
                borderRight:
                  row.getAllCells().length - 1 === cell.column.getIndex()
                    ? "none"
                    : "2px solid #f3f4f6",
              },
            }}
          >
            {cell.getIsGrouped() ? (
              <>
                <button
                  className="flex items-center pl-6 "
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: {
                      cursor: row.getCanExpand() ? "pointer" : "normal",
                      width: cell.column.getSize(),
                    },
                  }}
                >
                  {row.getIsExpanded() ? (
                    <ChevronDownIcon className="h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5" />
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </button>
              </>
            ) : cell.getIsAggregated() ?

              cell.column.columnDef.meta?.dataType === "date" ? null
                :
                (
                  flexRender(
                    cell.column.columnDef.aggregatedCell ??
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )

                ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                  // Otherwise, just render the regular cell
                  <div className="transition-all duration-300 ease-linear">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )}
          </motion.td>
        )
      })}
    </motion.tr>
  );
};

export default TableRow;
