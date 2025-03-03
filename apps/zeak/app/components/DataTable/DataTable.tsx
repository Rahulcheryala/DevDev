import React, { PropsWithChildren, useEffect } from "react";
import TableRow from "./DataTableRow";
import "./data-table.css";
import { textFilter, numberFilter, booleanFilter, dateFilter } from "./filterFns"
import TableHeader from "./DataTableHeader";
import DataTableToolbar from "./DataTableToolBar";
import DataTablePagination from "./DataTablePagination";
import ExpandedCard from "./ExpandedCard";
import { sortNullsFirst, sortNullsLast } from './sortingFns'
import { useDatatableStore } from "./useDatatableStore";

import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFacetedRowModel,
  getPaginationRowModel,


  sortingFns
} from "@tanstack/react-table";
import type {
  SortingState,
  GroupingState,
  ColumnFiltersState,
  RowData,
  ColumnPinningState,
  VisibilityState,
  ColumnDef,
  FilterFn,
  PaginationState,
  ExpandedState,
  SortingFn
} from "@tanstack/react-table";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import AddNewRow from "./AddNewRow";
import AddNewColumn from "./AddNewColumn"
import { IntegrationProvider } from "~/modules/integrations/context";
import { ConnectionProvider } from "~/modules/integrations/context/connection";
// import { IntegrationProvider } from "~/modules/integrations/context";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "number" | "range" | "select" | "boolean" | "date";
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    name?: string;
    dataType?: string;
  }
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
  interface FilterFns {
    number?: FilterFn<unknown>;
    text?: FilterFn<unknown>;
    date?: FilterFn<unknown>;
    boolean?: FilterFn<unknown>;
  }
  interface SortingFns {
    custom?: SortingFn<unknown>;
  }
}

interface DataTableProps<TData extends { id: string | number }> {
  data: TData[];
  columns: ColumnDef<TData>[];
  type?: string;

}

function DataTable<TData extends { id: string | number }>({
  data: initialData,
  columns,
  children,
  type
}: PropsWithChildren<DataTableProps<TData>>) {
  const columnsmemo = React.useMemo<ColumnDef<TData>[]>(
    () => columns,
    [columns],
  );
  const { newColumnName, newColType } = useDatatableStore()
  const [cols, setCols] = React.useState(columns)
  const [isCompact, setIsCompact] = React.useState(false);
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState<any>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!),
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id),
    [data],
  );

  const globalFilterFn: FilterFn<TData> = (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    return String(value)
      .toLowerCase()
      .includes(String(filterValue).toLowerCase());
  };




  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
      sorting,
      grouping,
      columnFilters,
      columnPinning,
      columnVisibility,
      globalFilter,
      pagination,
      expanded
    },
    filterFns: {
      text: textFilter(),
      number: numberFilter(),
      date: dateFilter(),
      boolean: booleanFilter(),
    },
    sortingFns: {
      custom: sortNullsLast,
    },
    getRowId: (row) => String(row.id),
    enableSorting: true,
    enableGrouping: true,


    enableColumnFilters: true,
    enableColumnPinning: true,
    enableHiding: true,
    autoResetPageIndex: false,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",


    globalFilterFn: globalFilterFn as FilterFn<TData>,
    enableColumnResizing: true,
    enableExpanding: true,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getRowCanExpand: (row) => true,

    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender

        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      // Check if we're dragging a column
      if (columnOrder.includes(active.id as string)) {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);
          return arrayMove(columnOrder, oldIndex, newIndex);
        });
      } else {
        // We're dragging a row
        setData((data) => {
          const oldIndex = dataIds.indexOf(active.id);
          const newIndex = dataIds.indexOf(over.id);
          return arrayMove(data, oldIndex, newIndex);
        });
      }
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const handleAddNewColumn = () => {
    setCols([...cols, {
      accessorKey: newColumnName,
      header: ({ header }) => <div style={{
        maxWidth: header.column.getSize() - 50,
      }} className="text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]">
        {newColumnName}
      </div>,
      cell: (info) => info.getValue(),
      id: newColumnName,
      minSize: 50,
      size: 120,
      filterFn: "text",


      meta: {
        name: newColumnName,
        dataType: newColType,
        filterVariant: "text",

      },
      footer: (props) => props.column.id,
    },])
  }

  useEffect(() => {
    setData(initialData);
  }, [initialData])

  return (
    <div className="">
      {type === "view" && <div className="bg-[#F8FAFE] px-6 py-4 rounded-t-[12px]">
        <p className="text-secondary-tertiary text-[26px]">Connections</p>
      </div>}
      
      <AddNewRow columns={cols} setData={setData} data={data} />
      <AddNewColumn addNewColumn={() => handleAddNewColumn()} />
      <IntegrationProvider>
        <ConnectionProvider>
          <DataTableToolbar
            type={type}
            columns={columns}
            setIsCompact={setIsCompact}
            isCompact={isCompact}
            data={data}
            table={table}
            currentPageData={table.getRowModel().rows.map(row => row.original)}
            setColumnFilters={setColumnFilters}
          />
        </ConnectionProvider>
      </IntegrationProvider>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}

      >
        <div className=" mt-2 rounded-zeak overflow-x-auto">

          <motion.table
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, width: table.getTotalSize() }}
            id="notifications-data-table"

            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              width: table.getTotalSize(),
            }} className="  table-fixed  ">
            <TableHeader table={table} columnOrder={columnOrder} />

            {data.length ? 
              <motion.tbody className="overflow-x-scroll">
                <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.original.id}>
                    <TableRow isCompact={isCompact} row={row} />
                    {row.getIsExpanded() && <ExpandedCard />}
                  </React.Fragment>
                ))}
              </SortableContext>
            </motion.tbody> : children}
          </motion.table> 

        </div>
      </DndContext>

      <DataTablePagination table={table} />
      {/* <div className="mt-4 p-4 bg-gray-50 rounded-zeak">

      </div> */}
    </div>
  );
}

export default DataTable;
