'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../utils/cn'

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from '../Drawer'

interface SideDrawerProps {
    title: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    width?: string;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
    showCloseButton?: boolean;
}

export default function SideDrawer({
    title,
    trigger,
    children,
    open,
    onOpenChange,
    width = "960px",
    className,
    headerClassName,
    contentClassName,
    showCloseButton = true
}: SideDrawerProps) {
    const [internalOpen, setInternalOpen] = React.useState(false)

    const isControlled = typeof open !== 'undefined'
    const isOpen = isControlled ? open : internalOpen
    const handleOpenChange = isControlled ? onOpenChange : setInternalOpen

    return (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent
                className={cn(
                    "backdrop-blur-sm mt-[72px] mr-4 rounded-t-zeak border p-0",
                    `w-[${width}]`,
                    className
                )}
            >
                <div className={cn(
                    "flex items-center justify-between px-10 py-3 h-[76px]",
                    headerClassName
                )}>
                    <h1 className="text-[#101828] text-[26px] font-[450] tracking-[0px]">{title}</h1>
                    {showCloseButton && (
                        <X
                            className='h-6 w-6 cursor-pointer'
                            onClick={() => handleOpenChange?.(false)}
                        />
                    )}
                </div>
                <div className={cn("h-full", contentClassName)}>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}
