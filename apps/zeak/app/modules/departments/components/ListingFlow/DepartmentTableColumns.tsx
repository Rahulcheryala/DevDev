import { ColumnDef } from "@tanstack/react-table";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { CiViewColumn } from "react-icons/ci";
import { formatDate } from "@zeak/utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DataTableCheckbox } from "../../../../components/DataTable";
import RowDragHandleCell from "../../../../components/DataTable/RowDragHanle";
import { NameColumn, StatusPill } from "../../../../components/Layout/Screen";
import DepartmentActionOptions from "../misc/DepartmentActionOptions";
import moment from "moment";

export const DepartmentTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pl-5 h-full  ">
        <DataTableCheckbox
          className="rounded-full "
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={cn("flex h-[64px] w-[60px] rounded-l-[12px]", { "bg-[#FFDF41]": row.getIsSelected() })}>
        <RowDragHandleCell rowId={row.id} />
        <div className={cn(" flex items-center justify-center rounded-l-[12px] relative")} >
          <DataTableCheckbox
            className={cn("rounded-full", { "bg-white": row.getIsSelected(), })}
            checked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        </div>
      </div>
    ),
    size: 60,
    enableSorting: true,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: true,
    enableColumnFilter: false,

  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ header }) => <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Department Name</div>,
    cell: ({ row, column }) => <NameColumn link={`${row.original.id}`} name={row.original.name} columnSize={column.getSize()} />,
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    meta: {
      filterVariant: "text",
      name: "Department Name",
    },
  },
  {
    id: "departmentCode",
    accessorKey: "departmentCode",
    header: ({ header }) => <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Department Code</div>,
    cell: ({ row, column }) => (
      <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
        {row.original.departmentCode}
      </div>
    ),
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    meta: {
      filterVariant: "text",
      name: "Department Code",
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row, column }) => (
      <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
        {row.original.description || '-'}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Description",
    },
  },
  {
    id: "status",
    accessorFn: (row) => row.status,
    cell: ({ row, column }) => (
      <StatusPill className="justify-center px-3" status={row.original.status} columnSize={column.getSize() - 50} />
    ),
    header: ({ header }) => (
      <div
        style={{ maxWidth: header.column.getSize() - 50 }}
        className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]"
      >
        Status
      </div>
    ),
    minSize: 100,
    size: 200,
    footer: (props) => props.column.id,
    meta: {
      filterVariant: "select",
      name: "Status",
    },
  },
  {
    id: "supervisor",
    accessorKey: "supervisor",
    header: "Supervisor",
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row, column }) => (
      <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
        {row.original.supervisorUser?.firstName || ''} {row.original.supervisorUser?.lastName || ''}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Supervisor",
    },
  },
  {
    id: "noOfUsers",
    accessorKey: "noOfUsers",
    header: "No. of Users",
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row, column }) => (
      <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
        {row.original.noOfUsers || 0}
      </div>
    ),
    meta: {
      filterVariant: "range",
      name: "No. of Users",
    },
  },
  {
    id: "modifiedOn",
    accessorKey: "modifiedOn",
    header: "Last Updated Date",
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row, column }) => {
      if (row.original.updatedAt) { 
        return (
          <div style={{ maxWidth: column.getSize() - 50 }} className="flex flex-col text-ellipsis text-nowrap overflow-hidden px-3 text-start">
            <span>{moment(`${row.original.updatedAt}`).format("DD MMM, YYYY")}</span>
            <span className="text-[11px] text-muted-foreground">{moment(`${row.original.updatedAt}`).format("hh:mm A")}</span>
          </div>
        );
      } else {
        return <span className="text-ellipsis text-nowrap overflow-hidden px-3">-</span>;
      }
    },
    meta: {
      filterVariant: "range",
      name: "Last Updated Date",
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-start h-[64px] w-[64px]">
        <CiViewColumn />
      </div>
    ),
    cell: ({ row }) => (<div className="">
      <Popover>
        <PopoverTrigger className={`${row.original.isArchived ? 'cursor-not-allowed' : 'cursor-pointer'}`} asChild disabled={row.original.isArchived}>
          <button
            className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm"
          >
            <BsThreeDotsVertical />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-0">
          <DepartmentActionOptions departmentId={row.original.id} component="listing" />
        </PopoverContent>
      </Popover>
    </div>),
    size: 64,
    meta: {
      name: "Actions"
    },
    enableSorting: true,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: true,
    enableColumnFilter: false,
  }
];
