
import { IoSearch, IoFilterOutline } from "react-icons/io5";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { BsDiagram3 } from "react-icons/bs";
import { CiRedo } from "react-icons/ci";
import { BsPaperclip } from "react-icons/bs";
import type { ColumnFilter, Table } from "@tanstack/react-table";
import { cn } from "@zeak/react";
import { PlusIcon } from "lucide-react";



interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    showColumnSearch: boolean;
    setShowColumnSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
    isCompact: boolean;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
    onAddNewRow: () => void;
}

export default function SideViewToolBar<TData>({
    table,
    setIsCompact,
    isCompact,
    setShowColumnSearch,
    showColumnSearch,
    onAddNewRow
}: DataTableToolbarProps<TData>) {

    return (
        <div className="rounded-lg   bg-[#F8FAFE] ">
            {/* Top section */}
            <div className="flex items-center justify-end cursor-pointer  gap-3 py-5">
                <button onClick={onAddNewRow} className="flex items-center gap-3 text-[#007AF5] ">
                    <span className="text-[14px] font-semibold">
                        New Value
                    </span>
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
            {/* Bottom half */}
            <div className="flex items-center justify-between pl-2 px-4 py-2">
                <div className="relative">
                    <IoSearch className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#475467]" />
                    <input
                        placeholder="Search"
                        className=" h-[44px] bg-white py-2 pl-10 pr-4 rounded-[8px]  focus-within:outline-none w-[400px]"
                        value={table.getState().globalFilter ?? ""}
                        onChange={(event) => table.setGlobalFilter(event.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="flex space-x-3 text-black items-center justify-end">
                    {/* filter icon */}
                    <div onClick={() => setShowColumnSearch} className={cn("p-[10px]  rounded-zeak", showColumnSearch && "bg-[#D3DFE8]")}>
                        <IoFilterOutline className="h-5 w-5 cursor-pointer text-[#475467]" />
                    </div>
                    <AiOutlineColumnHeight
                        onClick={() => setIsCompact(!isCompact)}
                        className="h-5 w-5 cursor-pointer m-[10px] text-[#475467]"
                    />
                    {/* diagram icon */}
                    <div className={cn("p-[10px]  rounded-zeak")}>
                        <BsDiagram3 className="h-5 w-5 cursor-pointer text-[#475467] " />
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

                    </div>


                </div>
            </div>

        </div>
    );
}
