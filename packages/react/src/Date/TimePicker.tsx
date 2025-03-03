import { useTimeField } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import type { TimeFieldStateOptions } from "@react-stately/datepicker";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useRef } from "react";
import { InputGroup } from "../Input";
import { DateSegment } from "./components/DateSegment";
import { AlarmClockIcon } from "@zeak/icons";

const TimePicker = (
  props: Omit<TimeFieldStateOptions, "locale" | "createCalendar">,
) => {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { fieldProps } = useTimeField(props, state, ref);

  return (
    <InputGroup
      {...fieldProps}
      ref={ref}
      className="px-4 py-2 flex items-center bg-[hsl(var(--stroke-primary),_0.5)]"
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      <AlarmClockIcon className="absolute right-[12px] bottom-[20px]" />
    </InputGroup>
  );
};

export default TimePicker;
