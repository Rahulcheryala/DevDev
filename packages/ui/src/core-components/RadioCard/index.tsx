import { useState } from "react"
import { Label } from "../../micro-components/Label"
import { RadioGroup, RadioGroupItem } from "../../micro-components/RadioGroup"
import { cn } from "../../utils"

export interface RadioOption {
    id: string
    value: string
    label: string
}

export interface RadioCardProps {
    label: string
    required?: boolean
    id: string
    defaultValue?: string
    options: RadioOption[]
    onChange?: (value: string) => void
    className?: string
    activeColor?: string
    inactiveColor?: string
}

export default function RadioCard({
    label,
    required = false,
    id,
    defaultValue,
    options,
    onChange,
    className,
    activeColor = "bg-[#FFDF41] text-black",
    inactiveColor = "bg-[#F7F7F8] text-[#475467] hover:bg-gray-200"
}: RadioCardProps) {
    const [selectedValue, setSelectedValue] = useState(defaultValue || (options[0]?.value || ""))

    const handleValueChange = (value: string) => {
        setSelectedValue(value)
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex items-center">
                <Label variant="secondary" required={required} htmlFor={id} className="text-base font-medium">
                    {label}
                </Label>
            </div>

            <RadioGroup id={id} value={selectedValue} onValueChange={handleValueChange} className="flex gap-2">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={cn("flex h-[56px] p-[16px] justify-center items-center gap-[10px] rounded-zeak ", selectedValue === option.value ? activeColor : inactiveColor)}
                    >
                        <RadioGroupItem value={option.value} id={option.id} className="sr-only" />
                        <label htmlFor={option.id}>{option.label}</label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}
