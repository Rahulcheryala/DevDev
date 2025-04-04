import { Button, HStack, MenuItem, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { Avatar, Hyperlink, Table } from "~/components";
import { path } from "~/utils/path";
import { usePermissions } from "~/hooks";
import { ConfirmDelete } from "~/components/Modals";
import { TrashIcon } from "@zeak/icons";
import { axiosApiCall, formatStringArray } from "~/utils/helper";
import { useRevalidator } from "@remix-run/react";
import { type DepartmentMember } from "~/modules/access-settings/types";

type DepartmentUsersTableProps = {
  data: Array<DepartmentMember>;
  count: number;
  departmentId: string;
};

const DepartmentUsersTable = memo(
  ({ data, count, departmentId }: DepartmentUsersTableProps) => {
    const permissions = usePermissions();
    const revalidator = useRevalidator();
    const closeDepartmentModal = useDisclosure();
    const [selectedDepartmentMembers, setSelectedDepartmentMembers] = useState<
      Array<DepartmentMember>
    >([]);

    const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
      return [
        {
          header: "Name",
          cell: ({ row }) => (
            <HStack>
              <Avatar
                size="sm"
                name={row.original?.userDetails?.fullName ?? undefined}
                path={row.original?.userDetails?.avatarUrl ?? undefined}
              />

              <Hyperlink
                to={``}
              >{`${row.original?.userDetails?.fullName}`}</Hyperlink>
            </HStack>
          ),
        },
        {
          accessorKey: "email",
          header: "Email",
          cell: ({ row }) => <>{`${row.original?.userDetails?.email}`}</>,
        },
        {
          accessorKey: "companyId",
          header: "Company",
          cell: ({ row }) => <>{`${row.original?.company?.name}`}</>,
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({ row }) => <>{`${row.original.status}`}</>,
        },
      ];
    }, []);

    const removeUserFromDepartment = useCallback(
      async (ids: string) => {
        const formData = new FormData();
        formData.append("ids", ids!);
        formData.append("departmentId", departmentId);

        const result = await axiosApiCall(
          "post",
          path.to.api.removeUserFromDepartment,
          formData,
        );
        if (result?.success) {
          revalidator.revalidate();
        }
      },
      [revalidator, departmentId],
    );

    const onSelectedRowsChange = useCallback((elements: typeof data) => {
      setSelectedDepartmentMembers(elements);
    }, []);

    const onHeaderIconClick = useCallback(() => {
      if (selectedDepartmentMembers && selectedDepartmentMembers.length) {
        closeDepartmentModal.onOpen();
      }
    }, [closeDepartmentModal, selectedDepartmentMembers]);

    const headerIcons = useMemo(() => {
      return (
        <Button
          variant="ghost"
          className="px-2 trash-btn"
          onClick={onHeaderIconClick}
        >
          <TrashIcon color="#D11149" />
        </Button>
      );
    }, [onHeaderIconClick]);

    const renderContextMenu = useCallback(
      (row: (typeof data)[number]) => {
        return (
          <>
            <MenuItem
              className="px-4 text-[#D11149]"
              disabled={!permissions.can("delete", "users")}
              onClick={() => {
                setSelectedDepartmentMembers([row]);
                closeDepartmentModal.onOpen();
              }}
            >
              <TrashIcon color="#D11149" /> <span className="ms-4">Delete</span>
            </MenuItem>
          </>
        );
      },
      [permissions, closeDepartmentModal],
    );

    return (
      <>
        <Table<(typeof data)[number]>
          headerIcons={headerIcons}
          count={count}
          columns={columns}
          data={data}
          withColumnOrdering={false}
          withSimpleSorting={false}
          withSearch={false}
          renderContextMenu={renderContextMenu}
          onSelectedRowsChange={onSelectedRowsChange}
          withSelectableRows
        />

        {selectedDepartmentMembers && selectedDepartmentMembers.length ? (
          <ConfirmDelete
            isOpen={closeDepartmentModal.isOpen}
            name={formatStringArray(
              (selectedDepartmentMembers || []).map(
                (c) => c?.userDetails?.fullName,
              ) as Array<string>,
            )}
            text={`Are you sure you want to permanently delete ${formatStringArray(
              (selectedDepartmentMembers || []).map(
                (c) => c?.userDetails?.fullName,
              ) as Array<string>,
            )}?`}
            onCancel={() => {
              closeDepartmentModal.onClose();
              setSelectedDepartmentMembers([]);
            }}
            onSubmit={(e: any) => {
              e.preventDefault();
              removeUserFromDepartment(
                selectedDepartmentMembers.map((el: any) => el.id).join(),
              );
              closeDepartmentModal.onClose();
              setSelectedDepartmentMembers([]);
            }}
          />
        ) : null}
      </>
    );
  },
);

DepartmentUsersTable.displayName = "DepartmentUsersTable";

export default DepartmentUsersTable;
