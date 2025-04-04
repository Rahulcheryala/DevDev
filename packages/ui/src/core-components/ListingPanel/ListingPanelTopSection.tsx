import React from 'react'
import BackGradiantButton from '../BackGradiantButton'
import FilterTabs, { FilterOption } from '../FilterTabs'
import SearchBox from '../SearchBox'

interface ListingPanelTopSectionProps {
    backButtonTo?: string;
    backButtonLabel?: string;
    onBackButtonClick?: () => void;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filterOptions?: FilterOption[];
    defaultFilterSelected?: FilterOption;
    onFilterChange?: (selected: FilterOption) => void;
    className?: string;
    backButtonClassName?: string;
    searchBoxClassName?: string;
    filterTabsClassName?: string;
}

export default function ListingPanelTopSection({
    backButtonTo = "/",
    backButtonLabel = "Back",
    onBackButtonClick,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search",
    filterOptions = ["All", "System", "User Defined"],
    defaultFilterSelected = "All",
    onFilterChange,
    className,
    backButtonClassName,
    searchBoxClassName,
    filterTabsClassName
}: ListingPanelTopSectionProps) {
    return (
        <div className={`mb-3 max-w-[350px] mx-auto py-4 space-y-6 bg-white rounded-zeak ${className || ''}`}>
            <div className={backButtonClassName}>
                <BackGradiantButton
                    label={backButtonLabel}
                    textClassName={backButtonClassName}
                    onClick={onBackButtonClick}
                />
            </div>
            <SearchBox
                value={searchValue}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
                className={searchBoxClassName}
            />
            <FilterTabs
                options={filterOptions}
                defaultSelected={defaultFilterSelected}
                onChange={onFilterChange}
                className={filterTabsClassName}
            />
        </div>
    )
}
