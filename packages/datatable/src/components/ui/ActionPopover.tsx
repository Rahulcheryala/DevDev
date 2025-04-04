import { PenLine, List, Minus, Copy, Trash2, Upload, MoreVertical } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react"
import { useState } from "react"
interface ActionMenuProps {
    isActive: boolean;
    onEdit?: () => void;
    onManageValues?: () => void;
    onDeactivate?: () => void;
    onDuplicate?: () => void;
    onDelete?: () => void;
    onExport?: () => void;
}

export default function ActionMenu({
    isActive,
    onEdit,
    onManageValues,
    onDeactivate,
    onDuplicate,
    onDelete,
    onExport
}: ActionMenuProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <div className="divide-y divide-gray-100">
                    <button onClick={onEdit} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <PenLine className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Edit Master List Info</span>
                    </button>

                    <button onClick={onManageValues} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <List className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Manage Values</span>
                    </button>

                    <button onClick={onDeactivate} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <Minus className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">{isActive ? "Deactivate" : "Activate"} Master List</span>
                    </button>

                    <button onClick={onDuplicate} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <Copy className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Duplicate Master List</span>
                    </button>

                    <button onClick={() => {
                        onDelete?.();
                        setOpen(false);
                    }} className="w-full px-4 py-3 flex items-center gap-3  hover:bg-[#F2F2F7] transition-colors">
                        <Trash2 className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Delete Master List </span>
                    </button>

                    <button onClick={onExport} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F2F2F7] transition-colors">
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Export Data</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
