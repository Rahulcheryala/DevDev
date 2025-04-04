import { ConnectionStatus } from "@prisma/client";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { LucideTriangleAlert } from "lucide-react";

const ConnectionStatusMapper = ({ status }: { status: string }) => {
    const statusMap = {
      [ConnectionStatus.Online]: {
        icon: <TbLink size={20} className="text-green-500 cursor-pointer" />,
        label: <span className="text-green-500">ONLINE</span>,
      },
      [ConnectionStatus.Offline]: {
        icon: <LuUnlink size={20} className="text-gray-500 cursor-pointer" />,
        label: <span className="text-gray-500">OFFLINE</span>,
      },
      [ConnectionStatus.Error]: {
        icon: (
          <LucideTriangleAlert size={20} className="text-red-500 cursor-pointer" />
        ),
        label: <span className="text-red-500">ERROR</span>,
      },
    };
  const statusInfo = statusMap[status as keyof typeof statusMap];
  return (
    <div className="flex items-center gap-3 text-sm">
      {statusInfo ? (
        <>
          {statusInfo.icon}
          {statusInfo.label}
        </>
      ) : (
        <span className="text-gray-500">UNKNOWN STATUS</span>
      )}
    </div>
  );
};

export default ConnectionStatusMapper;