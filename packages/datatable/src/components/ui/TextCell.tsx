import React from 'react'

interface TextCellProps {
    text: string;
    maxWidth?: number;

}

export default function TextCell({ text, maxWidth }: TextCellProps) {
    return (
        <div style={{ maxWidth }} className="px-6 py-4 text-ellipsis text-nowrap overflow-hidden">
            <span className="capitalize text-[14px] text-[#101828]">{text}</span>

        </div>
    )
}
