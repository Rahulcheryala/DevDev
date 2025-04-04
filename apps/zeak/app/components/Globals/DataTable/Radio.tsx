import * as React from "react"

export interface RadioProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onCheckedChange?: (checked: boolean) => void
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ className, onCheckedChange, onChange, name, checked, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onCheckedChange) {
                onCheckedChange(e.target.checked)
            }
            if (onChange) {
                onChange(e)
            }
        }

        return (
            <div className="flex-1 self-stretch flex items-center">
                <label className="relative flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        checked={checked}
                        onChange={handleChange}
                        className="sr-only"
                        ref={ref}
                        {...props}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-[#007AF5] bg-[#007AF5]' : 'border-[#E3E7F1] bg-[#E3E7F1]'}`}>
                        {checked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                        )}
                    </div>
                </label>
            </div>
        )
    }
)
Radio.displayName = "Radio"

export { Radio }