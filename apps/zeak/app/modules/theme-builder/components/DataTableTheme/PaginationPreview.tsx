/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useDataTableTheme } from "~/modules/theme-builder";
import type { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zeak/react";

interface DataTablePaginationProps {
  table: Table<any>;
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const PaginationButton = ({
  onClick,
  disabled,
  children,
}: PaginationButtonProps) => (
  <button
    className={`p-1 ${
      disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
    } rounded`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default function PaginationPreview({
  table,
}: DataTablePaginationProps) {
  const currentPage = table.getState().pagination.pageIndex;
  const {paginationBgColor, paginationTextColor, paginationBorderRadius, paginationVerticalPadding, paginationHorizontalPadding,   paginationBorderWidth, paginationBorderColor} = useDataTableTheme()
  const pageCount = table.getPageCount();
  const maxVisiblePages = 5;

  // Calculate the range of pages to display
  const startPage = Math.max(
    0,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      pageCount - maxVisiblePages
    )
  );
  const endPage = Math.min(startPage + maxVisiblePages, pageCount);
  const pageSize = table.getState().pagination.pageSize;
  const endPoint =
    pageSize > table.getFilteredRowModel().rows.length
      ? table.getFilteredRowModel().rows.length
      : pageSize * (currentPage + 1);
  const startPoint = pageSize * currentPage + 1;
  return (
    <div style={{
      backgroundColor: paginationBgColor, 
    padding: `${paginationVerticalPadding}px ${paginationHorizontalPadding}px`,
    borderRadius: paginationBorderRadius,
     } } className="py-2 flex items-center  w-full justify-between  mb-10">
      <div className="">
     <span style={{color: paginationTextColor}}> Showing {startPoint} - {endPoint}</span>   of {table.getFilteredRowModel().rows.length}
      </div>
      <div className="flex items-center justify-end gap-2">
        <PaginationButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <div className="flex items-center gap-2 text-[12px] font-[450] ">
            <LuChevronLeft />
            PREV
          </div>
        </PaginationButton>
        <div className="flex items-center gap-2">
          {Array.from({ length: endPage - startPage }).map((_, idx) => {
            const pageIndex = startPage + idx;
            return (
              <div
                key={pageIndex}
                onClick={() => table.setPageIndex(pageIndex)}
                style={{
                    borderColor: paginationBorderColor,
                    borderWidth: paginationBorderWidth,
                }}
                className={`w-8 h-8 rounded-full transition-all ease-in-out duration-300  text-[14px]  flex items-center justify-center cursor-pointer 
                  
                }`}
              >
                {pageIndex + 1}
              </div>
            );
          })}
          {endPage < pageCount && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              ...
            </div>
          )}
        </div>
        <PaginationButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <div className="flex items-center gap-2 text-[12px] font-[450] ">
            NEXT
            <LuChevronRight />
          </div>
        </PaginationButton>
        <div>
          <Select
            defaultValue={pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="py-2 px-4 border-none">
              <div className="text-[#475467] text-[12px] font-[450] leading-relaxed">
              <SelectValue placeholder="10" />/ 
              <span className="uppercase">Page</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
