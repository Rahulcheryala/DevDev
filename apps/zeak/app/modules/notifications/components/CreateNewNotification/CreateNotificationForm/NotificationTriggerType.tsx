import { TrendUpIcon1, RefreshIcon } from "@zeak/icons";
import { Clock } from "lucide-react";
import { RadioGroupItem } from "@zeak/react";
import { NotificationType } from "~/modules/notifications";

import { Badge, cn } from "@zeak/react";

type Props = {
  selected: NotificationType;
  value: NotificationType;
  label: string;
  description: string;
  color: string;

};

const NotificationTriggerType = ({
  selected,
  value,
  label,
  description,
  color,

}: Props) => {
  return (
    <div
      className={cn(
        "relative bg-[#F0F4FD] p-6 rounded-zeak transition-colors",
        {
          "bg-white border-2 border-[#007AF5]": selected === value,
        }
      )}
    >
      <label
        htmlFor={value}
        className="block w-full cursor-pointer"
      >
        {/* Icon and Label */}
        <div className="flex items-center justify-between mb-6">
          <span className="overflow-hidden overflow-ellipsis text-[20px] font-medium tracking-[0px] text-[#101828]">
            {label}
          </span>
          {value === NotificationType.TIME ? (
            <Clock className="text-[#04A777]" />
          ) : value === NotificationType.EVENT ? (
            <RefreshIcon />
          ) : (
            <TrendUpIcon1 color={color} />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2">{description}</p>

        {/* Badge and Radio */}
        <div className="flex items-center justify-between mt-6 py-1">
          <Badge

            className={cn(`text-xs font-medium uppercase rounded-[32px] py-[6px] shadow-none px-3   `,{
              "text-[#007AFF] bg-[#007AFF] bg-opacity-[15%]": value === NotificationType.MANUAL,
              "text-[#0C817B] bg-[#0C817B] bg-opacity-[15%]  ": value === NotificationType.TIME,
              "text-[#FF9500] bg-[#FF9500] bg-opacity-[15%]": value === NotificationType.EVENT,
            })}
          >
          {label}
            
          </Badge>

          <RadioGroupItem value={value} id={value} />
        </div>
      </label>
    </div>
  );
};

export default NotificationTriggerType;
