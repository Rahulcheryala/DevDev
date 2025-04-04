import React from "react";
import { BsRecord2 } from "react-icons/bs";
import { cn } from "../../utils";

// Status color mapping
export const StatusColors = {
  active: "text-green-500",
  inactive: "text-gray-500",
  blocked: "text-red-500",
  draft: "text-yellow-500",
  pending: "text-orange-400",
  completed: "text-blue-500",
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
  // Get the color based on status
  const normalizedStatus = status.toLowerCase() as keyof typeof StatusColors;
  const statusColor = StatusColors[normalizedStatus] || "text-gray-400";

  // Format the display text
  const displayText = uppercase
    ? status.toUpperCase()
    : status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 py-1",
        statusColor,
        className
      )}
      role="status"
    >
      {icon || <BsRecord2 className={cn("w-5 h-5", iconColor && iconColor)} />}
      <span
        className={cn(
          "text-sm font-medium whitespace-nowrap",
          textColor || "text-current"
        )}
      >
        {displayText}
      </span>
    </div>
  );
};

export default StatusPill;
