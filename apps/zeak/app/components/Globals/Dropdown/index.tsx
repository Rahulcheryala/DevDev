import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'
import { cn } from '@zeak/react'

interface DropdownItem {
    icon?: LucideIcon | any
    label: string
    value?: string
    onClick?: () => void
    variant?: 'default' | 'primary'
}

interface DropdownProps {
    items: DropdownItem[]
    type?: 'menu' | 'select'
    value?: string
    onChange?: (value: string) => void
    className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
    items,
    type = 'menu',
    value,
    onChange,
    className
}) => {
    return (
        <div className={cn(
            "flex flex-col items-start w-[250px] rounded-xl bg-white shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)]",
            className
        )}>
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        if (type === 'select' && onChange) {
                            onChange(item.value || item.label)
                        }
                        item.onClick?.()
                    }}
                    className={cn(
                        "flex h-[56px] items-center self-stretch hover:bg-[#F2F2F7] cursor-pointer",
                        item.variant === 'primary' ? 'text-blue-500' : '',
                        type === 'select' && value === (item.value || item.label) ? 'bg-[#F2F2F7]' : ''
                    )}
                >
                    <div className="pl-6 w-[40px] flex-shrink-0 flex justify-center">
                        {item.icon && React.createElement(item.icon, {
                            size: 16,
                            className: `${item.variant === 'primary' ? '' : 'text-gray-600'}`
                        })}
                    </div>
                    <div className="flex-1 relative ml-4 flex items-center justify-between pr-6">
                        <span className={cn(
                            "font-['Suisse_Int\\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px]",
                            item.variant === 'primary' ? '' : 'text-[#101828]'
                        )}>
                            {item.label}
                        </span>
                        {type === 'select' && value === (item.value || item.label) && (
                            <Check size={16} className="text-blue-500" />
                        )}
                        {index !== items.length - 1 && (
                            <div className="absolute bottom-[-18px] left-0 right-0 border-b border-[#F2F2F7]" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Dropdown