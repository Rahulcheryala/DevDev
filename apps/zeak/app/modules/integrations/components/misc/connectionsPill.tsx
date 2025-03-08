import { TbLink } from "react-icons/tb";
import { LucideTriangleAlert } from "lucide-react";
import { LuUnlink } from "react-icons/lu";

const connectionsPill = ({ connections, type }: {connections: any, type?: string}) => {
  const total = connections.length;
  const online = connections.filter(
    (connection: any) => connection.connectionStatus === "ONLINE"
  ).length;
  const offline = connections.filter(
    (connection: any) => connection.connectionStatus === "OFFLINE"
  ).length;
  const error = connections.filter(
    (connection: any) => connection.connectionStatus === "ERROR"
  ).length;

  return (
    <div className="flex flex-column gap-2.5 w-fit">
      {type !== "card" && (
        <div className="relative border rounded-[8px] flex items-center justify-center w-fit gap-2 px-2 py-1.5">
          <span className="text-textLink text-xs">Total | </span>
          <span className="text-xs">{total}</span>
        </div>
      )}
      <div className={`relative rounded-[8px] flex items-center justify-center w-fit ${type === "card" ? "bg-[#F5F5F5] px-1 py-0.5 gap-1.5" : "gap-2 px-2 py-1.5 border"}`}>
        <TbLink size={14} className="text-green-500" />
        {type === "details" && <span className="text-xs text-secondary">Online |</span>}
        <span className="text-xs">{online}</span>
      </div>
      <div className={`relative rounded-[8px] flex items-center justify-center w-fit ${type === "card" ? "bg-[#F5F5F5] px-1 py-0.5 gap-1.5" : "gap-2 px-2 py-1.5 border"}`}>
        <LuUnlink size={14} className="text-gray-500" />
        {type === "details" && <span className="text-xs text-secondary">Offline |</span>}
        <span className="text-xs">{offline}</span>
      </div>
      <div className={`relative rounded-[8px] flex items-center justify-center w-fit ${type === "card" ? "bg-[#F5F5F5] px-1 py-0.5 gap-1.5" : "gap-2 px-2 py-1.5 border"}`}>
        {type === "details" && <span className="text-xs text-secondary">Error |</span>}
        <LucideTriangleAlert size={14} className="text-red-500" />
        <span className="text-xs">{error}</span>
      </div>
    </div>
  );
};

export default connectionsPill;
