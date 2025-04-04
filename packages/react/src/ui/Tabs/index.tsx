import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { type TabsProps, type TabsVariant } from './types'

type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    value: string
    children: React.ReactNode
}

export function Tabs({
    variant = 'default',
    items,
    defaultValue,
    defaultTab,
    className,
    backgroundColor = '#FFFFFF',
    children,
    ...props
}: TabsProps & { children?: React.ReactNode }) {
    const [showMore, setShowMore] = React.useState(false)
    const [showDropdown, setShowDropdown] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const renderTabs = () => {
        if (variant === 'alphabet') {
            return (
                <>
                    <div className="flex items-center gap-4">
                        {alphabet.map((letter) => (
                            <TabsPrimitive.Trigger
                                key={letter}
                                value={letter}
                                className={cn(
                                    "w-[39px] h-[60px] relative",
                                    "font-['Suisse_Int\\'l'] text-base font-[450] leading-[20px] tracking-[0.2px]",
                                    "text-underline-position-from-font text-decoration-skip-ink-none",
                                    "text-[#475467]",
                                    "hover:text-[#0D0C22] focus:outline-none",
                                    "data-[state=active]:font-semibold data-[state=active]:text-[#0D0C22]",
                                    "after:content-[''] after:absolute after:bottom-0 after:left-0",
                                    "after:w-[39px] after:h-[6px] after:rounded-t-[3px]",
                                    "data-[state=active]:after:bg-[#ACBBD6]"
                                )}
                            >
                                <div className="absolute inset-0 flex items-center justify-center" style={{ marginBottom: '3px' }}>
                                    {letter}
                                </div>
                            </TabsPrimitive.Trigger>
                        ))}
                    </div>
                </>
            )
        }

        if (variant === 'underline') {
            const visibleItems = items.slice(0, 8)
            const moreItems = items.slice(8)
            const hasMore = items.length > 8

            return (
                <div className={cn("w-full", backgroundColor ? `bg-[${backgroundColor}]` : 'bg-white')}>
                    <div className="flex items-center gap-4">
                        {visibleItems.map((item) => (
                            <TabsPrimitive.Trigger
                                key={item.value}
                                value={item.value}
                                disabled={item.disabled}
                                className={cn(
                                    "flex flex-col relative px-2 items-center",
                                    "data-[state=active]:border-0 group",
                                    item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                                )}
                            >
                                <div className="px-[14px] h-[60px] group-hover:font-semibold group-hover:text-[#0D0C22] flex items-center pt-[10px] pb-1 leading-[20px]">
                                    {item.label}
                                </div>
                                <div className="w-full h-[6px] absolute bottom-0 right-0 left-0 bg-[#ACBBD6] rounded-t-[3px] hidden group-hover:block group-data-[state=active]:block"></div>
                            </TabsPrimitive.Trigger>
                        ))}
                        {hasMore && (
                            <div className="relative h-[60px]" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className={cn(
                                        "h-full px-4 flex items-center gap-2",
                                        "font-['Suisse_Int\\'l'] text-base font-[450] leading-[20px] tracking-[0.2px]",
                                        "text-[#475467] hover:text-[#0D0C22]",
                                        "focus:outline-none"
                                    )}
                                >
                                    <span className="mt-[-3px]">More</span>
                                    <ChevronDown className={cn(
                                        "w-4 h-4 transition-transform duration-200",
                                        showDropdown && "transform rotate-180"
                                    )} />
                                </button>
                                {showDropdown && (
                                    <div className="absolute z-50 right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1">
                                        {moreItems.map((item) => (
                                            <TabsPrimitive.Trigger
                                                key={item.value}
                                                value={item.value}
                                                className={cn(
                                                    "w-full px-4 py-2 text-left",
                                                    "font-['Suisse_Int\\'l'] text-sm font-[450]",
                                                    "text-[#475467] hover:text-[#0D0C22] hover:bg-gray-50",
                                                    "focus:outline-none",
                                                    "data-[state=active]:font-semibold data-[state=active]:text-[#0D0C22]"
                                                )}
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                {item.label}
                                            </TabsPrimitive.Trigger>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        const visibleItems = showMore ? items : items.slice(0, 7)
        const hasMore = items.length > 7

        return (
            <div className="w-[615px] h-[52px] pt-[6px] gap-[8px] rounded-[8px] bg-[#CEE6FF]">
                <div className="flex items-center gap-3 px-[6px]">
                    {visibleItems.map((item) => (
                        <TabsPrimitive.Trigger
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            className={cn(
                                "h-[40px] px-[8px] gap-3",
                                "rounded-[4px]",
                                "font-['Suisse_Int\\'l'] text-[14px] font-normal leading-[20px] tracking-[0.2px]",
                                "text-underline-position-from-font text-decoration-skip-ink-none",
                                "focus:outline-none",
                                "flex items-center gap-2",
                                "text-[#475467]",
                                "data-[state=active]:bg-white data-[state=active]:text-[#101828]",
                                "data-[state=active]:shadow-[10px_0px_40px_0px_rgba(0,0,0,0.08)]",
                                "disabled:opacity-50 disabled:cursor-not-allowed disabled:text-[#101828]"
                            )}
                        >
                            {item.icon && (
                                <item.icon
                                    className={cn(
                                        "w-4 h-4",
                                        "text-[#475467]",
                                        "data-[state=active]:text-[#101828]"
                                    )}
                                />
                            )}
                            {item.label}
                        </TabsPrimitive.Trigger>
                    ))}
                    {hasMore && !showMore && (
                        <button
                            onClick={() => setShowMore(true)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] focus:outline-none"
                        >
                            More
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <TabsPrimitive.Root
            defaultValue={defaultTab || defaultValue || (variant === 'alphabet' ? 'A' : items[0]?.value)}
            className={cn("w-full", className)}
            {...props}
        >
            <TabsPrimitive.List className="w-full">
                {renderTabs()}
            </TabsPrimitive.List>
            {children}
        </TabsPrimitive.Root>
    )
}

export function TabsContent({ className, children, ...props }: TabsContentProps) {
    return (
        <TabsPrimitive.Content
            className={cn("mt-4", className)}
            {...props}
        >
            {children}
        </TabsPrimitive.Content>
    )
}

export default Tabs;