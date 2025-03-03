import React, { useState } from "react";
import TableRow from "./RowPreview";

import TableHeader from "./HeaderPreview";
import {useDataTableTheme} from "~/modules/theme-builder"
import PaginationPreview from "./PaginationPreview";
import {
  getCoreRowModel,
  useReactTable,
  getFacetedUniqueValues,
  getFacetedRowModel,
  getPaginationRowModel,
  filterFns,
} from "@tanstack/react-table";
import type {
  SortingState,
  GroupingState,
  ColumnFiltersState,
  RowData,
  ColumnPinningState,
  ColumnDef,
  PaginationState,
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
import {Drawer, DrawerBody, DrawerHeader, DrawerContent, DrawerFooter, DrawerTrigger, Button} from "@zeak/react"

interface DataTableProps<TData extends { id: string | number }> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

function DataTable<TData extends { id: string | number }>({
  data: initialData,
  columns,
}: DataTableProps<TData>) {
  const columnsmemo = React.useMemo<ColumnDef<TData>[]>(
    () => columns,
    [columns],
  );

  const [data, setData] = React.useState(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    age: '',
    visits: '',
    progress: '',
    status: 'single'
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    const newPerson = {
      id: crypto.randomUUID(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      visits: parseInt(formData.visits),
      progress: parseInt(formData.progress),
      status: formData.status as 'relationship' | 'complicated' | 'single'
    };

    setData(prev => [...prev, newPerson as unknown as TData]);
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      visits: '',
      progress: '',
      status: 'single'
    });
    setIsDrawerOpen(false);
  };

  const table = useReactTable({
    data,
    columns: columnsmemo,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
      columnPinning,
      pagination,
    },
    filterFns: {
      number: filterFns.inNumberRange,
      text: filterFns.includesString,
      date: filterFns.weakEquals,
      boolean: filterFns.equals,
    },
    getRowId: (row) => String(row.id),
    enableColumnPinning: true,
    autoResetPageIndex: false,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnPinningChange: setColumnPinning,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
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

  const {backgroundColor, fontColor, foregroundColor, fontSize, borderRadius, borderWidth, borderColor} = useDataTableTheme()

  return (
    <div className="">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="mb-4">Add New Data</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>Add New Data</DrawerHeader>
          <DrawerBody>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input 
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input
                  type="text" 
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter age"
                  min="0"
                  max="40"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="visits" className="text-sm font-medium">Visits</label>
                <input
                  type="number"
                  id="visits"
                  value={formData.visits}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter visits"
                  min="0"
                  max="1000"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="progress" className="text-sm font-medium">Progress</label>
                <input
                  type="number"
                  id="progress"
                  value={formData.progress}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter progress"
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="relationship">Relationship</option>
                  <option value="complicated">Complicated</option>
                  <option value="single">Single</option>
                </select>
              </div>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className=" mt-2  overflow-x-auto">
          <table style={{
            width: table.getTotalSize(),
          }} className=" overflow-x-scroll  ">
            <TableHeader table={table} />

            <tbody style={{backgroundColor, color: fontColor, 
              fontSize: `${fontSize}px`, borderRadius: `${borderRadius}px`, 
              borderWidth: `${borderWidth}px`, borderColor: borderColor}} className="overflow-x-scroll">
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <TableRow isCompact={false} key={row.id} row={row} />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </div>
      </DndContext>

      <PaginationPreview table={table} />
    </div>
  );
}

export default DataTable;
