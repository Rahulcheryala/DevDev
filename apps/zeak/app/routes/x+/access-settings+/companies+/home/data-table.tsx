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
    Plus
} from 'lucide-react'
import { cn } from '@zeak/react'

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
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#475467]" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-[320px] bg-[#F7F7F8] rounded-lg text-sm text-[#475467] focus:outline-none focus:ring-2 focus:ring-[#007AF5]"
                        />
                    </div>
                    <button className="p-2 hover:bg-[#F7F7F8] rounded-lg">
                        <Filter className="w-5 h-5 text-[#475467]" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#F7F7F8] rounded-lg p-1">
                        <button
                            onClick={() => setView('grid')}
                            className={cn(
                                "p-2 rounded-lg",
                                view === 'grid' && "bg-white shadow-sm"
                            )}
                        >
                            <LayoutGrid className="w-4 h-4 text-[#475467]" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={cn(
                                "p-2 rounded-lg",
                                view === 'list' && "bg-white shadow-sm"
                            )}
                        >
                            <ListIcon className="w-4 h-4 text-[#475467]" />
                        </button>
                    </div>
                    <button className="p-2 hover:bg-[#F7F7F8] rounded-lg">
                        <RefreshCcw className="w-5 h-5 text-[#475467]" />
                    </button>
                    <button className="p-2 hover:bg-[#F7F7F8] rounded-lg">
                        <Paperclip className="w-5 h-5 text-[#475467]" />
                    </button>
                    <button className="p-2 hover:bg-[#F7F7F8] rounded-lg">
                        <Download className="w-5 h-5 text-[#475467]" />
                    </button>
                    <button className="p-2 hover:bg-[#F7F7F8] rounded-lg">
                        <MoreHorizontal className="w-5 h-5 text-[#475467]" />
                    </button>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-[#F7F7F8]">
                {columns.map((column) => (
                    <div
                        key={column.key}
                        className="flex items-center gap-2 text-sm font-medium text-[#475467]"
                    >
                        {column.label}
                        {column.sortable && (
                            <button className="p-1 hover:bg-white rounded">
                                <ArrowUpDown className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-[#F7F7F8]/50">
                    <p className="text-lg font-medium text-[#475467]">Click to create</p>
                    <button className="mt-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <Plus className="w-6 h-6 text-[#475467]" />
                    </button>
                </div>
            )}
        </div>
    )
}