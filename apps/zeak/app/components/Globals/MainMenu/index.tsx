import React from 'react';
import { Search, ChevronDown, MoreVertical, Trash2, PenLine, LayoutTemplate, Plus, RotateCw, Network, AlignLeft } from 'lucide-react';
import {
    Button,
    Input,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@zeak/react';

const MainMenu = () => {
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
                                    List
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
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>

                        <Button variant="ghost" className="flex items-center gap-3 px-[28px] py-[14px]">
                            <PenLine className="h-4 w-4" />
                            Edit
                            <ChevronDown className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    Actions
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

            {/* Second section - exactly 60px height */}
            <div className="flex items-center justify-between w-full px-4 h-[60px] relative">
                {/* Smart Filters */}
                <div className="h-[60px] px-3 flex flex-col justify-center items-center gap-[-3px] relative">
                    <Button
                        variant="outline"
                        className="font-inter text-[11px] font-bold leading-[14px] tracking-[-0.44px] flex items-center gap-2"
                    >
                        <span className="bg-gradient-to-b from-[#8E21E2] to-[#2440E0] bg-clip-text text-transparent">
                            SMART FILTERS
                        </span>
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-gray-200 rounded-full text-white">
                            0
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 9L12 16L5 9" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                    <div className="absolute bottom-0 w-[165px] h-[3px] rounded-t-[12px] bg-gradient-to-r from-[#F80EDA] to-[#283FE0]" />
                </div>

                {/* Centered Search Box */}
                <div className="flex justify-between items-center w-[400px] max-w-[500px] h-[44px] bg-[#F0F4FD] rounded-lg px-4 absolute left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 w-full">
                        <Search className="h-4 w-4 text-[#475467] flex-shrink-0" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none w-full focus:ring-0 focus:outline-none p-0 h-full
                                font-['Suisse_Int'l'] text-[14px] font-normal leading-[28px] tracking-[0.2px] text-[#475467]
                                placeholder:text-[#475467] placeholder:font-['Suisse_Int'l'] placeholder:text-[14px] 
                                placeholder:font-normal placeholder:leading-[28px] placeholder:tracking-[0.2px]
                                focus:placeholder-transparent"
                        />
                    </div>
                </div>

                {/* Right Actions - now properly aligned to the right */}
                <div className="flex items-center gap-3 ml-auto">
                    <Button variant="ghost" className="p-[10px] rounded-[12px]">
                        <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="p-[10px] rounded-[12px]">
                        <Network className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="p-[10px] rounded-[12px]">
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="p-[10px] rounded-[12px]">
                        Export
                    </Button>
                    <Button variant="ghost" className="p-[10px] rounded-[12px]">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
