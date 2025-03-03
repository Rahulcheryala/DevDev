import { Table, Th, Tbody, Td, Tr, Thead } from "@zeak/react"
import { useReactTable, getCoreRowModel, flexRender, sortingFns, filterFns, SortingState } from "@tanstack/react-table"
import { columns } from "./columns"
import { data } from "./data"
import TableToolBar from "./TableToolBar"
import { LuChevronsUpDown } from "react-icons/lu"
import { TableHeadContent } from "./TableHeadContent"
import { useState } from "react"


export default function EditValueTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting
        },
        filterFns: {
            text: filterFns.includesString,
            number: filterFns.inNumberRange,
            boolean: filterFns.equals,
            date: filterFns.arrIncludesAll
        },
        sortingFns: {
            custom: sortingFns.alphanumeric
        }
    })
    return (
        <div className="w-full overflow-x-scroll">
            <div className="w-full mb-6">

                <TableToolBar table={table} showColumnSearch={false} setShowColumnSearch={() => { }} setIsCompact={() => { }} isCompact={false} setColumnFilters={() => { }} />
            </div>
            <Table className="w-full overflow-x-scroll">
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr className="w-full" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => <Th key={header.id}>
                                <TableHeadContent header={header} />
                            </Th>)}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr className="w-full" key={row.id}>
                            {row.getVisibleCells().map((cell) => <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>)}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    )
}