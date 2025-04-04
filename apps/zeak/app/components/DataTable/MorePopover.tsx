import { useDatatableStore } from "./useDatatableStore";
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { AiOutlineMore } from "react-icons/ai";
import { handleDownloadCSV } from "./utils";
import { ColumnVisibility } from "./ColumnVisibility";
import { Table } from "@tanstack/react-table";
export const MorePopover = ({columns, table}: {columns: any[], table: Table<any>}) => {
    const { enableAlternateRowColor, setEnableAlternateRowColor } = useDatatableStore();


    return (
        <Popover>
            <PopoverTrigger>
                <AiOutlineMore className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent className="rounded-zeak w-[200px] p-0 ">
                <div className="flex flex-col gap-2">
                   <button onClick={() => setEnableAlternateRowColor(!enableAlternateRowColor)} className="h-[56px] px-6 hover:bg-[#F2F2F7] w-full flex items-center gap-2">
                    Alternate Row Color
                   </button>
                   <button onClick={() => handleDownloadCSV(columns)} className="h-[56px] px-6 hover:bg-[#F2F2F7] w-full flex items-center gap-2">
                    Download CSV
                   </button>
                   <ColumnVisibility table={table} />
                </div>
            </PopoverContent>
        </Popover>
    )
}