import { HelpCircleIcon, TrendUpIcon1 } from "@zeak/icons";
import type { NotificationType } from "./business";
import { Badge } from "@zeak/react";

type Props = {
  selected: NotificationType;
  value: NotificationType;
  label: string;
  description: string;
  color: string;
  onChange: (type: NotificationType) => void;
};

const NotificationTriggerType = ({
  selected,
  value,
  label,
  description,
  color,
  onChange,
}: Props) => {
  return (
    <div className="relative">
      <input
        className="peer absolute hidden top-[26px] right-4 "
        type="radio"
        name="notificationTriggerType"
        id={value}
        checked={selected === value}
        onChange={() => onChange(value)}
      />
      <label
        className={`py-[26px] px-4 bg-white inline-block rounded-md border-[2px] ${
          selected === value
            ? `border-accent-primaryDark ring-4 ring-[${color},_0.09)]`
            : "border-stroke"
        }`}
        htmlFor={value}
      >
        {selected === value ? (
          <span className=" absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
            <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
          </span>
        ) : (
          <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-tertiary bg-white"></span>
        )}
        <span className="flex flex-col items-start text-lg font-medium mb-1 text-accent-dark">
          <TrendUpIcon1 className="mb-4" color={color} size="40" />
          {label}
        </span>
        <span className="text-sm text-textLink">{description}</span>
        <span className="flex justify-between items-center mt-[26px]">
          <Badge variant="blue" className="uppercase text-xs">
            {label}
          </Badge>
          <HelpCircleIcon />
        </span>
      </label>
    </div>
  );
};

export default NotificationTriggerType;
