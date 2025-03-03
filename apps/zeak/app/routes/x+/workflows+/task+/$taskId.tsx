import { useLoaderData, useSearchParams, useNavigate } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@zeak/react";
import {
  PlayCircle,
  StopCircle,
  Clock,
  Zap,
  AlertCircle,
  Pencil,
  Loader2,
} from "lucide-react";
import { getAllTasks } from "src/taskRegistry";
import { axiosApiCall } from "~/utils/helper";
import { path } from "~/utils/path";
import { WorkflowSetupModal } from "~/components/WorkflowSetupModal/index";
import { toast } from "sonner";
import {
  LuAlertCircle,
  LuTable,
  LuChevronRight,
  LuRotateCcw,
  LuLoader2,
} from "react-icons/lu";
import { DataTableModal } from "~/components/DataTableModal/index";
import { WorkflowTimeline } from "~/components/WorkflowTimeline";
import { CustomTimeline } from "~/components/CustomTimeline";
import { SalesOrderSyncWorkflow } from "~/modules/workflows/salesOrderSync/index";
import { activateSchedule } from "~/modules/workflows/salesOrderSync/scheduler";
import { useRealtime } from "~/hooks/useRealtime";
import { useSupabase } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ params }) => {
  const tasks = getAllTasks();
  const task = tasks.find((t) => t.id === params.taskId);

  console.log("Task details loader:", task);
  if (!task) {
    throw new Response("Task not found", { status: 404 });
  }

  return json({ task });
};

export default function TaskDetails() {
  const [searchParams] = useSearchParams();
  const { task } = useLoaderData<{ task: any }>();
  const [loading, setLoading] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [integrationId, setIntegrationId] = useState<string | undefined>();
  const [currentStep, setCurrentStep] = useState<
    "integration" | "frequency" | "mapping" | "notification"
  >("integration");
  const [initialStep, setInitialStep] = useState<
    "integration" | "frequency" | "mapping" | "notification"
  >("integration");
  const [hasTableData, setHasTableData] = useState(false);
  const [showDataTableModal, setShowDataTableModal] = useState(false);
  const navigate = useNavigate();
  const [isConfigComplete, setIsConfigComplete] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState({
    integration: false,
    mapping: false,
    frequency: false,
    notification: false,
  });
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { supabase } = useSupabase();
  const [isScheduleActive, setIsScheduleActive] = useState(false);

  useEffect(() => {
    const modal = searchParams.get("modal");
    const step = searchParams.get("step");

    if (modal === "workflow-setup") {
      setShowSetupModal(true);
      if (step) {
        setIsManualNavigation(true);
        setCurrentStep(
          step as "frequency" | "mapping" | "notification" | "integration",
        );
        setInitialStep(
          step as "frequency" | "mapping" | "notification" | "integration",
        );
      } else {
        // Only fetch and set steps if not manually navigating
        fetch("/api/workflow-configuration-status")
          .then((res) => res.json())
          .then((status) => {
            if (status.nextStep) {
              setCurrentStep(status.nextStep);
              setInitialStep(status.nextStep);
            }
          });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchIntegrationStatus = async () => {
      try {
        const response = await fetch("/api/dynamics-integration-status");
        const status = await response.json();
        if (status.isIntegrated && status.integrationData?.id) {
          setIntegrationId(status.integrationData.id);
        }
      } catch (error) {
        console.error("Error fetching integration status:", error);
      }
    };

    fetchIntegrationStatus();
  }, []);

  useEffect(() => {
    const checkTableData = async () => {
      if (!integrationId) return;

      try {
        const response = await fetch(
          `/api/sales-orders-count?integrationId=${integrationId}`,
        );
        const data = await response.json();
        console.log("Table data count for integrationId:", integrationId, data);
        setHasTableData(data.count > 0);
      } catch (error) {
        console.error("Error checking table data:", error);
        setHasTableData(false);
      }
    };

    checkTableData();
  }, [integrationId]);

  useEffect(() => {
    const checkConfigStatus = async () => {
      try {
        const response = await fetch("/api/workflow-configuration-status");
        const data = await response.json();
        setIsConfigComplete(data.isComplete);
      } catch (error) {
        console.error("Error checking workflow status:", error);
      }
    };

    checkConfigStatus();
  }, []);

  useEffect(() => {
    const fetchWorkflowStatus = async () => {
      try {
        const response = await fetch("/api/workflow-configuration-status");
        const data = await response.json();
        setWorkflowSteps(data.steps);
      } catch (error) {
        console.error("Error fetching workflow status:", error);
      }
    };

    fetchWorkflowStatus();
  }, []);

  // Subscribe to notfQueue changes
  useRealtime("notfQueue", `notificationId=eq.${task.notificationId}`);

  // Listen for changes and show toast
  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel("workflow_notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notfQueue",
        },
        (payload) => {
          if (!payload.new?.webContent) return;

          toast.success("Workflow Notification", {
            description: payload.new.webContent,
          });
        },
      )
      .subscribe();

    console.log("🔍 Workflow Notification Subscribed");

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Poll for schedule status
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const checkScheduleStatus = async () => {
      try {
        const response = await fetch(
          path.to.api.checkScheduleStatus("fetch-sales-orders-us3"),
          { method: "GET" },
        );
        const data = await response.json();
        setIsScheduleActive(data.isActive);
      } catch (error) {
        console.error("Error checking schedule status:", error);
      }
    };

    // Initial check
    checkScheduleStatus();

    // Poll every 5 seconds
    pollInterval = setInterval(checkScheduleStatus, 5000);

    return () => clearInterval(pollInterval);
  }, [task.scheduleId]);

  const triggerTask = async () => {
    setLoading(true);
    try {
      if (task.id === "fetch-sales-orders") {
        await axiosApiCall("POST", path.to.api.salesOrderCreate, {});
      } else {
        const response = await fetch(`http://localhost:3050/trigger-task`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: task.id }),
        });
        if (!response.ok) throw new Error("Failed to trigger task");
      }
    } catch (error) {
      console.error("Error triggering task:", error);
    } finally {
      setLoading(false);
    }
  };

  const stopTask = async () => {
    try {
      if (task.id === "fetch-sales-orders" || task.id === "user-story-3") {
        await axiosApiCall("POST", path.to.api.salesOrderDelete, {});
      } else {
        const response = await fetch(`http://localhost:3050/stop-task`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: task.id }),
        });
        if (!response.ok) throw new Error("Failed to stop task");
      }
    } catch (error) {
      console.error("Error stopping task:", error);
    }
  };

  const handleConfigurationClick = async () => {
    try {
      const response = await fetch("/api/workflow-configuration-status");
      const status = await response.json();

      console.log("The Next Step is:", status.nextStep);

      if (status.isComplete) {
        let countdown = 5;
        toast.custom(
          (t) => (
            <div className="bg-background border p-4 rounded-lg shadow-lg">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Configuration Complete</h3>
                <div className="flex items-center gap-2 text-sm">
                  <p>
                    You may hit the{" "}
                    <PlayCircle className="inline h-4 w-4 text-green-500" />{" "}
                    button to run the workflow now!
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Closing in {countdown} seconds...
                </p>
              </div>
            </div>
          ),
          { duration: 5000 },
        );

        // Update countdown every second
        const timer = setInterval(() => {
          countdown--;
          if (countdown <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        // Open modal at the next incomplete step
        setInitialStep(status.nextStep || "integration");
        setCurrentStep(status.nextStep || "integration");
        setShowSetupModal(true);
        console.log("Next step:", status.nextStep);
      }
    } catch (error) {
      console.error("Error checking configuration status:", error);
      toast.error("Failed to verify workflow configuration");
    }
  };

  const handleTableClick = () => {
    if (hasTableData) {
      setShowDataTableModal(true);
    }
  };

  const handleTimelineStepClick = (
    stepId: "integration" | "frequency" | "mapping" | "notification",
  ) => {
    if (!integrationId)
      toast.error("Please complete the integration setup first");

    console.log("integrationId", integrationId);
    setIsManualNavigation(true);
    setCurrentStep(stepId);
    setInitialStep(stepId);
    setShowSetupModal(true);
  };

  const handleReset = async () => {
    try {
      // Start with all steps as their current values
      let updatedSteps = { ...workflowSteps };

      // Chain the promises sequentially and update state after each operation
      // 1. Delete schedule
      await fetch("/api/sales-orders/fetch/delete-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: "fetch-sales-orders" }),
      });
      updatedSteps = { ...updatedSteps, frequency: false };

      // 2. Delete column mappings if integrationId exists
      if (integrationId) {
        await fetch(
          `/api/delete-column-mapping?integrationId=${integrationId}`,
          {
            method: "DELETE",
          },
        );
        updatedSteps = { ...updatedSteps, mapping: false };
      }

      // 3. Delete notification settings
      await fetch("/api/delete-notification-setup", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Sales Order Sync Notification" }),
      });
      updatedSteps = { ...updatedSteps, notification: false };

      // Finally, update the state once with all changes
      setWorkflowSteps({
        integration: updatedSteps.integration, // Keep integration status
        mapping: false,
        frequency: false,
        notification: false,
      });
    } catch (error) {
      console.error("Error resetting workflow steps:", error);
      // Handle error appropriately
      toast.error("Failed to reset workflow steps");
    }
  };

  const handleResetClick = async () => {
    setIsResetting(true);
    try {
      await handleReset();
      toast.success("Workflow reset successfully");
      setIsConfigComplete(false);
    } catch (error) {
      console.error("Reset failed:", error);
    } finally {
      setIsResetting(false);
    }
  };

  const handlePlayClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(path.to.api.scheduleUserStory3(task.id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: "fetch-sales-orders-us3",
          action: "activate",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Schedule activated successfully");
      } else {
        throw new Error(result.error || "Failed to activate schedule");
      }
    } catch (error) {
      console.error("Failed to activate schedule:", error);
      toast.error("Failed to activate schedule", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{task.name}</CardTitle>
              <CardDescription>Task ID: {task.id}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline-primary"
                size="md"
                className="rounded-full px-4"
                onClick={handleConfigurationClick}
              >
                Configuration
              </Button>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-block">
                      <Button
                        variant="outline-primary"
                        size="md"
                        className={`w-12 h-12 ${!isConfigComplete ? "opacity-50" : ""}`}
                        onClick={handlePlayClick}
                        disabled={
                          loading || !isConfigComplete || isScheduleActive
                        }
                      >
                        {isScheduleActive ? (
                          <LuLoader2 className="h-6 w-6 animate-spin text-primary" />
                        ) : (
                          <PlayCircle
                            className={`h-6 w-6 ${
                              isConfigComplete
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                        )}
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    className="z-50 bg-black/90 text-white text-sm px-3 py-1.5 rounded border border-white/10"
                  >
                    {isScheduleActive ? (
                      <p>The Workflow is already running</p>
                    ) : !isConfigComplete ? (
                      <p>
                        Please complete the Workflow Configuration before
                        hitting play
                      </p>
                    ) : (
                      <p>Run workflow now</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="outline-primary"
                size="md"
                className="w-12 h-12"
                onClick={stopTask}
              >
                <StopCircle className="h-6 w-6 text-red-500" />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Pencil className="text-muted-foreground" size={100} />
                <div>
                  <p className="font-medium">Task Bio</p>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {task.scheduleId ? (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Zap className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">Workflow Type</p>
                  <p className="text-sm text-muted-foreground">
                    {task.scheduleId ? "Time Based" : "Event Based"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    task.priority.toLowerCase() === "high"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {task.priority} Priority
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status & Creator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium">Active Status</span>
                    <span className="text-sm text-muted-foreground">
                      {task.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <Switch checked={task.isActive} />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-medium">Created By</p>
                <div className="flex items-center gap-2">
                  <Avatar
                    name={task.createdBy}
                    size="sm"
                    className="h-8 w-8 bg-gradient-to-r from-[#13C2C2] to-[#3649FF]"
                  />
                  <span className="text-sm text-muted-foreground">
                    {task.createdBy}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <p className="font-medium">Data Table</p>
                <Button
                  variant="ghost"
                  className={`flex items-center justify-start w-full ${
                    !hasTableData
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/5"
                  }`}
                  onClick={handleTableClick}
                  disabled={!hasTableData}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <LuTable
                        className={`h-5 w-5 ${hasTableData ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-sm">Sales Orders</span>
                        <span className="text-xs text-muted-foreground">
                          {hasTableData
                            ? "View table data"
                            : "No data available"}
                        </span>
                      </div>
                    </div>
                    {hasTableData && (
                      <LuChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Workflow Configuration Timeline
              </CardTitle>
              <CardDescription>
                Click on any step to modify its configuration
              </CardDescription>
            </div>

            <Button
              variant="outline-primary"
              size="md"
              onClick={handleResetClick}
              className="h-8 px-3 border border-input bg-transparent text-accent-dark hover:bg-accent-foreground"
            >
              <span className="flex items-center gap-2 text-sm font-normal">
                Reset
                <LuRotateCcw
                  className={`h-4 w-4 text-red-400 stroke-[2] transition-transform
                          ${isResetting ? "animate-spin" : "hover:rotate-180"}`}
                />
              </span>
            </Button>
          </CardHeader>
          <CardContent>
            <CustomTimeline
              steps={[
                {
                  id: "integration",
                  title: "Microsoft Dynamics Integration",
                  description: "Connect your D365 instance",
                  completed: workflowSteps.integration,
                },
                {
                  id: "frequency",
                  title: "Sync Frequency",
                  description: "Set automation schedule",
                  completed: workflowSteps.frequency,
                },
                {
                  id: "mapping",
                  title: "Data Mapping",
                  description: "Configure column mappings",
                  completed: workflowSteps.mapping,
                },
                {
                  id: "notification",
                  title: "Notifications",
                  description: "Set up alert preferences",
                  completed: workflowSteps.notification,
                },
              ]}
              onStepClick={(stepId) =>
                handleTimelineStepClick(
                  stepId as
                    | "integration"
                    | "frequency"
                    | "mapping"
                    | "notification",
                )
              }
              currentStep={currentStep}
            />
          </CardContent>
        </Card>
      </div>
      <WorkflowSetupModal
        isOpen={showSetupModal}
        onClose={() => {
          setShowSetupModal(false);
          setIsManualNavigation(false);
          setCurrentStep("integration");
          setInitialStep("integration");
        }}
        taskId={task.id}
        integrationId={integrationId}
        initialStep={initialStep}
        isManualNavigation={isManualNavigation}
      />
      <DataTableModal
        isOpen={showDataTableModal}
        onClose={() => setShowDataTableModal(false)}
        integrationId={integrationId || ""}
      />
    </div>
  );
}
