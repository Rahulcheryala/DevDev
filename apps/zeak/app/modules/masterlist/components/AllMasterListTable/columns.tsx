import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@zeak/react";
import { RowDragHandleCell, DataTableCheckbox, DateCell, TextCell, StatusCell } from "@zeak/datatable";
import { CiViewColumn } from "react-icons/ci";
import { Link } from "@remix-run/react";
import ActionMenu from "./action-menu";
const timeZone = "America/Chicago";
import { HeaderTextCell } from "@zeak/datatable";
import CreatedByCell from "./created-by-cell";
import CompaninesCell from "./CompaninesCell";
import { UserCircleIcon } from "lucide-react";

export const columns: ColumnDef<any>[] = [
    {
        id: "masterlist-select",
        cell: ({ row }) => (
            <div className={cn("flex h-[64px] w-[60px]  rounded-l-[12px]", {
                "bg-[#FFDF41]": row.getIsSelected(),
            })}>
                <RowDragHandleCell rowId={row.id} isSelected={row.getIsSelected()} />

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
        id: "name",
        header: (
            ({ header }) => <HeaderTextCell text="List Name" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "name",
        cell: ({ row }) => {
            return (
                <div className="px-4 py-3  ">
                    <Link to={`/x/masterlists/${row.original.id}`}>
                        <span className="capitalize text-[#007AF5] text-[14px] font-medium">{row.original.name}</span>
                    </Link>

                </div>
            )
        }
    },
    {
        id: "code",
        header: (
            ({ header }) => <HeaderTextCell text="Code" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "code",
        cell: ({ row, column }) => {
            return (
                <TextCell text={row.original.code} maxWidth={column.getSize() - 50} />
            )
        }


    },
    {
        id: "purpose",
        header: (
            ({ header }) => <HeaderTextCell text="Purpose" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "purpose",
        cell: ({ row, column }) => {
            return (
                <TextCell text={row.original.purpose} maxWidth={column.getSize() - 50} />
            )
        }
    },
    {
        id: "status",
        header: (
            ({ header }) => <HeaderTextCell text="Status" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "status",
        cell: ({ row, column }) => {
            return (
                <StatusCell status={row.original.isActive} maxWidth={column.getSize() - 50} />
            )
        }
    },
    {
        id: "type",
        header: (
            ({ header }) => <HeaderTextCell text="List Type" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "type",
        cell: ({ row, column }) => {
            return <div className="flex gap-3 px-6 py-4">
                <UserCircleIcon className="w-5 h-5" />
                <div className="text-[14px] capitalize">
                    {row.original.type}
                </div>
            </div>
        },
        size: 215,
    },
    {
        id: "companies",
        header: (
            ({ header }) => <HeaderTextCell text="Companies" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "companies",
        cell: ({ row, column }) => {

            return <CompaninesCell companiesIds={row.original.companies} />
        },
        size: 215,
    },
    {
        id: "createdOn",
        header: (
            ({ header }) => <HeaderTextCell text="Created On" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "createdAt",
        cell: ({ row }) => {
            return (
                <DateCell row={row} timeZone={timeZone} />
            )
        },
        size: 200,
    },
    {
        id: "createdBy",
        header: (
            ({ header }) => <HeaderTextCell text="Created By" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "createdBy",
        size: 300,
        cell: ({ row }) => {
            return (
                <CreatedByCell createdBy={row.original.createdBy} />
            )
        }
    },
    {
        id: "updatedOn",
        header: (
            ({ header }) => <HeaderTextCell text="Last Updated On" maxWidth={header.column.getSize() - 50} />
        ),
        accessorKey: "updatedAt",
        size: 200,
        cell: ({ row }) => {
            return (
                <DateCell row={row} timeZone={timeZone} />
            )
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
                <ActionMenu masterlistId={row.original.id} isActive={row.original.isActive} />
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
    }
]