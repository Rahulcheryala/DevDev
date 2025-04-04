import { Enumerable, MenuIcon, MenuItem, useDisclosure } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { WebSearch, WebShare, WebTrashcan } from "@zeak/icons";
import { CiEdit } from "react-icons/ci";
import { DebouncedInput } from "~/components/Search";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import LoadingSpinner from "../../../LoadingSpinner";
import DurationProgress from "../../../DurationProgress";
import { axiosApiCall } from "~/utils/helper";
import { path } from "~/utils/path";

type WorkflowsTableProps = {
  data: any;
  count: number;
};

const WorkflowAutomationsTable = memo(
  ({ data, count }: WorkflowsTableProps) => {
    const permissions = usePermissions();
    const [selectedWorkflow, setSelectedWorkflow] = useState<any | null>(null);
    const closeWorkflowModal = useDisclosure();
    const [loading, setLoading] = useState<string | null>(null); // Track loading state for each task
    const [taskDurations, setTaskDurations] = useState<Record<string, number>>(
      {},
    );
    // Trigger task via API call to Trigger.dev
    const triggerTask = useCallback(async (taskId: string) => {
      setLoading(taskId); // Set the loading state for the specific task
      console.log("Loading for task:", taskId);
      const startTime = Date.now(); // Record start time

      try {
        if (taskId === "fetch-sales-orders") {
          await axiosApiCall("POST", path.to.api.salesOrderCreate, {});
        } else {
          const response = await fetch(`http://20.244.89.105:3050/trigger-task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId }),
          });

          if (!response.ok) {
            throw new Error("Failed to trigger task");
          }
        }

        const duration = (Date.now() - startTime) / 1000; // Calculate duration in seconds
        setTaskDurations((prev) => ({ ...prev, [taskId]: duration })); // Update duration state
        console.log("Task triggered and completed successfully:", data);
      } catch (error) {
        console.error("Error triggering task:", error);
      } finally {
        setLoading(null); // Clear the loading state after task completion
      }
    }, [data]);

    const stopTask = async (taskId: string) => {
      if (taskId === "fetch-sales-orders") {
        await axiosApiCall("POST", path.to.api.salesOrderDelete, {});
      } else {
        const response = await fetch(`http://localhost:3050/stop-task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId }),
        });

        if (!response.ok) {
          throw new Error("Failed to trigger task");
        }
      }
    };

    const columns = useMemo<ColumnDef<any>[]>(() => {
      return [
        {
          accessorKey: "play",
          header: "Run Workflow", // Empty header for the button column
          cell: ({ row }) => (
            <div className="flex items-center justify-center">
              <button
                className="flex flex-row gap-1 items-center align-middle justify-center text-white text-base bg-green-700/95 hover:bg-green-900/95 px-4 py-2 rounded-lg transition-transform duration-300"
                onClick={() => triggerTask(row.original.id)} // Trigger task on click
                disabled={loading === row.original.id} // Disable button while loading
              >
                <p>Run</p>
                {loading === row.original.id ? (
                  <LoadingSpinner size={4} />
                ) : (
                  <FaPlayCircle />
                )}
              </button>
            </div>
          ),
        },
        {
          accessorKey: "stop",
          header: "Stop Workflow", // Empty header for the button column
          cell: ({ row }) => (
            <div className="flex items-center justify-center">
              <button
                className="flex flex-row gap-1 items-center align-middle justify-center text-white text-base bg-rose-700/95 hover:bg-green-900/95 px-4 py-2 rounded-lg transition-transform duration-300"
                onClick={() => stopTask(row.original.id)} // Trigger task on click
              // disabled={loading !== row.original.id} // Disable button while loading
              >
                <p>Stop</p>
                <FaStopCircle />
              </button>
            </div>
          ),
        },
        {
          accessorKey: "duration",
          header: "Duration",
          cell: ({ row }) => {
            const taskId = row.original.id;
            const duration = taskDurations[taskId];

            if (!duration) return null; // Don't display anything if there's no duration

            return <DurationProgress duration={duration} />;
          },
        },
        {
          accessorKey: "name",
          header: "Name",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {item.getValue() as string}
            </div>
          ),
        },
        {
          accessorKey: "id",
          header: "ID",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {item.getValue() as string}
            </div>
          ),
        },
        {
          accessorKey: "noOfRuns",
          header: "No of Runs",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {item.getValue() as string}
            </div>
          ),
        },
        {
          accessorKey: "description",
          header: "Description",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {item.getValue() as string}
            </div>
          ),
        },
        // {
        //   accessorKey: "triggerType",
        //   header: "Trigger Type",
        //   cell: (item) => item.getValue(),
        // },
        {
          accessorKey: "priority",
          header: "Priority",
          cell: (item) => (
            <div className="flex items-center justify-center">
              <Enumerable value={item.getValue<string>()} />
            </div>
          ),
        },
        {
          accessorKey: "createdBy",
          header: "Created by",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {" "}
              {item.getValue() as string}
            </div>
          ),
        },
        {
          accessorKey: "createdOn",
          header: "Created on",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {item.getValue() as string}
            </div>
          ),
        },
        {
          accessorKey: "lastRun",
          header: "Last Run",
          cell: (item) => (
            <div className="flex items-center justify-center">
              {item.getValue() as string}
            </div>
          ),
        },

        {
          accessorKey: "isActive",
          header: "Active or Not",
          cell: (item) => {
            return item.getValue() === true ? (
              <div className="flex items-center justify-center">
                <Enumerable value="Active" className="justify-center" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Enumerable value="Inactive" className="justify-center" />
              </div>
            );
          },
        },
        // {
        //   accessorKey: "status",
        //   header: "Status",
        //   cell: (item) => <Enumerable value={item.getValue<string>()} />,
        // },
      ];
    }, [loading, taskDurations, triggerTask]);

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
          <MenuItem
            onClick={() => triggerTask("fetch-sales-order")}
            className="p-[16px] gap-4 text-xs leading-[13px] tracking-wider text-accent font-light font-sans hover:bg-dropdownHoverBg focus:bg-dropdownHoverBg rounded-none focus:text-accent border-b border-stroke last:border-b-0"
          >
            <MenuIcon icon={<WebTrashcan />} />
            Trigger
          </MenuItem>
        </>
      );
      ContextMenu.displayName = "ContextMenu";
      return ContextMenu;
    }, [closeWorkflowModal, permissions, triggerTask]);

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
          withSelectableRows
          withSearch={false}
          withSimpleSorting={false}
        />

        {selectedWorkflow && selectedWorkflow.id && (
          <ConfirmDelete
            // action={path.to.workflowsDelete(selectedWorkflow.id)}
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

WorkflowAutomationsTable.displayName = "WorkflowAutomationsTable";

export default WorkflowAutomationsTable;
