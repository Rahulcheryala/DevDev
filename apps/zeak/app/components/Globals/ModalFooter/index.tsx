import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zeak/react";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

interface DataTablePaginationProps {
  currentPage: number; // Current active page (0-based index)
  totalItems: number; // Total number of items
  pageSize: number; // Number of items per page
  onPageChange: (page: number) => void; // Callback when page changes
  onPageSizeChange: (size: number) => void; // Callback when page size changes
  className?: string; // Optional className for custom styling
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

export default function ModalFooter({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className = "",
}: DataTablePaginationProps) {
  const pageCount = Math.ceil(totalItems / pageSize); // Total number of pages
  const maxVisiblePages = 5; // Maximum number of visible page buttons

  // Calculate the range of pages to display
  const startPage = Math.max(
    0,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      pageCount - maxVisiblePages
    )
  );
  const endPage = Math.min(startPage + maxVisiblePages, pageCount);

  // Calculate the start and end points of the current page
  const startPoint = currentPage * pageSize + 1;
  const endPoint = Math.min(startPoint + pageSize - 1, totalItems);

  return (
    <div className={`py-2 flex items-center w-full justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-[#007AF5]">
          Showing {startPoint} - {endPoint}  
        </span>
        <span>
            of {totalItems}
        </span>
      </div>
      <div className="flex items-center justify-end gap-2">
        {/* Previous Page Button */}
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <div className="flex items-center gap-2 text-[12px] font-[450]">
            <LuChevronLeft />
            PREV
          </div>
        </PaginationButton>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: endPage - startPage }).map((_, idx) => {
            const pageIndex = startPage + idx;
            return (
              <div
                key={pageIndex}
                onClick={() => onPageChange(pageIndex)}
                className={`w-8 h-8 rounded-full transition-all ease-in-out duration-300 border-4 text-[14px] flex items-center justify-center cursor-pointer ${
                  pageIndex === currentPage
                    ? "border-[#FFDF41]"
                    : "border-transparent hover:bg-gray-200"
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

        {/* Next Page Button */}
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
        >
          <div className="flex items-center gap-2 text-[12px] font-[450]">
            NEXT
            <LuChevronRight />
          </div>
        </PaginationButton>

        {/* Page Size Selector */}
        <div>
          <Select
            defaultValue={pageSize.toString()}
            onValueChange={(value) => {
              onPageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="py-2 px-4 border-none">
              <div className="text-[#475467] text-[12px] font-[450] leading-relaxed">
                <SelectValue placeholder="10" /> /{" "}
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