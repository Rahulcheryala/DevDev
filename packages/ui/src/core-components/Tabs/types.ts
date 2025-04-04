import type { DivideIcon as LucideIcon } from 'lucide-react'

export type TabItem = {
    label: string
    value: string
    disabled?: boolean
    icon?: typeof LucideIcon
}

export type TabsVariant = 'default' | 'alphabet' | 'underline';

export interface TabsProps extends React.ComponentPropsWithoutRef<any> { // Changed from typeof TabsPrimitive.Root to any
    variant?: TabsVariant;
    items: TabItem[];
    defaultValue?: string;
    className?: string;
}