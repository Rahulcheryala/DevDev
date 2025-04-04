import { Button, HStack, MenuItem, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { Avatar, Hyperlink, Table } from "~/components";
import { path } from "~/utils/path";
import { usePermissions } from "~/hooks";
import { ConfirmDelete } from "~/components/Modals";
import axios from "axios";
import { useRevalidator } from "@remix-run/react";
import { TrashIcon } from "@zeak/icons";
import { formatStringArray } from "~/utils/helper";

type TeamUsersTableProps = {
  data: any;
  count: number;
};

const TeamUsersTable = memo(({ data, count }: TeamUsersTableProps) => {
  const permissions = usePermissions();
  const closeTeamModal = useDisclosure();
  const revalidator = useRevalidator();
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<
    { userId: { fullName: string } }[]
  >([]);

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        header: "Name",
        cell: ({ row }) => (
          <HStack>
            <Avatar
              size="sm"
              name={row.original.userId.fullName ?? undefined}
              path={row.original.avatarUrl ?? undefined}
            />

            <Hyperlink to={``}>{`${row.original.userId.fullName}`}</Hyperlink>
          </HStack>
        ),
      },
      {
        accessorKey: "employee.employeeType.name",
        header: "Role",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <>{`${row.original.userId.email}`}</>,
      },
      {
        accessorKey: "companyId",
        header: "Company",
        cell: ({ row }) => <>{`${row.original.companyId.name}`}</>,
      },
    ];
  }, []);

  const removeUserFromTeam = useCallback(
    async (ids: string) => {
      const formData = new FormData();
      formData.append("ids", ids);

      await axios({
        method: "post",
        url: path.to.api.removeUserFromTeam,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      revalidator.revalidate();
    },
    [revalidator],
  );

  const onSelectedRowsChange = useCallback((elements: typeof data) => {
    setSelectedTeamMembers(elements);
  }, []);

  const onHeaderIconClick = useCallback(() => {
    if (selectedTeamMembers && selectedTeamMembers.length) {
      // TODO BULK Delete
      closeTeamModal.onOpen();
    }
  }, [closeTeamModal, selectedTeamMembers]);

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
              setSelectedTeamMembers([row]);
              closeTeamModal.onOpen();
            }}
          >
            <TrashIcon color="#D11149" /> <span className="ms-4">Remove</span>
          </MenuItem>
        </>
      );
    },
    [permissions, closeTeamModal],
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

      {selectedTeamMembers && selectedTeamMembers.length ? (
        <ConfirmDelete
          isOpen={closeTeamModal.isOpen}
          name={formatStringArray(
            (selectedTeamMembers || []).map(
              (c) => c.userId.fullName,
            ) as Array<string>,
          )}
          text={`Are you sure you want to permanently delete ${formatStringArray(
            (selectedTeamMembers || []).map(
              (c) => c.userId.fullName,
            ) as Array<string>,
          )}?`}
          onCancel={() => {
            closeTeamModal.onClose();
            setSelectedTeamMembers([]);
          }}
          onSubmit={() => {
            removeUserFromTeam(
              selectedTeamMembers.map((el: any) => el.id).join(),
            );
            closeTeamModal.onClose();
            setSelectedTeamMembers([]);
          }}
        />
      ) : null}
    </>
  );
});

TeamUsersTable.displayName = "TeamUsersTable";

export default TeamUsersTable;
