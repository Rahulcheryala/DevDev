import { ColumnDef } from "@tanstack/react-table";
import { cn, Popup, ActionButtonProps, StatusPill } from "@zeak/ui";
import { RadioCheckbox } from "@zeak/ui";
import {
  NameTableCell,
  DateTableCell,
  RowDragHandleCell,
} from "@zeak/datatable";
import { CiViewColumn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

export const ConnectionTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pl-5 h-full">
        <RadioCheckbox
          className={cn("rounded-full border-none bg-gray-200 w-4 h-4", {
            "bg-[#FFDF41] border-none": table.getIsAllPageRowsSelected(),
          })}
          isChecked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
          showIndicator={false}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={cn("flex h-[64px] w-[60px]", {
          "bg-[#FFDF41]": row.getIsSelected(),
        })}
      >
        <RowDragHandleCell rowId={row.id} />
        <div className={cn("flex items-center justify-center relative")}>
          <RadioCheckbox
            className={cn("rounded-full border-none bg-gray-200 w-4 h-4", {
              "bg-white border-none": row.getIsSelected(),
            })}
            isChecked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
            showIndicator={false}
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
    id: "connectionName",
    accessorKey: "connectionName",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Connection Name
      </div>
    ),
    cell: ({ row, column }) => (
      <NameTableCell
        src={row.original.integration?.logo}
        name={row.original.connectionName}
        link={`/x/access-settings/connections/${row.original.id}`}
        columnSize={column.getSize()}
      />
    ),
    meta: {
      filterVariant: "text",
      name: "Connection Name",
    },
    size: 300,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "connectionStatus",
    accessorKey: "connectionStatus",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Connection Status
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-start items-center px-6">
        <StatusPill
          status={row.original.connectionStatus}
          className="text-sm font-[450] gap-2"
          uppercase
        />
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Connection Status",
    },
    size: 200,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "connectionDescription",
    accessorKey: "connectionDescription",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Description
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        {row.original.connectionDescription || "-"}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Connection Description",
    },
    size: 300,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "errors",
    accessorKey: "errors",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Errors
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        <div className="flex flex-col text-left">
          {/* TODO(vamsi): Add error count from the logs */}
          <span>{row.original.errors || 0}</span>
        </div>
      </div>
    ),
    meta: {
      filterVariant: "select",
      name: "Errors",
    },
    size: 200,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Last Updated
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="truncate text-sm text-left"
      >
        <DateTableCell
          date={row.original.updatedAt || row.original.createdAt}
          timeZone="America/Chicago"
        />
      </div>
    ),
    meta: {
      filterVariant: "select",
      name: "Last Updated",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "lastTestedAt",
    accessorKey: "lastTestedAt",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Last Tested
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="truncate text-sm text-left"
      >
        <DateTableCell
          date={row.original.lastTestedAt || row.original.createdAt}
          timeZone="America/Chicago"
        />
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Last Tested",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "isOnline",
    accessorKey: "isOnline",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Enabled
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-start items-center px-4">
        {row.original.isOnline ? "Yes" : "No"}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "isOnline",
    },
    size: 200,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "options",
    header: () => (
      <div className="flex items-center justify-start h-[64px] w-[64px]">
        <CiViewColumn />
      </div>
    ),
    cell: ({ row }) => {
      // Trigger button for the popup
      const triggerButton = (
        <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
          <BsThreeDotsVertical />
        </button>
      );

      return (
        <div className="">
          <Popup trigger={triggerButton} buttons={[]} align="end" />
        </div>
      );
    },
    size: 64,
    meta: {
      name: "Actions",
    },
    enableSorting: true,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: true,
    enableColumnFilter: false,
  },
];
