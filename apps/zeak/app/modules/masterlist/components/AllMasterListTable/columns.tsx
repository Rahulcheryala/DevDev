import { ColumnDef } from "@tanstack/react-table";
import { MasterList } from "prisma/prisma-client";
import { format } from "date-fns";
import { cn } from "@zeak/react";
import { RowDragHandleCell, DataTableCheckbox } from "@zeak/datatable";

export const columns: ColumnDef<any>[] = [
    {
        id: "masterlist-select",
        // header: ({ table }) => (
        // <button className="bg-red-500 z-50" onClick={() => {
        //     table.toggleAllRowsSelected()
        //     console.log(table.getIsAllRowsSelected())
        // }}>
        //     click me
        // </button>
        // ),
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
        },
        size: 60,

    },
    {
        header: "List Name",
        accessorKey: "name",
        cell: ({ row }) => {
            return (
                <div className="px-4 py-3  ">
                    <span className="capitalize">{row.original.name}</span>

                </div>
            )
        }
    },
    {
        header: "Code",
        accessorKey: "code"
    },
    {
        header: "Purpose",
        accessorKey: "purpose"
    },
    {
        header: "Status",
        accessorKey: "status"
    },

    {
        header: "Created On",
        accessorKey: "createdAt"
    },
    { header: "Created By" },
    { header: "Last Updated On" },

]