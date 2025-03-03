import { Header, flexRender } from "@tanstack/react-table";
import { LuChevronsUpDown, LuFilter } from "react-icons/lu";
import { cn, Input, } from "@zeak/react";
import { FilterLinesIcon, DotsVerticalIcon } from "@zeak/icons";


export const TableHeadContent = ({ header }: { header: Header<any, any> }) => {
    return <div className="px-3 space-y-4">
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() && <LuChevronsUpDown className="w-4 h-4" />}
            </div>
            {header.column.getCanFilter() && <div className="">
                <DotsVerticalIcon className="w-4 h-4" />
            </div>}
        </div>
        {header.column.getCanFilter() && <div className="flex items-center gap-2">
            <Input placeholder="Search" className="h-10 border-none" />
            <button className="bg-gray-100 p-2 rounded-md">
                <FilterLinesIcon className="w-4 h-4" />
            </button>
        </div>}
    </div>
}