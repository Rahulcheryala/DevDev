// Draggable Row Component
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import {motion} from "framer-motion"
import {ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@zeak/react";
import {useDataTableTheme} from "~/modules/theme-builder"

interface TableRowProps<TData> {
  row: Row<TData>;
  isCompact: boolean;
}

const TableRow = <TData extends { id: string | number }>({
  row,
  isCompact,
}: TableRowProps<TData>) => {
  const {cellVerticalPadding, cellHorizontalPadding, cellTextColor, borderRadius} = useDataTableTheme()



  return (
    <motion.tr
    style={{borderRadius: `${borderRadius}px`}}
    initial={{height: "48px"}}
    animate={{height: isCompact ? "48px" : "64px"}}
    transition={{duration: 0.3, ease: "easeInOut"}}
   
    className={cn("hover:bg-gray-100 ", {
  
    })}>
      {row.getVisibleCells().map((cell) => (
        <td
          className={cn(`first:px-0   text-center  flex items-center transition-all  ease-linear  text-ellipsis text-nowrap overflow-hidden`, {
            "bg-[#D3DFE8] first:bg-gray-100": row.getIsSelected(),
            "h-[48px]": isCompact,
          })}
          key={cell.id}
          {...{
            
            style: {
              width: cell.column.getSize(),
              maxWidth: cell.column.getSize(),
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              padding: `${cellVerticalPadding}px ${cellHorizontalPadding}px`,
              color: cellTextColor,
            
              // backgroundColor: row.getIsSelected() ? "#D3DFE8" : "#fff",
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
          ) : cell.getIsAggregated()  ? 
          
          cell.column.columnDef.meta?.dataType === "date" ? null
           : 
          (
        
            
            flexRender(
              cell.column.columnDef.aggregatedCell ??
                cell.column.columnDef.cell,
              cell.getContext(),
            )
           
          ) : cell.getIsPlaceholder() ? null: ( // For cells with repeated values, render null
            // Otherwise, just render the regular cell
            <div  className="transition-all duration-300 ease-linear">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )}
        </td>
      ))}
    </motion.tr>
  );
};

export default TableRow;
