import { Avatar } from "@zeak/react"

export default function SearchItem({name, image}: {name: string, image?: string}) {
    return (
        <div className="flex items-center gap-[10px] rounded-zeak p-3 bg-[#F7F7F8]">
            <Avatar className="h-8 w-8" />
            <span className="text-sm">{name}</span>
        </div>
    )
}