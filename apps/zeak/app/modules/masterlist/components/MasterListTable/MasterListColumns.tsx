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

import { cn } from "@zeak/react";
import { TData } from "~/modules/notifications/components/NotificationDataTable/data"
import Chart from "~/modules/notifications/components/NotificationDataTable/Charts";
import { MasterListValue } from "@prisma/client";



const columns: ColumnDef<MasterListValue>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center pl-3 h-full  ">
                <DataTableCheckbox
                    className="rounded-full "
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={() => table.toggleAllPageRowsSelected()}
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
        id: "value",
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => (
            <div className="text-left">{row.original.value}</div>
        ),
    },
    {
        id: "displayName",
        accessorKey: "displayName",
        header: "Display Name",
        cell: ({ row }) => (
            <div className="text-left">{row.original.displayName}</div>
        ),
    },

];

export default columns;