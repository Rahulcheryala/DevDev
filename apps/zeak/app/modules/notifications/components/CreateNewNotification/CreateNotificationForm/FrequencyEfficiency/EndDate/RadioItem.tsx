import { Label, RadioGroupItem, cn } from "@zeak/react"

export default function RadioItem({value, label, icon, checked}: {value: string, label: string, icon: React.ReactNode, checked: boolean}) {
    return (
        <div className={cn("flex items-center bg-[#FFFFFF] hover:bg-opacity-100 bg-opacity-50 justify-between rounded-md border p-4 cursor-pointer hover:border-[#007AF5] [&:has(:checked)]:border-[#007AF5]",{
            "border-[#007AF5] bg-opacity-100": checked
        })}  >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="cursor-pointer">{label}</Label>
            </div>
            {icon}
        </div>
    )
}