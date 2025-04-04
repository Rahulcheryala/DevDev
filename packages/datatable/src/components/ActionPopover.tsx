import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { EditIcon,  } from "@zeak/icons";
import {CopyIcon, Trash, CircleCheck} from "lucide-react"
import { HiEllipsisVertical } from "react-icons/hi2";

export const ActionPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="w-[40px] h-[40px] flex items-center justify-center hover:bg-[#F2F2F7] rounded-full">
        <HiEllipsisVertical className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent className="rounded-zeak w-[200px] p-0 ">
        <div className="flex flex-col gap-2">
            <div className="">
               
                <button className="h-[56px] px-6 hover:bg-[#F2F2F7] w-full flex items-center gap-2">
                    <EditIcon className="w-5 h-5" />
                    <span>Edit</span>
                </button>
            </div>
            <div className="">
                <button className="h-[56px] px-6 hover:bg-[#F2F2F7] w-full flex items-center gap-2">
                    <Trash className="w-5 h-5" />
                    <span>Delete</span>
                </button>
                </div>
                <div className="">
                    <button className="h-[56px] px-6 hover:bg-[#F2F2F7] w-full flex items-center gap-2">
                        <CopyIcon className="w-5 h-5" />
                        <span>Duplicate</span>
                    </button>
            </div>
                    <div className="">
                        <button className="h-[56px] px-6 hover:bg-[#F2F2F7] w-full flex items-center gap-2">
                            <CircleCheck className="w-5 h-5" />
                            <span>Activate</span>
                        </button>
                    </div>
          
        </div>
      </PopoverContent>
    </Popover>
  );
};
