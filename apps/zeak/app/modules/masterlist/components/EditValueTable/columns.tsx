import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckbox, } from "@zeak/datatable";
import { cn } from "@zeak/react";
import { DragIcon } from "@zeak/icons";
import { Checkbox } from "@zeak/react";
export const columns: ColumnDef<any>[] = [
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
            <div
                className={cn("flex h-[64px] w-[60px]  rounded-l-[12px]", {
                    "bg-[#FFDF41]": row.getIsSelected(),
                })}
            >
                <DragIcon className="h-4 w-4 cursor-pointer text-white hover:text-gray-500" />
                <div
                    className={cn(
                        " flex items-center justify-center rounded-l-[12px] relative"
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
        id: "serialNumber",
        header: "Serial Number",
        cell: ({ row }) => {
            return <div>{row.original.id}</div>
        }
    },
    {
        id: "icon",
        header: ({ header }) => <div style={{
            maxWidth: header.column.getSize() - 50,
        }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Icon</div>,

        cell: ({ row }) => {
            return <div className="flex items-center justify-center">
                <img className="h-8 w-8 rounded-full" src={row.original.icon} alt="icon" />
            </div>
        }
    },
    {
        id: "value",
        accessorKey: "value",
        header: ({ header }) => <div style={{
            maxWidth: header.column.getSize() - 50,
        }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Value</div>,
        cell: ({ row }) => {
            return <div>{row.original.value}</div>
        }
    },
    {
        id: "meaning",
        accessorKey: "meaning",
        header: ({ header }) => <div style={{
            maxWidth: header.column.getSize() - 50,
        }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Meaning</div>,
        cell: ({ row }) => {
            return <div>{row.original.meaning}</div>
        }
    },
    {
        id: "setDefault",
        accessorKey: "setDefault",
        header: ({ header }) => <div style={{
            maxWidth: header.column.getSize() - 50,
        }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Set Default</div>,
        cell: ({ row }) => {
            return <div className="flex items-center justify-center">
                <Checkbox checked={row.original.setDefault} />
            </div>
        }
    },
    {
        id: "displayName",
        accessorKey: "displayName",
        header: ({ header }) => <div style={{
            maxWidth: header.column.getSize() - 50,
        }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">Display Name</div>,
        cell: ({ row }) => {
            return <div>{row.original.displayName}</div>
        }
    }
]
