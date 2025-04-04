import { useState } from "react";
import WorkflowIntegrationsTable from "./WorkflowIntegrationsTable";

const dummyData = [
  {
    name: "Microsoft Dynamics 365 Finance",
    id: "001",
    integrationType: "Microsoft Dynamics 365 Finance",
    url: "https://api.pfizer.dynamics.com",
    lastRun: "2024-07-20T10:30:00Z",
    createdOn: "2024-07-19T08:00:00Z",
    status: "Connected",
  },
  {
    name: "Table cell text",
    id: "002",
    integrationType: "Table cell text",
    url: "https://api.pfizer.dynamics.com",
    lastRun: "2024-07-20T10:30:00Z",
    createdOn: "2024-07-19T08:00:00Z",
    status: "Disconnected",
  },
];

export default function Integrations({ List, Count }: any) {
  const [data] = useState(dummyData);

  return (
    <div>
      <WorkflowIntegrationsTable data={data || []} count={Count || 0} />
    </div>
  );
}
