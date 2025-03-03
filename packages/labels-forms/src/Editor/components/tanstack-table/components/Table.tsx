import React, { PropsWithChildren } from "react";
import { t_table } from "../types";
import { TableContext } from "../Context";

export type IProps<T> = {
  table: t_table<T>;
};

const TableFC = <T,>({ children, table }: PropsWithChildren<IProps<T>>) => {
  return (
    <TableContext.Provider value={{ table }}>
      <div className="relative overflow-x-auto overflow-y-auto shadow-md">
        <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
};

export default TableFC;
