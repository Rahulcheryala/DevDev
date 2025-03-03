import { HexColorPicker } from "react-colorful";
import {Popover, PopoverTrigger, PopoverContent} from "@zeak/react"


export default function ColorPicker({color, onChange}: {color: string, onChange: (color: string) => void}) {
    return <Popover>
        <PopoverTrigger>
            <div className="w-5 h-5 rounded-sm border border-black" style={{backgroundColor: color}}></div>
        </PopoverTrigger>
        <PopoverContent>
            <HexColorPicker color={color} onChange={(color) => onChange(color)} />
        </PopoverContent>
    </Popover>
}
