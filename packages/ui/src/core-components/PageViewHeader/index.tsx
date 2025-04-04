import React, { createElement } from 'react';
import { cn } from '../../utils';
import { CalendarDate } from '@internationalized/date';
import { Button } from '../Button';
import ChevronNavigation from '../ChevronNavigation';
import Tabs from '../Tabs';

export interface NavigationTabProps {
    label: string;
    value: string;
    disabled?: boolean;
}

interface Action {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    variant?: 'link' | 'outline' | 'ghost' | 'primary' | 'secondary' | 'solid' | 'destructive' | 'white' | 'custom' | 'blue' | 'warning' | 'outline-primary';
    disabled?: boolean;
}

export interface PageViewHeaderProps {
    onGoBack?: () => void;
    organization?: Array<Record<string, string>>;
    title: string;
    showLogo?: boolean;
    logo?: React.ReactNode;
    showTitleDropdown?: boolean;
    onTitleDropdownClick?: () => void;
    status?: 'active' | 'inactive';
    metadata: {
        since: CalendarDate;
        departments: string[];
        email: string;
        phone: string;
    };
    navigationTabs: NavigationTabProps[];
    defaultTab?: string;
    showNavigation?: boolean;
    prevItem: string;
    nextItem: string;
    activePage: number;
    totalItems: number;
    onPrevClick: (id: number) => void;
    onNextClick: (id: number) => void;
    topActions?: {
        actions?: Action[];
        customContent?: React.ReactNode;
    };
    notes?: {
        label?: string;
        icon?: React.ComponentType<{ size?: number | string; className?: string }> | React.ReactElement;
        onClick?: () => void;
    };
};

const PageViewHeader: React.FC<PageViewHeaderProps> = ({
    onGoBack,
    organization,
    showLogo = false,
    logo,
    title,
    showTitleDropdown = false,
    onTitleDropdownClick,
    status = 'active',
    metadata,
    navigationTabs,
    defaultTab,
    showNavigation = false,
    prevItem,
    nextItem,
    activePage,
    totalItems,
    onPrevClick,
    onNextClick,
    topActions,
    notes = {
        label: "Notes",
    }
}) => {
    const TopActions = () => {
        if (!topActions) return null;

        const { actions, customContent } = topActions;

        if (customContent) {
            return <div className="flex items-center gap-2">{customContent}</div>;
        }

        if (actions?.length) {
            return (
                <div className="flex items-center gap-2">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={`${action.label}-${index}`}
                                variant={action.variant || 'ghost'}
                                onClick={action.onClick}
                                disabled={action.disabled}
                                className="flex items-center gap-2"
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                {action.label}
                            </Button>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    const renderIcon = (icon?: React.ComponentType<{ size?: number | string; className?: string }> | React.ReactElement) => {
        if (!icon) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M4.8 16C3.11984 16 2.27976 16 1.63803 15.673C1.07354 15.3854 0.614601 14.9265 0.32698 14.362C0 13.7202 0 12.8802 0 11.2L0 4.8C0 3.11984 0 2.27976 0.32698 1.63803C0.614601 1.07354 1.07354 0.614601 1.63803 0.326981C2.27976 0 3.11984 0 4.8 0L15.2 0C16.8802 0 17.7202 0 18.362 0.326981C18.9265 0.614601 19.3854 1.07354 19.673 1.63803C20 2.27976 20 3.11984 20 4.8V11.2C20 12.8802 20 13.7202 19.673 14.362C19.3854 14.9265 18.9265 15.3854 18.362 15.673C17.7202 16 16.8802 16 15.2 16H4.8Z" fill="#9BA2AC" />
                </svg>
            );
        }

        if (typeof icon === 'function') {
            const IconComponent = icon;
            return <IconComponent size={20} className="text-gray-500" />;
        }

        return createElement(icon, {
            size: 20,
            className: "text-gray-500"
        });
    };

    return (
        <div className="flex flex-col items-start h-[240px] self-stretch w-full shadow-lg rounded-lg">
            <div className="h-[180px] w-full flex flex-col gap-2 p-[8px_8px_0px_24px] bg-[#F0F4FD] rounded-lg">
                {/* Top Navigation */}
                <div className="flex items-center justify-between w-full px-2 py-2">
                    {organization?.length > 0 && <div className="text-[#677281] font-['Suisse_Int'l'] text-sm font-normal leading-5 tracking-[0.5px] flex items-center gap-1">
                        {onGoBack && <div role="button" aria-label="Go back" tabIndex={0} onClick={onGoBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none" className="inline-block mr-2">
                                <path d="M6 11L1 6L6 1" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>}
                        {organization.map((item, index) => (
                            <div role="button" aria-label={item.label} tabIndex={0} key={index} onClick={() => {
                                if (item.link) {
                                    window.location.href = item.link;
                                }
                            }} className={cn({ "cursor-pointer": item.link })}>{item.label} {index < organization.length - 1 && " / "}</div>
                        ))}
                    </div>}
                    <TopActions />
                </div>

                {/* Team Header */}
                <div className="flex items-center justify-between w-full px-2 py-3">
                    <div className="flex items-center gap-4">
                        {showLogo && (
                            logo || <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center">
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
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-[#101828] font-['Suisse_Int'l'] text-[36px] font-[450] leading-9 tracking-[0.2px] text-edge-cap mr-2">
                                    {title}
                                </h1>
                                {showTitleDropdown && <div className="flex items-center gap-1" onClick={onTitleDropdownClick} role="button" aria-label="Title dropdown" tabIndex={0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 8L12 16L4 8" stroke="#677281" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>}
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
                    {showNavigation && <ChevronNavigation
                        prevItem={prevItem}
                        nextItem={nextItem}
                        activePage={activePage}
                        totalItems={totalItems}
                        onPrevClick={onPrevClick}
                        onNextClick={onNextClick}
                    />}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex h-[60px] px-4 items-center gap-6 self-stretch bg-white rounded-b-lg">
                <div className="flex items-center gap-6">
                    <Tabs variant="underline"
                        items={navigationTabs}
                        defaultTab={defaultTab || navigationTabs[0].value}
                        backgroundColor="#FFFFFF"
                    >
                    </Tabs>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="md"
                        className="text-[#475467] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.028px] flex items-center gap-2"
                        onClick={notes?.onClick}
                    >
                        {renderIcon(notes?.icon)}
                        {notes?.label}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PageViewHeader;

export { PageViewHeader };