import type { ReactNode } from 'react'

export type MenuItem = {
    id: string
    label: string
    shortLabel: string
    icon: ReactNode
    hoverIcon: ReactNode
    subItems?: Array<{
        label: string
        href: string
    }>
}

export type SidebarProps = {
    items: MenuItem[]
    defaultActiveId?: string
    defaultCollapsed?: boolean
    defaultPinned?: boolean
    helpContent?: {
        title: string
        slides: string[]
    }
    onActiveChange?: (id: string) => void
    className?: string
}