import { useState } from "react";
import WorkFlowRulesTable from "./WorkflowRulesTable";

const dummyData = [
  {
    name: "Initial Setup",
    id: "001",
    description: "Initial setup and configuration",
    triggerType: "Manual",
    priority: "High",
    createdBy: "Admin",
    duration: "1h 15m",
    createdOn: "2024-07-19T08:00:00Z",
    lastRun: "2024-07-20T10:30:00Z",
    status: "Success",
  },
  {
    name: "User Auth",
    id: "002",
    description: "User authentication and authorization",
    triggerType: "Scheduled",
    priority: "Medium",
    createdBy: "Admin",
    duration: "2h 30m",
    createdOn: "2024-07-20T09:30:00Z",
    lastRun: "2024-07-21T12:00:00Z",
    status: "Failed",
  },
  {
    name: "Payment Integration",
    id: "003",
    description: "Payment gateway integration",
    triggerType: "Manual",
    priority: "High",
    createdBy: "User",
    duration: "45m",
    createdOn: "2024-07-21T07:00:00Z",
    lastRun: "2024-07-22T09:00:00Z",
    status: "In Progress",
  },
  {
    name: "Database Backup",
    id: "004",
    description: "Database backup and maintenance",
    triggerType: "Scheduled",
    priority: "Low",
    createdBy: "Admin",
    duration: "30m",
    createdOn: "2024-07-22T16:00:00Z",
    lastRun: "2024-07-23T15:00:00Z",
    status: "Success",
  },
  {
    name: "Data Cleanup",
    id: "005",
    description: "Database cleanup",
    triggerType: "Manual",
    priority: "Medium",
    createdBy: "User",
    duration: "25m",
    createdOn: "2024-07-22T16:00:00Z",
    lastRun: "2024-07-23T15:00:00Z",
    status: "Failed",
  },
];

export default function Rules({ List, Count }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _] = useState(dummyData);

  return (
    <div>
      <WorkFlowRulesTable data={data || []} count={Count || 0} />
    </div>
  );
}
