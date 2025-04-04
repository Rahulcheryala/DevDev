import React, { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../utils'
import Label from '../../micro-components/Label-cpy'

export interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode | SVGElement
  [key: string]: any
}

export interface DropdownProps {
  items?: DropdownItem[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  defaultValue?: string
  label?: string
  isRequired?: boolean
  name: string
  backgroundColor?: string,
  inputClasses?: string
  dropdownClasses?: string
  showIcon?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  value,
  onChange,
  className,
  placeholder = "Select an option",
  defaultValue = "",
  inputClasses = '',
  label,
  isRequired,
  name,
  backgroundColor = "#F7F7F8",
  dropdownClasses = '',
  showIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  // Initialize with default value if no value is provided and defaultValue is set
  useEffect(() => {
    // Skip the initialization on first mount to prevent unwanted onChange calls
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Only set default value if explicitly provided and no value exists
    if (!value && onChange && defaultValue) {
      onChange(defaultValue)
    }
  }, [value, onChange, defaultValue])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedItem = items.find(item => item.value === value)

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <Label>
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      <div ref={dropdownRef} className={cn("relative w-full", className)}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-[56px] w-full items-center justify-between rounded-xl px-4 text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#101828]",
            `bg-[${backgroundColor}]`,
            inputClasses
          )}
        >
          <span className={cn("flex items-center gap-3 font-normal text-tertiary", selectedItem?.label ? "text-accent-dark font-[450]" : "text-tertiary")}>
            {showIcon && selectedItem?.icon && (
              <div>
                {React.isValidElement(selectedItem.icon) ? React.cloneElement(selectedItem.icon) : null}
              </div>
            )}
            {selectedItem?.label || placeholder}
          </span>
          <ChevronDown size={16} className={cn(
            "text-gray-600 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className={cn(
            "absolute z-50 mt-2 w-full rounded-xl shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)] divide-y divide-[#F2F2F7]",
            "max-h-[300px] overflow-y-auto",
            `bg-[${backgroundColor}]`
          )}>
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange?.(item.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex h-[56px] items-center self-stretch hover:bg-[#F2F2F7] cursor-pointer",
                  value === item.value ? 'bg-[#F2F2F7]' : 'bg-white',
                  dropdownClasses
                )}
              >
                <div className="flex-1 relative mx-6 flex items-center">
                  {item.icon && (
                    <div className="mr-2">
                      {React.isValidElement(item.icon) ? React.cloneElement(item.icon) : null}
                    </div>
                  )}
                  <span className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-[20px] tracking-[0.2px] text-[#0D0C22] mr-2">
                    {item.label}
                  </span>
                  {value === item.value && (
                    <Check size={16} className="text-blue-500 ml-auto" />
                  )}
                  {/* {index !== items.length - 1 && (
                    <div className="absolute bottom-[-18px] left-0 right-0 border-b border-[#F2F2F7]" />
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
