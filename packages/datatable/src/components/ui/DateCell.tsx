import React from 'react'
import { formatInTimeZone } from "date-fns-tz";
import { Row } from "@tanstack/react-table";

export default function DateCell({ row, timeZone }: { row: Row<any>, timeZone: string }) {
    return (
        <div className="px-6 py-4">
            <span className="capitalize text-[14px] text-[#101828]">
                {formatInTimeZone(row.original.createdAt, timeZone, "dd MMM, yyyy")}
            </span>
            <div className="flex items-center justify-center">
                <span className="text-xs text-gray-500">
                    {formatInTimeZone(row.original.createdAt, timeZone, "HH:mm a | z")}
                </span>
            </div>
        </div>
    )
}
