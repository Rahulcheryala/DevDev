import type { ColumnDef } from "@tanstack/react-table";

import RowDragHandleCell from "~/components/DataTable/RowDragHanle";
import { DataTableCheckbox } from "~/components/DataTable";
import { ActionPopover } from "~/components/DataTable";
import {createColumnHelper} from "@tanstack/react-table"
import { cn } from "@zeak/react";
import type { Person } from "./data";

const columnHelper = createColumnHelper<Person>()

const columns: ColumnDef<Person>[] = [
  columnHelper.group({
    id: "header1",
    header: () => <div className="">Header 1</div>,
    columns: [
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
            {/* <RowDragHandleCell rowId={row.id} /> */}
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
        size: 60,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
      }
    ]
  }),

  columnHelper.group({
    id: "header2", 
    header: () => "Header 2",
    columns: [
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        meta: {
          filterVariant: 'range',
        },
      }
    ]
  }),

  columnHelper.group({
    id: "header3",
    header: () => "Header 3", 
    columns: [
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        meta: {
          filterVariant: 'range',
        },
      }
    ]
  })
]

export default columns;
