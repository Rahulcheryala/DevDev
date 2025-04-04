import { ChevronDown, Trash2, PenLine, LayoutTemplate, Plus, List, Rocket } from 'lucide-react';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../index';

export const Separator = () => {
    return (
        <div className="flex w-full flex-col items-start rounded-t-[12px] bg-white">
            {/* First section - exactly 60px height */}
            <div className="flex items-center w-full px-4 h-[60px]">
                <div className="flex-1 flex items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <LayoutTemplate className="h-4 w-4" />
                                <span className="font-['Suisse_Int'l] text-[14px] font-medium leading-[20px] tracking-[0.2px] text-[#475467]">
                                    DEFAULT VIEW
                                </span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Default View</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Centered List section with dividers */}
                    <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <List className="h-4 w-4" />
                                    <span className="font-['Suisse_Int'l] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]">
                                        List
                                    </span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>List View</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="ghost"
                            className="text-gray-400 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
                            disabled
                        >
                            <Trash2 className="h-4 w-4 mr-2 text-[#9BA2AC]" />
                            <span className="font-['Suisse_Int'l] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#9BA2AC]">
                                Delete
                            </span>
                        </Button>

                        <Button variant="ghost" className="flex items-center gap-3 px-[28px] py-[14px]">
                            <PenLine className="h-4 w-4" />
                            <span className="font-['Suisse_Int'l] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]">
                                Edit
                            </span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Rocket className="h-4 w-4" />
                                    <span className="font-['Suisse_Int'l] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]">
                                        Actions
                                    </span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Action 1</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Button variant="default" className="font-['Suisse_Int'l'] text-[14px] font-semibold leading-[20px] tracking-[0.2px] text-[#007AF5] flex items-center gap-2">
                        NEW
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Separator