import { Input } from "@zeak/react";
import { useEffect, useState } from "react";
import { cn } from "~/utils/form-builder";

interface TimeFieldProps {
  value?: Date;
  onChange: (date?: Date) => void;
  disabled?: boolean;
}

export function TimeField({ value, onChange, disabled }: TimeFieldProps) {
  const [timeString, setTimeString] = useState(
    value
      ? value.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "",
  );

  useEffect(() => {
    if (timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      onChange(date);
    } else {
      onChange(undefined);
    }
  }, [timeString, onChange]);

  return (
    <Input
      type="time"
      value={timeString}
      onChange={(e) => setTimeString(e.target.value)}
      disabled={disabled}
      className={cn(disabled && "bg-gray-50")}
    />
  );
}
