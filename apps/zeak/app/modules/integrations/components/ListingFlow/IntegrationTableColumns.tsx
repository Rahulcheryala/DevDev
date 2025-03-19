import moment from "moment-timezone";
import { ColumnDef } from "@tanstack/react-table";
import { cn, Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { DataTableCheckbox } from "../../../../components/DataTable";
import RowDragHandleCell from "../../../../components/DataTable/RowDragHanle";
import { NameColumn } from "../../../../components/Layout/Screen";
import { useUnifiedContext } from "../../context";
import IntegrationActionOptions from "../misc/IntegrationActionOptions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import ConnectionsPill from "../misc/connectionsPill";
import { updateIntegrationFn } from "../../utils/api.utils";
import { toast } from "@zeak/react";
import { refreshIntegrationsAction } from "../../context/action";

const AddConnectionButton = ({ id }: { id: string }) => {
  const {
    dispatch,
    state: { records },
    openConnectionDrawer,
  } = useUnifiedContext();

  const onClickHandler = () => {
    dispatch({
      type: "SET_SELECTED_INTEGRATION",
      payload: records.find((record) => record.id.toString() === id) || null,
    });
    openConnectionDrawer("create");
  };

  return (
    <button
      className="w-full text-blue-500 font-semibold flex justify-center items-center gap-2"
      onClick={onClickHandler}
    >
      <FiPlus className="text-lg" />
      Connection
    </button>
  );
};

const FavoriteToggle = ({ integration }: { integration: any }) => {
  const { dispatch } = useUnifiedContext();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const newFavoriteStatus = !integration.isFavorite;

      await updateIntegrationFn(integration.id, {
        isFavorite: newFavoriteStatus,
      } as any);

      toast.success(
        `${integration.integrationName} ${newFavoriteStatus ? "added to" : "removed from"} favorites`
      );

      await refreshIntegrationsAction({}, dispatch);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      toast.error("Failed to update favorite status");
    }
  };

  return (
    <div className="flex justify-center items-center">
      {integration.isFavorite ? (
        <FaHeart
          className="text-red-500 cursor-pointer"
          onClick={handleToggleFavorite}
        />
      ) : (
        <FaRegHeart className="cursor-pointer text-secondary" onClick={handleToggleFavorite} />
      )}
    </div>
  );
};

const CompanyNames = ({ companyIds }: { companyIds: any[] }) => {
  const {
    state: { company },
  } = useUnifiedContext();
  return (
    <>
      <div className="w-11/12 text-ellipsis text-nowrap overflow-hidden text-left">
        {/* {companyIds.map((company: any) => company.companyName).join(", ") ||
          "N/A"} */}
        {company?.name}
      </div>
      {companyIds && companyIds.length - 3 > 0 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-xs">
          +{companyIds.length - 3}
        </div>
      )}
    </>
  );
};

export const IntegrationTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center px-3 h-full">
        <DataTableCheckbox
          className="rounded-full "
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={cn("flex h-[64px] w-[60px]", {
          "bg-[#FFDF41]": row.getIsSelected(),
        })}
      >
        <RowDragHandleCell rowId={row.id} />
        <div className={cn(" flex items-center justify-center relative")}>
          <DataTableCheckbox
            className={cn("rounded-full", { "bg-white": row.getIsSelected() })}
            checked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        </div>
      </div>
    ),
    size: 60,
    enableSorting: true,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: true,
    enableColumnFilter: false,
  },
  {
    id: "integrationName",
    accessorKey: "integrationName",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Integration Name
      </div>
    ),
    cell: ({ row, column }) => (
      <NameColumn
        src={row.original.logo}
        name={row.original.integrationName}
        link={`${row.original.id}`}
        columnSize={column.getSize()}
      />
    ),
    meta: {
      filterVariant: "text",
      name: "Integration Name",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "favorites",
    accessorKey: "favorites",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Favorites
      </div>
    ),
    cell: ({ row }) => <FavoriteToggle integration={row.original} />,
    meta: {
      filterVariant: "text",
      name: "Favorites",
    },
    size: 120,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "integrationCategory",
    accessorKey: "integrationCategory",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Integration Category
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        {row.original.integrationCategory.replace(/_/g, " ") || "-"}
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Integration Category",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Last Updated
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        <div className="flex flex-col text-left">
          <span>
            {moment(row.original.updatedAt || row.original.createdAt).format(
              "DD MMM, YYYY"
            )}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {moment(row.original.updatedAt || row.original.createdAt).format(
              "hh:mm A"
            )}{" "}
            |{" "}
            {moment(row.original.updatedAt || row.original.createdAt)
              .tz("America/Chicago")
              .format("z")}
          </span>
        </div>
      </div>
    ),
    meta: {
      filterVariant: "select",
      name: "Last Updated",
    },
    size: 250,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "connections",
    accessorKey: "connections",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Connections
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-left"
      >
        <ConnectionsPill id={row.original.id} type="table" />
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Connections",
    },
    size: 300,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "companies",
    accessorKey: "companies",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Companies
      </div>
    ),
    cell: ({ row, column }) => (
      <div style={{ maxWidth: column.getSize() }} className="px-5 relative">
        <CompanyNames companyIds={row.original.companyIds} />
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Companies",
    },
    size: 300,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ header }) => (
      <div className="text-ellipsis text-center overflow-hidden text-[14px] font-semibold leading-[18px]">
        Actions
      </div>
    ),
    cell: ({ row, column }) => (
      <div
        style={{ maxWidth: column.getSize() }}
        className="text-ellipsis text-nowrap overflow-hidden px-5 text-center"
      >
        <AddConnectionButton id={row.original.id.toString()} />
      </div>
    ),
    meta: {
      filterVariant: "text",
      name: "Actions",
    },
    size: 200,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: "options",
    header: () => (
      <div className="flex items-center justify-start h-[64px] w-[64px]">
        <CiViewColumn />
      </div>
    ),
    cell: ({ row }) => (
      <div className="">
        <Popover>
          <PopoverTrigger
            className={`${row.original.isArchived ? "cursor-not-allowed" : "cursor-pointer"}`}
            asChild
            disabled={row.original.isArchived}
          >
            <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
              <BsThreeDotsVertical />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 p-0 rounded-zeak">
            <IntegrationActionOptions
              integrationId={row.original.id}
              component="listing"
              integrationType={row.original.integrationType}
            />
          </PopoverContent>
        </Popover>
      </div>
    ),
    size: 64,
    meta: {
      name: "Actions",
    },
    enableSorting: true,
    enableHiding: false,
    enableResizing: false,
    enableGlobalFilter: false,
    enablePinning: true,
    enableColumnFilter: false,
  },
];
