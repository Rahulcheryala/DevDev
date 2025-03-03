import React from 'react'
import { Zlogo } from '@zeak/icons'
import { UserIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Tally1 } from 'lucide-react'
import { Link } from '@remix-run/react'
import { useSearchParams } from '@remix-run/react'
import { cn } from '@zeak/react'
interface ListCardProps {
    name: string
    systemDefined: boolean,
    isActive: boolean,
    updatedBy: string,
    updatedAt: Date,
    id: string
}
export default function ListCard({ name, systemDefined, isActive, updatedBy, updatedAt, id }: ListCardProps) {
    const [searchParams] = useSearchParams()
    const activeId = searchParams.get("id")
    return (
        <div className={cn("px-4 py-3  cursor-pointer", activeId === id ? "bg-[#007AF5] text-white rounded-zeak" : "bg-white")}>

            <Link to={`/x/masterlists?id=${id}`} >
                <div className="flex justify-between items-center">
                    <span className="capitalize">{name}</span>
                    <div className="">
                        {
                            systemDefined ? <div className="flex items-center gap-2">
                                <span>System</span>
                                <Zlogo />
                            </div> : <div className="flex items-center gap-2">
                                <span>User Defined</span>
                                <UserIcon />
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

                        <div className={cn("text-sm", activeId === id ? "opacity-60" : "")} >
                            {updatedBy}
                        </div>
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
