import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion"
import type { Table } from "@tanstack/react-table";
import TableHead from "./DataTableHead";
import { useDatatableStore } from "../hooks"
import { cn } from "../utils/cn"

interface TableHeaderProps<TData> {
  table: Table<TData>;
  columnOrder: string[];
  children?: React.ReactNode;
}

export default function TableHeader<TData>({
  table,
  columnOrder,
  children,
}: TableHeaderProps<TData>) {
  const { showColumnSearch } = useDatatableStore()
  return (
    <thead className="rounded-t-[12px] border-b-[4px] border-transparent   ">
      {table.getHeaderGroups().map((headerGroup) => (
        <motion.tr
          initial={{ height: "48px" }}
          animate={{ height: showColumnSearch ? "64px" : "48px" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}

          className={cn("rounded-t-[12px]  bg-white flex ")} key={headerGroup.id}>
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
