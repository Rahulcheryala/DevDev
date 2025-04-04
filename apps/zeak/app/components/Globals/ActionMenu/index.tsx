import { useState } from 'react'
import { cn } from '~/components/Common/Utils'
import { MenuIcon, PinIcon } from '~/components/Common/icons'
import type { SidebarProps } from '~/components/Common/types/types'
import { SidebarItem } from './sidebar-item'
import { HelpSection } from './help-section'

export default function ActionMenu({
    items,
    defaultActiveId = items[0]?.id,
    defaultCollapsed = true,
    defaultPinned = false,
    helpContent,
    onActiveChange,
    className
}: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const [isPinned, setIsPinned] = useState(defaultPinned)
    const [activeItem, setActiveItem] = useState(defaultActiveId)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        if (!isPinned) {
            setIsHovered(true)
            setIsCollapsed(false)
        }
    }

    const handleMouseLeave = () => {
        if (!isPinned) {
            setIsHovered(false)
            setIsCollapsed(true)
        }
    }

    const handleActiveChange = (id: string) => {
        setActiveItem(id)
        onActiveChange?.(id)
    }

    return (
        <aside
            className={cn(
                "flex flex-col flex-1 items-center w-[272px] gap-1 pb-3 rounded-r-xl bg-[#F0F4FD] shadow-[10px_-5px_15px_0_rgba(206,213,222,0.60)] transition-all duration-300 ease-in-out h-full overflow-hidden",
                isCollapsed ? "w-[72px]" : "w-[240px] items-start",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={cn(
                "flex items-center p-4 sticky top-0 bg-[#F0F4FD] z-10",
                isCollapsed ? "justify-center w-full" : "justify-between w-full"
            )}>
                <button
                    onClick={() => {
                        if (isPinned) {
                            setIsCollapsed(!isCollapsed)
                        }
                    }}
                    className="p-2 hover:bg-gray-200 rounded-md text-[#101828]"
                >
                    <MenuIcon />
                </button>
                {!isCollapsed && (
                    <button
                        onClick={() => setIsPinned(!isPinned)}
                        className="p-2 hover:bg-gray-200 rounded-md text-[#101828]"
                    >
                        <PinIcon isPinned={isPinned} />
                    </button>
                )}
            </div>

            <div className="flex-1 w-full overflow-y-auto" onScroll={(e) => e.stopPropagation()}>
                <nav className={cn(
                    "py-4",
                    isCollapsed && "w-full flex flex-col items-center"
                )}>
                    {items.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            isCollapsed={isCollapsed}
                            isActive={activeItem === item.id}
                            onClick={() => handleActiveChange(item.id)}
                        />
                    ))}
                </nav>

                {helpContent && (
                    <div className="mt-32">
                        <HelpSection
                            isCollapsed={isCollapsed}
                            title={helpContent.title}
                            slides={helpContent.slides}
                        />
                    </div>
                )}
            </div>
        </aside>
    )
}

export * from '../../Common/types/types'