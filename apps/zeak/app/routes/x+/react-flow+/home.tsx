// import { json } from "zod-form-data";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

import {
  getAllActions,
  getAllTables,
  getAllTablesColumns,
  getAllTriggerCategories,
  getAllTriggers,
  insertOrUpdateReactFlowLogsData,
  insertTriggerCreds,
} from "~/modules/react-flow/reactflow.service";
import {
  FlowVisualizerTab,
  FlowCanvas,
  FlowAutomationTab,
} from "~/modules/react-flow/ui/Flow";
import { requirePermissions } from "~/services/auth/auth.server";
import { ReactFlowProvider } from "@xyflow/react";
import { flash } from "~/services/session.server";
import { error } from "~/utils/result";
import { redirect, useLoaderData } from "@remix-run/react";

export async function loader({ request }: ActionFunctionArgs) {
  // const { client } = await requirePermissions(request, {
  //   view: 'labelsreports',
  // });

  const [allTriggerCategories, triggers, allTables, actions] =
    await Promise.all([
      getAllTriggerCategories(),
      getAllTriggers(),
      getAllTables(),
      getAllActions(),
    ]);

  if (allTriggerCategories.error) {
    redirect(
      request.url,
      await flash(
        request,
        error(allTriggerCategories.error, "Failed to fetch labels & reports"),
      ),
    );
  }
  if (triggers.error) {
    redirect(
      request.url,
      await flash(
        request,
        error(triggers.error, "Failed to fetch labels & reports"),
      ),
    );
  }

  return json({
    allTriggerCategories: allTriggerCategories.data,
    triggers: triggers.data,
    allTables: allTables?.data,
    actions: actions.data,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { companyId } = await requirePermissions(request, {
    create: "labelsreports",
  });

  const formData = await request.json();
  const { data, workflowID, action } = formData;

  try {
    if (action === "getColumns") {
      const columnsResult = await getAllTablesColumns(data);

      return json({
        success: true,
        message: "Columns fetched successfully",
        columns: columnsResult.data,
      });
    } else if (action === "insertTriggerCreds") {
      console.log("Insert trigger", data);
      const columnsResult = await insertTriggerCreds([
        {
          client_id: data.clientId,
          client_secret: data.clientSecret,
          resource_url: data.resourceUrl,
          companyId: companyId,
          // trigger_category: data.category
        },
      ]);

      return json({
        success: true,
        message: "Columns fetched successfully",
        columns: columnsResult.data,
      });
    } else if (action === "saveWorkflow") {
      const result = await insertOrUpdateReactFlowLogsData(
        [
          {
            workflowJson: data,
            name: "workflow",
            companyId: companyId,
            createdBy: "Anupam",
            category: "workflow",
          },
        ],
        workflowID ? workflowID : null,
      );

      return json({
        success: true,
        message: "Data processed successfully",
        data: result,
      });
    }
  } catch (error) {
    return json(
      {
        success: false,
        message: "Failed to process data",
        error: String(error),
      },
      { status: 400 },
    );
  }
}

export default function Home() {
  const { allTriggerCategories, triggers, allTables, actions } =
    useLoaderData<typeof loader>();

  return (
    <div className="w-full flex justify-between flex-col">
      <FlowAutomationTab />
      <ReactFlowProvider>
        <FlowCanvas
          allTables={allTables}
          allTriggerCategories={allTriggerCategories}
          triggers={triggers}
          actions={actions}
        />
      </ReactFlowProvider>
      <FlowVisualizerTab />
    </div>
  );
}
