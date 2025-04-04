import { RadioIcon } from '@zeak/icons';
import React from 'react';

interface StatusTableCellProps {
    status: boolean;
    maxWidth?: number;
}

export const StatusTableCell: React.FC<StatusTableCellProps> = ({ status, maxWidth }) => {
    return (
        <div className="px-6 flex items-center justify-center uppercase">
            {status ? (
                <div className="flex items-center gap-2">
                    <RadioIcon className="text-green-500" />
                    <span
                        style={{ maxWidth }}
                        className="text-ellipsis text-nowrap overflow-hidden text-[#4CB944] text-[14px] font-[450]"
                    >
                        Active
                    </span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <RadioIcon className="text-[#677281]" />
                    <span className="text-[#677281] text-[14px] font-[450]">Inactive</span>
                </div>
            )}
        </div>
    );
}