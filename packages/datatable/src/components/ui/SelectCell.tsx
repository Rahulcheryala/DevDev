import React from 'react'
import { cn } from '../../utils/cn'
import { DataTableCheckbox } from '../DataTableCheckbox'
import RowDragHandleCell from '../RowDragHanle'

export default function SelectCell({ row }: { row: any }) {
    return (
        <div className={cn("flex h-[64px] w-[60px]  rounded-l-[12px]", {
            "bg-[#FFDF41]": row.getIsSelected(),
        })}>
            <RowDragHandleCell rowId={row.id} />
            <div
                className={cn(
                    " flex items-center justify-center rounded-l-[12px] relative",

                )}
            >

                <DataTableCheckbox
                    className={cn("rounded-full", {
                        "bg-white": row.getIsSelected(),
                    })}
                    checked={row.getIsSelected()}
                    onCheckedChange={row.getToggleSelectedHandler()}
                    aria-label="Select row"
                />
            </div>
        </div>
    )
}
