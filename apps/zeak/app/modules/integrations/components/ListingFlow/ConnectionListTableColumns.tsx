import { ColumnDef } from "@tanstack/react-table";
import {
  ActionButtonProps,
  cn,
  Popup,
  RadioCheckbox,
  StatusPill,
} from "@zeak/ui";
import {
  NameTableCell,
  DateTableCell,
  RowDragHandleCell,
} from "@zeak/datatable";
import { useConnectionActions } from "../misc/ConnectionActionOptions";
import { safeReplace } from "../../utils/utils";
// icons
import { CiViewColumn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

export const ConnectionListTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center px-3 h-full">
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
        className={cn("flex h-[64px] w-[60px] rounded-l-[12px]", {
          "bg-[#FFDF41]": row.getIsSelected(),
        })}
      >
        <RowDragHandleCell rowId={row.id} />
        <div className={cn(" flex items-center justify-center relative")}>
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
        name={row.original.connectionName}
        columnSize={column.getSize()}
        showImage={false}
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
    id: "integrationName",
    accessorKey: "integrationName",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Integration Name
      </div>
    ),
    cell: ({ row, column }) => {
      // console.log(row.original.integration.id);
      return (
        <NameTableCell
          src={row.original.integration.logo}
          name={row.original.integration.integrationName}
          link={`${row.original.integration.id}`}
          columnSize={column.getSize()}
        />
      );
    },
    meta: {
      filterVariant: "text",
      name: "Integration Name",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "applicationName",
    accessorKey: "applicationName",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Application
      </div>
    ),
    cell: ({ row, column }) => {
      return (
        <NameTableCell
          src={row.original.integration.logo}
          name={safeReplace(row.original.integration.applicationName)}
          columnSize={column.getSize()}
        />
      );
    },
    meta: {
      filterVariant: "text",
      name: "Application",
    },
    size: 250,
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
        className="truncate text-sm px-5 text-left"
      >
        {row.original.connectionDescription || "-"}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Description",
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
      filterVariant: "text",
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
      filterVariant: "text",
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
          date={row.original.lastTestedAt}
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
    id: "enabled",
    accessorKey: "enabled",
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
      name: "Enabled",
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
      const actionButtons = useConnectionActions(row.original.id, row.original.connectionStatus);
      // Trigger button for the popup
      const triggerButton = (
        <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
          <BsThreeDotsVertical />
        </button>
      );

      return (
        <div className="">
          <Popup
            trigger={triggerButton}
            buttons={actionButtons as ActionButtonProps[]}
            align="end"
          />
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
