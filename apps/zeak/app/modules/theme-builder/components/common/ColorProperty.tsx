import { Label } from "@zeak/react"
import {Input} from "@zeak/react"
import {ColorPicker} from "~/modules/theme-builder"

export default function ColorProperty({label, value, onChange}: {label: string, value: string, onChange: (value: string) => void}) {
    return( <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2 border rounded-sm px-3 py-0 w-[200px] bg-white">
            <ColorPicker color={value} onChange={(color) => onChange(color)} />
        <Input className="h-6 border-none" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    </div>)
}