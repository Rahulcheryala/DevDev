import { useState, useRef, useEffect } from 'react'
import type { SVGProps } from 'react'

import { cn } from '../../utils'

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M15.8333 7.49998L10 13.3333L4.16668 7.49998" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
        <path d="M15 5.5L5 15.5M5 5.5L15 15.5" stroke="#9BA2AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export type Option = {
    id: string
    value: string
    label: string
    isPrimary?: boolean
}

export type MultiSelectProps = {
    label?: string
    placeholder?: string
    options: Option[]
    defaultValue?: Option[]
    defaultOpen?: boolean
    // onChange?: (selected: Option[]) => void
    onChange?: any
    className?: string
}

const MultiSelect = ({
    label = 'Title',
    placeholder = 'Select Option(s)',
    options,
    defaultValue = [],
    defaultOpen = true,
    onChange = () => { },
    className
}: MultiSelectProps) => {
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
                                <svg width="12" height="9" className='mr-[2px]' viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9869 3.47882L10.8538 8.62581C10.8313 8.7335 10.773 8.82977 10.6889 8.89805C10.6049 8.96632 10.5003 9.00233 10.3932 8.99988H1.5675C1.46039 9.00233 1.35579 8.96632 1.27171 8.89805C1.18764 8.82977 1.12935 8.7335 1.10687 8.62581L0.0105772 3.47882C-0.00787271 3.39185 -0.00210145 3.30129 0.027229 3.21754C0.0565595 3.13379 0.108261 3.06024 0.176404 3.00531C0.244734 2.95019 0.326832 2.91605 0.413225 2.90684C0.499619 2.89762 0.586786 2.9137 0.664671 2.95323L3.35475 4.29324L5.58419 0.240043C5.62437 0.167171 5.68263 0.106559 5.75303 0.0643886C5.82343 0.0222185 5.90346 0 5.98494 0C6.06642 0 6.14645 0.0222185 6.21685 0.0643886C6.28725 0.106559 6.34551 0.167171 6.38569 0.240043L8.61513 4.29798L11.3236 2.94849C11.4021 2.90575 11.4909 2.88722 11.5793 2.89513C11.6678 2.90304 11.7521 2.93706 11.8222 2.99309C11.8922 3.04912 11.9451 3.12477 11.9743 3.21095C12.0035 3.29712 12.0079 3.39014 11.9869 3.47882Z" fill="#FFC107" />
                                </svg>

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
                            <span className="text-[#007AF5] font-['Suisse_Int\\'l'] text-base font-normal tracking-[0.2px]">
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
                                        "flex items-center gap-2 px-2 py-2 rounded-xl cursor-pointer",
                                        "text-[#101828] font-['Suisse_Int\\'l'] text-sm font-normal tracking-[0.2px]",
                                        isSelected
                                            ? "bg-[#FFDF41]"
                                            : "bg-[#F7F7F8]"
                                    )}
                                >
                                    {
                                        option.isPrimary && (
                                            isSelected ? (<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.9869 3.47882L10.8538 8.62581C10.8313 8.7335 10.773 8.82977 10.6889 8.89805C10.6049 8.96632 10.5003 9.00233 10.3932 8.99988H1.5675C1.46039 9.00233 1.35579 8.96632 1.27171 8.89805C1.18764 8.82977 1.12935 8.7335 1.10687 8.62581L0.0105772 3.47882C-0.00787271 3.39185 -0.00210145 3.30129 0.027229 3.21754C0.0565595 3.13379 0.108261 3.06024 0.176404 3.00531C0.244734 2.95019 0.326832 2.91605 0.413225 2.90684C0.499619 2.89762 0.586786 2.9137 0.664671 2.95323L3.35475 4.29324L5.58419 0.240043C5.62437 0.167171 5.68263 0.106559 5.75303 0.0643886C5.82343 0.0222185 5.90346 0 5.98494 0C6.06642 0 6.14645 0.0222185 6.21685 0.0643886C6.28725 0.106559 6.34551 0.167171 6.38569 0.240043L8.61513 4.29798L11.3236 2.94849C11.4021 2.90575 11.4909 2.88722 11.5793 2.89513C11.6678 2.90304 11.7521 2.93706 11.8222 2.99309C11.8922 3.04912 11.9451 3.12477 11.9743 3.21095C12.0035 3.29712 12.0079 3.39014 11.9869 3.47882Z" fill="white" />
                                            </svg>
                                            ) : (
                                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.9869 3.47882L10.8538 8.62581C10.8313 8.7335 10.773 8.82977 10.6889 8.89805C10.6049 8.96632 10.5003 9.00233 10.3932 8.99988H1.5675C1.46039 9.00233 1.35579 8.96632 1.27171 8.89805C1.18764 8.82977 1.12935 8.7335 1.10687 8.62581L0.0105772 3.47882C-0.00787271 3.39185 -0.00210145 3.30129 0.027229 3.21754C0.0565595 3.13379 0.108261 3.06024 0.176404 3.00531C0.244734 2.95019 0.326832 2.91605 0.413225 2.90684C0.499619 2.89762 0.586786 2.9137 0.664671 2.95323L3.35475 4.29324L5.58419 0.240043C5.62437 0.167171 5.68263 0.106559 5.75303 0.0643886C5.82343 0.0222185 5.90346 0 5.98494 0C6.06642 0 6.14645 0.0222185 6.21685 0.0643886C6.28725 0.106559 6.34551 0.167171 6.38569 0.240043L8.61513 4.29798L11.3236 2.94849C11.4021 2.90575 11.4909 2.88722 11.5793 2.89513C11.6678 2.90304 11.7521 2.93706 11.8222 2.99309C11.8922 3.04912 11.9451 3.12477 11.9743 3.21095C12.0035 3.29712 12.0079 3.39014 11.9869 3.47882Z" fill="#FFC107" />
                                                </svg>
                                            )
                                        )
                                    }
                                    <span>{option.label}</span>
                                    {isSelected && <button
                                        onClick={(e) => removeOption(option.id, e)}
                                        className="text-[#9BA2AC]"
                                    >
                                        <CloseIcon />
                                    </button>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MultiSelect