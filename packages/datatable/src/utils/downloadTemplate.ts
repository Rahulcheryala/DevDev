import { ColumnDef } from "@tanstack/react-table";

export const downloadTemplate = <T,>(columns: ColumnDef<T>[]) => {
  // Extract column metadata
  const columnData = columns.map(col => ({
    name: col.meta?.name || '',
    id: col.id || '',
    meta: JSON.stringify(col.meta || {}),
    accessorKey: (col as any).accessorKey || '',
    minSize: col.minSize || '',
    size: col.size || '',
    enableSorting: col.enableSorting || true,
    enableGrouping: col.enableGrouping || true,
    enableFiltering: col.enableColumnFilter || true,
    enablePinning: col.enablePinning || true,
    enableHiding: col.enableHiding || true,
    enableResizing: col.enableResizing || true
  }));

  // Create CSV with column names in first row
  const columnNames = columnData.map(col => col.name).join(',');
  
  // Create rows for each property
  const propertyRows = [
    'id,' + columnData.map(col => col.id).join(','),
    'meta,' + columnData.map(col => col.meta).join(','),
    'accessorKey,' + columnData.map(col => col.accessorKey).join(','),
    'minSize,' + columnData.map(col => col.minSize).join(','),
    'size,' + columnData.map(col => col.size).join(','),
    'enableSorting,' + columnData.map(col => col.enableSorting).join(','),
    'enableGrouping,' + columnData.map(col => col.enableGrouping).join(','),
    'enableFiltering,' + columnData.map(col => col.enableFiltering).join(','),
    'enablePinning,' + columnData.map(col => col.enablePinning).join(','),
    'enableHiding,' + columnData.map(col => col.enableHiding).join(','),
    'enableResizing,' + columnData.map(col => col.enableResizing).join(',')
  ];

  // Combine column names and property rows
  const csv = [columnNames, ...propertyRows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'table-columns.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};