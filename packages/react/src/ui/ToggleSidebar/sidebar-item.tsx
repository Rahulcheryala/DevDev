import { useState } from 'react'
import { cn } from '~/components/Common/Utils'
import type { SidebarItemProps } from '../../Common/types/types'

export function SidebarItem({
    item,
    isCollapsed,
    isActive,
    onClick
}: SidebarItemProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [showSubmenu, setShowSubmenu] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (item.subItems) {
            setShowSubmenu(true)
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setShowSubmenu(false)
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                onClick={onClick}
                className={cn(
                    "flex items-center w-full transition-all duration-200 ease-in-out",
                    isCollapsed ? "justify-center h-[56px]" : "px-4 h-[56px]",
                    isHovered && !isCollapsed && "w-[220px] bg-white rounded-[30px_12px_12px_30px] shadow-[0px_0px_15px_0px_rgba(132,188,218,0.30)]",
                    isActive && "text-[#007AF5]",
                )}
            >
                <div className={cn(
                    "flex items-center justify-center w-10 h-10",
                    (isHovered || isActive) && "bg-white rounded-full",
                    "hover:bg-white hover:rounded-full"
                )}>
                    {isHovered || isActive ? item.hoverIcon : item.icon}
                </div>
                {!isCollapsed && (
                    <span className={cn(
                        "ml-3 font-['Suisse_Int\\'l'] text-base tracking-[0.2px] leading-5",
                        isActive ? "font-[450] text-[#007AF5]" : "font-normal text-[#475467]"
                    )}>
                        {item.label}
                    </span>
                )}
            </button>

            {showSubmenu && item.subItems && !isCollapsed && (
                <div className="absolute left-full top-0 ml-2 bg-white rounded-xl shadow-lg py-2 min-w-[200px] z-50">
                    {item.subItems.map((subItem, index) => (
                        <a
                            key={index}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {subItem.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}