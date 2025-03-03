// apps/zeak/app/routes/x+/workflows+/home.tsx

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react";
import { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { path } from "~/utils/path";
import { useUrlParams } from "~/hooks";
import { Breadcrumbs } from "~/components";
import type { Handle } from "~/utils/handle";
import { WebArrowLeft } from "@zeak/icons";
import Flow from "./react-flow";
import {
  Loges,
  Automations,
  Integrations,
} from "~/modules/workflows/ui/Workflows/HomeTabs";
import { useNavigate, useLoaderData, Form } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
// import moment from "moment";
import { getSupabaseServiceRole, supabaseClient } from "~/lib/supabase/client";
import { requireAuthSession } from "~/services/session.server";
import { getAllTasks } from "../../../../src/taskRegistry";
import { getLastRunTimeAndFrequency } from "../../../../src/taskHelpers";
import type { Json } from "@zeak/database";
import { queueBackgroundJob, sendNotification, setupKafkaConsumer, trackAnalyticsEvent, trackUserActivity } from "~/utils/kafka.client";
import { useTranslation } from "react-i18next";
import i18nextServer from "~/i18n/i18next.server";
import { Submit } from "~/components/Form";

const HomeTabMap = {
  RULES: "rules",
  WORKFLOWS: "workflows",
  LOGS: "logs",
  INTEGRATIONS: "integrations",
};

export const handle: Handle = {
  breadcrumb: "Home",
  to: path.to.workflowsHome(),
};

type WorkflowLog = {
  name: string;
  id: string;
  description: string;
  triggerType: string;
  priority: string;
  createdBy: string;
  duration: string;
  createdOn: string;
  lastRun: string;
  status: string;
  logs: Json;
};

// function formatDuration(ms: number): string {
//   if (!ms) return "0m";
//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);

//   let durationStr = "";
//   if (hours > 0) {
//     durationStr += `${hours}h `;
//   }
//   if (minutes > 0) {
//     durationStr += `${minutes}m`;
//   }
//   if (durationStr === "") {
//     durationStr = "0m";
//   }
//   return durationStr.trim();
// }

function transformLog(log: any): WorkflowLog {
  return {
    name: log.workflowName,
    id: log.runId,
    description: log.description,
    triggerType: log.environment || "Manual",
    priority: "Medium",
    createdBy: log.createdBy,
    duration: log.durationMs,
    createdOn: log.startedAt,
    lastRun: log.modifiedOn || log.startedAt,
    status: log.status,
    logs: log.logs,
  };
}

// Define the action that runs on the server
export const action: ActionFunction = async () => {
  const registeredTasks = getAllTasks(); // Fetch all tasks

  const tasksWithRunData = await Promise.all(
    registeredTasks.map(async (task) => {
      const { lastRun, noOfRuns } = await getLastRunTimeAndFrequency(task.id);
      return { ...task, lastRun, noOfRuns };
    }),
  );

  // Return the tasks with the appended data
  return json({ tasks: tasksWithRunData });
};

export const loader: LoaderFunction = async ({ request }) => {
  const t = await i18nextServer.getFixedT(request);

  const content = { title: t("title"), description: t("description") }

  // return json();

  // Require authentication
  const authSession = await requireAuthSession(request);
  if (!authSession) {
    // Redirect to login if not authenticated
    throw redirect("/login");
  }

  // Fetch initial data using the service role key
  const supabase = getSupabaseServiceRole();

  const { data: workflowLogs, error } = await supabase
    .from("workflowLogs")
    .select("*");

  if (error) {
    console.error("Error fetching workflow logs:", error.message);
    throw new Response("Error fetching workflow logs", { status: 500 });
  }

  const data: WorkflowLog[] = workflowLogs.map(transformLog);

  // Log the raw data fetched from Supabase
  console.log("Raw workflow logs:", workflowLogs);
  console.log("Transformed Data:", data);

  // Fetch registered tasks
  const registeredTasks = getAllTasks(); // Fetch all tasks from taskRegistry
  console.log(registeredTasks);
  // Fetch lastRun and noOfRuns for each task
  const tasksWithRunData = await Promise.all(
    registeredTasks.map(async (task) => {
      const { lastRun, noOfRuns } = await getLastRunTimeAndFrequency(task.id);
      return { ...task, lastRun, noOfRuns };
    }),
  );

  console.log("Tasks With Run Data: " + JSON.stringify(tasksWithRunData));
  // Return data along with access token (if necessary)
  return json(
    { data, tasks: tasksWithRunData, accessToken: authSession.accessToken, content },
    {
      // Set appropriate cache headers if needed
    },
  );
};

export default function Home() {
  const { data: initialData, tasks } = useLoaderData<{
    data: WorkflowLog[];
    tasks: [];
  }>();

  const [data, setData] = useState<WorkflowLog[]>(initialData || []);
  const { t } = useTranslation();
  const [params, setParams] = useUrlParams();
  // const [flow, _] = useState(false);
  const flow = false;

  const tab = params.get("tab") || HomeTabMap.LOGS;
  const defaultTab = tab
    ? (HomeTabMap as { [key: string]: string })[tab.toUpperCase()]
    : HomeTabMap.LOGS;

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const navigate = useNavigate();
  const navigateFlowPage = () => {
    navigate(path.to.reactflowHome());
  };

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
    setParams({ tab: tabName });
  };

  // Initialize the Supabase client with the user's access token
  // const supabaseClient = createBrowserClient(accessToken);

  useEffect(() => {
    // Set up real-time subscription
    console.log("Component Mounted!");
    const channel = supabaseClient
      .channel("public:workflowLogs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "workflowLogs" },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.eventType === "INSERT") {
            const newRecord = transformLog(payload.new);
            setData((prevData) => [newRecord, ...prevData]);
          } else if (payload.eventType === "UPDATE") {
            const updatedRecord = transformLog(payload.new);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === updatedRecord.id ? updatedRecord : item,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            const deletedRecord = payload.old;
            setData((prevData) =>
              prevData.filter((item) => item.id !== deletedRecord.runId),
            );
          }
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Subscribed to workflowLogs changes");
        }
      });

    // Clean up the subscription on unmount
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  async function handleSubmitKafka(event: React.FormEvent) {
    try {
      // Track user activity
      await setupKafkaConsumer()

      await trackUserActivity('user123', 'button_click', {
        buttonId: 'submit-form',
        page: '/dashboard'
      })

      // Send notification
      await sendNotification('user123', {
        type: 'in-app',
        title: 'Action Successful',
        message: 'Your action was processed successfully',
        priority: 'normal'
      })

      // Track analytics
      await trackAnalyticsEvent({
        eventName: 'form_submission',
        category: 'engagement',
        userId: 'user123',
        properties: {
          formType: 'feedback',
          duration: 120
        }
      })

      // Queue background job
      await queueBackgroundJob('process-form', {
        formId: 'form123',
        userId: 'user123'
      }, {
        priority: 'normal'
      })

      console.log('success')

    } catch (error) {
      console.error('Error:', error)
      // Report error
      // await reportError(error as Error, {
      //   component: 'UserActionForm',
      //   action: 'handleUserAction'
      // })
    }
  }


  return (
    <>
      {flow ? (
        <Flow />
      ) : (
        <div className="py-[26px] px-[50px]">
          <div className="flex items-center gap-2">
            <WebArrowLeft />
            <Breadcrumbs />
          </div>
          <div className="mt-[16px] flex justify-between h-[56px]">
            <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
              {t('Workflows')}
            </h2>
            <Button
              variant="custom"
              className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-accent hover:text-accent hover:border-sky-600 hover:border-4"
              leftIcon={<HiPlus size={20} />}
              onClick={navigateFlowPage}
            >
              {t('createWorkflows')}
            </Button>
            <Button
              variant="custom"
              className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-dark hover:text-accent hover:border-sky-600 hover:border-4"
              leftIcon={<HiPlus size={20} />}
              onClick={handleSubmitKafka}
            >
              Create Kafka
            </Button>
          </div>
          <Tabs
            defaultValue={currentTab}
            onValueChange={handleTabChange}
            value={currentTab}
          >
            <TabsList aria-label="List of tabs">
              <TabsTrigger value={HomeTabMap.WORKFLOWS}>Workflows</TabsTrigger>
              <TabsTrigger value={HomeTabMap.LOGS}>Logs</TabsTrigger>
              <TabsTrigger value={HomeTabMap.INTEGRATIONS}>
                Integrations
              </TabsTrigger>
            </TabsList>

            <TabsContent value={HomeTabMap.LOGS} className="pt-[32px]">
              <Loges data={data} count={data.length} />
            </TabsContent>
            <TabsContent value={HomeTabMap.WORKFLOWS} className="pt-[32px]">
              <Automations props={tasks} />
            </TabsContent>
            <TabsContent value={HomeTabMap.INTEGRATIONS} className="pt-[32px]">
              <Integrations />
            </TabsContent>
          </Tabs>
          <Form>
            <button type="submit" name="lng" value="es">
              EspaÃ±ol
            </button>
            <button type="submit" name="lng" value="en">
              English
            </button>
          </Form>
        </div>
      )}
    </>
  );
}
