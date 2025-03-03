import { Enumerable, MenuIcon, MenuItem, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { WebSearch, WebShare, WebTrashcan } from "@zeak/icons";
import { CiEdit } from "react-icons/ci";
import { DebouncedInput } from "~/components/Search";

type WorkflowsTableProps = {
  data: any;
  count: number;
};

const WorkFlowRulesTable = memo(({ data, count }: WorkflowsTableProps) => {
  const permissions = usePermissions();
  // const [workflows, setWorkflows] = useWorkflowsStore();
  const [selectedWorkflow, setSelectedWorkflow] = useState<any | null>(null);
  const closeWorkflowModal = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelectedDetails] = useState<Record<string, any>>({});

  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "id",
        header: "ID",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "triggerType",
        header: "Trigger Type",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: (item) => <Enumerable value={item.getValue<string>()} />,
      },
      {
        accessorKey: "createdBy",
        header: "Created by",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "createdOn",
        header: "Created on",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "lastRun",
        header: "Last ran",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (item) => <Enumerable value={item.getValue<string>()} />,
      },
    ];
  }, []);

  const RenderContextMenu = useMemo(
    // eslint-disable-next-line react/display-name
    () => (row: any) => (
      <>
        <MenuItem className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0">
          <MenuIcon icon={<WebShare />} />
          View Workflow
        </MenuItem>
        <MenuItem className="[&>svg]:h-auto [&>svg]:w-auto [&>svg]:mr-0  p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0">
          <MenuIcon icon={<CiEdit size={22} />} />
          Edit
        </MenuItem>
        <MenuItem
          disabled={!permissions.can("delete", "workflows")}
          onClick={() => {
            setSelectedWorkflow(row);
            closeWorkflowModal.onOpen();
          }}
          className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
        >
          <MenuIcon icon={<WebTrashcan />} />
          Delete
        </MenuItem>
      </>
    ),
    [closeWorkflowModal, permissions],
  );

  const defaultColumnVisibility = {
    runId: true,
    description: true,
    environment: true,
    status: true,
    started: true,
    duration: true,
    executionTime: true,
    createdOn: true,
  };

  const onRowClick = useCallback((row: Record<string, any>) => {
    if (!Object.keys(row)?.length) return setSelectedDetails({});
    return setSelectedDetails(row);
  }, []);

  return (
    <>
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
      <Table<any>
        count={count}
        columns={columns}
        data={data}
        defaultColumnVisibility={defaultColumnVisibility}
        withColumnOrdering
        withPagination
        renderContextMenu={RenderContextMenu}
        withSelectableRows
        withSearch={false}
        onRowClick={onRowClick}
      />

      {selectedWorkflow && selectedWorkflow.id && (
        <ConfirmDelete
          isOpen={closeWorkflowModal.isOpen}
          name={selectedWorkflow.description}
          text={`Are you sure you want to permanently delete ${selectedWorkflow.description}?`}
          onCancel={() => {
            closeWorkflowModal.onClose();
            setSelectedWorkflow(null);
          }}
          onSubmit={() => {
            closeWorkflowModal.onClose();
            setSelectedWorkflow(null);
          }}
        />
      )}
    </>
  );
});

WorkFlowRulesTable.displayName = "WorkFlowRulesTable";

export default WorkFlowRulesTable;
