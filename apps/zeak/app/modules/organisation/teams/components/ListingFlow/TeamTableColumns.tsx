import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckbox } from "../../../../../components/DataTable";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import RowDragHandleCell from "../../../../../components/DataTable/RowDragHanle";
import { CiViewColumn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NameColumn, StatusPill } from "../../../../../components/Layout/Screen";
import { path } from "~/utils/path";
import { Tooltip, TooltipContent, TooltipTrigger } from "@zeak/react";
import moment from "moment";
import TeamActionOptions from "../misc/TeamActionOptions";

export const TeamTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pl-5 h-full">
        <DataTableCheckbox
          className="rounded-full"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={cn("flex h-[64px] w-[60px] rounded-l-[12px]", { "bg-[#FFDF41]": row.getIsSelected() })}>
        <RowDragHandleCell rowId={row.id} />
        <div className={cn("flex items-center justify-center rounded-l-[12px] relative")}>
          <DataTableCheckbox
            className={cn("rounded-full", { "bg-white": row.getIsSelected() })}
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
    header: "Team Name",
    cell: (item) => (
      <NameColumn link={path.to.teamsEdit(item.row.original.id as string)} name={item.getValue() as any} columnSize={250} />
    ),
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    meta: {
      filterVariant: "text",
      name: "Name",
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    cell: (item) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="truncate px-3 text-start" style={{ maxWidth: item.column.getSize() - 50 }}>{item.getValue() as any}</p>
        </TooltipTrigger>
        <TooltipContent side="right">
          {item.getValue() as any}
        </TooltipContent>
      </Tooltip>
    ),
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
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
    header: "Status",
    minSize: 100,
    size: 200,
    meta: {
      filterVariant: "select",
      name: "Status",
    },
  },
  {
    id: "members",
    accessorKey: "members",
    header: "Number of Users",
    cell: ({ row }) => (
      <span className="px-3 text-start">{row.original.userCount || 0}</span>
    ),
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    meta: {
      filterVariant: "text",
      name: "Members",
    },
  },
  {
    id: "createdBy",
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row, column }) => (
      <p className="px-3 text-start truncate" style={{ maxWidth: column.getSize() - 50 }}>{row.original.createdByUser ? row.original.createdByUser?.firstName || '' + ' ' + row.original.createdByUser?.lastName || '' : '-'}</p>
    ),
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    meta: {
      filterVariant: "text",
      name: "Created By",
    },
  },
  {
    id: "createdOn",
    accessorKey: "createdOn",
    header: "Created On",
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row, column, getValue }) => {
      if (row.original.createdAt) {
        return (
          <div style={{ maxWidth: column.getSize() - 50 }} className="flex flex-col text-ellipsis text-nowrap overflow-hidden px-3 text-start">
            <span >{moment(`${row.original.createdAt}`).format("DD MMM, YYYY")} </span>
            <span className="text-[11px] text-muted-foreground">{moment(`${row.original.createdAt}`).format("hh:mm A")}</span>
          </div>
        )
      } else {
        return <span className="text-ellipsis text-nowrap overflow-hidden px-3">-</span>
      }
    },
    meta: {
      filterVariant: "range",
      name: "Created On",
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-start h-[64px] w-[64px]">
        <CiViewColumn />
      </div>
    ),
    cell: ({ row }) => (
      <div className="">
        <Popover>
          <PopoverTrigger className={`${row.original.isArchived ? 'cursor-not-allowed' : 'cursor-pointer'}`} asChild disabled={row.original.isArchived}>
            <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
              <BsThreeDotsVertical />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-0">
            <TeamActionOptions teamId={row.original.id} component="listing" />
          </PopoverContent>
        </Popover>
      </div>
    ),
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
