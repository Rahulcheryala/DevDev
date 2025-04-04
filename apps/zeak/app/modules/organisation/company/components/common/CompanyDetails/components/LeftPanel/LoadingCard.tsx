import React from 'react'
import { Zlogo } from '@zeak/icons'
import { UserCircle } from 'lucide-react'
import { Tally1 } from 'lucide-react'
import { cn } from '@zeak/react'

export default function LoadingCard() {
    return (
        <div className="px-4 py-3 bg-white">
            <div className="flex justify-between items-center">
                <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                        <UserCircle className="text-gray-300" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="text-sm text-gray-400">
                    Last Updated:
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    <div>
                        <Tally1 className="text-gray-300" />
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}
