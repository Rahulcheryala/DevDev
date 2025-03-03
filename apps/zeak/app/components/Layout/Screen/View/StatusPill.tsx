import React from 'react'
import { RiRecordCircleLine } from 'react-icons/ri'

export enum StatusColors {
    active = 'text-green-500',
    inactive = 'text-gray-400',
    blocked = 'text-red-500',
    draft = 'text-yellow-500'
}

/**
 * StatusPill Component
 * 
 * A component that displays a status indicator with a colored pill.
 * 
 * Props:
 * - status (string): The status to display. It determines the color of the pill.
 * - columnSize (number, optional): The maximum width of the text. Defaults to 300.
 * - className (string, optional): Additional classes for the outer div.
 * - textClassName (string, optional): Additional classes for the text span.
 * 
 * Usage:
 * ```jsx
 * <StatusPill status="active" columnSize={250} className="my-custom-class" textClassName="text-lg" />
 * ```
 */
interface StatusPillProps {
    status: 'active' | 'inactive' | 'blocked' | 'draft' | string;
    columnSize?: number;
    className?: string;
    textClassName?: string;
}

const StatusPill: React.FC<StatusPillProps>  = ({
    status,
    columnSize = 300,
    className = "",
    textClassName = ""
}: StatusPillProps): JSX.Element => {
    return (
        <div className={`flex items-center ${className}`}>
            <div
                className={`flex items-center gap-1 ${StatusColors[(status?.toLowerCase() as keyof typeof StatusColors) || 'active']
                    }`}
            >
                <RiRecordCircleLine />
                <span
                    style={{ maxWidth: columnSize - 50 }}
                    className={`text-ellipsis text-nowrap overflow-hidden uppercase ${textClassName}`}
                >
                    {status}
                </span>
            </div>
        </div>
    )
}

export default StatusPill
