import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState
} from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./Table"
import { cn } from "~/components/Common/Utils"
import { useState, useEffect, useRef } from "react"
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    ChevronDown,
    Trash2,
    MoreVertical,
} from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    customHeader?: (props: { searchText: string; onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => React.ReactNode
}

const PAGE_SIZES = [5, 10, 20, 50, 100]
const DEFAULT_PAGE_SIZE = 10

export function DataTable<TData, TValue>({
    columns,
    data,
    customHeader
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
    const [pageIndex, setPageIndex] = useState(0)
    const [showPageSizes, setShowPageSizes] = useState(false)
    const [activeRowActions, setActiveRowActions] = useState<string | null>(null)
    const actionsRef = useRef<HTMLDivElement>(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            pagination: {
                pageSize,
                pageIndex,
            },
        },
        enableRowSelection: true,
        enableMultiRowSelection: true,
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setActiveRowActions(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleRowClick = (row: any) => {
        row.toggleSelected(!row.getIsSelected())
    }

    const startIndex = pageIndex * pageSize + 1
    const endIndex = Math.min((pageIndex + 1) * pageSize, data.length)

    return (
        <div className="flex flex-col gap-2">
            {customHeader && customHeader({
                enableDelete: table.getRowModel().rows.some(row => row.getIsSelected()),
                searchText: (table.getColumn("name")?.getFilterValue() as string) ?? "",
                onSearchChange: (event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
            })}
            {/* Search Bar */}
            {/* <div className="flex items-center gap-2 px-4 py-2 bg-[#F7F7F8] rounded-lg">
                <span className="text-[#475467] text-sm">Search</span>
                <div className="flex items-center gap-2 flex-1">
                    <Search className="w-4 h-4 text-[#475467]" />
                    <Input
                        placeholder="Search"
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-[#475467]"
                    />
                </div>
            </div> */}

            <div className="rounded-xl border border-[#EAECF0] overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b border-[#EAECF0]">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="[&:first-child]:border-r-0 [&:first-child]:flex-none">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                                <TableHead className="px-4 flex-none w-auto">
                                    <ColumnIcon />
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(
                                        "border-b border-[#EAECF0] transition-colors cursor-pointer h-[64px] rounded-[12px]",
                                        row.getIsSelected()
                                            ? "bg-[#007AF5]/10 hover:bg-[#007AF5]/10"
                                            : "hover:bg-[#F9FAFB]"
                                    )}
                                    onClick={() => handleRowClick(row)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                "[&:first-child]:border-r-0 [&:first-child]:flex-none",
                                                row.getIsSelected() && "bg-[#007AF5]/10"
                                            )}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        className={cn(
                                            "p-[16px] flex-none w-auto",
                                            row.getIsSelected() && "bg-[#007AF5]/10"
                                        )}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="relative" ref={actionsRef}>
                                            <button
                                                className="text-[#475467] hover:text-[#101828]"
                                                onClick={() => setActiveRowActions(activeRowActions === row.id ? null : row.id)}
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                            {activeRowActions === row.id && (
                                                <div className="absolute right-5 -mt-7 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                                                    <button
                                                        onClick={() => {
                                                            // Handle delete
                                                            setActiveRowActions(null)
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-[#F04438] text-sm hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete Company
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="h-[400px] text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-[20px] font-['Suisse_Int\\'l'] font-medium text-[#101828] mb-4">
                                            Click to create
                                        </span>
                                        <button className="w-14 h-14 bg-white rounded-full shadow-[0px_0px_15px_0px_rgba(132,188,218,0.30)] flex items-center justify-center hover:bg-gray-50 transition-colors">
                                            <Plus className="w-6 h-6 text-[#475467]" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-2 px-4">
                <div className="flex items-center gap-1">
                    <span className="font-['Suisse_Int\\'l'] text-sm font-normal text-[#007AF5]">
                        Showing {startIndex}
                    </span>
                    <span className="font-['Suisse_Int\\'l'] text-sm font-normal text-[#475467]">
                        of {data.length} items
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 py-4">
                        <button
                            onClick={() => {
                                const newIndex = pageIndex - 1
                                setPageIndex(newIndex)
                                table.setPageIndex(newIndex)
                            }}
                            disabled={!table.getCanPreviousPage()}
                            className="flex items-center gap-1 font-['Suisse_Int\\'l'] text-[12px] font-medium leading-normal tracking-[0.2px] text-[#9BA2AC] hover:text-[#9BA2AC] disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>PREV</span>
                        </button>

                        <div className="flex items-center gap-4">
                            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                                let pageNumber = i + 1
                                if (pageIndex >= 3 && table.getPageCount() > 5) {
                                    pageNumber = pageIndex - 2 + i
                                    if (pageNumber > table.getPageCount() - 4) {
                                        pageNumber = table.getPageCount() - 4 + i
                                    }
                                }
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => {
                                            setPageIndex(pageNumber - 1)
                                            table.setPageIndex(pageNumber - 1)
                                        }}
                                        className={cn(
                                            "w-6 h-6 flex items-center justify-center rounded-full font-['Suisse_Int\\'l'] text-[#677281] text-base font-bold leading-[22px] tracking-[0.2px]",
                                            pageIndex === pageNumber - 1
                                                ? "border-2 border-[#FFDF41] bg-white text-[#0D0C22]"
                                                : "text-[#677281] hover:text-[#101828]"
                                        )}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => {
                                const newIndex = pageIndex + 1
                                setPageIndex(newIndex)
                                table.setPageIndex(newIndex)
                            }}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center gap-1 font-['Suisse_Int\\'l'] text-[12px] font-medium leading-normal tracking-[0.2px] text-[#475467] hover:text-[#475467] disabled:opacity-50"
                        >
                            <span>NEXT</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowPageSizes(!showPageSizes)}
                            className="flex items-center h-10 px-4 gap-2 font-['Suisse_Int\\'l'] text-[12px] font-medium leading-normal tracking-[0.5px] uppercase text-[#475467] hover:text-[#475467]"
                        >
                            <span>{pageSize}</span>
                            <span>/ PAGE</span>
                            <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                showPageSizes && "transform rotate-180"
                            )} />
                        </button>

                        {showPageSizes && (
                            <div className="absolute right-0 mt-2 py-1 bg-white rounded-lg shadow-lg z-50">
                                {PAGE_SIZES.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setPageSize(size)
                                            setPageIndex(0)
                                            table.setPageSize(size)
                                            table.setPageIndex(0)
                                            setShowPageSizes(false)
                                        }}
                                        className={cn(
                                            "w-full px-4 py-2 text-left text-sm hover:bg-gray-50",
                                            size === pageSize ? "text-[#101828] font-medium" : "text-[#475467]"
                                        )}
                                    >
                                        {size} / PAGE
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ColumnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7.5 2.5V17.5M12.5 2.5V17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)