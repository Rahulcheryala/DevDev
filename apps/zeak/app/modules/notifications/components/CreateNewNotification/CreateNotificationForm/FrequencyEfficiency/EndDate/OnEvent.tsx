import { Label, Input } from "@zeak/react"
import { Search } from "lucide-react"

export default function OnEvent() {
    return (
        
        <div className="flex flex-col gap-3 items-center justify-center w-full flex-1 ">
            <Label  className="text-[14px] tracking-[0px] text-[#475467]">Select an event, automation, trigger or a process</Label>
            <div className="flex items-center justify-center w-full relative">
                <Input placeholder="Search" className="bg-[#F7F7F8] p-4" />
                <Search className="w-5 h-5 text-muted-foreground absolute right-4" />
            </div>
        </div>
    )
}