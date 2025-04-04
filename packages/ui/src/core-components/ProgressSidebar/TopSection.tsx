import React from 'react'
import { RxSlash } from 'react-icons/rx'

export interface BreadcrumbItem {
    label: string;
    to?: string;
    isActive?: boolean;
}

export interface TopSectionProps {
    breadcrumbs: BreadcrumbItem[];
    title: string;
    LinkComponent?: React.ComponentType<{ to: string; className: string; children: React.ReactNode }>;
    className?: string;
}

export default function TopSection({
    breadcrumbs,
    title,
    LinkComponent,
    className
}: TopSectionProps) {
    // Default Link component that renders a span if no LinkComponent is provided
    const DefaultLink = ({ to, className, children }: { to: string; className: string; children: React.ReactNode }) => (
        <span className={className}>{children}</span>
    );

    const Link = LinkComponent || DefaultLink;

    return (
        <div className="bg-white rounded-t-zeak">
            <div className="py-[15px] px-[22px]">
                <div className={`h-full w-full ${className || ''}`}>
                    <div className="bg-white w-full mb-2 rounded-md">
                        {/* Breadcrumbs */}
                        <ul className="grid grid-flow-col auto-cols-max gap-1 text-secondary">
                            {breadcrumbs.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li>
                                        {item.to ? (
                                            <Link
                                                to={item.to}
                                                className="text-textLink text-sm leading-[20px] tracking-wider"
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className={`text-sm leading-[20px] tracking-wider ${item.isActive ? 'text-accent' : 'text-secondary'}`}>
                                                {item.label}
                                            </span>
                                        )}
                                    </li>
                                    {index < breadcrumbs.length - 1 && (
                                        <li>
                                            <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
                                                <RxSlash />
                                            </span>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                        <h1 className="text-[22px] font-[400] text-secondary">{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
