import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { getAccessorKey } from "./utils";
import { Pagination, usePagination } from "../Table/components";
import { GridCardHeader } from "./components";
import LabelCard from "../../modules/labelsreports/ui/Label/HomeTabs/LabelCard";

interface GridCardProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  count?: number;
  withFilters?: boolean;
  withPagination?: boolean;
}

const GridCard = <T extends object>({
  data,
  columns,
  count = 0,
  withFilters = false,
  withPagination = true,
}: GridCardProps<T>) => {
  const pagination = usePagination(count, () => {});

  const columnAccessors = useMemo(
    () =>
      columns.reduce<Record<string, string>>((acc, column) => {
        const accessorKey: string | undefined = getAccessorKey(column);
        if (accessorKey?.includes("_"))
          throw new Error(
            `Invalid accessorKey ${accessorKey}. Cannot contain '_'`,
          );
        if (accessorKey && column.header && typeof column.header === "string") {
          return {
            ...acc,
            [accessorKey]: column.header,
          };
        }
        return acc;
      }, {}),
    [columns],
  );

  return (
    <>
      <GridCardHeader
        columnAccessors={columnAccessors}
        withFilters={withFilters}
      />
      <div className="flex flex-wrap gap-[40px]">
        {data.map((item: any, key) => (
          <LabelCard key={key} labelnReports={item} />
        ))}
      </div>
      {withPagination && <Pagination {...pagination} />}
    </>
  );
};

export default GridCard;
