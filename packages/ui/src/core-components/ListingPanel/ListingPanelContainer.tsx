import React from 'react'
import { ListingPanelTopSection, SortingHeader } from '.'
import { Plus } from 'lucide-react'
import { FilterOption } from '../FilterTabs'
import { SortOrder } from './SortingHeader'

interface ListingPanelContainerProps {
    // Container props
    className?: string;
    width?: string;
    height?: string;

    // Top Section props
    backButtonTo?: string;
    backButtonLabel?: string;
    onBackButtonClick?: () => void;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filterOptions?: FilterOption[];
    defaultFilterSelected?: FilterOption;
    onFilterChange?: (selected: FilterOption) => void;
    topSectionClassName?: string;
    backButtonClassName?: string;
    searchBoxClassName?: string;
    filterTabsClassName?: string;

    // Sorting Header props
    totalRecords?: number;
    sortList?: SortOrder;
    setSortList?: (sortList: SortOrder) => void;
    sortByText?: string;
    recordsText?: string;
    sortingHeaderClassName?: string;
    leftSectionClassName?: string;
    rightSectionClassName?: string;

    // Bottom Button props
    onBottomBtnClick: () => void;
    bottomButtonText?: string;
    bottomButtonClassName?: string;
    bottomButtonIcon?: React.ReactNode;
    bottomButtonIconClassName?: string;
    bottomButtonTextClassName?: string;
    children?: React.ReactNode;
}

export default function ListingPanelContainer({
    // Container props
    className,
    width = "350px",
    height = "calc(100vh-120px)",
    children,

    // Top Section props
    backButtonTo,
    backButtonLabel,
    onBackButtonClick,
    searchValue,
    onSearchChange,
    searchPlaceholder,
    filterOptions,
    defaultFilterSelected,
    onFilterChange,
    topSectionClassName,
    backButtonClassName,
    searchBoxClassName,
    filterTabsClassName,

    // Sorting Header props
    totalRecords = 100,
    sortList = "none",
    setSortList = () => { },
    sortByText,
    recordsText,
    sortingHeaderClassName,
    leftSectionClassName,
    rightSectionClassName,

    // Bottom Button props
    onBottomBtnClick,
    bottomButtonText = "New List",
    bottomButtonClassName,
    bottomButtonIcon = <Plus className="h-5 w-5 font-medium text-white" />,
    bottomButtonIconClassName,
    bottomButtonTextClassName
}: ListingPanelContainerProps) {
    return (
        <div className={`space-y-1 relative w-[${width}] h-[${height}] ${className || ''}`}>
            <ListingPanelTopSection
                backButtonTo={backButtonTo}
                backButtonLabel={backButtonLabel}
                onBackButtonClick={onBackButtonClick}
                searchValue={searchValue}
                onSearchChange={onSearchChange}
                searchPlaceholder={searchPlaceholder}
                filterOptions={filterOptions}
                defaultFilterSelected={defaultFilterSelected}
                onFilterChange={onFilterChange}
                className={topSectionClassName}
                backButtonClassName={backButtonClassName}
                searchBoxClassName={searchBoxClassName}
                filterTabsClassName={filterTabsClassName}
            />
            <SortingHeader
                totalRecords={totalRecords}
                sortList={sortList}
                setSortList={setSortList}
                sortByText={sortByText}
                recordsText={recordsText}
                className={sortingHeaderClassName}
                leftSectionClassName={leftSectionClassName}
                rightSectionClassName={rightSectionClassName}
            />
            {children}
            <div className="absolute bottom-0 left-0 right-0">
                <button
                    onClick={onBottomBtnClick}
                    className={`gap-3 rounded-[8px] flex text-center justify-center items-center py-5 h-[60px] hover:opacity-90 hover:bg-[#0D0844] text-white bg-[#0D0844] w-full ${bottomButtonClassName || ''}`}
                >
                    <div className={bottomButtonIconClassName}>
                        {bottomButtonIcon}
                    </div>
                    <span className={`uppercase text-[14px] font-medium tracking-[0px] leading-[20px] text-white ${bottomButtonTextClassName || ''}`}>
                        {bottomButtonText}
                    </span>
                </button>
            </div>
        </div>
    )
}
