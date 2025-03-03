import WorkFlowLogsTable from "./WorkflowLogsTable";
import moment from "moment";

type TransformedData = {
  runId: string;
  description: string;
  environment: string;
  status: string;
  startedAt: string;
  duration: string;
  executionTime: string;
  createdOn: string;
};

interface LogesProps {
  data: any[]; // Adjust type as needed
  count: number;
}

const convertTimestampToReadableFormat = (timestamp: string): string => {
  return moment(timestamp).format("MMMM D, YYYY, h:mm:ss A");
};

function formatDuration(ms: number): string {
  if (!ms) return "0s";
  const seconds = Math.floor(ms / 1000);
  return `${seconds}s`;
}

function transformData(data: any[]): TransformedData[] {
  return data.map((item) => ({
    runId: item.id,
    workflowName: item.name,
    environment: item.triggerType,
    status: item.status,
    logs: item.logs,
    // started: convertTimestampToReadableFormat(item.started),
    duration: formatDuration(item.duration),
    executionTime: formatDuration(item.executionTime),
    createdOn: convertTimestampToReadableFormat(item.createdOn),
    description: item.description,
    startedAt: convertTimestampToReadableFormat(item.startedAt),
  }));
}

export default function Loges({ data, count }: LogesProps) {
  const transformedData = transformData(data);

  return <WorkFlowLogsTable data={transformedData} count={count} />;
}
