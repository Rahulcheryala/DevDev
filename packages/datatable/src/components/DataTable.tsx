import React from "react";
import TableRow from "./DataTableRow";
import "./data-table.css";
import { textFilter, numberFilter, booleanFilter, dateFilter } from "../utils"
import TableHeader from "./DataTableHeader";
import DataTableToolbar from "./DataTableToolBar";
import DataTablePagination from "./DataTablePagination";
import ExpandedCard from "./ExpandedCard";

import { useDatatableStore } from "../hooks/useDataTableStore";

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
import { sortNullsLast } from "../utils/sortingFns";

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
  addNewText?: string;

}

function DataTable<TData extends { id: string | number }>({
  data: initialData,
  columns,
  addNewText,

}: DataTableProps<TData>) {
  const columnsmemo = React.useMemo<ColumnDef<TData>[]>(
    () => columns,
    [columns],
  );
  const { newColumnName, newColType } = useDatatableStore()
  const [cols, setCols] = React.useState(columns)
  const [isCompact, setIsCompact] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({})
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
    columns: columnsmemo,
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
      expanded,
      rowSelection
    },
    filterFns: {
      text: textFilter(),
      number: numberFilter(),
      date: dateFilter(),
      boolean: booleanFilter(),
    },
    sortingFns: {
      custom: sortNullsLast
    },
    getRowId: (row) => String(row.id),
    enableSorting: true,
    enableGrouping: true,
    enableRowSelection: true,
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
    onRowSelectionChange: setRowSelection,
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

  return (
    <div className="">


      <AddNewRow columns={cols} setData={setData} data={data} />
      <AddNewColumn addNewColumn={() => handleAddNewColumn()} />
      <DataTableToolbar
        columns={columns}
        setIsCompact={setIsCompact}
        isCompact={isCompact}
        data={data}
        table={table}
        currentPageData={table.getRowModel().rows.map(row => row.original)}
        setColumnFilters={setColumnFilters}
        addNewText={addNewText}
      />

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

            <motion.tbody

              className="overflow-x-scroll">
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow isCompact={isCompact} key={row.id} row={row} />
                    {row.getIsExpanded() && <ExpandedCard />}
                  </React.Fragment>
                ))}
              </SortableContext>
            </motion.tbody>
          </motion.table>

        </div>
      </DndContext>

      <DataTablePagination table={table} />

    </div>
  );
}

export default DataTable;
