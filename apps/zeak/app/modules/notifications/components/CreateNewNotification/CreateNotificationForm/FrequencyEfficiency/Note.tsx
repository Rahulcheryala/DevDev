import * as React from "react";
import { cn } from "@zeak/react"; // Your utility function for classnames
import { Clock } from "lucide-react";
import { AlarmClockIcon } from "@zeak/icons";

interface TimeBasedNotificationsProps {
  className?: string;
}

const Notice: React.FC<TimeBasedNotificationsProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[#F0F4FD] rounded-lg p-6 w-full ", // Base styles and width
        className
      )}
    >
      <div className="flex items-start space-x-4"> {/* Use flexbox for layout */}
        <AlarmClockIcon className="h-6 w-6" color="#04A777" /> {/* Clock icon */}
        <div>
          <h3 className="self-stretch text-[14px] tracking-[0px] font-medium uppercase text-[#101828]">
            TIME BASED NOTIFICATIONS
          </h3>
          <p className="text-[12px] tracking-[0px] text-[#475467]">
            Triggered at a specific time with options to set recurrence
          </p>
        </div>
      </div>
  
    </div>
  );
};

export default Notice;