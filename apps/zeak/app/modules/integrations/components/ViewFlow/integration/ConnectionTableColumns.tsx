import moment from "moment-timezone";
import { ColumnDef } from "@tanstack/react-table";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { DataTableCheckbox } from "../../../../../components/DataTable";
import RowDragHandleCell from "../../../../../components/DataTable/RowDragHanle";
import { NameColumn } from "../../../../../components/Layout/Screen";
import ConnectionActionOptions from "../../misc/ConnectionActionOptions";
import { LucideTriangleAlert } from "lucide-react";
import { CiViewColumn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { useUnifiedContext } from "../../../context";
import { ConnectionStatus } from "@prisma/client";
import { useNavigate } from "@remix-run/react";

const statusMap = {
  [ConnectionStatus.Online]: {
    icon: <TbLink size={20} className="text-green-500 cursor-pointer" />,
    label: <span className="text-green-500">ONLINE</span>,
  },
  [ConnectionStatus.Offline]: {
    icon: <LuUnlink size={20} className="text-gray-500 cursor-pointer" />,
    label: <span className="text-gray-500">OFFLINE</span>,
  },
  [ConnectionStatus.Error]: {
    icon: (
      <LucideTriangleAlert size={20} className="text-red-500 cursor-pointer" />
    ),
    label: <span className="text-red-500">ERROR</span>,
  },
};

const ConnectionStatusMapper = ({ status }: { status: string }) => {
  const statusInfo = statusMap[status as keyof typeof statusMap];
  return (
    <div className="flex items-center gap-3 text-sm">
      {statusInfo ? (
        <>
          {statusInfo.icon}
          {statusInfo.label}
        </>
      ) : (
        <span className="text-gray-500">UNKNOWN STATUS</span>
      )}
    </div>
  );
};

export const ConnectionTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center px-3 h-full">
        <DataTableCheckbox
          className="rounded-full "
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={cn("flex h-[64px] w-[60px] rounded-l-[12px]", {
          "bg-[#FFDF41]": row.getIsSelected(),
        })}
      >
        <RowDragHandleCell rowId={row.id} />
        <div
          className={cn(
            " flex items-center justify-center rounded-l-[12px] relative"
          )}
        >
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
    id: "connectionName",
    accessorKey: "connectionName",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Connection Name
      </div>
    ),
    cell: ({ row, column }) => (
      <NameColumn
        src={row.original.integration.logo}
        link={`/x/access-settings/connections/${row.original.id}`}
        name={row.original.connectionName}
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
        <ConnectionStatusMapper status={row.original.connectionStatus} />
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
        {row.original.connectionDescription}
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
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        <div className="flex flex-col text-left">
          <span>
            {moment(row.original.updatedAt || row.original.createdAt).format(
              "DD MMM, YYYY"
            )}
          </span>
          <span className="text-[11px] text-muted-foreground">
            <span className="text-[11px] text-muted-foreground">
              {moment(row.original.updatedAt || row.original.createdAt).format(
                "hh:mm A"
              )}{" "}
              |{" "}
              {moment(row.original.updatedAt || row.original.createdAt)
                .tz("America/Chicago")
                .format("z")}
            </span>
          </span>
        </div>
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
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        <div className="flex flex-col text-left">
          <span>
            {moment(row.original.lastTestedAt || row.original.createdAt).format(
              "DD MMM, YYYY"
            )}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {moment(row.original.lastTestedAt || row.original.createdAt).format(
              "hh:mm A"
            )}{" "}
            |{" "}
            {moment(row.original.lastTestedAt || row.original.createdAt)
              .tz("America/Chicago")
              .format("z")}
          </span>
        </div>
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
    cell: ({ row }) => (
      <div className="">
        <Popover>
          <PopoverTrigger
            className={`${row.original.isArchived ? "cursor-not-allowed" : "cursor-pointer"}`}
            asChild
            disabled={row.original.isArchived}
          >
            <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
              <BsThreeDotsVertical />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-0">
            <ConnectionActionOptions
              connectionId={row.original.id}
              component="listing"
            />
          </PopoverContent>
        </Popover>
      </div>
    ),
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
