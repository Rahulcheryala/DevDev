import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface DropdownItem {
    icon: LucideIcon | any
    label: string
    onClick?: () => void
    variant?: 'default' | 'primary'
}

interface DropdownProps {
    items: DropdownItem[]
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
    return (
        <div className="flex flex-col items-start w-[250px] rounded-xl bg-white shadow-[0px_0px_15px_0px_rgba(223,229,242,0.80)]">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={item.onClick}
                    className={`flex h-[56px] items-center self-stretch hover:bg-[#F2F2F7] cursor-pointer ${item.variant === 'primary' ? 'text-blue-500' : ''
                        }`}
                >
                    <div className="pl-6 w-[40px] flex-shrink-0 flex justify-center">
                        {React.createElement(item.icon, {
                            size: 16,
                            className: `${item.variant === 'primary' ? '' : 'text-gray-600'}`
                        })}
                    </div>
                    <div className="flex-1 relative ml-4 flex items-center">
                        <span className={`font-['Suisse_Int\\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] ${item.variant === 'primary' ? '' : 'text-[#101828]'
                            }`}>
                            {item.label}
                        </span>
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