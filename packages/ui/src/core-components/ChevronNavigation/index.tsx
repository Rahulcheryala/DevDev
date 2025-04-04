import { ChevronLeft, ChevronRight } from "lucide-react";
import React from 'react';

interface ListNavigationProps {
  prevItem: string;
  nextItem: string;
  activePage: number;
  totalItems: number;
  onPrevClick: (activePage: number) => void;
  onNextClick: (activePage: number) => void;
}

export default function ChevronNavigation({
  prevItem,
  nextItem,
  activePage,
  totalItems,
  onPrevClick,
  onNextClick
}: ListNavigationProps) {
  return (
    <div className="flex items-center gap-[2px]">
      <button
        onClick={() => onPrevClick(activePage - 1)}
        disabled={!prevItem}
        className="h-8 w-8 bg-white rounded-l-full flex items-center justify-center disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div className="bg-white h-8 flex items-center leading-5 justify-center py-1.5 px-4 text-[14px] font-[450]">
        <span className="text-[#007AF5]">{activePage}</span>
        <span className="text-[#5e626d]"> / {totalItems}</span>
      </div>
      <button
        onClick={() => onNextClick(activePage + 1)}
        disabled={!nextItem}
        className="h-8 w-8 bg-white rounded-r-full flex items-center justify-center disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
