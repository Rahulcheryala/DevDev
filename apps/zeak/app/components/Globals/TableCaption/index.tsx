import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@zeak/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { LuChevronsUpDown } from "react-icons/lu";
import { cn } from "@zeak/react";

type TableHeadProps = {
  title: string;

};

const TableCaption: React.FC<TableHeadProps> = ({
  title,
}) => {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <th className={cn("relative px-3 py-2 border-b bg-muted/90 backdrop-blur-sm")}> 
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <span className="font-medium cursor-pointer" >{title}</span>
          
            <span className="flex items-center">
            <LuChevronsUpDown />
            </span>

        </div>

        <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger>
            <HiEllipsisVertical className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 p-2">
              
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100" >

               Hi
                </button>
              
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </th>
  );
};

export default TableCaption;