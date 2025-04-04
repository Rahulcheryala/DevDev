import type { ColumnDef } from "@tanstack/react-table"
import { Radio } from "./Radio"
import { Avatar } from "@zeak/react"

export type Company = {
    id: string
    name: string
    code: string
    url: string
    status: "active" | "inactive"
    users: number
    createdAt: string
    avatar?: string
}

const SortIcon = ({ isSorted }: { isSorted: boolean | 'asc' | 'desc' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-colors"
    >
        <path
            d="M4.66699 6.0013L8.00033 2.66797L11.3337 6.0013"
            stroke={isSorted === 'asc' ? '#101828' : '#9BA2AC'}
            strokeWidth={isSorted === 'asc' ? "2" : "1.5"}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4.66699 10.0013L8.00033 13.3346L11.3337 10.0013"
            stroke={isSorted === 'desc' ? '#101828' : '#9BA2AC'}
            strokeWidth={isSorted === 'desc' ? "2" : "1.5"}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
        <path d="M8.41602 8.75C8.83023 8.75 9.16602 8.41421 9.16602 8C9.16602 7.58579 8.83023 7.25 8.41602 7.25C8.0018 7.25 7.66602 7.58579 7.66602 8C7.66602 8.41421 8.0018 8.75 8.41602 8.75Z" fill="#677281" />
        <path d="M8.41602 3.5C8.83023 3.5 9.16602 3.16421 9.16602 2.75C9.16602 2.33579 8.83023 2 8.41602 2C8.0018 2 7.66602 2.33579 7.66602 2.75C7.66602 3.16421 8.0018 3.5 8.41602 3.5Z" fill="#677281" />
        <path d="M8.41602 14C8.83023 14 9.16602 13.6642 9.16602 13.25C9.16602 12.8358 8.83023 12.5 8.41602 12.5C8.0018 12.5 7.66602 12.8358 7.66602 13.25C7.66602 13.6642 8.0018 14 8.41602 14Z" fill="#677281" />
        <path d="M8.41602 8.75C8.83023 8.75 9.16602 8.41421 9.16602 8C9.16602 7.58579 8.83023 7.25 8.41602 7.25C8.0018 7.25 7.66602 7.58579 7.66602 8C7.66602 8.41421 8.0018 8.75 8.41602 8.75Z" stroke="#677281" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.41602 3.5C8.83023 3.5 9.16602 3.16421 9.16602 2.75C9.16602 2.33579 8.83023 2 8.41602 2C8.0018 2 7.66602 2.33579 7.66602 2.75C7.66602 3.16421 8.0018 3.5 8.41602 3.5Z" stroke="#677281" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.41602 14C8.83023 14 9.16602 13.6642 9.16602 13.25C9.16602 12.8358 8.83023 12.5 8.41602 12.5C8.0018 12.5 7.66602 12.8358 7.66602 13.25C7.66602 13.6642 8.0018 14 8.41602 14Z" stroke="#677281" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 8H12M2 4H14M6 12H10" stroke="#9BA2AC" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const HeaderCell = ({
    title,
    column
}: {
    title: string
    column: any
}) => (
    <div className="flex justify-end items-center gap-3 bg-white rounded-l-xl w-full">
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between py-2">
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-1 hover:text-[#0D0C22]"
                >
                    <span className="text-sm font-medium leading-5 tracking-[0.2px] text-[#0D0C22]">{title}</span>
                    <SortIcon isSorted={column.getIsSorted()} />
                </button>
                <FilterIcon />
            </div>
            <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-normal leading-3 tracking-[0.2px] text-[#475467]">Search</span>
                <SearchIcon />
            </div>
        </div>
    </div>
)

const DEFAULT_VALUE = '--';

export const columns: ColumnDef<Company>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex w-[60px] h-[64px] min-h-[56px] px-6 justify-end items-center gap-3 bg-white rounded-l-xl">
                <Radio
                    name="table-select-all"
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(checked) => {
                        table.toggleAllPageRowsSelected(!!checked)
                    }}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex w-[60px] h-[64px] min-h-[56px] px-6 justify-end items-center gap-3 rounded-l-xl" onClick={(e) => e.stopPropagation()}>
                <Radio
                    name={`row-select-${row.id}`}
                    checked={row.getIsSelected()}
                    onCheckedChange={(checked) => {
                        row.toggleSelected(!!checked)
                    }}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: ({ column }) => <HeaderCell title="Company Name" column={column} />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 px-4 py-4">
                    {row.original.avatar ? (
                        <Avatar src={row.original.avatar} size='sm' className="ring-1 ring-gray-100 " />
                        // <img
                        //     src={row.original.avatar}
                        //     alt={row.original.name}
                        //     className="h-8 w-8 rounded-full"
                        // />
                    ) : (
                        <Avatar size='sm' className="ring-1 ring-gray-100 shadow-lg" />
                    )}
                    <span className="font-['Suisse_Int\\'l'] text-sm font-medium leading-5 tracking-[0.2px] text-[#007AF5] line-clamp-1">{row.original.name || DEFAULT_VALUE}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "code",
        header: ({ column }) => <HeaderCell title="Company Code" column={column} />,
        cell: ({ row }) => (
            <div className="px-4 py-4">
                <span className="flex items-center gap-2 px-4 py-4 font-['Suisse_Int\\'l'] text-sm font-normal leading-5 tracking-[0.2px] text-[#101828] line-clamp-1">
                    {row.original.code || DEFAULT_VALUE}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "url",
        header: ({ column }) => <HeaderCell title="URL" column={column} />,
        cell: ({ row }) => (
            <div className="px-4 py-4">
                <span className="flex items-center gap-2 px-4 py-4 font-['Suisse_Int\\'l'] text-sm font-normal leading-5 tracking-[0.2px] text-[#101828] line-clamp-1">
                    {row.original.url || DEFAULT_VALUE}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => <HeaderCell title="Status" column={column} />,
        cell: ({ row }) => (
            <div className="px-4 py-4">
                <div className={`flex items-center gap-2 ${row.original.status?.toLowerCase() === "active" ? "text-[#12B76A]" : "text-[#475467]"
                    }`}>
                    <div className={`h-2 w-2 rounded-full ${row.original.status?.toLowerCase() === "active" ? "bg-[#12B76A]" : "bg-[#475467]"
                        }`} />
                    <span className="font-['Suisse_Int\\'l'] text-sm font-normal leading-5 tracking-[0.2px] capitalize line-clamp-1">
                        {row.original.status || DEFAULT_VALUE}
                    </span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "users",
        header: ({ column }) => <HeaderCell title="Number of Users" column={column} />,
        cell: ({ row }) => (
            <div className="px-4 py-4">
                <span className="flex items-center gap-2 px-4 py-4 font-['Suisse_Int\\'l'] text-sm font-normal leading-5 tracking-[0.2px] text-[#101828] line-clamp-1">
                    {row.original.users || DEFAULT_VALUE}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <HeaderCell title="Creation Date" column={column} />,
        cell: ({ row }) => (
            <div className="px-4 py-4">
                <div className="flex flex-col">
                    <span className="font-['Suisse_Int\\'l'] text-sm font-normal leading-5 tracking-[0.2px] text-[#101828] line-clamp-1">
                        {new Date(row.original.createdAt).toLocaleDateString() || DEFAULT_VALUE}
                    </span>
                    <span className="font-['Suisse_Int\\'l'] text-[11px] font-normal leading-5 tracking-[0.2px] text-[#9BA2AC] line-clamp-1">
                        {new Date(row.original.createdAt).toLocaleTimeString() || DEFAULT_VALUE}
                    </span>
                </div>
            </div>
        ),
    },
]