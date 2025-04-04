import { ColumnDef } from "@tanstack/react-table";
import { cn, Popup, ActionButtonProps, RadioCheckbox } from "@zeak/ui";
import { CiViewColumn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  NameTableCell,
  DateTableCell,
  RowDragHandleCell,
} from "@zeak/datatable";
import CompanyActionOptions from "../../misc/CompanyActionOptions";

export const CompanyTableColumns: ColumnDef<any>[] = [
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
    id: "companyName",
    accessorKey: "companyName",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Company Name
      </div>
    ),
    cell: ({ row, column }) => (
      <NameTableCell
        // link={`${row.original.id}`}
        name={row.original.name}
        columnSize={column.getSize()}
      />
    ),
    meta: {
      filterVariant: "text",
      name: "Company Name",
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
      <div className="flex justify-start items-center px-4">Yes</div>
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
    id: "lastUpdated",
    accessorKey: "lastUpdated",
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
          date={row.original.lastUpdated}
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
          <span>{row.original.errors || 0}</span>
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
          <Popup
            trigger={triggerButton}
            buttons={[] as ActionButtonProps[]}
            align="end"
            disabled={row.original.isArchived}
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
