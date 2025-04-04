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

export type SidebarItemProps = {
    item: MenuItem
    isCollapsed: boolean
    isActive: boolean
    onClick: () => void
}

export type HelpSectionProps = {
    isCollapsed: boolean
    title: string
    slides: string[]
}