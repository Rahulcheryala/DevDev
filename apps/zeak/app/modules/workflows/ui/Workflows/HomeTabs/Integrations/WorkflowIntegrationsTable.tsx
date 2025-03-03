import { Enumerable, MenuIcon, MenuItem, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import debounce from "lodash/debounce";
import { WebSearch, WebShare, WebTrashcan } from "@zeak/icons";
import { CiEdit } from "react-icons/ci";
import { DebouncedInput } from "~/components/Search";

type WorkflowsTableProps = {
  data: any;
  count: number;
};

const WorkflowIntegrationsTable = memo(
  ({ data, count }: WorkflowsTableProps) => {
    const permissions = usePermissions();
    // const navigate = useNavigate();
    const [selectedWorkflow, setSelectedWorkflow] = useState<any | null>(null);
    const closeWorkflowModal = useDisclosure();

    const columns = useMemo<ColumnDef<any>[]>(() => {
      return [
        {
          accessorKey: "name",
          header: "Name",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "integrationType",
          header: "Integration Type",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "url",
          header: "URL",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "lastRun",
          header: "Last ran",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "createdOn",
          header: "Created on",
          cell: (item) => item.getValue(),
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
        },
      ];
    }, []);

    const RenderContextMenu = useMemo(() => {
      const ContextMenu = (row: any) => (
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
      );
      ContextMenu.displayName = "ContextMenu";
      return ContextMenu;
    }, [closeWorkflowModal, permissions]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onColumnResizing = useCallback(
      debounce((rowConf) => {
        if (rowConf && Object.keys(rowConf).length) {
          // setWorkflows(rowConf); // Update to correct store hook
        }
      }, 200),
      [],
    );

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
          withPagination
          renderContextMenu={RenderContextMenu}
          onColumnResizing={onColumnResizing}
          withSelectableRows
          withSearch={false}
          withSimpleSorting={false}
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
  },
);

WorkflowIntegrationsTable.displayName = "WorkflowIntegrationsTable";

export default WorkflowIntegrationsTable;
