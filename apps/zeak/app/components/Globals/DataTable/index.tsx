import { useState } from 'react'
import {
    Search,
    ArrowUpDown,
    MoreHorizontal,
    Edit,
    Trash2,
    Filter,
    LayoutGrid,
    List as ListIcon,
    RefreshCcw,
    Paperclip,
    Download,
    Plus,
    LayoutTemplate,
    ChevronDown,
    MoreVertical,
    Archive
} from 'lucide-react'
import { cn } from '~/components/Common/Utils'

interface Column {
    key: string
    label: string
    sortable?: boolean
}

interface DataTableProps {
    columns: Column[]
    data: any[]
    className?: string
}

export function DataTable({ columns, data, className }: DataTableProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [view, setView] = useState<'list' | 'grid'>('list')

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {/* Table Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Default View Selector */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F7F7F8] rounded-lg text-[#475467] hover:text-[#101828] transition-colors">
                        <LayoutTemplate className="w-4 h-4" />
                        <span className="text-sm font-medium">DEFAULT VIEW</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Smart Filters */}
                    <button className="flex items-center gap-2 px-4 py-2 text-[#007AF5] hover:text-[#007AF5]/90 transition-colors">
                        <span className="text-sm font-medium">SMART FILTERS</span>
                        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#E5EAF2] text-[10px] font-medium">
                            1
                        </div>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* List/Grid View Toggle */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2">
                            <ListIcon className="w-4 h-4 text-[#475467]" />
                            <ChevronDown className="w-4 h-4 text-[#475467]" />
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <button className="p-2 text-[#475467] hover:text-[#101828] transition-colors">
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-[#475467] hover:text-[#101828] transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 text-[#475467] hover:text-[#101828] transition-colors">
                        <span className="text-sm font-medium">Actions</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 bg-[#007AF5] text-white rounded-lg hover:bg-[#007AF5]/90 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">NEW</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F7F7F8] rounded-lg">
                <Search className="w-4 h-4 text-[#475467]" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#475467] placeholder-[#475467] focus:outline-none"
                />
            </div>

            {/* Table Header */}
            <div className="flex items-center bg-white border-b border-[#EAECF0]">
                {/* Checkbox Column */}
                <div className="w-[40px] px-4 py-3">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#D0D5DD] text-[#007AF5] focus:ring-[#007AF5]"
                    />
                </div>

                {/* Data Columns */}
                {columns.map((column, index) => (
                    <div
                        key={column.key}
                        className={cn(
                            "flex-1 flex items-center gap-2 px-4 py-3",
                            "text-sm font-medium text-[#101828]"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span>{column.label}</span>
                            {column.sortable && (
                                <ChevronDown className="w-4 h-4 text-[#98A2B3]" />
                            )}
                        </div>
                        <button className="ml-auto">
                            <MoreVertical className="w-4 h-4 text-[#98A2B3]" />
                        </button>
                    </div>
                ))}

                {/* Actions Column */}
                <div className="w-[40px] px-4 py-3">
                    <Archive className="w-4 h-4 text-[#98A2B3]" />
                </div>
            </div>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 bg-[#F7F7F8]/50">
                    <span className="text-[20px] font-['Suisse_Int\\'l'] font-medium text-[#101828] mb-4">
                        Click to create
                    </span>
                    <button className="w-14 h-14 bg-white rounded-full shadow-[0px_0px_15px_0px_rgba(132,188,218,0.30)] flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Plus className="w-6 h-6 text-[#475467]" />
                    </button>
                </div>
            )}
        </div>
    )
}