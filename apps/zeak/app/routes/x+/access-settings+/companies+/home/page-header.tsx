import { X, Edit, MoreHorizontal } from 'lucide-react'
import { cn } from '@zeak/react'
import { Breadcrumb } from './breadcrumb'

interface PageHeaderProps {
    title: string
    breadcrumb: Array<{
        label: string
        href?: string
    }>
    className?: string
}

export function PageHeader({ title, breadcrumb, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-4 bg-[#F7F7F8] px-8 py-6", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Breadcrumb items={breadcrumb} />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg">
                        <Edit className="w-5 h-5 text-[#475467]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg">
                        <MoreHorizontal className="w-5 h-5 text-[#475467]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg">
                        <X className="w-5 h-5 text-[#475467]" />
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <h1 className="text-[32px] font-['Suisse_Int\\'l'] font-medium text-[#101828]">
                    {title}
                </h1>
            </div>
        </div>
    )
}