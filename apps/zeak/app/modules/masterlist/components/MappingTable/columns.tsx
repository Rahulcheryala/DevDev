import { ColumnDef } from "@tanstack/react-table"
import { HeaderTextCell, TextCell, StatusCell, DateCell, RowDragHandleCell, DataTableCheckbox } from "@zeak/datatable"
import { cn } from "@zeak/react"
import { CiViewColumn } from "react-icons/ci"
import { ActionPopover } from "@zeak/datatable"

export const columns: ColumnDef<any>[] = [
    {
        id: "select",
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
            dataType: "select",
            isEditable: true,
        },
        size: 60,
    },

    {
        id: "company",
        accessorKey: "company",
        header: ({ header }) => <HeaderTextCell text="Company" />,
        cell: ({ row }) => <TextCell text={row.original.company} />,
        size: 273
    },
    {
        id: "module",
        accessorKey: "module",
        header: ({ header }) => <HeaderTextCell text="Module" />,
        cell: ({ row }) => <TextCell text={row.original.module} />,
        size: 237
    },
    {
        id: "field",
        accessorKey: "field",
        header: ({ header }) => <HeaderTextCell text="Field" />,
        cell: ({ row }) => <TextCell text={row.original.field} />,
        size: 273
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ header }) => <HeaderTextCell text="Status" />,
        cell: ({ row }) => <StatusCell status={row.original.status} />,
        size: 273,
    },
    {
        id: "lastUpdated",
        accessorKey: "lastUpdated",
        header: ({ header }) => <HeaderTextCell text="Last Updated" />,
        cell: ({ row }) => <DateCell row={row} timeZone="Asia/Manila" />,
        size: 207
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
                <ActionPopover
                    isActive={row.original.status === "active"}
                    onEdit={() => { }}
                    onManageValues={() => { }}
                    onDeactivate={() => { }}
                    onDuplicate={() => { }}
                    onDelete={() => { }}
                    onExport={() => { }}
                />
            </div>
        ),
        size: 64,
        meta: {
            name: "Actions",
            dataType: "action",
            isEditable: false,
        },
    }
]