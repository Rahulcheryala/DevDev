import { ChevronRight } from 'lucide-react'
import { cn } from '@zeak/react'

interface BreadcrumbProps {
    items: Array<{
        label: string
        href?: string
    }>
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn("flex items-center space-x-1", className)}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-[#475467]" />
                    )}
                    <a
                        href={item.href}
                        className={cn(
                            "text-[#475467] font-['Suisse_Int\\'l'] text-sm hover:text-[#101828]",
                            !item.href && "cursor-default"
                        )}
                    >
                        {item.label}
                    </a>
                </div>
            ))}
        </nav>
    )
}