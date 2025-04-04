import React from "react";
import { BsRecord2 } from "react-icons/bs";
import { cn } from "../../utils";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { LucideTriangleAlert } from "lucide-react";

// Status color mapping
export const StatusColors = {
  active: "text-green-500",
  inactive: "text-gray-500",
  blocked: "text-red-500",
  draft: "text-yellow-500",
  pending: "text-orange-400",
  completed: "text-blue-500",

  online: "text-green-500",
  offline: "text-gray-500",
  error: "text-red-500",
};

export const TextColors = {
  active: "text-dark-green",
  inactive: "text-dark-gray",
  blocked: "text-red-700",
  draft: "text-dark-yellow",
  pending: "text-orange-600",
  completed: "text-blue-700",

  online: "text-green-500",
  offline: "text-gray-500",
  error: "text-red-500",
};

export type StatusType = keyof typeof StatusColors | string;

export interface StatusPillProps {
  status: StatusType;
  textColor?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  className?: string;
  uppercase?: boolean;
}

/**
 * StatusPill displays a colored indicator with text for showing statuses
 */
const StatusPill: React.FC<StatusPillProps> = ({
  status,
  textColor,
  icon,
  iconColor,
  className = "",
  uppercase = false,
}) => {
  const iconPicker = (status: string) => {
    if (status === "online")
      return <TbLink className={cn("w-5 h-5", iconColor)} />;
    if (status === "offline")
      return <LuUnlink className={cn("w-4 h-4", iconColor)} />;
    if (status === "error")
      return <LucideTriangleAlert className={cn("w-5 h-5", iconColor)} />;
    return null;
  };

  // Get the color based on status
  const normalizedStatus = status.toLowerCase() as keyof typeof StatusColors;
  const statusColor = StatusColors[normalizedStatus] || "text-gray-400";
  const statusTextColor = TextColors[normalizedStatus] || "text-gray-400";

  return (
    <div
      className={cn("flex items-center gap-0.5 py-0.5", statusColor, className)}
      role="status"
    >
      {icon ? (
        icon
      ) : normalizedStatus.includes("online") ||
        normalizedStatus.includes("offline") ||
        normalizedStatus.includes("error") ? (
        iconPicker(normalizedStatus)
      ) : (
        <BsRecord2 className={cn("w-5 h-5", iconColor)} />
      )}
      <span
        className={cn(
          "text-sm font-medium whitespace-nowrap",
          statusTextColor,
          textColor,
          uppercase ? "uppercase" : "capitalize"
        )}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusPill;
