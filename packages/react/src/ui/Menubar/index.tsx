import React from 'react'
import { ChevronDown, Edit, MoreHorizontal, X } from 'lucide-react';
import { Button } from '../../index';
import { Link } from '@remix-run/react';

interface BreadcrumbItem {
    label: string;
    to?: string;  // Making 'to' optional since last item won't have it
}

interface MenubarProps {
    breadcrumbs: BreadcrumbItem[];
    actions?: React.ReactNode;
    className?: string;
    onGoBack?: () => void;
    onEdit?: () => void;
    onMore?: () => void;
    onClose?: () => void;
    showEdit?: boolean;
    showMore?: boolean;
    showClose?: boolean;
    children?: React.ReactNode;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; onGoBack?: () => void }> = ({ items, onGoBack }) => (
    <div className="text-[#677281] font-['Suisse_Int'l'] text-sm font-normal leading-5 tracking-[0.5px] flex items-center">
        {onGoBack && (
            <Button
                variant="ghost"
                size="sm"
                className="mr-2 p-1 hover:bg-transparent"
                onClick={onGoBack}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                >
                    <path
                        d="M6 11L1 6L6 1"
                        stroke="#475467"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Button>
        )}
        {items.map((item, index) => (
            <React.Fragment key={index}>
                {index > 0 && (
                    <span className="mx-2 text-[#475467]">/</span>
                )}
                {item.to ? (
                    <Link
                        to={item.to}
                        className="hover:text-[#0D0C22] transition-colors"
                    >
                        {item.label}
                    </Link>
                ) : (
                    <span className="text-[#0D0C22]">{item.label}</span>
                )}
            </React.Fragment>
        ))}
    </div>
);

// Update DefaultTopActions to handle the new props
const DefaultTopActions: React.FC<{
    onEdit?: () => void;
    onMore?: () => void;
    onClose?: () => void;
    showEdit?: boolean;
    showMore?: boolean;
    showClose?: boolean;
}> = ({
    onEdit,
    onMore,
    onClose,
    showEdit = true,
    showMore = true,
    showClose = true
}) => (
        <div className="flex items-center gap-1 ml-auto">
            {showEdit && (
                <Button
                    variant="ghost"
                    size="md"
                    className="h-12 px-6 text-[#0D0C22] font-['Suisse_Int'l'] text-sm font-[450] leading-5 tracking-[0.2px]"
                    onClick={onEdit}
                >
                    <Edit className="h-4 w-4 mr-1.5" />
                    Edit
                </Button>
            )}
            {showMore && (
                <>
                    <Button
                        variant="ghost"
                        size="md"
                        className="text-[#0D0C22] min-w-8 h-8 px-1"
                        onClick={onMore}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="md"
                        className="text-[#0D0C22] min-w-8 h-8 px-2 flex items-center"
                        onClick={onMore}
                    >
                        <span className="mr-1">More</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </>
            )}
            {showClose && (
                <Button
                    variant="ghost"
                    size="md"
                    className="text-[#0D0C22] min-w-8 h-8 px-2"
                    onClick={onClose}
                >
                    <X className="h-6 w-6 text-[#0D0C22]" />
                </Button>
            )}
        </div>
    );

export const Menubar: React.FC<MenubarProps> = ({
    breadcrumbs,
    actions,
    className = '',
    onGoBack,
    onEdit,
    onMore,
    onClose,
    showEdit = true,
    showMore = true,
    showClose = true,
    children
}) => {
    return (
        <div className={`h-[80px] w-full flex flex-col gap-4 p-[8px_8px_0px_24px] bg-[#C6D2E7] ${className}`}>
            <div className="flex items-center w-full px-4 py-2">
                <Breadcrumbs items={breadcrumbs} onGoBack={onGoBack} />
                {actions || (
                    <DefaultTopActions
                        onEdit={onEdit}
                        onMore={onMore}
                        onClose={onClose}
                        showEdit={showEdit}
                        showMore={showMore}
                        showClose={showClose}
                    />
                )}
            </div>
            <div className="flex items-start w-full px-4 pb-5">
                {children}
            </div>
        </div>
    );
};

export default Menubar;
