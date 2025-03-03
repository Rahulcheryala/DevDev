import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckbox } from "../../../../components/DataTable";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import RowDragHandleCell from "../../../../components/DataTable/RowDragHanle";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import Image from "../../../../components/Image";
import { StatusPill } from "../../../../components/Layout/Screen";
import { EmployeeUser } from "../../../../components/types/employee-user.model";

export const DepartmentEmployeeColumns: ColumnDef<EmployeeUser>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center pl-5 h-full">
                <DataTableCheckbox
                    className="rounded-full"
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={() => table.toggleAllPageRowsSelected()}
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className={cn("flex h-[64px] w-[60px] rounded-l-[12px]", { "bg-[#FFDF41]": row.getIsSelected() })}>
                <RowDragHandleCell rowId={row.id} />
                <div className={cn("flex items-center justify-center rounded-l-[12px] relative")}>
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
                User Name
            </div>
        ),
        cell: ({ row, column }) => (
            <div className="flex items-center gap-4 px-3 cursor-pointer" >
                <Image alt={row.original.firstName + row.original.lastName} className='h-10 w-10 min-h-10 min-w-10 rounded-full' />
                <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden text-accent-primary">
                    {row.original.firstName} {row.original.lastName}
                </div>
            </div>
            // <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
            //     {row.original.firstName} {row.original.lastName}
            // </div>
        ),
        size: 200,
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
            filterVariant: "text",
            name: "User Name",
        },
    },
    {
        id: "email",
        accessorKey: "email",
        header: ({ header }) => (
            <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
                Email
            </div>
        ),
        cell: ({ row, column }) => (
            <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
                {row.original.email}
            </div>
        ),
        size: 250,
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
            filterVariant: "text",
            name: "Email",
        },
    },
    {
        id: "position",
        accessorKey: "position",
        header: ({ header }) => (
            <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
                Position
            </div>
        ),
        cell: ({ row, column }) => (
            <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
                -
            </div>
        ),
        size: 200,
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
            filterVariant: "text",
            name: "Position",
        },
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ header }) => (
            <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
                Status
            </div>
        ),
        cell: ({ row, column }) => (
            <StatusPill className="justify-center px-3" status="Active" columnSize={column.getSize() - 50} />
        ),
        size: 150,
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
            filterVariant: "select",
            name: "Status",
        },
    },
    {
        id: "notifications",
        accessorKey: "notifications",
        header: ({ header }) => (
            <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
                Notifications
            </div>
        ),
        cell: ({ row, column }) => (
            <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
                -
            </div>
        ),
        size: 150,
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
            filterVariant: "range",
            name: "Notifications",
        },
    },
    {
        id: "lastLogin",
        accessorKey: "lastLogin",
        header: ({ header }) => (
            <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
                Last Login
            </div>
        ),
        cell: ({ row, column }) => (
            <div style={{ maxWidth: column.getSize() }} className="text-ellipsis text-nowrap overflow-hidden px-3">
                Never logged in
            </div>
        ),
        size: 200,
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
            filterVariant: "text",
            name: "Last Login",
        },
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
                <Popover>
                    <PopoverTrigger className="cursor-pointer" asChild>
                        <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
                            <BsThreeDotsVertical />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-64 p-0">
                        {/* <UserActionOptions userId={row.original.id} /> */}
                    </PopoverContent>
                </Popover>
            </div>
        ),
        size: 64,
        meta: {
            name: "Actions"
        },
        enableSorting: true,
        enableHiding: false,
        enableResizing: false,
        enableGlobalFilter: false,
        enablePinning: true,
        enableColumnFilter: false,
    }
];