import React, { useState } from 'react'
import { Checkbox } from '../Checkbox'

interface User {
    id: string
    name: string
    email: string
    avatar: string
    isSupervisor?: boolean
}

const users: User[] = Array.from({ length: 10 }, (_, i) => ({
    id: `user-${i}`,
    name: `Ryan ${String.fromCharCode(65 + i)}azos`,
    email: `ryanpazos32@pfizerus.com`,
    avatar: 'https://github.com/shadcn.png'
}))

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#9BA2AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const DragIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5.83398" y="1.66602" width="1.66667" height="1.66667" rx="0.833333" fill="#475467" stroke="#475467" strokeWidth="1.5" />
        <rect x="12.5" y="1.66602" width="1.66667" height="1.66667" rx="0.833333" fill="#475467" stroke="#475467" strokeWidth="1.5" />
        <rect x="5.83398" y="9.16602" width="1.66667" height="1.66667" rx="0.833333" fill="#475467" stroke="#475467" strokeWidth="1.5" />
        <rect x="12.5" y="9.16602" width="1.66667" height="1.66667" rx="0.833333" fill="#475467" stroke="#475467" strokeWidth="1.5" />
        <rect x="5.83398" y="16.666" width="1.66667" height="1.66667" rx="0.833333" fill="#475467" stroke="#475467" strokeWidth="1.5" />
        <rect x="12.5" y="16.666" width="1.66667" height="1.66667" rx="0.833333" fill="#475467" stroke="#475467" strokeWidth="1.5" />
    </svg>
)

const CrossIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15 5L5 15M5 5L15 15" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.0007 3.33398V16.6673M3.33398 10.0007H16.6673" stroke="#007AF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export interface Item {
    id: string
    title: string
    subtitle: string
    avatar?: string
}

interface MultiSelectProps {
    items: Item[]
    selectedItems: Item[]
    onItemSelect: (items: Item[]) => void
    supervisor?: Item | null
    onSupervisorChange?: (supervisor: Item | null) => void
    searchPlaceholder?: string
    title?: string
    selectedItemsTitle?: string
    supervisorTitle?: string
    supervisorDescription?: string
    showNewItemButton?: boolean
    onNewItemClick?: () => void
    newItemButtonText?: string
}

interface DragHandlers {
    onDragStart: (e: React.DragEvent, item: Item) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, item: Item, dropZone: 'supervisor' | 'selected') => void;
}

// Draggable filtered item component
const DraggableFilteredItem: React.FC<{
    item: Item;
    isSelected: boolean;
    onSelect: () => void;
} & DragHandlers> = ({
    item,
    isSelected,
    onSelect,
    onDragStart,
    onDragOver,
    onDrop
}) => (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, item, 'selected')}
            className={`flex h-[72px] px-6 items-center gap-4 hover:bg-[#F0F4FD] ${isSelected ? 'bg-[#F0F4FD]' : ''}`}
        >
            <div className="cursor-grab">
                <DragIcon />
            </div>
            <Checkbox
                checked={isSelected}
                onCheckedChange={onSelect}
                className="rounded-full border-[#9BA2AC] data-[state=checked]:bg-black data-[state=checked]:text-white"
            />
            {item.avatar && (
                <img
                    src={item.avatar}
                    alt={item.title}
                    className="w-[40px] h-[40px] rounded-full"
                />
            )}
            <div>
                <p className="text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#101828]">
                    {item.title}
                </p>
                <p className="text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#9BA2AC]">
                    {item.subtitle}
                </p>
            </div>
        </div>
    );

// Modified ItemCard with drag and drop
const ItemCard = ({
    item,
    onRemove,
    onDragStart,
    onDragOver,
    onDrop,
    dropZone = 'selected'
}: {
    item: Item;
    onRemove: () => void;
    dropZone?: 'supervisor' | 'selected';
} & DragHandlers) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, item)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, item, dropZone)}
        className="flex h-[72px] px-3 items-center justify-between bg-[#FFDF41] rounded-xl"
    >
        <div className="flex items-center gap-4">
            <div className="cursor-grab">
                <DragIcon />
            </div>
            {item.avatar && (
                <img
                    src={item.avatar}
                    alt={item.title}
                    className="w-[40px] h-[40px] rounded-full"
                />
            )}
            <div>
                <p className="text-[16px] font-normal leading-normal tracking-[0.2px] text-[#101828]">
                    {item.title}
                </p>
                <p className="text-[16px] font-normal leading-normal tracking-[0.2px] text-[#677281]">
                    {item.subtitle}
                </p>
            </div>
        </div>
        <button onClick={onRemove}>
            <CrossIcon />
        </button>
    </div>
);

export const MultiSelectNew: React.FC<MultiSelectProps> = ({
    items,
    selectedItems,
    onItemSelect,
    supervisor,
    onSupervisorChange,
    searchPlaceholder = "Enter name or email address",
    title = "Select one or more items",
    selectedItemsTitle = "Items Added",
    supervisorTitle = "Select a Supervisor (Optional)",
    supervisorDescription = "A Supervisor is also a member, by default.",
    showNewItemButton = true,
    onNewItemClick,
    newItemButtonText = "NEW ITEM"
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [draggedItem, setDraggedItem] = useState<Item | null>(null);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSelect = (item: Item) => {
        if (selectedItems.find(i => i.id === item.id)) {
            onItemSelect(selectedItems.filter(i => i.id !== item.id))
        } else {
            onItemSelect([...selectedItems, item])
        }
    }

    const handleSelectAll = () => {
        onItemSelect(selectedItems.length === items.length ? [] : items)
    }

    const handleDragStart = (e: React.DragEvent, item: Item) => {
        setDraggedItem(item);
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetItem: Item, dropZone: 'supervisor' | 'selected') => {
        e.preventDefault();
        if (!draggedItem) return;

        // Handle supervisor drop
        if (dropZone === 'supervisor' && onSupervisorChange) {
            onSupervisorChange(draggedItem);
            // Remove from selected items if it was there
            if (selectedItems.some(item => item.id === draggedItem.id)) {
                onItemSelect(selectedItems.filter(item => item.id !== draggedItem.id));
            }
        }
        // Handle selected items drop
        else if (dropZone === 'selected') {
            const newItems = [...selectedItems];

            // If item isn't in selected items, add it
            if (!newItems.some(item => item.id === draggedItem.id)) {
                newItems.push(draggedItem);
            }
            // If item is already in list, reorder it
            else if (draggedItem.id !== targetItem.id) {
                const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
                const targetIndex = newItems.findIndex(item => item.id === targetItem.id);
                newItems.splice(draggedIndex, 1);
                newItems.splice(targetIndex, 0, draggedItem);
            }

            onItemSelect(newItems);
        }

        setDraggedItem(null);
    };

    return (
        <div className="flex gap-1">
            <div className="flex-1">
                <h2 className="text-[14px] font-semibold leading-[20px] tracking-[0.2px] text-[#475467] mb-4">
                    {title}
                </h2>

                <div className="relative">
                    <div className="absolute left-4 top-[18px]">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full h-[56px] pl-12 pr-4 rounded-[12px] bg-[#F7F7F8] text-[#9BA2AC] focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)] p-4 min-w-[515px] max-w-[515px]">
                    <div className="mt-2 flex flex-col gap-6 px-6 justify-between">
                        <p className="text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#9BA2AC]">
                            Results ({filteredItems.length})
                        </p>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="select-all"
                                checked={selectedItems.length === items.length}
                                onCheckedChange={handleSelectAll}
                                className="rounded-full border-[#9BA2AC] data-[state=checked]:bg-black data-[state=checked]:text-white"
                            />
                            <label htmlFor="select-all" className="text-[14px] text-[#007AF5] cursor-pointer">
                                Select All
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 divide-y divide-[#E4E7EC]">
                        {filteredItems.map(item => (
                            <DraggableFilteredItem
                                key={item.id}
                                item={item}
                                isSelected={selectedItems.some(i => i.id === item.id)}
                                onSelect={() => handleSelect(item)}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            />
                        ))}
                        {showNewItemButton && (
                            <div className="flex h-[72px] px-6 items-center">
                                <button
                                    onClick={onNewItemClick}
                                    className="flex items-center gap-2 text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#007AF5]"
                                >
                                    <PlusIcon /> {newItemButtonText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#F7F7F8] p-[40px_40px_0px_40px] space-y-8 min-w-[595px] max-w-[595px]">
                {onSupervisorChange && (
                    <div>
                        <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.2px] text-[#475467]">
                            {supervisorTitle}
                        </h3>
                        <p className="text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#677281] mt-2">
                            {supervisorDescription}
                        </p>

                        {supervisor && (
                            <div className="mt-4">
                                <ItemCard
                                    item={supervisor}
                                    onRemove={() => onSupervisorChange(null)}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    dropZone="supervisor"
                                />
                            </div>
                        )}
                    </div>
                )}

                {selectedItems.length > 0 && (
                    <div>
                        <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.2px] text-[#475467]">
                            {selectedItemsTitle} ({selectedItems.length})
                        </h3>
                        <div className="mt-4 space-y-4">
                            {selectedItems.map(item => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    onRemove={() => handleSelect(item)}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    dropZone="selected"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MultiSelectNew