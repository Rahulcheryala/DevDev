/* eslint-disable react-hooks/rules-of-hooks */
import type { ColumnDef } from "@tanstack/react-table";
import { CiViewColumn } from "react-icons/ci";
import RowDragHandleCell from "~/components/DataTable/RowDragHanle";
import { DataTableCheckbox } from "~/components/DataTable";
import { TrendUpIcon1, AlarmClockIcon, RefreshIcon, MessageTextOutline } from "@zeak/icons"
import { Bell, ChevronRight, } from 'lucide-react'
import { motion } from "framer-motion";
import { format } from "date-fns"
import { LuMailOpen } from "react-icons/lu";
import { RadioIcon } from "@zeak/icons"
import { ActionPopover } from "~/components/DataTable";
import { Play } from "lucide-react"
import { cn } from "@zeak/react";
import { TData } from "./data"
import Chart from "./Charts";




const columns: ColumnDef<TData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pl-3 h-full  ">
        <DataTableCheckbox
          className="rounded-full "
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={cn("flex h-[64px] w-[60px]  rounded-l-[12px]", {
        "bg-[#FFDF41]": row.getIsSelected(),
      })}>
        <RowDragHandleCell rowId={row.id} />
        <div
          className={cn(
            " flex items-center justify-center rounded-l-[12px] relative",

          )}
        >

          <DataTableCheckbox
            className={cn("rounded-full", {
              "bg-white": row.getIsSelected(),
            })}
            checked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        </div>
      </div>
    ),
    meta: {
      name: "Select",
      dataType: "boolean",
    },
    size: 60,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: false,
    enableColumnFilter: false,
  },


  {
    accessorKey: "notificationName",
    id: "notificationName",
    header: (
      ({ header }) => <div style={{
        maxWidth: header.column.getSize() - 50,
      }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Notification Name</div>
    ),
    accessorFn: (row) => row.notificationName,
    footer: (props) => props.column.id,
    size: 380,
    minSize: 50,
    cell: ({ row, column }) => (
      <div className="flex items-center gap-2">
        {row.getCanExpand() ? <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          <motion.div
            animate={{
              rotate: row.getIsExpanded() ? 90 : 0
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.div>
        </button> : "N"}
        <div style={{
          maxWidth: column.getSize(),
        }} className="text-ellipsis text-nowrap overflow-hidden px-3 ">
          {row.original.notificationName}
        </div>
      </div>
    ),
    filterFn: "text",
    meta: {
      name: "Notification Name",
      filterVariant: "text",
      dataType: "string",

    },

  },
  // Status
  {
    accessorFn: (row) => row.status,
    cell: ({ row, column }) => <div
      className="px-6 flex items-center justify-center "
    >{row.original.status ? <div className="flex items-center gap-2"><RadioIcon className="text-green-500 " /><span style={{
      maxWidth: column.getSize() - 50,
    }}
      className="text-ellipsis text-nowrap overflow-hidden text-[#4CB944]">Active</span></div> : <div className="flex items-center gap-2"><RadioIcon className="text-gray-500" /><span>Inactive</span></div>}</div>,
    header: ({ header }) => <div style={{
      maxWidth: header.column.getSize() - 50,
    }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Status</div>,
    id: "status",
    minSize: 50,
    size: 120,
    meta: {
      filterVariant: "boolean",
      name: "Status",
      dataType: "boolean",
    },
    footer: (props) => props.column.id,
  },
  // Reoccurring
  {
    accessorKey: "reoccurring",
    accessorFn: (row) => row.reoccurring,
    cell: ({ row, column }) => <div style={{
      maxWidth: column.getSize() - 50,
      width: column.getSize(),
    }} className="text-ellipsis text-center w-full overflow-hidden">
      {row.original.reoccurring ? "Yes" : "No"}
    </div>,
    // Header
    header: ({ header }) => <div style={{
      maxWidth: header.column.getSize() - 50,
    }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Reoccurring</div>,
    id: "reoccurring",
    minSize: 50,
    filterFn: "boolean",
    meta: {
      filterVariant: "boolean",
      name: "Reoccurring",
      dataType: "boolean",
    },
    footer: (props) => props.column.id,
  },
  // numbers
  {
    accessorKey: "cost",
    accessorFn: (row) => row.cost,
    cell: ({ row, column }) => {
      return (
        <div style={{
          maxWidth: column.getSize() - 50,
        }} className="text-ellipsis text-nowrap overflow-hidden">
          {row.original.cost}
        </div>
      )
    },
    header: ({ header }) => <div style={{
      maxWidth: header.column.getSize() - 50,
    }} className="text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]">Cost</div>,
    id: "cost",
    minSize: 50,
    size: 120,
    filterFn: "number",
    sortingFn: "custom",

    meta: {
      name: "Cost",
      dataType: "number",
      filterVariant: "number",

    },
    footer: (props) => props.column.id,
  },
  // Trigger
  {
    accessorKey: "trigger",
    accessorFn: (row) => row.triggerType,
    cell: ({ row, column }) =>
      <div style={{
        width: column.getSize(),
      }} className="flex items-center gap-10 px-6 py-4   justify-between">

        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-2">
            {row.original.triggerType === "On-Demand" && <TrendUpIcon1 className="text-[#0040DD] h-5 w-5" />}
            {row.original.triggerType === "Event-Based" && <RefreshIcon className="h-5 w-5 " />}
            {row.original.triggerType === "Time-Based" && <AlarmClockIcon className="text-green-500 h-5 w-5" />}
          </div>
          <div style={{
            maxWidth: column.getSize() - 100,
          }} className="text-ellipsis text-nowrap flex flex-col text-start text-[11px] font-[450] overflow-hidden ">
            {row.original.triggerType}
            <span className={cn("uppercase", {
              "text-[#31DE4B]": row.original.triggerState === "running",
              "text-[#677281]": row.original.triggerState === "waiting",
              "hidden": row.original.triggerState === "completed",
            })}>
              {row.original.triggerState}
            </span>
          </div>
        </div>
        {row.original.triggerType === "On-Demand" && <div className="flex rounded-full p-1 bg-[#EBEBEB]">
          <Play className="h-5 w-5 text-gray-500 fill-[#007D1B]" />
        </div>}
      </div>
    ,
    header: (header) => <h1 style={{
      maxWidth: header.column.getSize() - 50,
    }} className={cn("text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]")}>
      Trigger
    </h1>,
    id: "trigger",
    size: 266,
    sortingFn: (rowA, rowB, _columnId) => {
      const statusA = rowA.original.triggerType
      const statusB = rowB.original.triggerType
      const statusOrder = ['On-Demand', 'Event-Based', 'Time-Based']
      return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB)
    },
    footer: (props) => props.column.id,
    meta: {
      name: "Trigger",
      dataType: "string",
    }
  },


  {
    accessorKey: "recipients",
    accessorFn: (row) => row.recipients,
    cell: ({ row, column }) =>
      <div className="flex items-center gap-2 px-6 py-4">
        <div style={{
          maxWidth: column.getSize() - 50,
        }} className="text-ellipsis text-nowrap overflow-hidden ">{row.original.recipients[0]}
          {row.original.recipients.length > 1 && <span className="text-gray-500"> +{row.original.recipients.length - 1}</span>}
        </div>
      </div>
    ,
    // Header
    header: (header) => <h1 style={{
      maxWidth: header.column.getSize() - 50,
    }} className={cn("text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]")}>
      Recipients
    </h1>,
    id: "recipients",
    size: 235,
    meta: {
      name: "Recipients"
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "deliveryMethod",
    accessorFn: (row) => row.deliveryMethod,
    cell: ({ row, column }) => <div style={{

      width: column.getSize(),
    }} className="text-ellipsis text-nowrap overflow-hidden flex items-center gap-4 justify-center px-6 py-4 ">
      <LuMailOpen className={cn("h-5 w-5", {
        "fill-[#0D99FF] text-white": row.original.deliveryMethod.email,
      })} />
      <Bell className={cn("h-5 w-5", {
        "fill-[#0D99FF] text-[#0D99FF]": row.original.deliveryMethod.inApp,
      })} />
      <MessageTextOutline color={row.original.deliveryMethod.sms ? "#fff" : "#677281"} className={cn("h-5 w-5", {
        "fill-[#0D99FF] text-white": row.original.deliveryMethod.sms,
      })} />

    </div>,
    // Header
    header: (header) => <h1 style={{
      maxWidth: header.column.getSize() - 50,
    }} className={cn("text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]")}>
      Delivery Method
    </h1>,
    id: "deliveryMethod",
    size: 235,
    footer: (props) => props.column.id,
    meta: {
      name: "Delivery Method"
    },
  },
  {
    accessorKey: "creationDate",
    id: "creationDate",
    accessorFn: (row) => row.creationDate,
    cell: ({ row, column }) => <div style={{
      maxWidth: column.getSize() - 50,
    }} className="text-ellipsis text-nowrap overflow-hidden py-4 pl-6 ">
      <div style={{
        maxWidth: column.getSize(),
      }} className="text-[14px] text-start text-ellipsis text-nowrap overflow-hidden">
        {format(row.original.creationDate, "d MMM yyyy")}
      </div>
      <div style={{
        maxWidth: column.getSize(),
      }} className="text-gray-500 text-start text-[11px] text-ellipsis text-nowrap overflow-hidden">
        {format(row.original.creationDate, "hh:mm a")}
      </div>
    </div>,
    // Header
    header: (header) => <h1 style={{
      maxWidth: header.column.getSize() - 50,
    }} className={cn("text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]")}>
      Creation Date
    </h1>,
    size: 166,
    footer: (props) => props.column.id,
    filterFn: "date",
    meta: {
      name: "Creation Date",
      dataType: "date",
      filterVariant: "date"
    },
  },

  {
    accessorKey: "lastRunDate",
    id: "lastRunDate",
    accessorFn: (row) => row.lastRunDate,
    // Header
    header: (header) => <h1 style={{
      maxWidth: header.column.getSize() - 50,
    }} className={cn("text-ellipsis text-nowrap overflow-hidden text-[14px] font-semibold leading-[18px]")}>
      Last Run
    </h1>,
    // cell
    cell: ({ row, column }) => {


      return (
        <div style={{
          maxWidth: column.getSize(),
        }} className="text-ellipsis text-nowrap overflow-hidden py-4 pl-6 transition-all duration-300 ease-in-out ">
          <div style={{
            maxWidth: column.getSize(),
          }} className="text-[14px] text-start text-ellipsis text-nowrap overflow-hidden">
            {format(row.original.lastRunDate, "d MMM yyyy")}
          </div>
          <div style={{
            maxWidth: column.getSize(),
          }} className="text-gray-500 text-[11px] text-start text-ellipsis text-nowrap overflow-hidden">
            {format(row.original.lastRunDate, "hh:mm a")}
          </div>
        </div>
      )
    },
    filterFn: "date",
    meta: {
      name: "Last Run",
      dataType: "date",
      filterVariant: "date"
    },
  },
  {
    id: "charts",
    accessorKey: "chartData",
    header: () => {

      return (
        <div className="relative">
          <div className="flex items-center gap-2 z-50">

            <span>Charts</span>
          </div>

        </div>
      )
    },
    cell: ({ row }) => (
      <div className="h-20 w-40">
        <Chart data={row.original.chartData} />
      </div>
    ),
    enableSorting: false,
    meta: {
      name: "Charts",
      dataType: "chart",

    }
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

        <ActionPopover />

      </div>
    ),
    size: 64,
    meta: {
      name: "Actions",
      dataType: "action"
    },
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: false,
    enableColumnFilter: false,
  },
];

export default columns;