import {
  ActionMenu,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  Menu,
  Table as TableBase,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
  cn,
  useEscape,
  useMount,
} from "@zeak/react";
import { clip } from "@zeak/utils";
import type {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import type {
  EditableTableCellComponent,
  Position,
} from "~/components/Editable";
import {
  IndeterminateCheckbox,
  Pagination,
  Row,
  TableHeader,
  usePagination,
  useSort,
} from "./components";
import type { ColumnFilter } from "./components/Filter/types";
import type { TableAction } from "./types";
import { getAccessorKey, updateNestedProperty } from "./utils";
import { useGlobalTableConfStore } from "~/stores";
import { WebCogIcon, WebMenuVerticalDots } from "@zeak/icons";
// import { CiEdit } from "react-icons/ci";

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  actions?: TableAction<T>[];
  headerIcons?: JSX.Element | null;
  count?: number;
  selectedSpecificRow?: any | null;
  defaultColumnOrder?: string[];
  defaultColumnPinning?: ColumnPinningState;
  defaultColumnVisibility?: Record<string, boolean>;
  editableComponents?: Record<string, EditableTableCellComponent<T>>;
  primaryAction?: ReactNode;
  withColumnOrdering?: boolean;
  withInlineEditing?: boolean;
  // withFilters?: boolean;
  withPagination?: boolean;
  withSearch?: boolean;
  withSelectableRows?: boolean;
  withSimpleSorting?: boolean;
  withColumnResizing?: boolean;
  onSelectedRowsChange?: (selectedRows: T[]) => void;
  renderContextMenu?: (row: T) => JSX.Element | null;
  onColumnResizing?: (rowConf: Record<string, string | number>) => void;
  onRowClick?: (row: Record<string, any>) => void;
  createNew?: JSX.Element
}

const Table = <T extends object>({
  data,
  columns,
  actions = [],
  headerIcons = null,
  count = 0,
  defaultColumnOrder,
  defaultColumnPinning = {
    left: ["Select"],
  },
  defaultColumnVisibility,
  editableComponents,
  // withFilters = false,
  primaryAction,
  withInlineEditing = false,
  withColumnOrdering = false,
  withPagination = true,
  withSearch = true,
  withSelectableRows = false,
  withSimpleSorting = true,
  withColumnResizing = false,
  selectedSpecificRow = null,
  onSelectedRowsChange,
  renderContextMenu,
  onColumnResizing,
  onRowClick,
  createNew
}: TableProps<T>) => {
  const [{ colSize, minColWidth, maxColWidth }] = useGlobalTableConfStore();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  /* Data for Optimistic Updates */
  const [internalData, setInternalData] = useState<T[]>(data);
  useEffect(() => {
    setInternalData(data);
  }, [data]);

  /* Seletable Rows */
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  /* Pagination */
  const pagination = usePagination(count, setRowSelection);

  /* Column Visibility */
  const [columnVisibility, setColumnVisibility] = useState(
    defaultColumnVisibility ?? {},
  );

  /* Column Ordering */
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    defaultColumnOrder ?? [],
  );
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
    withColumnOrdering ? defaultColumnPinning : {},
  );

  /* Sorting */
  const { isSorted, toggleSortBy } = useSort();

  const columnAccessors = useMemo(
    () =>
      columns.reduce<Record<string, string>>((acc, column) => {
        const accessorKey: string | undefined = getAccessorKey(column);
        if (accessorKey?.includes("_"))
          throw new Error(
            `Invalid accessorKey ${accessorKey}. Cannot contain '_'`,
          );
        if (accessorKey && column.header && typeof column.header === "string") {
          return {
            ...acc,
            [accessorKey]: column.header,
          };
        }
        return acc;
      }, {}),
    [columns],
  );

  const internalColumns = useMemo(() => {
    let result: ColumnDef<T>[] = [];
    if (withSelectableRows) {
      result.push(...getRowSelectionColumn<T>());
    }
    result.push(...columns);
    if (renderContextMenu) {
      result.push(...getActionColumn<T>(renderContextMenu));
    }
    return result;
  }, [columns, renderContextMenu, withSelectableRows]);

  const table = useReactTable({
    data: internalData,
    columns: internalColumns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
      rowSelection,
    },
    defaultColumn: {
      enableResizing: true,
      size: Number(colSize), //starting column size
      minSize: Number(minColWidth), //enforced during column resizing
      maxSize: Number(maxColWidth), //enforced during column resizing
    },
    columnResizeMode: "onChange",
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: withColumnResizing,
    meta: {
      // These are not part of the standard API, but are accessible via table.options.meta
      editableComponents,
      updateData: (rowIndex, updates) => {
        setInternalData((previousData) =>
          previousData.map((row, index) => {
            if (index === rowIndex) {
              let newRow = { ...row };
              Object.entries(updates).forEach(([columnId, value]) => {
                if (columnId.includes("_") && !(columnId in newRow)) {
                  updateNestedProperty(newRow, columnId, value);
                  return newRow;
                } else {
                  return {
                    ...newRow,
                    [columnId]: value,
                  };
                }
              });
              return newRow;
            }
            return row;
          }),
        );
      },
    },
  });

  const selectedRows = withSelectableRows
    ? table.getSelectedRowModel().flatRows.map((row) => row.original)
    : [];

  useEffect(() => {
    if (typeof onSelectedRowsChange === "function") {
      onSelectedRowsChange(selectedRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, onSelectedRowsChange]);

  useEffect(() => { }, [selectedSpecificRow]);

  useEffect(() => {
    if (typeof onColumnResizing === "function") {
      onColumnResizing(table.getState().columnSizing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizing, onColumnResizing]);

  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Position>(null);

  const focusOnSelectedCell = useCallback(() => {
    if (selectedCell == null) return;
    const cell = tableContainerRef.current?.querySelector(
      `[data-row="${selectedCell.row}"][data-column="${selectedCell.column}"]`,
    ) as HTMLDivElement;
    if (cell) cell.focus();
  }, [selectedCell, tableContainerRef]);

  useEscape(() => {
    setIsEditing(false);
    focusOnSelectedCell();
  });

  const onSelectedCellChange = useCallback(
    (position: Position) => {
      if (
        selectedCell == null ||
        position == null ||
        selectedCell.row !== position?.row ||
        selectedCell.column !== position.column
      )
        setSelectedCell(position);
    },
    [selectedCell],
  );

  const isColumnEditable = useCallback(
    (selectedColumn: number) => {
      if (!withInlineEditing) return false;

      const tableColumns = [
        ...table.getLeftVisibleLeafColumns(),
        ...table.getCenterVisibleLeafColumns(),
      ];

      const column =
        tableColumns[withSelectableRows ? selectedColumn + 1 : selectedColumn];
      if (!column) return false;

      const accessorKey = getAccessorKey(column.columnDef);
      return (
        accessorKey && editableComponents && accessorKey in editableComponents
      );
    },
    [table, editableComponents, withInlineEditing, withSelectableRows],
  );

  const onCellClick = useCallback(
    (row: number, column: number) => {
      // ignore row select checkbox column
      if (
        selectedCell?.row === row &&
        selectedCell?.column === column &&
        isColumnEditable(column)
      ) {
        setIsEditing(true);
        return;
      }
      // ignore row select checkbox column
      if (column === -1) return;

      setIsEditing(false);
      onSelectedCellChange({ row, column });
    },
    [selectedCell, isColumnEditable, onSelectedCellChange],
  );

  const onCellUpdate = useCallback(
    (rowIndex: number) => (updates: Record<string, unknown>) =>
      table.options.meta?.updateData
        ? table.options.meta?.updateData(rowIndex, updates)
        : undefined,
    [table],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!selectedCell) return;

      const { code, shiftKey } = event;

      const commandCodes: {
        [key: string]: [number, number];
      } = {
        Tab: [0, 1],
        Enter: [1, 0],
      };

      const navigationCodes: {
        [key: string]: [number, number];
      } = {
        ArrowRight: [0, 1],
        ArrowLeft: [0, -1],
        ArrowDown: [1, 0],
        ArrowUp: [-1, 0],
      };

      const lastRow = table.getRowModel().rows.length - 1;
      const lastColumn =
        table.getVisibleLeafColumns().length - 1 - (withSelectableRows ? 1 : 0);

      const navigate = (
        delta: [number, number],
        tabWrap = false,
      ): [number, number] => {
        const x0 = selectedCell?.column || 0;
        const y0 = selectedCell?.row || 0;

        let x1 = x0 + delta[1];
        let y1 = y0 + delta[0];

        if (tabWrap) {
          if (delta[1] > 0) {
            // wrap to the next row if we're on the last column
            if (x1 > lastColumn) {
              x1 = 0;
              y1 += 1;
            }
            // don't wrap to the next row if we're on the last row
            if (y1 > lastRow) {
              x1 = x0;
              y1 = y0;
            }
          } else {
            // reverse tab wrap
            if (x1 < 0) {
              x1 = lastColumn;
              y1 -= 1;
            }

            if (y1 < 0) {
              x1 = x0;
              y1 = y0;
            }
          }
        } else {
          x1 = clip(x1, 0, lastColumn);
        }

        y1 = clip(y1, 0, lastRow);

        return [x1, y1];
      };

      if (code in commandCodes) {
        event.preventDefault();

        if (
          !isEditing &&
          code === "Enter" &&
          !shiftKey &&
          isColumnEditable(selectedCell.column)
        ) {
          setIsEditing(true);
          return;
        }

        let direction = commandCodes[code];
        if (shiftKey) direction = [-direction[0], -direction[1]];
        const [x1, y1] = navigate(direction, code === "Tab");
        setSelectedCell({
          row: y1,
          column: x1,
        });
        if (isEditing) {
          setIsEditing(false);
        }
      } else if (code in navigationCodes) {
        // arrow key navigation should't work if we're editing
        if (isEditing) return;
        event.preventDefault();
        const [x1, y1] = navigate(navigationCodes[code], code === "Tab");
        setIsEditing(false);
        setSelectedCell({
          row: y1,
          column: x1,
        });
        // any other key (besides shift) activates editing
        // if the column is editable and a cell is selected
      } else if (
        !["ShiftLeft", "ShiftRight"].includes(code) &&
        !isEditing &&
        selectedCell &&
        isColumnEditable(selectedCell.column)
      ) {
        setIsEditing(true);
      }
    },
    [
      isColumnEditable,
      isEditing,
      selectedCell,
      setSelectedCell,
      table,
      withSelectableRows,
    ],
  );

  // reset the selected cell when the table data changes
  useEffect(() => {
    setSelectedCell(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editMode,
    pagination.pageIndex,
    pagination.pageSize,
    columnOrder,
    columnVisibility,
  ]);

  useMount(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  });

  const filters = useMemo(
    () =>
      columns.reduce<ColumnFilter[]>((acc, column) => {
        if (
          column.meta?.filter &&
          column.header &&
          typeof column.header === "string"
        ) {
          const filter: ColumnFilter = {
            accessorKey: getAccessorKey(column) ?? column.id!,
            header: column.header,
            pluralHeader: column.meta.pluralHeader,
            filter: column.meta.filter,
          };
          return [...acc, filter];
        }
        return acc;
      }, []),
    [columns],
  );

  const rows = table.getRowModel().rows;

  return (
    <VStack spacing={0} className="h-full">
      {/* {(withColumnOrdering ||
        withFilters ||
        withSelectableRows ||
        withInlineEditing) && (
        <TableHeader
          actions={actions}
          headerIcons={headerIcons} // bulk delete - similar to actions(above)
          columnAccessors={columnAccessors}
          columnOrder={columnOrder}
          columns={table.getAllLeafColumns()}
          editMode={editMode}
          filters={filters}
          primaryAction={primaryAction}
          selectedRows={selectedRows}
          setColumnOrder={setColumnOrder}
          setEditMode={setEditMode}
          pagination={pagination}
          withInlineEditing={withInlineEditing}
          withColumnOrdering={withColumnOrdering}
          // withFilters={withFilters}
          withPagination={withPagination}
          withSearch={withSearch}
          withSelectableRows={withSelectableRows}
        />
      )} */}
      <div className="flex flex-col">


        <TableHeader
          actions={actions}
          headerIcons={headerIcons} // bulk delete - similar to actions(above)
          columnAccessors={columnAccessors}
          columnOrder={columnOrder}
          columns={table.getAllLeafColumns()}
          editMode={editMode}
          filters={filters}
          primaryAction={primaryAction}
          selectedRows={selectedRows}
          setColumnOrder={setColumnOrder}
          setEditMode={setEditMode}
          pagination={pagination}
          withInlineEditing={withInlineEditing}
          withColumnOrdering={withColumnOrdering}
          withPagination={withPagination}
          withSearch={withSearch}
          withSelectableRows={withSelectableRows}
          withColumnSorting={false}
        />
        {/* {
          count === 0 && (
            <div className=" w-fullflex self-baseline">
              {createNew}
            </div>
          )
        } */}
      </div>
      <div
        className="w-full h-full border border-stroke rounded-lg overflow-hidden custom-table rounded-tl-none rounded-tr-none"
        ref={tableContainerRef}
        onKeyDown={editMode ? onKeyDown : undefined}
      >
        <div
          className={cn(
            "grid w-full",
            withColumnOrdering ? "grid-cols-[auto_1fr]" : "grid-cols-1",
          )}
        >
          {/* Pinned left columns */}
          {withColumnOrdering ? (
            <TableBase className="bg-background border-r border-border sticky left-0 z-50">
              <Thead>
                {table.getLeftHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id} className="">
                    {headerGroup.headers.map((header) => {
                      const accessorKey = getAccessorKey(
                        header.column.columnDef,
                      );
                      const sortable =
                        withSimpleSorting &&
                        accessorKey &&
                        !accessorKey.endsWith(".id") &&
                        header.column.columnDef.enableSorting !== false;

                      const sorted = isSorted(accessorKey ?? "");

                      return (
                        <Th
                          key={header.id}
                          // layout
                          onClick={
                            sortable && !editMode
                              ? () => toggleSortBy(accessorKey ?? "")
                              : undefined
                          }
                          className={cn(
                            "px-4 py-4 whitespace-nowrap",
                            editMode && "cursor-pointer border-r border-border",
                          )}
                          colSpan={header.colSpan}
                          style={{
                            position: "relative",
                            width: header.getSize(),
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center text-sm text-secondary">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              <span className="pl-4">
                                {sorted ? (
                                  sorted === -1 ? (
                                    <FaSortDown aria-label="sorted descending" />
                                  ) : (
                                    <FaSortUp aria-label="sorted ascending" />
                                  )
                                ) : sortable ? (
                                  <FaSort aria-label="sort" />
                                ) : null}
                              </span>
                            </div>
                          )}
                          {header.column.getCanResize() && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className={`resizer ${header.column.getIsResizing()
                                ? "isResizing"
                                : ""
                                }`}
                            ></div>
                          )}
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {rows.map((row) => {
                  const isRowSelected =
                    row.index in rowSelection && !!rowSelection[row.index];
                  const rowIsSelected = selectedCell?.row === row.index;

                  return renderContextMenu ? (
                    <Menu type="context" key={row.index}>
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <Row
                            editableComponents={editableComponents}
                            isEditing={isEditing}
                            isEditMode={editMode}
                            isFrozenColumn
                            isRowSelected={isRowSelected}
                            // isRowSelected={false}
                            selectedCell={selectedCell}
                            row={row}
                            rowIsSelected={rowIsSelected}
                            withColumnOrdering={withColumnOrdering}
                            onCellClick={onCellClick}
                            onCellUpdate={onCellUpdate}
                            className={`border-b ${isRowSelected ? "bg-dropdownHoverBg" : "bg-white"
                              }`}
                          />
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-128 p-0">
                          {renderContextMenu(row.original)}
                        </ContextMenuContent>
                      </ContextMenu>
                    </Menu>
                  ) : (
                    <Row
                      key={row.id}
                      editableComponents={editableComponents}
                      isEditing={isEditing}
                      isEditMode={editMode}
                      isFrozenColumn
                      isRowSelected={
                        row.index in rowSelection && !!rowSelection[row.index]
                      }
                      selectedCell={selectedCell}
                      row={row}
                      rowIsSelected={selectedCell?.row === row.index}
                      withColumnOrdering={withColumnOrdering}
                      onCellClick={onCellClick}
                      onCellUpdate={onCellUpdate}
                      className={`border-b ${row.index in rowSelection && !!rowSelection[row.index]
                        ? "bg-[#E9E9EE]"
                        : "bg-white"
                        }`}
                    />
                  );
                })}
              </Tbody>
            </TableBase>
          ) : null}

          {/* Unpinned columns */}
          <TableBase>
            <Thead>
              {(withColumnOrdering
                ? table.getCenterHeaderGroups()
                : table.getHeaderGroups()
              ).map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const accessorKey = getAccessorKey(header.column.columnDef);

                    const sortable =
                      withSimpleSorting &&
                      accessorKey &&
                      !accessorKey.endsWith(".id") &&
                      header.column.columnDef.enableSorting !== false;
                    const sorted = isSorted(accessorKey ?? "");

                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={
                          sortable
                            ? () => toggleSortBy(accessorKey ?? "")
                            : undefined
                        }
                        className={cn(
                          "px-4 py-4 whitespace-nowrap",
                          editMode && "border-r-1 border-border",
                          sortable && "cursor-pointer",
                        )}
                        // style={{ width: header.getSize() }}
                        style={{
                          position: "relative",
                          width: header.getSize(),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          // <div className="flex justify-between items-center text-sm text-secondary">
                          <div className="flex items-center text-sm text-secondary justify-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            <span className="pl-4">
                              {sorted ? (
                                sorted === -1 ? (
                                  <FaSortDown aria-label="sorted descending" />
                                ) : (
                                  <FaSortUp aria-label="sorted ascending" />
                                )
                              ) : sortable ? (
                                <FaSort
                                  aria-label="sort"
                                  style={{ opacity: 0.4 }}
                                />
                              ) : null}
                            </span>

                            {header.id !== "Select" &&
                              header.id !== "Actions" && (
                                <span className="pl-4 absolute right-[10px]">
                                  <WebMenuVerticalDots />
                                </span>
                              )}
                          </div>
                        )}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""
                              }`}
                          ></div>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {rows.map((row) => {
                return renderContextMenu ? (
                  <Menu type="context" key={row.index}>
                    <ContextMenu>
                      <ContextMenuTrigger asChild>
                        <Row
                          editableComponents={editableComponents}
                          isEditing={isEditing}
                          isEditMode={editMode}
                          isRowSelected={
                            row.index in rowSelection &&
                            !!rowSelection[row.index]
                          }
                          pinnedColumns={
                            columnPinning?.left
                              ? columnPinning.left?.length -
                              (withSelectableRows ? 1 : 0)
                              : 0
                          }
                          selectedCell={selectedCell}
                          row={row}
                          rowIsSelected={selectedCell?.row === row.index}
                          withColumnOrdering={withColumnOrdering}
                          {...(onRowClick && { onRowClick })}
                          onCellClick={onCellClick}
                          onCellUpdate={onCellUpdate}
                          transition-colors
                          className={`border-b ${row.index in rowSelection &&
                            !!rowSelection[row.index]
                            ? "bg-dropdownHoverBg"
                            : ""
                            }`}
                        />
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-128 p-0">
                        {renderContextMenu(row.original)}
                      </ContextMenuContent>
                    </ContextMenu>
                  </Menu>
                ) : (
                  <Row
                    key={row.id}
                    editableComponents={editableComponents}
                    isEditing={isEditing}
                    isEditMode={editMode}
                    isRowSelected={
                      row.index in rowSelection && !!rowSelection[row.index]
                    }
                    pinnedColumns={
                      columnPinning?.left
                        ? columnPinning.left?.length -
                        (withSelectableRows ? 1 : 0)
                        : 0
                    }
                    selectedCell={selectedCell}
                    row={row}
                    rowIsSelected={selectedCell?.row === row.index}
                    withColumnOrdering={withColumnOrdering}
                    onCellClick={onCellClick}
                    onCellUpdate={onCellUpdate}
                    className={`border-b ${row.index in rowSelection && !!rowSelection[row.index]
                      ? "bg-dropdownHoverBg"
                      : ""
                      }`}
                  />
                );
              })}
            </Tbody>
          </TableBase>
        </div>
      </div>
      {withPagination && <Pagination {...pagination} />}
    </VStack>
  );
};

function getRowSelectionColumn<T>(): ColumnDef<T>[] {
  return [
    {
      id: "Select",
      size: 40,
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
  ];
}

function getActionColumn<T>(
  renderContextMenu: (item: T) => JSX.Element | null,
): ColumnDef<T>[] {
  return [
    {
      id: "Actions",
      header: () => (
        <div className="text-secondary ml-auto">
          <WebCogIcon />
          {/* Manage */}
        </div>
      ),
      // header: () => <span className="pl-4">Actions</span>,
      size: 20,
      cell: (item) => (
        <div className="flex justify-end gap-4">
          {/* <Button
            variant="ghost"
            className="w-8 h-8 p-0 hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg focus:outline-none focus:ring-0 rounded-full hover:text-accent"
          >
            <CiEdit size={20} className="text-accent" />
          </Button> */}
          <ActionMenu>{renderContextMenu(item.row.original)}</ActionMenu>
        </div>
      ),
    },
  ];
}

export default Table;
