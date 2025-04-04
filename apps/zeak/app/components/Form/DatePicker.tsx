import {
  DatePicker as DatePickerBase,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@zeak/react";
import { useField } from "@zeak/remix-validated-form";
import type { CalendarDate } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import type { SelectChangeEvent } from "./Select";

type DatePickerProps = {
  name: string;
  label?: string;
  isDisabled?: boolean;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
};

const DatePicker = ({
  name,
  label,
  isDisabled = false,
  value,
  onChange,
}: DatePickerProps) => {
  const { error, defaultValue, validate } = useField(name);
  const [date, setDate] = useState<CalendarDate | undefined>(
    value || defaultValue ? parseDate(value || defaultValue) : undefined,
  );

  const handleChange = (date: CalendarDate) => {
    if (onChange) {
      onChange({ name: name, value: date.toString(), label: label! });
    }
    setDate(date);
    validate();
  };

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel
          htmlFor={name}
          className="text-[14px] leading-[20px] text-accent mb-[12px]"
        >
          {label}
        </FormLabel>
      )}
      <input type="hidden" name={name} value={date?.toString()} />
      <DatePickerBase
        value={date}
        //@ts-ignore
        onChange={handleChange}
        isDisabled={isDisabled}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default DatePicker;
