import { useState, useRef, useEffect } from 'react'
import { cn } from '~/components/Common/Utils'
import { ChevronDownIcon, CloseIcon } from '~/components/Common/icons/multi-select-input-icons'
import type { MultiSelectInputProps, Option } from '~/components/Common/types/multi-select-input-types'

const MultiSelectInput = ({
    label = 'Company',
    placeholder = 'Select a Company(s)',
    options,
    defaultValue = [],
    defaultOpen = true,
    onChange = () => { },
    className
}: MultiSelectInputProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultValue)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (option: Option) => {
        const newSelection = selectedOptions.some(item => item.id === option.id)
            ? selectedOptions.filter(item => item.id !== option.id)
            : [...selectedOptions, option]

        setSelectedOptions(newSelection)
        onChange?.(newSelection)
    }

    const removeOption = (optionId: string, event: React.MouseEvent) => {
        event.stopPropagation()
        const newSelection = selectedOptions.filter(item => item.id !== optionId)
        setSelectedOptions(newSelection)
        onChange?.(newSelection)
    }

    const visibleOptions = selectedOptions.slice(0, 3)
    const remainingCount = selectedOptions.length - 3

    return (
        <div ref={containerRef} className={cn("relative w-[600px]", className)}>
            <label className="block text-[#475467] font-['Suisse_Int\\'l'] text-sm font-medium leading-5 tracking-[0.2px] mb-1.5">
                {label}
            </label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-[57px] w-full bg-[#F7F7F8] rounded-xl px-4",
                    "flex items-center gap-2.5 cursor-pointer"
                )}
            >
                <div className="flex flex-wrap gap-2 flex-1 min-h-[24px] items-center">
                    {selectedOptions.length === 0 && (
                        <span className="text-[#9BA2AC] font-['Suisse_Int\\'l'] text-base font-[450] leading-6 tracking-[0.2px]">
                            {placeholder}
                        </span>
                    )}
                    {visibleOptions.map(option => (
                        <div
                            key={option.id}
                            className="flex items-center gap-2 px-2 py-1.5 bg-white rounded-lg"
                        >
                            {option.isPrimary && (
                                <span className="text-[#FFB800] text-lg">👑</span>
                            )}
                            <span className="text-[#101828] font-['Suisse_Int\\'l'] text-base font-normal tracking-[0.2px]">
                                {option.label}
                            </span>
                            <button
                                onClick={(e) => removeOption(option.id, e)}
                                className="text-[#9BA2AC]"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    ))}
                    {remainingCount > 0 && (
                        <span className="text-[#101828] font-['Suisse_Int\\'l'] text-base font-normal tracking-[0.2px]">
                            ...
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {selectedOptions.length > 0 && (
                        <div className="flex items-center justify-center px-[11px] py-1.5 bg-white rounded-[20px]">
                            <span className="text-[#101828] font-['Suisse_Int\\'l'] text-base font-normal tracking-[0.2px]">
                                {selectedOptions.length}
                            </span>
                        </div>
                    )}
                    <ChevronDownIcon
                        className={cn(
                            "transition-transform duration-200",
                            isOpen && "transform rotate-180"
                        )}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl p-4 shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)]">
                    <div className="flex flex-wrap gap-3">
                        {options.map(option => {
                            const isSelected = selectedOptions.some(item => item.id === option.id)
                            return (
                                <div
                                    key={option.id}
                                    onClick={() => handleSelect(option)}
                                    className={cn(
                                        "flex items-center px-2 py-2 rounded-xl cursor-pointer",
                                        "text-[#101828] font-['Suisse_Int\\'l'] text-sm font-normal tracking-[0.2px]",
                                        isSelected
                                            ? "bg-gradient-to-r from-[#F2FF00] via-[#D000FF] via-[58%] to-[#03A9F4] to-[96.5%]"
                                            : "bg-[#F7F7F8]"
                                    )}
                                >
                                    {option.isPrimary && (
                                        <span className="text-[#FFB800] text-lg mr-2">👑</span>
                                    )}
                                    <span>{option.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MultiSelectInput