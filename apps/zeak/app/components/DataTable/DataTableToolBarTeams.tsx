import { FaRunning } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { IoRocketOutline, IoSearch, IoFilterOutline } from "react-icons/io5";
import { AiOutlineColumnHeight, AiOutlineMore } from "react-icons/ai";
// import { TbTable } from "react-icons/tb";
import { BsDiagram3 } from "react-icons/bs";
import { CiRedo } from "react-icons/ci";
import { BsPaperclip } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import type { Table } from "@tanstack/react-table";
import DataTableFacetFilterTeams from "./DataTableFacetFilterTeams";
import { CSVLink } from "react-csv";
import DataTableView from "./DataTableView";
import { MdFormatListBulleted } from "react-icons/md";
import { Link } from "@remix-run/react";
import { LiaRunningSolid } from "react-icons/lia";



interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
  isCompact: boolean;
  addNewPath: string;
}

export default function DataTableToolbarTeams<TData>({
  table,
  data,
  setIsCompact,
  isCompact,
  addNewPath
}: DataTableToolbarProps<TData>) {
  return (
    <div className="p-5 rounded-lg shadow-lg xl:max-w-full bg-white space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <DataTableView />
        </div>
        <div className="flex items-center gap-4 ">
          <div className="flex items-center gap-2 border-r pr-4">
            <MdFormatListBulleted />
            List
          </div>
          <div className="flex items-center gap-2 border-r pr-4">
            <RiDeleteBin6Line />
            Delete
          </div>
          <div className="flex items-center gap-2 border-r pr-4">
            <BiEditAlt />
            Edits
            <FaChevronDown className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-2">
            <IoRocketOutline />
            Actions
            <FaChevronDown className="h-3 w-3" />
          </div>
        </div>
        <Link to={addNewPath}>
          <div className="text-blue-600">New +</div>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        {table.getColumn("status")?.getIsVisible() && (
          <DataTableFacetFilterTeams column={table.getColumn("status")!} />
        )}

        {/* <div className="flex items-center gap-2">
          More
          <FaChevronDown className="h-3 w-3" />
        </div> */}
        <div className="flex rounded-[8px] bg-[#F0F4FD] items-center h-[44px] w-[248px] py-2 px-4 justify-around">
          <IoSearch className="h-5 w-5" />
          <input
            placeholder="Search"
            className="bg-[#F0F4FD] w-2/3 focus-within:outline-none"
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
          <IoFilterOutline />
        </div>
        <div className="flex justify-between w-1/3">
          {/* <AiOutlineColumnHeight
            onClick={() => setIsCompact(!isCompact)}
            className="h-5 w-5 cursor-pointer"
          /> */}
          <LiaRunningSolid className="h-5 w-5" />
          <BsDiagram3 className="h-5 w-5" />
          <IoFilterOutline className="h-5 w-5" />
          <CiRedo className="h-5 w-5" />
          <BsPaperclip className="h-5 w-5" />
          <CSVLink data={data as object[]}>Export</CSVLink>
          <AiOutlineMore className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
