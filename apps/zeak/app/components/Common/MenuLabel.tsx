import {
  HStack,
  IconButton,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@zeak/react";
import {SearchIcon, ChevronDown} from "lucide-react"
import { FiPlus } from "react-icons/fi";
import ModeSwitcher from "./ModeSwithcer";
import { Link} from "@remix-run/react";
import {Avatar} from "@zeak/react"
import {BuildingIcon5} from "@zeak/icons"


import {

  WebNotification,

  ZeakLogo, TaskIcon, PlugIcon, WebShare,
  
} from "@zeak/icons";

const MenuLabel = () => {


  return (
       
          <div className="grid bg-background text-foreground px-6 h-[72px] py-3 top-0 sticky z-10 space-x-4 grid-cols-[1fr_auto_1fr] items-center">
            <div className="inline-flex items-center">
              <Link to={"/"} className="inline-flex items-center">
                <ZeakLogo />
              </Link>
            </div>
            {/* <Search /> */}
            {/* Search Input */}
            <div className="flex items-center relative ">
            <Input placeholder="Search" className="pl-10 w-[384px] h-[48px] 2xl:w-[600px] border-none  " />
              <SearchIcon className="w-5 h-5 text-muted-foreground absolute left-4" />
            </div>
            
            {/* Task Icon */}
            <HStack className="justify-end space-x-0 gap-5">
              <HStack className="gap-2 space-x-0">
                <TaskIcon className="h-5" />
                <PlugIcon />
                <div className="w-[40px] h-[40px] relative">
                  <span className="absolute top-[9px] right-[12px] inline-flex items-center justify-center rounded-full w-[8px] h-[8px] bg-white">
                    <span className="w-[6px] h-[6px] rounded-full bg-destructive inline-flex"></span>
                  </span>
                  <IconButton
                    icon={<WebNotification />}
                    variant="ghost"
                    type="submit"
                    className="w-[40px] h-[40px] text-secondary p-0"
                    aria-label={""}
                  />
                </div>
                <ModeSwitcher />
                <FiPlus />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>

                <div className="bg-white h-11 w-[160px] justify-between flex items-center rounded-[12px] py-3 px-4">
                  <div className="flex items-center gap-2">
                    <BuildingIcon5 />
                    <span className="text-sm font-sans font-normal text-secondary">Xcelpros</span>
                  </div>
                  <ChevronDown />
                </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      Xcelpros
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Avatar className="w-[40px] h-[40px]" />
              </HStack>
              
            </HStack>
          </div>
        
  );
};

export default MenuLabel;
