import { ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../utils'

export type SortOrder = "none" | "asc" | "desc";

interface SortingHeaderProps {
    totalRecords: number;
    sortList: SortOrder;
    setSortList: (sortList: SortOrder) => void;
    sortByText?: string;
    recordsText?: string;
    className?: string;
    leftSectionClassName?: string;
    rightSectionClassName?: string;
}

export default function ListingPanelHeader({
    totalRecords,
    sortList,
    setSortList,
    sortByText = "Sort By",
    recordsText = "Records",
    className,
    leftSectionClassName,
    rightSectionClassName
}: SortingHeaderProps) {
    const handleSortClick = () => {
        if (sortList === "none") setSortList("asc");
        else if (sortList === "asc") setSortList("desc");
        else setSortList("none");
    };

    const renderSortIcon = () => {
        if (sortList === "none") return <ChevronsUpDown className="w-4 h-4 cursor-pointer" onClick={handleSortClick} />;
        if (sortList === "asc") return <ChevronUp className="w-4 h-4 cursor-pointer" onClick={handleSortClick} />;
        return <ChevronDown className="w-4 h-4 cursor-pointer" onClick={handleSortClick} />;
    };

    return (
        <div className={cn("px-4 py-3 rounded-t-zeak bg-white flex justify-between items-center", className)}>
            <div className={cn("flex items-center gap-2 text-sm", leftSectionClassName)}>
                <span>{sortByText}</span>
                {renderSortIcon()}
            </div>
            <div className={cn("flex items-center gap-2", rightSectionClassName)}>
                <span>{totalRecords}</span>
                <span>{recordsText}</span>
            </div>
        </div>
    )
}
