import React, { useState } from 'react'
import { Checkbox } from '../Checkbox'

// Define generic type for items
export interface SelectableItem {
    id: string;
    primaryLabel: string;
    secondaryLabel?: string;
}

export interface SelectorProps<T extends SelectableItem> {
    items: T[];
    onSelectionChange?: (selectedId: string | null) => void;
    searchPlaceholder?: string;
    className?: string;
    defaultSelectedId?: string | null;
    // Custom filter function
    filterFn?: (item: T, searchQuery: string) => boolean;
    // Custom render function for item content
    renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default function CompanySelector<T extends SelectableItem>({
    items,
    onSelectionChange,
    searchPlaceholder = "Search",
    className = "w-[471px]",
    defaultSelectedId = null,
    filterFn,
    renderItem,
}: SelectorProps<T>) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId)

    const defaultFilterFn = (item: T, query: string) => {
        const searchLower = query.toLowerCase();
        return (
            item.primaryLabel.toLowerCase().includes(searchLower) ||
            (item.secondaryLabel?.toLowerCase().includes(searchLower) ?? false)
        );
    };

    const filteredItems = items.filter(item =>
        (filterFn || defaultFilterFn)(item, searchQuery)
    )

    const handleSelection = (id: string) => {
        const newSelection = selectedId === id ? null : id;
        setSelectedId(newSelection);
        onSelectionChange?.(newSelection);
    };

    const defaultRenderItem = (item: T, isSelected: boolean) => (
        <div className="flex items-center gap-4">
            <span className="text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#101828]">
                {item.primaryLabel}
            </span>
            {item.secondaryLabel && (
                <span className="text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#9BA2AC]">
                    {item.secondaryLabel}
                </span>
            )}
        </div>
    );

    return (
        <div className={`${className} bg-white rounded-xl shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)]`}>
            <div className="p-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F0F4FD] rounded-lg">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="bg-transparent w-full text-[#475467] focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="divide-y divide-[#E4E7EC]">
                {filteredItems.map(item => (
                    <div
                        key={item.id}
                        className={`flex h-[56px] px-6 items-center justify-between hover:bg-[#F0F4FD] cursor-pointer ${selectedId === item.id ? 'bg-[#F0F4FD]' : ''
                            }`}
                        onClick={() => handleSelection(item.id)}
                    >
                        {(renderItem || defaultRenderItem)(item, selectedId === item.id)}
                        {selectedId === item.id && (
                            <Checkbox
                                checked={true}
                                className="rounded-full border-[#9BA2AC] data-[state=checked]:bg-black data-[state=checked]:text-white"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};