import React from 'react'
import { formatInTimeZone } from "date-fns-tz";
import { cn } from "../utils/cn";

interface DateCellProps {
    date: string | Date;
    timeZone: string;
    dateFormat?: string;
    timeFormat?: string;
    className?: string;
    showTime?: boolean;
}

export default function DateCell({
    date,
    timeZone,
    dateFormat = "dd MMM, yyyy",
    timeFormat = "HH:mm",
    className,
    showTime = true
}: DateCellProps) {
    if (!date) {
        return <div className={cn(className, "px-6 py-4 text-left space-y-1")}>-</div>;
    }

    return (
        <div className={cn(className, "px-6 py-4 h-[64px] flex flex-col justify-center group text-left space-y-1 hover:bg-[#D3DFE8]")}>
            <span className="capitalize text-[14px] text-[#101828]">
                {formatInTimeZone(date, timeZone, dateFormat)}
            </span>
            {showTime && (
                <div className="flex items-center gap-1 group-hover:hidden">
                    <span className="text-[11px] font-[450] text-[#475467]">
                        {formatInTimeZone(date, timeZone, timeFormat)}
                    </span>
                    <span className="text-[11px] font-[450]  text-[#9BA2AC]">
                        {formatInTimeZone(date, timeZone, "a | z")}
                    </span>
                </div>
            )}
        </div>
    )
}
