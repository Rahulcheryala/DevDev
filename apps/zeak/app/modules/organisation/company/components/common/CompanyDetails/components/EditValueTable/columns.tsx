import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@zeak/react";
import {  LockOpen, Upload } from "lucide-react";
import { RowDragHandleCell, DataTableCheckbox, DateCell, TextCell, StatusCell, HeaderTextCell } from "@zeak/datatable";
import { CiViewColumn } from "react-icons/ci";
import { ActionPopover } from "@zeak/datatable"
import { useUser } from "~/modules/masterlist"
import { FaLock } from "react-icons/fa6";
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
        id:"image", 
        accessorKey:"image",
        header: ({ header }) => <HeaderTextCell text="Icon" />,
        cell: ({ row, column }) => {
            return (<div style={{width:`${column.getSize()}`}}  className='flex items-center gap-3 px-4'>
               <Upload className='text-[#9BA2AC] h-5 w-5'/>
               <span className='text-[#9BA2AC]'>Upload</span>
            </div>)
        },
        meta: {
            name: "Icon",
            dataType: "image",
            isEditable: true,
        },
        size: 202,
    },
    {
        id: "sequence",
        accessorKey: "sequence",
        header: ({ header }) => <HeaderTextCell text="Sequence Number" />,
        cell: ({ row }) => {
            return <TextCell text={row.original.sequence} />
        },
        meta: {
            name: "Sequence Number",
            dataType: "number",
            isEditable: true,
        },
        size: 202,
    },
    {
        id: "displayName",
        accessorKey: "displayName",
        header: ({ header }) => <HeaderTextCell required={true} text="Display Name" />,
        cell: ({ row }) => {
            return <TextCell text={row.original.displayName} />
        },
        meta: {
            name: "Display Name",
            dataType: "text",
            isEditable: true,
        },
        size: 187,
    },
    {
        id: "value",
        accessorKey: "value",
        header: ({ header }) => <HeaderTextCell text="Value" />,
        cell: ({ row }) => {
            return <TextCell text={row.original.value} />
        },
        meta: {
            name: "Value",
            dataType: "text",
            isEditable: true,
        },
        size: 200,
    },
    {
        id: "meaning",
        accessorKey: "meaning",
        header: ({ header }) => <HeaderTextCell required={true} text="Meaning" />,
        cell: ({ row }) => {
            return <TextCell text={row.original.meaning} />
        },
        meta: {
            name: "Meaning",
            dataType: "text",
            isEditable: true,
        },
        size: 200,
    },
    {
        id: "isDefault",
        accessorKey: "isDefault",
        header: ({ header }) => <HeaderTextCell text="Default" />,
        cell: ({ row }) => {
            return <TextCell text={row.original.isDefault ? "Yes" : "No"} />
        },
        meta: {
            name: "Default",
            dataType: "boolean",
            isEditable: true,
        },
        size: 100,
    },
    {
        id: "isActive",
        accessorKey: "isActive",
        header: ({ header }) => <HeaderTextCell text="Status" />,
        cell: ({ row }) => {
            return <StatusCell status={row.original.isActive} />
        },
        meta: {
            name: "Status",
            dataType: "enum",
            isEditable: true,

        },
        size: 150,
    },

    {
        id: "editable",
        header: ({ header }) => <HeaderTextCell text="Editable" />,
        accessorKey: "editable",
        cell: ({ row }) => {
            return <div className="flex items-center justify-center px-6 py-4">
                {row.original.editable ?
                    <div className="flex items-center justify-center gap-2">
                        <LockOpen className="w-4 h-4 " />
                        <span className="text-sm text-green-500 font-[450]">Yes</span>
                    </div> :
                    <div className="flex items-center justify-center gap-2">
                        <FaLock className="w-4 h-4 text-[#9BA2AC]" />
                        <span className="text-sm font-[450]">No</span>
                    </div>
                }
            </div>
        },
        meta: {
            name: "Editable",
            dataType: "boolean",
            isEditable: true,
        },
        size: 120,
    },
    {
        id: "createdBy",
        accessorKey: "createdBy",
        header: ({ header }) => <HeaderTextCell text="Created By" />,
        cell: ({ row }) => {
            const { data, isPending, isError } = useUser(row.original.createdBy)
            if (isPending) return <TextCell text="Loading..." />
            if (isError) return <TextCell text="Error" />
            return <TextCell text={`${data.firstName} ${data.lastName}`} />
        },
        meta: {
            name: "Created By",
            dataType: "text",
            isEditable: false,
        },
        size: 150,
    },
    {
        id: 'createdAt',
        accessorKey: "createdAt",
        header: ({ header }) => <HeaderTextCell text="Created At" />,
        cell: ({ row }) => {
            return <DateCell row={row} timeZone="Asia/Manila" />
        },
        meta: {
            name: "Created At",
            dataType: "date",
            isEditable: false,
        },
        size: 150,
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
                    isActive={row.original.isActive}
                    onDeactivate={() => {
                        console.log("deactivate")
                    }}

                    onDelete={() => {
                        console.log("delete")
                    }}
                    onEdit={() => {
                        console.log("edit")
                    }}
                    onDuplicate={() => {
                        console.log("duplicate")
                    }}
                    onExport={() => {
                        console.log("export")
                    }}
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
