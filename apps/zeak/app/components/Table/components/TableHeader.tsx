import { Button, HStack } from "@zeak/react";
import type { Column, ColumnOrderState } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { DebouncedInput } from "~/components/Search";
import { useUrlParams } from "~/hooks";
import type { TableAction } from "../types";
import Actions from "./Actions";
import Columns from "./Columns";
import { ActiveFilters, Filter } from "./Filter";
import type { ColumnFilter } from "./Filter/types";
import type { PaginationProps } from "./Pagination";
import { PaginationButtons } from "./Pagination";
import Sort from "./Sort";
import { CiSearch } from "react-icons/ci";

type HeaderProps<T> = {
  actions: TableAction<T>[];
  headerIcons: JSX.Element | null;
  columnAccessors: Record<string, string>;
  columnOrder: ColumnOrderState;
  columns: Column<T, unknown>[];
  editMode: boolean;
  filters: ColumnFilter[];
  primaryAction?: ReactNode;
  pagination: PaginationProps;
  selectedRows: T[];
  setColumnOrder: (newOrder: ColumnOrderState) => void;
  setEditMode: (editMode: boolean) => void;
  withColumnOrdering: boolean;
  withColumnSorting: boolean;
  withInlineEditing: boolean;
  withPagination: boolean;
  withSearch: boolean;
  withSelectableRows: boolean;
};

const TableHeader = <T extends object>({
  actions,
  headerIcons,
  columnAccessors,
  columnOrder,
  columns,
  editMode,
  filters,
  primaryAction,
  pagination,
  selectedRows,
  setColumnOrder,
  setEditMode,
  withColumnOrdering,
  withColumnSorting,
  withInlineEditing,
  withPagination,
  withSearch,
  withSelectableRows,
}: HeaderProps<T>) => {
  const [params] = useUrlParams();
  const currentFilters = params.getAll("filter");

  return (
    <>
      <HStack className="justify-between bg-card w-full">
        <HStack>
          {withSearch && (
            <div className="relative">
              <DebouncedInput
                param="search"
                size="sm"
                placeholder="Search"
                className="pl-8"
              />
              <CiSearch
                className="absolute top-[50%] left-3 -translate-y-[50%] text-secondary"
                size={18}
              />
            </div>
          )}
          {!!filters?.length && <Filter filters={filters} />}
        </HStack>
        <HStack>
          {withSelectableRows && actions.length > 0 && (
            // TODO: move this to a draggable bar like Linear
            <Actions actions={actions} selectedRows={selectedRows} />
          )}
          {selectedRows.length && headerIcons ? headerIcons : null}
          {withInlineEditing &&
            (editMode ? (
              <Button
                leftIcon={<BsFillCheckCircleFill />}
                onClick={() => setEditMode(false)}
              >
                Finish Editing
              </Button>
            ) : (
              <Button
                leftIcon={<MdOutlineEditNote />}
                variant="ghost"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            ))}
          {withColumnSorting && <Sort columnAccessors={columnAccessors} />}
          {withColumnOrdering && (
            <Columns
              columnOrder={columnOrder}
              columns={columns}
              setColumnOrder={setColumnOrder}
              withSelectableRows={withSelectableRows}
            />
          )}
          {withPagination &&
            (pagination.canNextPage || pagination.canPreviousPage) && (
              <PaginationButtons {...pagination} condensed />
            )}
          <>{primaryAction}</>
        </HStack>
      </HStack>
      {currentFilters.length > 0 && (
        <HStack className="px-4 py-1.5 justify-between bg-card border-b border-border w-full">
          <HStack>
            <ActiveFilters filters={filters} />
          </HStack>
        </HStack>
      )}
    </>
  );
};

export default TableHeader;
