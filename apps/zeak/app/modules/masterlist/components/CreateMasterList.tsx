"use client"

import { X } from "lucide-react"
import { Button } from "@zeak/react"
import { Badge } from "@zeak/react"
import * as React from 'react'
import { Eye, Plus } from 'lucide-react'
import { cn } from "@zeak/react"
import { Check } from "lucide-react"
import GeneralForm from "./GeneralForm"


import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from '@zeak/react'
import { useState } from "react"
import EditValueTable from "./EditValueTable"


export default function CreateMasterList({ userId }: { userId: string }) {
    const [open, setOpen] = React.useState(false)
    const [activeTab, setActiveTab] = useState(1)


    const handleNext = () => {
        setActiveTab(2)
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" className="gap-2 py-5 h-[60px] hover:opacity-90 hover:bg-[#0D0844] text-white bg-[#0D0844] w-full">
                    <Plus className="h-4 w-4 text-white" />
                    <span className="uppercase text-white ">Add New List</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="w-[960px] backdrop-blur-sm mt-[72px]  mr-4 rounded-t-zeak border p-0">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">Create a Master List</h2>
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                User Defined
                            </Badge>
                        </div>
                        <Button variant="ghost" className="rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex  border-b mb-6">
                        <div className=" relative border-primary px-4 pb-2 flex items-center gap-2">
                            <span className="text-primary font-medium">1. General</span>
                            {activeTab > 1 && <Check className="h-4 w-4 text-[#28CD41]" />}
                            <div className={cn("absolute bottom-0 left-0 right-0 h-[4px]  rounded-tl-zeak ", activeTab === 1 ? "bg-[#FFDF41]" : "bg-[#9BA2AC]")}></div>
                        </div>
                        <div className=" relative border-primary px-4 pb-2">
                            <span className="text-primary font-medium">2. Values</span>
                            <div className={cn("absolute bottom-0 left-0 right-0 h-[4px]  rounded-tr-zeak ", activeTab === 2 ? "bg-[#FFDF41]" : "bg-[#9BA2AC]")}></div>
                        </div>
                    </div>

                    {/* Form */}
                    {activeTab === 1 && <GeneralForm onNext={handleNext} userId={userId} />}
                    {activeTab === 2 && <EditValueTable />}
                </div>


            </DrawerContent>
        </Drawer>
    )
}

