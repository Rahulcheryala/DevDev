"use client"

import { X } from "lucide-react"
import { Button } from "@zeak/react"
import { cn } from "@zeak/react"
import { Check } from "lucide-react"
import GeneralForm from "./GeneralForm"
import { useMasterlistStore } from "~/modules/masterlist"

import {
    Drawer,
    DrawerContent,
} from '@zeak/react'
import EditValueTable from "./EditValueTable"
import { UserCircle } from "lucide-react"

export default function CreateMasterList({ userId, companies }: { userId: string, companies: any }) {
    const { isCreateMasterlistOpen, setIsCreateMasterlistOpen, activeStep, setActiveStep, createdMasterlistId, isCreateNewMappingActive, setIsCreateNewMappingActive, setCreatedMasterlistId } = useMasterlistStore()


    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    return (
        <Drawer open={isCreateMasterlistOpen} onOpenChange={
            (open) => {
                if (!open) {
                    setActiveStep(1)
                    setIsCreateNewMappingActive(false)
                    setCreatedMasterlistId("")
                }
                setIsCreateMasterlistOpen(open)
            }
        }>

            <DrawerContent className="w-[50vw] backdrop-blur-sm mt-[72px]  mr-4 rounded-t-zeak border p-0">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-[#101828] text-[26px] font-[450] tracking-[0px]">Create a Master List</h2>
                            <div className="flex h-[48px] p-0 items-center gap-4 rounded-[12px] bg-opacity-10 px-4 bg-[#007AFF]">
                                <UserCircle className="w-5 h-5 text-[#007aff]" />
                                <span className="text-[#007aff] font-medium">User Defined</span>
                            </div>

                        </div>
                        <Button variant="ghost" className="rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex  border-b mb-6">
                        <div className=" relative border-primary px-4 pb-2 flex items-center gap-2">
                            <span className="text-primary font-medium">1. General</span>
                            {activeStep > 1 && <Check className="h-4 w-4 text-[#28CD41]" />}
                            <div className={cn("absolute bottom-0 left-0 right-0 h-[4px]  rounded-tl-zeak ", activeStep >0 ? "bg-[#FFDF41]" : "bg-[#9BA2AC]")}></div>
                        </div>

                        <div className=" relative border-primary px-4 pb-2">
                            <span className="text-primary font-medium">2. Values</span>
                            <div className={cn("absolute bottom-0 left-0 right-0 h-[4px]  rounded-tr-zeak ", activeStep === 2 ? "bg-[#FFDF41]" : "bg-[#9BA2AC]")}></div>
                        </div>
                    </div>

                    {/* Form */}
                    {activeStep === 1 && <GeneralForm onCancel={() => setIsCreateMasterlistOpen(false)} companies={companies} onNext={handleNext} userId={userId} />}
                    {activeStep === 2 && <EditValueTable userId={userId} />}

                </div>


            </DrawerContent>
        </Drawer>
    )
}

