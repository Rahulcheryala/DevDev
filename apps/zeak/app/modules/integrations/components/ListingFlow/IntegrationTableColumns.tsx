import { memo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cn, Popup, ActionButtonProps, RadioCheckbox, toast } from "@zeak/ui";
import {
  NameTableCell,
  DateTableCell,
  RowDragHandleCell,
} from "@zeak/datatable";
import { useUnifiedContext } from "../../context";
import { refreshIntegrationsAction } from "../../context/action";
import { useIntegrationActions } from "../misc/IntegrationActionOptions";
import ConnectionsPill from "../misc/ConnectionsPill";
import { updateIntegrationFn } from "../../utils/api.utils";
import { safeReplace } from "../../utils/utils";
import { IntegrationForm } from "../../models/integration-form.model";
// icons
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

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
      className="w-full text-blue-500 font-semibold text-sm flex justify-center items-center gap-1.5"
      onClick={onClickHandler}
    >
      <FiPlus className="w-5 h-5" />
      Connection
    </button>
  );
};

export const FavoriteToggle = ({ integration }: { integration: any }) => {
  const { dispatch } = useUnifiedContext();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const newFavoriteStatus = !integration.isFavorite;
      const response = await updateIntegrationFn(integration.id, {
        isFavorite: newFavoriteStatus,
      } as Partial<IntegrationForm>);

      if (response) {
        const actualStatus = response.isFavorite;
        toast.success(
          "SUCCESS",
          `${integration.integrationName} ${actualStatus ? "added to" : "removed from"} favorites`,
          {
            variant: "small",
          }
        );

        await refreshIntegrationsAction({}, dispatch);
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(
        "Error!",
        `Failed to update favorite status: ${errorMessage}`
      );
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
        <FaRegHeart
          className="cursor-pointer text-secondary"
          onClick={handleToggleFavorite}
        />
      )}
    </div>
  );
};

const CompanyNames = ({
  companyIds,
  columnSize,
}: {
  companyIds: string[];
  columnSize: number;
}) => {
  const {
    state: { companies },
  } = useUnifiedContext();

  const companyNames = companies
    .filter((company) => companyIds.includes(company.id))
    .map((company) => company.name);

  return (
    <div style={{ width: columnSize }} className="px-5 relative">
      <div className="w-[90%] truncate text-left text-sm">
        {companyNames.join(", ") || "N/A"}
      </div>
      {companyIds.length > 0 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-xs">
          {companyIds.length}
        </div>
      )}
    </div>
  );
};

// Create a memoized cell component to avoid re-renders and multiple hook calls
const OptionsCell = memo(
  ({
    id,
    integrationType,
    status,
  }: {
    id: string;
    integrationType: "System" | "User Defined";
    status: any;
  }) => {
    // Now the hook is called only once per unique row and will only re-render when props change
    const actionButtons = useIntegrationActions(id, integrationType, status);

    // Trigger button for the popup
    const triggerButton = (
      <button className="flex items-center justify-between gap-3 py-3 px-6 text-secondary text-sm">
        <BsThreeDotsVertical />
      </button>
    );

    return (
      <Popup
        trigger={triggerButton}
        buttons={actionButtons as ActionButtonProps[]}
        align="end"
      />
    );
  }
);

export const IntegrationTableColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pl-5 h-full">
        <RadioCheckbox
          className={cn("rounded-full border-none bg-gray-200 w-4 h-4", {
            "bg-[#FFDF41] border-none": table.getIsAllPageRowsSelected(),
          })}
          isChecked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
          showIndicator={false}
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
          <RadioCheckbox
            className={cn("rounded-full border-none bg-gray-200 w-4 h-4", {
              "bg-white border-none": row.getIsSelected(),
            })}
            isChecked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
            showIndicator={false}
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
      <NameTableCell
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
    cell: ({ row, column }) => (
      <div style={{ width: column.getSize() }}>
        <FavoriteToggle integration={row.original} />
      </div>
    ),
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
        className="truncate text-sm px-5 text-left"
      >
        {safeReplace(row.original.integrationCategory)}
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
        className="truncate text-sm text-left"
      >
        <DateTableCell
          date={row.original.updatedAt || row.original.createdAt}
          timeZone="America/Chicago"
        />
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
      <CompanyNames
        companyIds={row.original.companyIds}
        columnSize={column.getSize()}
      />
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
      <OptionsCell
        id={row.original.id.toString()}
        integrationType={row.original.integrationType}
        status={row.original.status}
      />
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
