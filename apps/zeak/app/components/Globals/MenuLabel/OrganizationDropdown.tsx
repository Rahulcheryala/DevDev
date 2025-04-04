import { XcelprosIcon, ArrowDown } from "@zeak/icons";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/Common/Components";

export const OrganizationDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                className="w-[160px] h-[44px] rounded-[8px] py-3 pl-4 pr-2 mx-3 bg-[#FFFFFF] flex items-center justify-between"
                data-variant="ghost"
                data-size="icon"
            >
                <div className="flex items-center gap-2">
                    <XcelprosIcon
                        className="w-4 h-4 text-[#677281]"
                    />
                    <span className="text-[#0D0C22] text-[14px] font-weight-400 line-height-15 letter-spacing-0.5">
                        Xcelpros
                    </span>
                </div>
                <ArrowDown
                    className="w-[11.67px] h-[5.83px] text-[#677281]"
                />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1C1C1C] border-[#2A2A2A]">
            <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-[#2A2A2A] text-white">
                <div className="bg-[#E97458] rounded-full w-6 h-6 flex items-center justify-center text-white">
                    X
                </div>
                <span>Xcelpros</span>
                <span className="ml-auto">✓</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
) 