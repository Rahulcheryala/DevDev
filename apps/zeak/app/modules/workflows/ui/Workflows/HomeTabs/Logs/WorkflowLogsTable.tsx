import {
  Enumerable,
  MenuIcon,
  MenuItem,
  SideBar,
  useDisclosure,
} from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { WebShare, WebSearch } from "@zeak/icons";
import { DebouncedInput } from "~/components/Search";
import { Hr } from "@react-email/components";
import { LogsTableIdWindow } from "./LogsTableIdWindow";

type WorkflowsTableProps = {
  data: any;
  count: number;
};

const WorkFlowLogsTable = memo(({ data, count }: WorkflowsTableProps) => {
  // const permissions = usePermissions();
  const [selectedWorkflow, setSelectedWorkflow] = useState<any | null>(null);
  const closeWorkflowModal = useDisclosure();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  const onRunIdCellClick = useCallback((rowData: Record<string, any>) => {
    setSelectedRunId(rowData.runId);
    setIsOpenDetails(true);
  }, []);

  const [specificRow, setSpecificRow] = useState<any>({});

  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        accessorKey: "runId",
        header: "Run ID",
        cell: (item) => (
          <span
            onClick={() => {
              onRunIdCellClick(item.row.original);
              setSpecificRow(item.row.original);
              // onSelectedCellChange({ row, column });
              console.log(item);
            }}
            style={{ cursor: "pointer" }}
          >
            {item.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "workflowName",
        header: "Workflow Name",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "environment",
        header: "Environment",
        cell: (item) => item.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (item) => <Enumerable value={item.getValue<string>()} />,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: (item) => item.getValue(),
      },
      // {
      //   accessorKey: "executionTime",
      //   header: "Execution time",
      //   cell: (item) => item.getValue(),
      // },
      {
        accessorKey: "createdOn",
        header: "Created on",
        cell: (item) => item.getValue(),
      },
    ];
  }, [onRunIdCellClick]);

  const RenderContextMenu = useMemo(
    // eslint-disable-next-line react/display-name
    () => (row: any) => (
      <>
        <MenuItem
          onClick={() => {
            setSelectedRunId(row.runId);
            setIsOpenDetails(true);
          }}
          className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
        >
          <MenuIcon icon={<WebShare />} />
          View Logs
        </MenuItem>
        {/* <MenuItem
          // onClick={() => navigate(path.to.workflowsEdit(row.id))}
          className="[&>svg]:h-auto [&>svg]:w-auto [&>svg]:mr-0  p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
        >
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
        </MenuItem> */}
      </>
    ),
    [],
  );

  const defaultColumnVisibility = {
    runId: true,
    workflowName: true,
    environment: true,
    status: true,
    duration: true,
    // executionTime: true,
    createdOn: true,
  };

  const selectedDetails = useMemo(() => {
    return data.find(
      (item: Record<string, any>) => item.runId === selectedRunId,
    );
  }, [selectedRunId, data]);

  const resetDetails = () => {
    setIsOpenDetails(false);
    setSelectedRunId(null);
  };

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
        selectedSpecificRow={specificRow}
      />

      {selectedWorkflow && selectedWorkflow.id && (
        <ConfirmDelete
          isOpen={closeWorkflowModal.isOpen}
          name={selectedWorkflow.workflowName}
          text={`Are you sure you want to permanently delete ${selectedWorkflow.workflowName}?`}
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

      {isOpenDetails && (
        <SideBar
          title={`Run ID#${selectedDetails.runId}`}
          // CTA="Rerun Job"
          callback={resetDetails}
        >
          <Hr />
          <LogsTableIdWindow
            details={selectedDetails}
            totalRecords={selectedDetails.logs.totalRecords}
          />
        </SideBar>
      )}
    </>
  );
});

WorkFlowLogsTable.displayName = "WorkFlowLogsTable";

export default WorkFlowLogsTable;
