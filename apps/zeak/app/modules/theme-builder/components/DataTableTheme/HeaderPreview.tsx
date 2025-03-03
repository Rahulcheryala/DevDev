
import {motion} from "framer-motion"
import type { Table } from "@tanstack/react-table";
import TableHead from "./CellPreview";

import { useDataTableTheme } from '~/modules/theme-builder'
interface TableHeaderProps<TData> {
  table: Table<TData>;
  
}

export default function TableHeader<TData>({
  table,
  
}: TableHeaderProps<TData>) {
 
  const {headerBackgroundColor, headerFontColor, headerFontSize, headerBorderRadius, headerBorderWidth, headerBorderColor} = useDataTableTheme()
  return (
    <thead style={{
       color: headerFontColor, fontSize: headerFontSize,
     }} >
      {table.getHeaderGroups().map((headerGroup) => (
        <motion.tr
        initial={{height: "28px", opacity: 0, }}
        animate={{ height: "40px", opacity: 1, }}
        transition={{duration: 0.3, ease: "easeInOut"}}
        style={{
          backgroundColor: headerBackgroundColor,
          color: headerFontColor,
          fontSize: headerFontSize,
          borderRadius: `${headerBorderRadius}px`,
          borderWidth: `${headerBorderWidth}px`,
          borderColor: headerBorderColor
        }}
       key={headerGroup.id}>
         
            {headerGroup.headers.map((header) => (
              <TableHead table={table} key={header.id} header={header} />
            ))}
       
          </motion.tr>
      ))}
    </thead>
  );
}
