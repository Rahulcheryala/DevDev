import React from 'react'
import { ChevronDown, Edit, MoreHorizontal, X } from 'lucide-react';
import { Button } from '../../index';

interface MenubarProps {
    organization: string;
}

const TopActions: React.FC = () => (
    <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="md" className="h-12 px-6 text-[#0D0C22] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]">
            <Edit className="h-4 w-4 mr-1.5" />
            Edit
        </Button>
        <Button variant="ghost" size="md" className="text-[#0D0C22] min-w-8 h-8 px-1">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="md" className="text-[#0D0C22] min-w-8 h-8 px-2 flex items-center">
            <span className="mr-1">More</span>
            <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="md" className="text-[#0D0C22] min-w-8 h-8 px-2">
            <X className="h-6 w-6 text-[#0D0C22]" />
        </Button>
    </div>
);

export const Menubar: React.FC<MenubarProps> = ({ organization }) => {
    return (
        <div className="h-[80px] w-full flex flex-col gap-4 p-[8px_8px_0px_24px] bg-[#C6D2E7]">
            {/* Top Navigation */}
            <div className="flex items-center w-full px-4 py-2">
                <div className="text-[#677281] font-['Suisse_Int'l'] text-sm font-normal leading-5 tracking-[0.5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none" className="inline-block mr-4">
                        <path d="M6 11L1 6L6 1" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {organization}
                </div>
                <TopActions />
            </div>
        </div>
    )
}

export default Menubar