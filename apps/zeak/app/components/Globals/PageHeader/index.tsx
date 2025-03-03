import React from 'react';
import { ChevronDown, Edit, MoreHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@zeak/react';

interface NavigationTabProps {
    label: string;
    isActive?: boolean;
}

interface PageHeaderProps {
    organization: string;
    title: string;
    status?: 'active' | 'inactive';
    metadata: {
        since: string;
        departments: string[];
        email: string;
        phone: string;
    };
    navigationTabs: string[];
    currentPage?: number;
    totalPages?: number;
}

const NavigationTab: React.FC<NavigationTabProps> = ({ label, isActive }) => (
    <Button
        variant="ghost"
        className={`h-[60px] px-3 font-['Suisse_Int'l'] text-base leading-5 tracking-[0.2px] relative ${isActive
            ? 'text-[#0D0C22] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#007AF5] after:rounded-t-[3px]'
            : 'text-[#475467] font-[450]'
            }`}
    >
        {label}
    </Button>
);

const TopActions: React.FC = () => (
    <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="md" className="h-12 px-6 text-[#475467] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]">
            <Edit className="h-4 w-4 mr-1.5" />
            Edit
        </Button>
        <Button variant="ghost" size="md" className="h-12 px-6 text-[#475467] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]">
            <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 12H16M16 12L13 9M16 12L13 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Block Sign-In
        </Button>
        <Button variant="ghost" size="md" className="text-gray-500 min-w-8 h-8 px-2">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="md" className="text-gray-500 min-w-8 h-8 px-2 flex items-center">
            <span className="mr-1">More</span>
            <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="md" className="text-gray-500 min-w-8 h-8 px-2">
            <X className="h-6 w-6 text-[#677281]" />
        </Button>
    </div>
);

const Pagination: React.FC<{ current: number; total: number }> = ({ current, total }) => (
    <div className="flex items-center gap-1 bg-white rounded-xl py-1 px-2 ml-auto">
        <Button variant="ghost" size="sm" className="text-gray-500 min-w-6 h-6 px-1 hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm text-[#007AF5] font-medium">{current}</div>
        <div className="text-sm text-gray-500 font-medium">/ {total}</div>
        <Button variant="ghost" size="sm" className="text-gray-500 min-w-6 h-6 px-1 hover:bg-gray-50">
            <ChevronRight className="h-4 w-4" />
        </Button>
    </div>
);

const PageHeader: React.FC<PageHeaderProps> = ({
    organization,
    title,
    status = 'active',
    metadata,
    navigationTabs,
    currentPage = 1,
    totalPages = 1,
}) => {
    return (
        <div className="flex flex-col items-start h-[240px] self-stretch w-full shadow-lg">
            <div className="h-[180px] w-full flex flex-col gap-4 p-[8px_8px_0px_24px] bg-[#F0F4FD]">
                {/* Top Navigation */}
                <div className="flex items-center w-full px-4 py-2 border-b border-gray-200">
                    <div className="text-[#677281] font-['Suisse_Int'l'] text-sm font-normal leading-5 tracking-[0.5px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none" className="inline-block mr-2">
                            <path d="M6 11L1 6L6 1" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {organization}
                    </div>
                    <TopActions />
                </div>

                {/* Team Header */}
                <div className="flex items-center justify-between w-full px-4 py-3">
                    <div className="flex items-center gap-4">
                        <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="22" viewBox="0 0 39 22" fill="none">
                                <path d="M15.125 0H0V4.125H12.3038L15.125 0Z" fill="#E3E8EF" />
                                <path d="M2.75 22H17.875V17.875H5.58135" fill="#E3E8EF" />
                                <path d="M26.1301 12.8822H37.555V9.1179H26.1301V3.77823H21.8214V19.0583C21.8214 19.9366 22.0994 20.6477 22.6692 21.1914C23.2391 21.7351 23.9618 22 24.8514 22H38.5001V18.2358H26.1301V12.8961V12.8822Z" fill="#E3E8EF" />
                                <path d="M38.4851 0.016449H30.1624V3.73945H38.4851V0.016449Z" fill="#E3E8EF" />
                                <path d="M0 22C0 20.6058 0.439085 19.2535 1.2606 18.1242L14.504 0H17.875C17.875 1.39417 17.4359 2.74651 16.6002 3.86185L3.28605 22H0Z" fill="url(#paint0_linear_14000_13012)" />
                                <defs>
                                    <linearGradient id="paint0_linear_14000_13012" x1="8.48212" y1="7.03205e-08" x2="0.273903" y2="29.2426" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#00FF7B" />
                                        <stop offset="1" stop-color="#004DFF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-[#101828] font-['Suisse_Int'l'] text-[36px] font-[450] leading-9 tracking-[0.2px] text-edge-cap mr-2">
                                    {title}
                                </h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 8L12 16L4 8" stroke="#677281" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="flex h-8 px-3 py-1 justify-center items-center gap-2 bg-white text-[#007D1B] rounded-xl font-['Suisse_Int'l'] text-sm font-medium leading-[18px] tracking-[0.2px] capitalize ml-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <rect x="1.5" y="1.5" width="9" height="9" rx="4.5" stroke="#31DE4B" strokeWidth="3" />
                                        <circle cx="6" cy="6" r="3.75" fill="#31DE4B" stroke="white" strokeWidth="1.5" />
                                    </svg>
                                    {status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-[#475467] font-['Suisse_Int'l'] text-sm font-medium leading-5 tracking-[0.2px] uppercase mt-3">
                                <div className="flex items-center gap-1.5 mr-4">
                                    <span className="text-[#677281]">SINCE</span>
                                    <span>{metadata.since}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mr-4">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 21h18M3 7v1m0-1h18M3 7V3h18v4M7 11v6m5-6v6m5-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{metadata.departments[0]}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mr-4">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 21h18M3 7v1m0-1h18M3 7V3h18v4M7 11v6m5-6v6m5-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{metadata.departments[1]}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mr-4">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2m20 0l-10 7L2 6m20 0v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{metadata.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mr-4">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{metadata.phone}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7.66821 17.1674C7.94134 17.1313 8.21724 17.2053 8.43481 17.3729L9.43751 18.1424C9.76896 18.397 10.23 18.397 10.5606 18.1424L11.6012 17.3433C11.7956 17.1942 12.041 17.1285 12.2836 17.1609L13.5853 17.3322C13.9992 17.3868 14.3982 17.1563 14.5584 16.7702L15.0593 15.5591C15.1528 15.3323 15.3324 15.1526 15.5592 15.0591L16.7702 14.5582C17.1563 14.3989 17.3868 13.999 17.3322 13.5851L17.1674 12.3305C17.1313 12.0573 17.2054 11.7814 17.373 11.5638L18.1423 10.5611C18.3969 10.2296 18.3969 9.76852 18.1423 9.43797L17.3433 8.39726C17.1943 8.20282 17.1285 7.95745 17.1609 7.71487L17.3322 6.41305C17.3868 5.99918 17.1563 5.60011 16.7702 5.43993L15.5592 4.93902C15.3324 4.8455 15.1528 4.66588 15.0593 4.43903L14.5584 3.22796C14.3991 2.84186 13.9992 2.61131 13.5853 2.66593L12.2836 2.83723C12.041 2.87056 11.7956 2.80482 11.6021 2.65668L10.5615 1.85762C10.23 1.603 9.76896 1.603 9.43843 1.85762L8.39778 2.65668C8.20335 2.80482 7.958 2.87056 7.71543 2.83908L6.41368 2.66779C5.99983 2.61316 5.60079 2.84371 5.44062 3.22981L4.94066 4.44089C4.84622 4.6668 4.66661 4.84643 4.4407 4.94087L3.22969 5.44086C2.84361 5.60104 2.61307 6.0001 2.6677 6.41398L2.83898 7.71579C2.87046 7.95838 2.80473 8.20374 2.65659 8.39726L1.85758 9.43797C1.60297 9.76944 1.60297 10.2305 1.85758 10.5611L2.65659 11.6018C2.80565 11.7962 2.87139 12.0416 2.83898 12.2842L2.6677 13.586C2.61307 13.9999 2.84361 14.3989 3.22969 14.5591L4.4407 15.06C4.66753 15.1536 4.84715 15.3332 4.94066 15.56L5.44154 16.7711C5.60079 17.1572 6.00076 17.3878 6.41461 17.3331L7.66821 17.1674Z" fill="#007AF5" />
                                        <path d="M7.5 10L9.16667 11.6667L12.9167 7.91667" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination current={currentPage} total={totalPages} />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex h-[60px] px-6 items-center gap-6 self-stretch bg-white rounded-b-lg">
                <div className="flex items-center gap-6">
                    {navigationTabs.map((tab, index) => (
                        <NavigationTab key={index} label={tab} isActive={index === 0} />
                    ))}
                    <Button variant="ghost" size="md" className="text-gray-500 flex items-center gap-1">
                        <span>More</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="md"
                        className="text-[#475467] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.028px] flex items-center gap-2"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 5H1M3 9H1M9 1H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Notes
                    </Button>
                </div>
            </div>
            <div className="h-[2px] w-full bg-[#ACBBD6]"></div>
        </div>
    );
};

export default PageHeader;