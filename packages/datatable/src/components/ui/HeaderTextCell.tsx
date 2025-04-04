import React from 'react';

interface HeaderTextCellProps {
    text: string;
    maxWidth?: number;
    required?: boolean;
}

export const HeaderTextCell: React.FC<HeaderTextCellProps> = ({ text, maxWidth, required }) => {
    return (
        <div style={{ maxWidth: maxWidth }} className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
            {text}
            {required && <span className="text-red-500 pl-1">*</span>}
        </div>
    );
};