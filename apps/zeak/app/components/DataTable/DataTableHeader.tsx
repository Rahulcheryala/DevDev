import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {motion} from "framer-motion"
import type { Table } from "@tanstack/react-table";
import TableHead from "./DataTableHead";
import {useDatatableStore} from "~/components/DataTable"
import {cn} from "@zeak/react"
interface TableHeaderProps<TData> {
  table: Table<TData>;
  columnOrder: string[];
}

export default function TableHeader<TData>({
  table,
  columnOrder,
}: TableHeaderProps<TData>) {
  const {showColumnSearch} = useDatatableStore()
  return (
    <thead className="rounded-[12px] border-b-[4px] border-transparent  ">
      {table.getHeaderGroups().map((headerGroup) => (
        <motion.tr
        initial={{height: "48px"}}
        animate={{height: showColumnSearch ? "64px" : "48px"}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        
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
      ))}
    </thead>
  );
}
