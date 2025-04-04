import React from 'react';
import { cn } from '../../utils';

export interface TableHeader {
  label: string;
  key: string;
  width?: string;
  className?: string;
}

export interface TableProps {
  headers: TableHeader[];
  rows: Record<string, any>[];
  renderCell?: (key: string, value: any, row: Record<string, any>) => React.ReactNode;
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  isHoverable?: boolean;
  isCompact?: boolean;
  showDividers?: boolean;
  isStriped?: boolean;
  isFullWidth?: boolean;
  emptyState?: React.ReactNode;
  isFixedLayout?: boolean;
  isRounded?: boolean;
  onRowClick?: (row: Record<string, any>) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  renderCell,
  containerClassName = '',
  tableClassName = '',
  headerClassName = '',
  rowClassName = '',
  isHoverable = false,
  isCompact = false,
  showDividers = true,
  isStriped = false,
  isFullWidth = true,
  emptyState = <div className="p-4 text-center text-gray-500">No data available</div>,
  isFixedLayout = true,
  isRounded = true,
  onRowClick,
}) => {
  const hasData = rows.length > 0;

  return (
    <div
      className={cn(
        'overflow-hidden',
        isRounded && 'rounded-lg',
        containerClassName
      )}
    >
      <table
        className={cn(
          'min-w-full divide-y divide-gray-200',
          isFullWidth && 'w-full',
          isFixedLayout && 'table-fixed',
          tableClassName
        )}
      >
        <thead className="text-left">
          <tr
            className={cn(
              'bg-[#F0F4FD]',
              isRounded && 'rounded-t-lg',
              headerClassName
            )}
          >
            {headers.map((header) => (
              <th
                key={header.key}
                className={cn(
                  'py-4 px-6 font-medium',
                  isCompact ? 'py-2 px-4' : 'py-4 px-6',
                  header.className
                )}
                style={{ width: header.width }}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        {hasData ? (
          <tbody className="text-left bg-[#F8FAFE]">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  showDividers && 'border-b border-white',
                  isStriped && rowIndex % 2 === 1 && 'bg-[#F0F4FD]',
                  isHoverable && 'hover:bg-gray-100 cursor-pointer',
                  rowClassName
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {headers.map((header) => (
                  <td
                    key={`${rowIndex}-${header.key}`}
                    className={cn(
                      isCompact ? 'py-2 px-4' : 'py-4 px-6',
                      showDividers && 'divide-x divide-white'
                    )}
                  >
                    {renderCell
                      ? renderCell(header.key, row[header.key], row)
                      : row[header.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={headers.length}>
                {emptyState}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table; 