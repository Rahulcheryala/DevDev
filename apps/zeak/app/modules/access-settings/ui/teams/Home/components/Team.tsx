import { memo, useCallback, useMemo, useState } from "react";
import { usePermissions } from "~/hooks";
import { useNavigate, useRevalidator } from "@remix-run/react";
import {
  Button,
  MenuItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useDisclosure,
} from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Table, Avatar } from "~/components";
import { teamStatus, type TeamType } from "~/modules/access-settings";
import { path } from "~/utils/path";
import moment from "moment";
import { ConfirmDelete } from "~/components/Modals";
import axios from "axios";
import debounce from "lodash/debounce";
import { EditIcon, ProhibitedIcon, TrashIcon } from "@zeak/icons";
import { FaRegCopy } from "react-icons/fa";
import { formatStringArray } from "~/utils/helper";
import { useViewTableConfStore } from "~/stores";

type TeamTypeTableProps = {
  data: TeamType[];
  count: number;
};

const Team = memo(({ data, count }: TeamTypeTableProps) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const closeTeamModal = useDisclosure();
  const revalidator = useRevalidator();
  const [selectedTeams, setSelectedTeams] = useState<Array<TeamType>>([]);
  const [viewTableConf, setViewTableConf] = useViewTableConfStore();

  const memberList = (row: any) => {
    const list1 = row.original.teamMember?.slice(0, 3) || [];
    const list2 = row.original.teamMember?.slice(2 + 1) || [];
    return (
      <div className="flex -space-x-2 rtl:space-x-reverse justify-center">
        {list1?.map((member: any, index: number) => (
          <Avatar
            key={index}
            path={member.userId.avatarUrl}
            name={member.userId.fullName}
          />
        ))}
        {list2.length ? (
          <span className="flex items-center justify-center w-8 min-w-8 h-8 text-xs font-medium text-primary  border-2 border-[rgba(0,_0,_0,_0.06)] rounded-full bg-white text-[10px] leading-[12px]">
            +{list2.length}
          </span>
        ) : null}
      </div>
    );
  };

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
        cell: (item) => (
          <p className="text-[#0E77D3] truncate max-w-[200px]">
            {item.getValue() as any}
          </p>
        ),
        ...(viewTableConf?.colWidthInTableConf?.name && {
          size: viewTableConf?.colWidthInTableConf?.name,
        }),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (item) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="truncate max-w-[200px]">{item.getValue() as any}</p>
            </TooltipTrigger>
            <TooltipContent side="right">
              {<span>{item.getValue() as any}</span>}
            </TooltipContent>
          </Tooltip>
        ),
        ...(viewTableConf?.colWidthInTableConf?.description && {
          size: viewTableConf?.colWidthInTableConf?.description,
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (item) => item.getValue(),
        meta: {
          getCellContext: (context: any) => {
            return {
              className:
                context.getValue() === "Active"
                  ? `bg-[rgba(4,_167,_119,_0.2)] text-center text-[#04A777]`
                  : `bg-[rgba(0,_0,_0,_0.06)] text-center text-[#5E626D]`,
            };
          },
        },
        ...(viewTableConf?.colWidthInTableConf?.status && {
          size: viewTableConf?.colWidthInTableConf?.status,
        }),
      },
      {
        accessorKey: "members",
        header: "Members",
        cell: ({ row }) => memberList(row),
        ...(viewTableConf?.colWidthInTableConf?.members && {
          size: viewTableConf?.colWidthInTableConf?.members,
        }),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => <>{(row.original.companyId as any)?.name}</>,
        ...(viewTableConf?.colWidthInTableConf?.company && {
          size: viewTableConf?.colWidthInTableConf?.company,
        }),
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        cell: (item) =>
          moment(`${item.getValue()}`).format("DD.MM.YYYY h:mm A"),
        ...(viewTableConf?.colWidthInTableConf?.createdOn && {
          size: viewTableConf?.colWidthInTableConf?.createdOn,
        }),
      },
    ];
  }, [viewTableConf]);

  const createDuplicate = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("name", `${row.name}`);
      formData.append("description", `${row.description}`);
      formData.append("status", `${row.status}`);
      formData.append("companyId", `${row.companyId.id}`);

      await axios({
        method: "post",
        url: path.to.api.createDuplicateTeamById,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator],
  );

  const changeStatus = useCallback(
    async (row: any) => {
      const formData = new FormData();
      formData.append("id", `${row.id}`);
      formData.append(
        "status",
        `${row.status === teamStatus[0] ? teamStatus[1] : teamStatus[0]}`,
      );

      await axios({
        method: "post",
        url: path.to.api.changeStatusTeam,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidator.revalidate();
    },
    [revalidator],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  const onColumnResizing = useCallback(
    debounce((rowConf) => {
      if (rowConf && Object.keys(rowConf).length) {
        setViewTableConf(rowConf);
      }
    }, 200),
    [viewTableConf?.colWidthInTableConf],
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            className="px-4"
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              navigate(path.to.teamsEdit(row.id));
            }}
          >
            <EditIcon /> <span className="ms-4">Edit Team</span>
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
              {row.status === teamStatus[0] ? "Disable" : "Enable"} Team
            </span>
          </MenuItem>
          <MenuItem
            className="px-4"
            disabled={!permissions.can("update", "users")}
            onClick={() => {
              createDuplicate(row);
            }}
          >
            <FaRegCopy size={18} /> <span className="ms-4">Duplicate Team</span>
          </MenuItem>
          <MenuItem
            className="px-4 text-[#D11149]"
            disabled={!permissions.can("delete", "users")}
            onClick={() => {
              setSelectedTeams([row]);
              closeTeamModal.onOpen();
            }}
          >
            <TrashIcon color="#D11149" />{" "}
            <span className="ms-4">Delete Team</span>
          </MenuItem>
        </>
      );
    },
    [navigate, permissions, closeTeamModal, changeStatus, createDuplicate],
  );

  const onSelectedRowsChange = useCallback((elements: typeof data) => {
    setSelectedTeams(elements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHeaderIconClick = useCallback(() => {
    if (selectedTeams && selectedTeams.length) {
      closeTeamModal.onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeams]);

  const headerIcons = useMemo(() => {
    return (
      <Button variant="ghost" className="px-2" onClick={onHeaderIconClick}>
        <TrashIcon color="#D11149" />
      </Button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onHeaderIconClick]);

  return (
    <>
      <Table<(typeof data)[number]>
        headerIcons={headerIcons}
        data={data}
        columns={columns}
        count={count}
        withSearch={true}
        withColumnOrdering={false}
        withSimpleSorting={false}
        withColumnResizing={true}
        onColumnResizing={onColumnResizing}
        renderContextMenu={renderContextMenu}
        onSelectedRowsChange={onSelectedRowsChange}
        withSelectableRows
      />

      {selectedTeams && selectedTeams.length ? (
        <ConfirmDelete
          action={path.to.teamsDelete(
            selectedTeams.map((c) => c.id).join() as string,
          )}
          isOpen={closeTeamModal.isOpen}
          name={formatStringArray(
            (selectedTeams || []).map((c) => c.name) as Array<string>,
          )}
          text={`Are you sure you want to permanently delete ${formatStringArray(
            (selectedTeams || []).map((c) => c.name) as Array<string>,
          )}?`}
          onCancel={() => {
            closeTeamModal.onClose();
            setSelectedTeams([]);
          }}
          onSubmit={() => {
            closeTeamModal.onClose();
            setSelectedTeams([]);
          }}
        />
      ) : null}
    </>
  );
});

Team.displayName = "Team";
export default Team;
