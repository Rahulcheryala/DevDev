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
import { useIntegrationContext } from "~/modules/integrations/context";
import { useConnectionContext } from "~/modules/integrations/context/connection";
// import { useIntegrationContext } from "../../modules/integrations/context";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  columns: any[];
  currentPageData: TData[];
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
  isCompact: boolean;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
  type?: string;
}

export default function DataTableToolbar<TData>({
  table,
  data,
  columns,
  setIsCompact,
  currentPageData,
  isCompact,
  setColumnFilters,
  type
}: DataTableToolbarProps<TData>) {
  const { setShowColumnSearch , showColumnSearch, setIsAddNewRow, setIsAddNewColumn } = useDatatableStore();
  const { dispatch } = useIntegrationContext();
  const { dispatch: connectionDispatch } = useConnectionContext();

  const handleNewIntegration = () => {
    dispatch({ type: "SET_FLOW", payload: "create" });
  };

  const handleNewConnection = () => {
    connectionDispatch({ type: "SET_FLOW", payload: "create" });
  };

  return (
    <div className="rounded-lg shadow-lg  bg-white space-y-4">
      {/* Top section */}
      <div className="grid grid-cols-3 py-5 px-6 items-center ">
        <div className="flex gap-2 items-center">
          <DataTableView />
        </div>
        <div className="flex items-center gap-4 justify-center ">
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
        </div>
     
        <div className="flex items-center justify-end cursor-pointer  gap-3">
          {type === "integration" ? (
              <button 
                className="flex items-center gap-3 text-[#007AF5]"
                onClick={handleNewIntegration}
              >
                <span className="text-[14px] font-semibold uppercase">
                  New Integration
                </span>
                <PlusIcon className="w-5 h-5" />
              </button>
            ) : type === "listing" || type === "view" ? (
              <button 
                className="flex items-center gap-3 text-[#007AF5]"
                onClick={handleNewConnection}
              >
                <span className="text-[14px] font-semibold uppercase">
                  New Connection
                </span>
                <PlusIcon className="w-5 h-5" />
              </button>
            ) : type === "company" ? null :(
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
            )}
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
