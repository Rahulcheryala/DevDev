import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { IoRocketOutline, IoSearch, IoFilterOutline } from "react-icons/io5";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { TaskIcon } from "@zeak/icons";
import SmartFilter from "./SmartFilter";
import { BsDiagram3 } from "react-icons/bs";
import { CiRedo } from "react-icons/ci";
import { BsPaperclip } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import type { ColumnFilter, Table } from "@tanstack/react-table";
import { useDatatableStore } from "../hooks/useDataTableStore";
import DataTableView from "./DataTableView";
import { cn } from "@zeak/react";
import { PlusIcon } from "lucide-react";
import { MorePopover } from "./MorePopover";
import { ExportOptions } from "./ExportOptions";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  addNewText?: string;
  onClickNewBtn?: () => void;
  columns: any[];
  currentPageData: TData[];
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
  isCompact: boolean;
  topTitle?: string;
  dataTableView?: React.ReactNode;
  topIconsComponent?: React.ReactNode;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}

export default function DataTableToolbar<TData>({
  table,
  data,
  columns,
  setIsCompact,
  currentPageData,
  isCompact,
  addNewText,
  onClickNewBtn,
  topTitle,
  dataTableView,
  topIconsComponent
}: DataTableToolbarProps<TData>) {
  const { setShowColumnSearch, showColumnSearch } = useDatatableStore();

  return (
    <>
      {topTitle && <div className="bg-[#F8FAFE] text-[26px] text-[#677281] py-[14px] pl-6 h-16 rounded-t-zeak">
        {topTitle}
      </div>}
      <div className={cn("rounded-zeak  bg-white space-y-4", topTitle && "rounded-t-none")}>
        {/* Top section */}
        <div className="grid grid-cols-3 py-5 px-6 items-center ">
          <div className="flex gap-2 items-center">
            {dataTableView ? dataTableView : <DataTableView />}
          </div>
          {topIconsComponent ? topIconsComponent : <div className="flex items-center gap-4 justify-center ">
            <div className="flex items-center gap-3 border-r pr-[28px] ">
              <TaskIcon className="w-5 h-5" />
              Tasks
            </div>
            <div className="flex items-center gap-3 border-r pr-[28px]">
              <RiDeleteBin6Line className="w-5 h-5" />
              Delete
            </div>
            <div className="flex items-center gap-3 border-r pr-[28px]">
              <BiEditAlt className="w-5 h-5" />
              Edits
              <FaChevronDown className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-3">
              <IoRocketOutline className="w-5 h-5" />
              Actions
              <FaChevronDown className="h-3 w-3" />
            </div>
          </div>}

          <div className="flex items-center justify-end cursor-pointer  gap-3">
            <button onClick={() => {
              if (onClickNewBtn) {
                onClickNewBtn();
              } else {
                console.log("No onClickNewBtn function provided");
              }
            }} className="flex items-center gap-3 text-[#007AF5] ">
              <span className="text-[14px] font-semibold">
                {addNewText ?? "New"}
              </span>
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>

        </div>
        {/* Bottom section */}
        <div className="grid grid-cols-3 gap-4 items-center w-full h-[60px] ">
          {/* Smart filter */}
          <SmartFilter table={table} />
          {/* Search */}
          <div className="flex items-center justify-center  ">
            <div className="relative">
              <IoSearch className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#475467]" />
              <input

                placeholder="Search"
                className=" h-[44px] bg-[#F0F4FD] py-2 pl-10 pr-4 rounded-[8px]  focus-within:outline-none w-[400px]"
                value={table.getState().globalFilter ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex space-x-3 text-black items-center justify-end mr-[10px]">
            <AiOutlineColumnHeight
              onClick={() => setIsCompact(!isCompact)}
              className="h-5 w-5 cursor-pointer m-[10px] text-[#475467]"
            />
            {/* diagram icon */}
            <div className={cn("p-[10px]  rounded-zeak")}>
              <BsDiagram3 className="h-5 w-5 cursor-pointer text-[#475467] " />
            </div>

            {/* filter icon */}
            <div onClick={() => setShowColumnSearch(!showColumnSearch)} className={cn("p-[10px]  rounded-zeak", showColumnSearch && "bg-[#D3DFE8]")}>

              <IoFilterOutline className="h-5 w-5 cursor-pointer text-[#475467]" />
            </div>
            {/* redo icon */}
            <div className={cn("p-[10px]  rounded-zeak")}>

              <CiRedo className="h-5 w-5 cursor-pointer text-[#475467]" />
            </div>
            {/* paperclip icon */}
            <div className={cn("p-[10px]  rounded-zeak")}>

              <BsPaperclip className="h-5 w-5 cursor-pointer text-[#475467] " />
            </div>
            {/* export icon */}
            <div className={cn("p-[10px]  rounded-zeak")}>
              {/* <CSVLink data={data as object[]}>Export</CSVLink>
           */}
              <ExportOptions currentPageData={currentPageData} data={data as object[]} />
            </div>
            {/* more icon */}
            <MorePopover columns={columns} table={table} />
          </div>
        </div>
      </div>
    </>
  );
}
