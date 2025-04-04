import { SortableContext } from "@dnd-kit/sortable"
import { HeaderGroup, Table } from "@tanstack/react-table"
import { motion } from "framer-motion"
import { cn } from "@zeak/react"
import { horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { useDatatableStore } from "~/components/DataTable"
import TableHead from "./DataTableHead"
export const DataTableHeaderContent = ({ headerGroup, columnOrder, table }: { headerGroup: HeaderGroup<any>, columnOrder: string[], table: Table<any> }) => {
    const { showColumnSearch } = useDatatableStore()
    return <motion.tr
        initial={{ height: "48px" }}
        animate={{ height: showColumnSearch ? "64px" : "48px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}

        className={cn("rounded-[12px]  bg-white  ")} key={headerGroup.id}>
        <SortableContext
            items={columnOrder}
            strategy={horizontalListSortingStrategy}
        >
            {headerGroup.headers.map((header) => {

                return (
                    <TableHead table={table} key={header.id} header={header} />
                )
            })}
        </SortableContext>
    </motion.tr>
}