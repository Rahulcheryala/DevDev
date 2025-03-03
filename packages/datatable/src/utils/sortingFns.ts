import { Row, SortingFn } from "@tanstack/react-table";

export const sortNullsFirst = <TData>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string
): number => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);

  // Handle nulls/undefined - put them at the top
  if (a == null) return -1;
  if (b == null) return 1;
  if (a == null && b == null) return 0;

  // Basic comparison
  return a < b ? -1 : a > b ? 1 : 0;
};

export const sortNullsLast = <TData>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string
): number => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);

  // Handle nulls/undefined - put them at the bottom
  if (a == null) return 1;
  if (b == null) return -1;
  if (a == null && b == null) return 0;

  // Basic comparison
  return a < b ? -1 : a > b ? 1 : 0;
};

export const enumSortFn: SortingFn<any> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;
  const statusOrder = ['single', 'complicated', 'relationship'];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
}
