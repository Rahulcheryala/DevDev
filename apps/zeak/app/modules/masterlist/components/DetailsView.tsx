"use client"

import { PencilIcon, MoreHorizontal } from "lucide-react"
import { Button } from "@zeak/react"
import { Badge } from "@zeak/react"
import { Zlogo } from "@zeak/icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@zeak/react"
import { useSearchParams } from "@remix-run/react"
import { useMasterlistDetails } from "../hooks"
import { cn } from "@zeak/react"


export default function DetailsView() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const { data, isLoading, isError } = useMasterlistDetails(id)
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error...</div>
    }
    return (
        <div className=" rounded-zeak mt-4 ">

            <div className="flex ">
                <div className="p-6 bg-white opacity-50 w-[400px] rounded-l-zeak">

                    <h2 className="text-xl font-semibold text-gray-700">General</h2>
                </div>


                <div className=" bg-white w-full px-10 py-6 space-y-8">
                    <div className="grid grid-cols-2 items-start gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">List Name</label>
                            <div className="font-medium capitalize">{data?.name}</div>
                        </div>
                        <div className="space-y-1 flex items-center justify-between">
                            <div className="">

                                <label className="text-sm text-gray-500">Purpose</label>
                                <div className="font-medium capitalize">{data?.purpose}</div>
                            </div>
                            <div className="flex items-center ">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" >
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 items-start gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">List Type</label>
                            <div className="flex items-center gap-2">
                                <Zlogo />
                                <span className="font-medium">System</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Status</label>
                            <div className="flex items-center gap-2">
                                <div className={cn("w-[10px] h-[10px] border-2   ring-2  border-white  rounded-[50%]", data?.isActive ? "bg-green-500 ring-green-500" : "bg-gray-500 ring-gray-500")}></div>
                                <span className="font-medium capitalize">{data?.isActive ? "Active" : "Inactive"}</span>

                            </div>
                        </div>

                    </div>
                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Companies</label>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Pfizer US, Pfizer EU</span>
                            <Badge variant="secondary" className="text-xs">
                                +1
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 items-start gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Start Date</label>
                            <div className="font-medium text-gray-500">MM/DD/YYYY</div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">End Date</label>
                            <div className="font-medium text-gray-500">MM/DD/YYYY</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

