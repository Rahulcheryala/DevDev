import React from 'react'
import { Zlogo } from '@zeak/icons'
import { UserIcon, UserCircle } from 'lucide-react'
import { format } from 'date-fns'
import { Tally1 } from 'lucide-react'
import { Link } from '@remix-run/react'
import { cn } from '@zeak/react'
import { useParams } from '@remix-run/react'
import {useUser} from "~/modules/masterlist"
interface ListCardProps {
    name: string
   createdBy: string,
    isActive: boolean,
    lastUpdatedBy: string,
    updatedAt: Date,
    id: string
    type?: string
}
export default function ListCard({ name,  isActive, lastUpdatedBy,createdBy, updatedAt, id,type }: ListCardProps) {
    const { id: activeId } = useParams()
    const userId= lastUpdatedBy || createdBy
    const {data,isPending, isError} = useUser(userId)

    return (
        <div className={cn("px-4 py-3  cursor-pointer", activeId === id ? "bg-[#007AF5] text-white rounded-zeak" : "bg-white")}>

            <Link to={`/x/masterlists/${id}`} >
                <div className="flex justify-between items-center">
                    <span className="capitalize">{name}</span>
                    <div className="">
                        {
                            type === "system" ? <div className="flex items-center gap-2">
                                <span>System</span>
                                <Zlogo />
                            </div> : <div className="flex items-center gap-2">
                                <span>User Defined</span>
                                <UserCircle />
                            </div>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {isActive ? <div className="flex items-center gap-2">
                        <span className={cn(" rounded-zeak uppercase", activeId === id ? "opacity-60" : "")}>Active</span>

                    </div> : <div className="flex items-center gap-2">
                        <span className={cn(" uppercase", activeId === id ? "opacity-60" : "")}>Inactive</span>

                    </div>}
                </div>
                <div className="flex items-center gap-2 ">
                    <div className={cn("text-sm", activeId === id ? "opacity-60" : "")} >
                        Last Updated:
                    </div>
                    <div className="flex items-center gap-2">

                       {data &&  <div className={cn("text-sm", activeId === id ? "opacity-60" : "")} >
                            {data.firstName}
                        </div>}
                        <div >
                            <Tally1 />
                        </div>
                        <div className={cn("text-sm", activeId === id ? "opacity-60" : "")} >
                            {format(updatedAt, 'dd MMM yyyy')}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
