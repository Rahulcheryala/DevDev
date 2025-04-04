import { PenLine, List, Minus, Copy, Trash2, Upload, MoreVertical, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react"
import { useMasterlistStore } from "~/modules/masterlist"
import { useState } from "react"
export default function ActionMenu({ masterlistId, isActive }: { masterlistId: string, isActive: boolean }) {
    const { setConfirmDeleteMasterlist, setMasterlistIdToDelete, setMasterlistIdToDuplicate, setConfirmDuplicateMasterlist, setConfirmDeactivateMasterlist, setMasterlistIdToDeactivate, } = useMasterlistStore()
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="text-[#5e626d] text-sm flex items-center gap-3 px-4 py-3">
                    Actions
                    <ChevronDown className="h-6 w-6 ml-1" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <div className="divide-y divide-gray-100">
                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <PenLine className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Edit Master List Info</span>
                    </button>

                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <List className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Manage Values</span>
                    </button>

                    <button onClick={() => {
                        setConfirmDeactivateMasterlist(true)
                        setMasterlistIdToDeactivate(masterlistId)
                        setOpen(false)
                    }} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <Minus className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium"> {isActive ? "Deactivate" : "Activate"} Master List</span>
                    </button>

                    <button onClick={() => {
                        setConfirmDuplicateMasterlist(true)
                        setMasterlistIdToDuplicate(masterlistId)
                        setOpen(false)
                    }} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <Copy className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Duplicate Master List</span>
                    </button>

                    <button onClick={() => {
                        setConfirmDeleteMasterlist(true)
                        setMasterlistIdToDelete(masterlistId)
                        setOpen(false)
                    }} className="w-full px-4 py-3 flex items-center gap-3  hover:bg-[#F2F2F7] transition-colors">
                        <Trash2 className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Delete Master List</span>
                    </button>

                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Export Data</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

