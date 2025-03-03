import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "@remix-run/react";
import {
  Avatar,
  Badge,
  HStack,
  MenuItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Hyperlink, Table } from "~/components";
import { path } from "~/utils/path";
import moment from "moment";
import { EditIcon } from "@zeak/icons";
import type { AppNotification } from "~/routes/x+/notifications+/_types";

type DepartmentTypeTableProps = {
  data: Array<AppNotification>;
  count: number;
};

const NotificationsTable = memo(({ data, count }: DepartmentTypeTableProps) => {
  const navigate = useNavigate();
  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Notification Name",
        cell: ({ row }) => (
          <HStack>
            <Avatar size="sm" name={row?.original?.name ?? undefined} />

            <Hyperlink
              to={``}
              className="text-accent-primary"
            >{`${row?.original?.name}`}</Hyperlink>
          </HStack>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (item) => (
          <Badge
            variant={
              (item.getValue() as string) === "active" ? "green" : "gray"
            }
            className="uppercase"
          >
            {item.getValue() as string}
          </Badge>
        ),
      },
      {
        accessorKey: "type",
        header: "Trigger",
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
      },
      {
        accessorKey: "audience",
        header: "Reciepient",
        cell: (item) => (
          <p className="truncate max-w-[200px]">
            {item.getValue() !== "all" ? "-" : "All"}
          </p>
        ),
      },
      {
        accessorKey: "createdOn",
        header: "Created",
        cell: (item) => moment(`${item.getValue()}`).format("DD MM, YYYY"),
      },
    ];
  }, []);

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            className="px-4"
            onClick={() => {
              navigate(path.to.notificationEditDetails(row.id));
            }}
          >
            <EditIcon /> <span className="ms-4">Edit</span>
          </MenuItem>
        </>
      );
    },
    [navigate],
  );

  return (
    <>
      <Table<(typeof data)[number]>
        data={data}
        columns={columns}
        count={count}
        withSearch={false}
        withColumnOrdering={false}
        withSimpleSorting={false}
        withColumnResizing={true}
        renderContextMenu={renderContextMenu}
        withSelectableRows
      />
    </>
  );
});

NotificationsTable.displayName = "NotificationsTable";
export default NotificationsTable;
