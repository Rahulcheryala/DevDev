


import { format } from 'date-fns'
import { Link } from '@remix-run/react'
import { cn } from '@zeak/react'



interface ListCardProps {
    isActive: boolean,
    lastUpdatedBy: string,
    updatedAt: Date,
    link: string
    topContent: React.ReactNode

}

export default function ListingPanelCard({ isActive, lastUpdatedBy, updatedAt, link = "#", topContent }: ListCardProps) {



    return (
        <div className={cn("px-4 py-3 cursor-pointer", isActive ? "bg-[#007AF5] text-white rounded-zeak" : "bg-white")}>
            <Link to={link}>
                {topContent}

                {/* Last Updated */}
                <div className="flex items-center gap-2">
                    <div className={cn("text-sm", isActive ? "opacity-60 text-white" : "text-[#9BA2AC]")}>
                        Last Updated
                    </div>
                    <div className="flex items-center gap-2">

                        <div className={cn("text-sm capitalize", isActive ? "opacity-60 text-white" : "text-[#475467]")}>
                            {lastUpdatedBy}
                        </div>

                        <div>
                            |
                        </div>
                        <div className={cn("text-sm text-left", isActive ? "opacity-60 text-white" : "text-[#475467]")}>
                            {format(new Date(updatedAt), 'dd MMM yyyy')}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}