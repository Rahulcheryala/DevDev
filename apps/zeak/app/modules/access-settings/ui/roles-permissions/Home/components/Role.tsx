import { memo, useCallback, useMemo } from "react";
import { usePermissions } from "~/hooks";
import { useNavigate, useRevalidator } from "@remix-run/react";
import { MenuIcon, MenuItem } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "~/components";
import type { EmployeeType } from "~/modules/access-settings";
import axios from "axios";
import { path } from "~/utils/path";
import { WebDisable, WebDuplicate, WebEye, WebTrashcan } from "@zeak/icons";
import { CiEdit } from "react-icons/ci";

type EmployeeTypesTableProps = {
  data: EmployeeType[];
  count: number;
};

const Role = memo(({ data, count }: EmployeeTypesTableProps) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const revalidator = useRevalidator();

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Role Name",
        cell: ({ row, getValue }) =>
          row.original.protected ? (
            <span className="cursor-not-allowed">{row.original.name}</span>
          ) : (
            <span
              onClick={() => navigate(row.original.id)}
              className="cursor-pointer"
            >
              {row.original.name}
            </span>
          ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "associatedUsers",
        header: "Associated Users",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "module",
        header: "Module",
        cell: (item) => item.getValue(),
      },
    ];
  }, [navigate]);

  const createDuplicate = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("name", `${row.name}`);
      formData.append("description", `${row.description}`);
      formData.append("disable", `${row.disable}`);

      await axios({
        method: "post",
        url: path.to.api.createDuplicateRoleById,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator],
  );

  const diableRole = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("id", `${row.id}`);
      formData.append("disable", `${!row.disable}`);

      await axios({
        method: "post",
        url: path.to.api.disableRoleById,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator],
  );

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("create", "users")}
            onClick={() => {
              createDuplicate(row);
            }}
            className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
          >
            <MenuIcon icon={<WebDuplicate />} />
            Duplicate
          </MenuItem>
          <MenuItem
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              diableRole(row);
            }}
            className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
          >
            <MenuIcon icon={<WebDisable />} />
            {row.disable ? "Enable" : "Disable"}
          </MenuItem>
          {row.type !== "Default" && (
            <>
              <MenuItem
                disabled={!permissions.can("update", "users")}
                onClick={() => {
                  navigate(path.to.rolesPermissionsEdit(row.id));
                }}
                className="[&>svg]:h-auto [&>svg]:w-auto [&>svg]:mr-0  p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
              >
                <CiEdit size={22} />
                Edit
              </MenuItem>
              <MenuItem
                disabled={!permissions.can("view", "users")}
                onClick={() => {
                  navigate(path.to.rolesPermissionsEdit(row.id));
                }}
                className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
              >
                <MenuIcon icon={<WebEye />} />
                View
              </MenuItem>
              <MenuItem
                disabled={!permissions.can("delete", "users")}
                onClick={() => {}}
                className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
              >
                <MenuIcon icon={<WebTrashcan />} />
                Delete
              </MenuItem>
            </>
          )}
        </>
      );
    },
    [navigate, permissions, createDuplicate, diableRole],
  );

  return (
    <>
      {/* <TableFilters className="p-0 py-0 mb-[4px] border-0 flex-wrap">
        <div className="flex gap-5 items-center flex-wrap">
          <Select
            size="md"
            // value={params.get("status") ?? ""}
            isClearable
            options={[
              { label: "My view 1", value: "view 1" },
              { label: "My view 2", value: "view 2" },
            ]}
            onChange={(selected) => {
              // setParams({ status: selected });
            }}
            aria-label="my-view"
            placeholder="My view"
            className="!h-[40px] rounded-md min-w-[163px] text-secondary"
          />
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2">
              <WebSearch color="#5E626D" />
            </span>
            <DebouncedInput
              param="search"
              size="sm"
              placeholder="Search"
              className="h-[40px] w-[300px] pl-[40px]"
            />
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <IconButton
            aria-label="reload"
            icon={<WebReload />}
            className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
          />
          <IconButton
            aria-label="upload"
            icon={<WebUpload />}
            className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
          />
          <IconButton
            aria-label="download"
            icon={<WebDownload />}
            className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
          />
          <IconButton
            aria-label="delete"
            icon={<WebTrashcan />}
            className="bg-transparent hover:bg-transparent text-accent shadow-none h-12 w-12"
          />
          <Button className="bg-transparent h-12 hover:bg-transparent text-accent shadow-none p-0 font-light flex items-center gap-2">
            <span className="flex flex-col text-accent">
              <span className="rotate-180 -mb-1">
                <WebAngleDown stroke="#19110B" />
              </span>
              <span className="-mt-1">
                <WebAngleDown stroke="#19110B" />
              </span>
            </span>
            <span>Sort by</span>
          </Button>
        </div>
      </TableFilters> */}

      <Table<(typeof data)[number]>
        data={data}
        columns={columns}
        count={count}
        withSearch={false}
        withColumnOrdering={false}
        withSimpleSorting={false}
        withColumnSorting={false}
        renderContextMenu={renderContextMenu}
        withSelectableRows
      />
    </>
  );
});

Role.displayName = "Role";
export default Role;
