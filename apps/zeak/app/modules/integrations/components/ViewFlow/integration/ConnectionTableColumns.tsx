import { ColumnDef } from "@tanstack/react-table";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { CiViewColumn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DataTableCheckbox } from "../../../../../components/DataTable";
import RowDragHandleCell from "../../../../../components/DataTable/RowDragHanle";
import { NameColumn } from "../../../../../components/Layout/Screen";
import moment from "moment";
import ConnectionActionOptions from "../../misc/ConnectionActionOptions";
import { LucideTriangleAlert } from "lucide-react";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { useIntegrationContext } from "../../../context";

const ConnectionStatus = ({ status }: { status: string }) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      {status === "ONLINE" && (
        <>
          <TbLink size={20} className="text-green-500 cursor-pointer" />
          <span className="text-green-500">ONLINE</span>
        </>
      )}
      {status === "OFFLINE" && (
        <>
          <LuUnlink size={20} className="text-gray-500 cursor-pointer" />
          <span className="text-gray-500">OFFLINE</span>
        </>
      )}
      {status === "ERROR" && (
        <>
          <LucideTriangleAlert
            size={20}
            className="text-red-500 cursor-pointer"
          />
          <span className="text-red-500">ERROR</span>
        </>
      )}
    </div>
  );
};

const ConnectionNameLink = ({
  connectionName,
  connectionId,
  columnSize,
}: {
  connectionName: string;
  connectionId: string;
  columnSize: number;
}) => {
  const { dispatch } = useIntegrationContext();

  return (
    <div
      onClick={() =>
        dispatch({
          type: "SET_SELECTED_CONNECTION",
          payload: connectionId,
        })
      }
    >
      <NameColumn name={connectionName} columnSize={columnSize} />
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
    id: "name",
    accessorKey: "name",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Connection Name
      </div>
    ),
    cell: ({ row, column }) => (
      <ConnectionNameLink connectionName={row.original.connectionName} connectionId={row.original.id} columnSize={column.getSize()}/>
      // <NameColumn
      //   link={`connections/${row.original.id}`}
      //   name={row.original.connectionName}
      //   columnSize={column.getSize()}
      // />
    ),
    meta: {
      filterVariant: "text",
      name: "Connection Name",
    },
    size: 250,
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
      <div className="flex justify-start items-center px-4">
        <ConnectionStatus status={row.original.connectionStatus} />
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
    id: "description",
    accessorKey: "description",
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
        {row.original.description || "-"}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Description",
    },
    size: 250,
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
          <span>{row.original.errors}</span>
        </div>
      </div>
    ),
    meta: {
      filterVariant: "select",
      name: "Errors",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "lastUpdated",
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
          <span>{moment(row.original.lastUpdated).format("DD MMM, YYYY")}</span>
          <span className="text-[11px] text-muted-foreground">
            {moment(row.original.lastUpdated).format("hh:mm A")}
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
    id: "lastSynced",
    accessorKey: "lastSynced",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Last Synced
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        <div className="flex flex-col text-left">
          <span>{moment(row.original.lastSynced).format("DD MMM, YYYY")}</span>
          <span className="text-[11px] text-muted-foreground">
            {moment(row.original.lastSynced).format("hh:mm A")}
          </span>
        </div>
      </div>
    ),
    meta: {
      filterVariant: "select",
      name: "Last Synced",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "enabled",
    accessorKey: "enabled",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Enabled
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-start items-center px-4">
        {row.original.enabled ? "Yes" : "No"}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Enabled",
    },
    size: 250,
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
