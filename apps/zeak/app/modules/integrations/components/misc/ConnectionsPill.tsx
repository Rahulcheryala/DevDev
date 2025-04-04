import { TbLink } from "react-icons/tb";
import { LucideTriangleAlert } from "lucide-react";
import { LuUnlink } from "react-icons/lu";
import { useIntegrationData } from "../../hooks/useIntegrationData";

type ConnectionPillProps = {
  id: string;
  type: "card" | "details" | "table";
};

const connectionsPill = ({ id, type }: ConnectionPillProps) => {
  const { getConnectionsForIntegration } = useIntegrationData();
  const connections = getConnectionsForIntegration(id);

  const total = connections.length;

  const statusCounts = {
    Online: connections.filter(
      (connection: any) => connection.connectionStatus === "Online"
    ).length,
    Offline: connections.filter(
      (connection: any) => connection.connectionStatus === "Offline"
    ).length,
    Error: connections.filter(
      (connection: any) => connection.connectionStatus === "Error"
    ).length,
  };

  const statusIcons: Record<string, React.ReactNode> = {
    Online: <TbLink size={14} className="text-green-500" />,
    Offline: <LuUnlink size={14} className="text-gray-500" />,
    Error: <LucideTriangleAlert size={14} className="text-red-500" />,
  };

  return (
    <div className="flex flex-column gap-2.5 w-fit">
      {type !== "card" && (
        <div className="relative border rounded-[8px] flex items-center justify-center w-fit gap-2 px-2 py-1.5">
          <span className="text-text-tertiary text-xs">Total | </span>
          <span className="text-xs">{total}</span>
        </div>
      )}
      {Object.keys(statusCounts).map((status) => (
        <div
          key={status}
          className={`relative rounded-[8px] flex items-center justify-center w-fit ${type === "card" ? "bg-[#F5F5F5] px-1 py-0.5 gap-1.5" : "gap-2 px-2 py-1.5 border border-stroke-primary"}`}
        >
          {statusIcons[status]}
          {type === "details" && (
            <span className="text-xs text-text-tertiary">{status} |</span>
          )}
          <span className="text-xs">
            {statusCounts[status as keyof typeof statusCounts]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default connectionsPill;
