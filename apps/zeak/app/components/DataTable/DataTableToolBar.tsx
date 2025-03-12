import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { IoRocketOutline, IoSearch, IoFilterOutline } from "react-icons/io5";
import { AiOutlineColumnHeight, AiOutlineMore } from "react-icons/ai";
import { TaskIcon } from "@zeak/icons";
import SmartFilter from "./SmartFilter";
import { BsDiagram3 } from "react-icons/bs";
import { CiRedo } from "react-icons/ci";
import { BsPaperclip } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import type { ColumnFilter, Table } from "@tanstack/react-table";
import { useDatatableStore } from "./useDatatableStore";
import {Popover, PopoverContent, PopoverTrigger} from "@zeak/react"
import DataTableView from "./DataTableView";
import { cn } from "@zeak/react";
import { PlusIcon } from "lucide-react";
import { MorePopover } from "./MorePopover";
import { ExportOptions } from "./ExportOptions";
import { FaListUl } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  columns: any[];
  currentPageData: TData[];
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
  isCompact: boolean;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
  type?: string;
  viewType?: string;
  toggleView?: () => void;
  handleAddNewIntegration?: () => void;
  handleAddNewConnection?: () => void;
}

export default function DataTableToolbar<TData>({
  table,
  data,
  columns,
  setIsCompact,
  currentPageData,
  isCompact,
  setColumnFilters,
  type,
  viewType,
  toggleView,
  handleAddNewIntegration,
  handleAddNewConnection
}: DataTableToolbarProps<TData>) {
  const { setShowColumnSearch , showColumnSearch, setIsAddNewRow, setIsAddNewColumn } = useDatatableStore();

  const ViewTypeSelector = () => {
    return (
      <Popover>
        <PopoverTrigger className="flex items-center gap-3">
          {viewType === "list" ? (<>
          <FaListUl className="w-5 h-5" /> List
          </>) : (<>
          <IoGridOutline className="w-5 h-5" /> Grid
          </>)}
        </PopoverTrigger>
        <PopoverContent className="w-fit p-2">
          <button disabled={viewType === "list"} onClick={toggleView} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-sm disabled:cursor-default disabled:opacity-50">
            <FaListUl className="w-5 h-5" /> List
          </button>
          <button disabled={viewType === "grid"} onClick={toggleView} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-sm disabled:cursor-default disabled:opacity-50">
            <IoGridOutline className="w-5 h-5" /> Grid
          </button>
        </PopoverContent>
      </Popover>
    );
  };

  const AddButton = ({ type }: { type: string }) => {
    switch(type){
      case "integration":
        return (
          <button 
          className="flex items-center gap-3 text-[#007AF5]"
          onClick={handleAddNewIntegration}
        >
          <span className="text-[14px] font-semibold uppercase">
            New Integration
          </span>
          <PlusIcon className="w-5 h-5" />
        </button>
        )
      case "view":
        return (
          <button 
          className="flex items-center gap-3 text-[#007AF5]"
          onClick={handleAddNewConnection}
        >
          <span className="text-[14px] font-semibold uppercase">
            New Connection
          </span>
          <PlusIcon className="w-5 h-5" />
        </button>
        )
      case "listing":
        return null
      case "company":
        return null
      default:
        return (
          <Popover>
            <PopoverTrigger>
            <button className="flex items-center gap-3 text-[#007AF5] ">
              <span className="text-[14px] font-semibold">
                New 
              </span>
              <PlusIcon className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <button onClick={() => setIsAddNewRow(true)} className="flex items-center gap-3 text-[#007AF5] ">
              Add New Row
            </button>
            <button onClick={() => setIsAddNewColumn(true)} className="flex items-center gap-3 text-[#007AF5]"> 
              Add New Column
            </button>
          </PopoverContent>
        </Popover>
      )
    }
  }

  return (
    <div className="rounded-lg bg-white space-y-4">
      {/* Top section */}
      <div className="grid grid-cols-3 py-5 px-6 items-center ">
        <div className="flex gap-2 items-center">
          <DataTableView />
        </div>
        <div className="flex items-center gap-4 justify-center ">
          <div className="flex items-center gap-3 border-r pr-[28px] ">
            {type === "integration" ? (
              <ViewTypeSelector />
            ) :(
              <>
                <TaskIcon className="w-5 h-5" />
                Tasks
              </>
            )}
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
        </div>
     
        <div className="flex items-center justify-end cursor-pointer  gap-3">
          <AddButton type={type!} />
        </div>
      
      </div>
      {/* Bottom section */}
      <div className="grid grid-cols-3 gap-4 items-center w-full h-[60px] ">
        {/* Smart filter */}
       <SmartFilter table={table}  />
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

          <IoFilterOutline className="h-5 w-5 cursor-pointer text-[#475467]"  />
          </div>
          {/* redo icon */}
          <div  className={cn("p-[10px]  rounded-zeak")}>

          <CiRedo className="h-5 w-5 cursor-pointer text-[#475467]"  />
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
  );
}
