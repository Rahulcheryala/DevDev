import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  TimePicker as TimePickerBase,
} from "@zeak/react";
import { useField } from "@zeak/remix-validated-form";
import type {
  CalendarDateTime,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
import { parseTime } from "@internationalized/date";
import { useState } from "react";

type TimePickerProps = {
  name: string;
  label?: string;
  value?: string;
  minValue?: TimeValue;
  maxValue?: TimeValue;
  onChange?: (date: TimeValue) => void;
};
type TimeValue = Time | CalendarDateTime | ZonedDateTime;

const TimePicker = ({ name, label, onChange, value }: TimePickerProps) => {
  const { error, defaultValue, validate } = useField(name);
  const [date, setDate] = useState<TimeValue | null>(
    value || defaultValue ? parseTime(value || defaultValue) : null,
  );

  const handleChange = (date: TimeValue) => {
    setDate(date);
    validate();
    onChange?.(date);
  };

  return (
    <FormControl isInvalid={!!error} className="">
      {label && (
        <FormLabel htmlFor={name} className="text-sm text-accent mb-3">
          {label}
        </FormLabel>
      )}
      <input type="hidden" name={name} value={date?.toString()} />
      <TimePickerBase
        value={date ?? undefined}
        //@ts-ignore
        onChange={handleChange}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TimePicker;
