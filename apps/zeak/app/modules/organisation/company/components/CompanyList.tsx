import { memo, useCallback, useMemo, useState } from "react";
import { usePermissions, useRouteData } from "~/hooks";
import { useNavigate, useRevalidator } from "@remix-run/react";
import { Avatar, Button, MenuItem, toast, useDisclosure } from "@zeak/react";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  GroupingState,
  ColumnPinningState,
  FilterFn,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table";
import { Table } from "~/components";
import { companyStatusMap, type CompanyType } from "~/modules/access-settings";
import { path } from "~/utils/path";
import { ConfirmDelete } from "~/components/Modals";
import { EditIcon, ProhibitedIcon, TrashIcon } from "@zeak/icons";
import axios from "axios";
import { formatStringArray } from "~/utils/helper";
import { type Company } from "~/modules/settings";
import DataTableToolbar from "~/components/DataTable/DataTableToolBar";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFacetedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import DataTablePagination from "~/components/DataTable/DataTablePagination";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TableRow from "~/components/DataTable/DataTableRow";
import TableHeader from "~/components/DataTable/DataTableHeader";
import CreateCompany from "./CreateNewCompany";
import MainMenu from "~/components/Globals/MainMenu";
import { DataTable } from "~/components/Globals/DataTable/DataTable";
import { columns } from "~/components/Globals/DataTable/Columns";

type CompanyTypeTableProps = {
  data: CompanyType[];
  count: number;
};

const formatDate = (date: any) => {
  if (!date) return "";
  const d = new Date(date);
  return d
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
};

const formatTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  };
  return d.toLocaleTimeString("en-US", options) + " | CST";
};

const CompanyList = memo(({ data, count }: CompanyTypeTableProps) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const closeCompanyModal = useDisclosure();
  const revalidator = useRevalidator();
  const [selectedCompanys, setSelectedCompanys] = useState<Array<CompanyType>>(
    []
  );

  const [localData, setLocalData] = useState<CompanyType[]>(data);
  const routeData = useRouteData<{ company: Company }>(
    path.to.authenticatedRoot
  );
  const [isCompact, setIsCompact] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
  //   return [
  //     {
  //       accessorKey: "logoAndName",
  //       header: () => (
  //         <div>
  //           Company
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             onClick={(e) => e.stopPropagation()}
  //             onChange={(e) =>
  //               setLocalData(
  //                 localData?.filter((item) =>
  //                   item.name?.includes(e.target.value)
  //                 )
  //               )
  //             }
  //             className="mt-1 block w-full"
  //           />
  //         </div>
  //       ),
  //       cell: (item) => (
  //         <div className="flex items-center">
  //           <Avatar
  //             src={item.row.original.logo as string}
  //             name={item.row.original.name as string}
  //           />
  //           <span className="ml-2">{item.row.original.name}</span>
  //         </div>
  //       ),
  //     },
  //     {
  //       accessorKey: "companyCode",
  //       header: () => (
  //         <div>
  //           Company Code
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             onClick={(e) => e.stopPropagation()}
  //             onChange={(e) =>
  //               setLocalData(
  //                 localData?.filter((item) =>
  //                   item.companyCode?.includes(e.target.value)
  //                 )
  //               )
  //             }
  //             className="mt-1 block w-full"
  //           />
  //         </div>
  //       ),
  //       cell: (item) => item.getValue(),
  //     },
  //     {
  //       accessorKey: "domainUrl",
  //       header: () => (
  //         <div>
  //           URL
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             onClick={(e) => e.stopPropagation()}
  //             onChange={(e) =>
  //               setLocalData(
  //                 localData?.filter((item) =>
  //                   item.domainUrl?.includes(e.target.value)
  //                 )
  //               )
  //             }
  //             className="mt-1 block w-full"
  //           />
  //         </div>
  //       ),
  //       cell: (item) => item.getValue().replace(/https?:\/\//, ""),
  //     },
  //     {
  //       accessorKey: "status",
  //       header: () => (
  //         <div>
  //           Status
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             onClick={(e) => e.stopPropagation()}
  //             onChange={(e) =>
  //               setLocalData(
  //                 localData?.filter((item) =>
  //                   item.status?.includes(e.target.value)
  //                 )
  //               )
  //             }
  //             className="mt-1 block w-full"
  //           />
  //         </div>
  //       ),
  //       meta: {
  //         getCellContext: (context: any) => {
  //           return {
  //             className:
  //               context.getValue() === companyStatusMap.ACTIVE
  //                 ? ` text-center text-[rgba(4,_167,_119)]`
  //                 : ` text-center text-[rgba(0,_0,_0)]`,
  //           };
  //         },
  //       },
  //     },
  //     {
  //       accessorKey: "numuser",
  //       header: () => (
  //         <div>
  //           Number of Users
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             onClick={(e) => e.stopPropagation()}
  //             // onChange={(e) => setLocalData(localData?.filter(item => item?.numuser?.includes(e.target.value)))}
  //             className="mt-1 block w-full"
  //           />
  //         </div>
  //       ),
  //       cell: (item) => item.getValue(),
  //     },
  //     {
  //       accessorKey: "createdAt",
  //       header: () => (
  //         <div>
  //           Creation date
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             onClick={(e) => e.stopPropagation()}
  //             // onChange={(e) => setColumnFilters([{ id: 'createdAt', value: e.target.value }])}
  //             className="mt-1 block w-full"
  //           />
  //         </div>
  //       ),
  //       cell: (item) => (
  //         <div className="flex flex-col">
  //           <div>{formatDate(item.getValue())}</div>
  //           <div>{formatTime(item.getValue())}</div>
  //         </div>
  //       ),
  //     },
  //   ];
  // }, [setColumnFilters]);

  const changeStatus = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("id", `${row.id}`);
      formData.append(
        "status",
        `${row.status === companyStatusMap.ACTIVE
          ? companyStatusMap.INACTIVE
          : companyStatusMap.ACTIVE
        }`
      );

      await axios({
        method: "post",
        url: path.to.api.changeStatusCompany,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator]
  );

  const onSelectedRowsChange = useCallback((elements: typeof data) => {
    setSelectedCompanys(elements);
  }, []);

  const onHeaderIconClick = useCallback(() => {
    if (selectedCompanys?.length) {
      if (
        selectedCompanys
          .map((c) => c.id)
          .includes(routeData?.company?.id as string)
      ) {
        return toast.error("Currently active company cannot be deleted");
      }
      closeCompanyModal.onOpen();
    }
  }, [selectedCompanys, routeData?.company?.id, closeCompanyModal]);

  const headerIcons = useMemo(() => {
    return (
      <Button variant="ghost" className="px-2" onClick={onHeaderIconClick}>
        <TrashIcon color="#D11149" />
      </Button>
    );
  }, [onHeaderIconClick]);

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          {/* <MenuItem
            className="px-4"
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              navigate(path.to.companyEdit(row.id as string));
            }}
          >
            <EditIcon /> <span className="ms-4">Edit Company</span>
          </MenuItem>
          <MenuItem
            className="px-4"
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              changeStatus(row);
            }}
          >
            <ProhibitedIcon />{" "}
            <span className="ms-4">
              {row.status === companyStatusMap.ACTIVE ? "Disable" : "Enable"}{" "}
              Company
            </span>
          </MenuItem> */}
          <MenuItem
            className="px-4 text-[#D11149]"
            disabled={!permissions.can("delete", "users")}
            onClick={() => {
              if (row?.id === (routeData?.company?.id as string)) {
                toast.error("Currently active company cannot be deleted");
              } else {
                setSelectedCompanys([row]);
                closeCompanyModal.onOpen();
              }
            }}
          >
            <TrashIcon color="#D11149" />{" "}
            <span className="ms-4">Delete Company</span>
          </MenuItem>
        </>
      );
    },
    [
      permissions,
      navigate,
      changeStatus,
      routeData?.company?.id,
      closeCompanyModal,
    ]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const globalFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    return String(value)
      .toLowerCase()
      .includes(String(filterValue).toLowerCase());

    // setLocalData(localData?.filter(item => item.name?.includes(filterValue)))
  };

  const tableDataTransformer = (data: CompanyType[]) => data.reduce((acc, item) => {
    return acc.push({
      id: item.id,
      name: item.name,
      code: item.companyCode,
      url: item.domainUrl,
      status: item.status,
      users: item.noOfUsers || '',
      createdAt: item.createdAt,
    })
  }, []);

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      columnOrder,
      sorting,
      grouping,
      columnFilters,
      columnPinning,
      columnVisibility,
      globalFilter,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    enableSorting: true,
    enableGrouping: true,
    enableColumnFilters: true,
    enableColumnPinning: true,
    enableHiding: true,
    autoResetPageIndex: false,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    globalFilterFn: globalFilterFn as FilterFn<any>,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id as string),
    [data]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      // Check if we're dragging a column
      if (columnOrder.includes(active.id as string)) {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);
          return arrayMove(columnOrder, oldIndex, newIndex);
        });
      } else {
        // We're dragging a row
        // setData((data:any) => {
        //   const oldIndex = dataIds.indexOf(active.id);
        //   const newIndex = dataIds.indexOf(over.id);
        //   return arrayMove(data, oldIndex, newIndex);
        // });
      }
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  interface CustomHeaderProps {
    onDelete: () => void;
    onEdit: () => void;
    onNew: () => void;
    searchText: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    enableDelete?: boolean;
  }

  const CustomHeader = ({
    onDelete,
    onEdit,
    onNew,
    searchText,
    onSearchChange,
    enableDelete = false
  }: CustomHeaderProps) => (
    <MainMenu
      onDelete={onDelete}
      onEdit={onEdit}
      onNew={onNew}
      searchText={searchText}
      onSearchChange={onSearchChange}
      isDeleteDisabled={!enableDelete}
      customActions={[
        { label: 'Custom Action 1', onClick: () => console.log('custom action 1') },
        { label: 'Custom Action 2', onClick: () => console.log('custom action 2') },
      ]}
      viewOptions={['Grid View', 'List View', 'Card View']}
      defaultView="GRID VIEW"
    />
  );

  return (
    <>
      {/* <DataTableToolbar
        setIsCompact={setIsCompact}
        isCompact={isCompact}
        data={data}
        table={table}
        additionalClassName="mb-2"
      /> */}

      {/* <MainMenu
        onDelete={() => console.log('delete')}
        onEdit={() => console.log('edit')}
        onNew={() => console.log('new')}
        isDeleteDisabled={false}
        customActions={[
          { label: 'Custom Action 1', onClick: () => console.log('custom action 1') },
          { label: 'Custom Action 2', onClick: () => console.log('custom action 2') },
        ]}
        viewOptions={['Grid View', 'List View', 'Card View']}
        defaultView="GRID VIEW"
      /> */}

      {count === 0 ? (
        <CreateCompany />
      ) : (
        // <Table<(typeof data)[number]>
        //   headerIcons={headerIcons}
        //   data={localData}
        //   columns={columns}
        //   count={count}
        //   withSearch={false}
        //   withColumnOrdering={false}
        //   withSimpleSorting={true}
        //   renderContextMenu={renderContextMenu}
        //   onSelectedRowsChange={onSelectedRowsChange}
        //   withSelectableRows
        // />
        <DataTable
          columns={columns}
          data={data}
          customHeader={({ searchText, onSearchChange, enableDelete }) => (
            <CustomHeader
              onDelete={() => console.log('delete')}
              onEdit={() => console.log('edit')}
              onNew={() => navigate("/x/access-settings/companies/new")}
              searchText={searchText}
              onSearchChange={onSearchChange}
              enableDelete={enableDelete}
            />
          )}
        />
      )}

      {!!selectedCompanys?.length && (
        <ConfirmDelete
          action={path.to.CompanyDelete(
            selectedCompanys.map((c) => c.id).join() as string
          )}
          isOpen={closeCompanyModal.isOpen}
          name={formatStringArray(
            (selectedCompanys || []).map((c) => c.name) as Array<string>
          )}
          text={`Are you sure you want to permanently delete this company => ${formatStringArray(
            (selectedCompanys || []).map((c) => c.name) as Array<string>
          )}?`}
          onCancel={() => {
            closeCompanyModal.onClose();
            setSelectedCompanys([]);
          }}
          onSubmit={() => {
            closeCompanyModal.onClose();
            setSelectedCompanys([]);
          }}
        />
      )}
    </>
  );
});

CompanyList.displayName = "CompanyList";
export default CompanyList;
