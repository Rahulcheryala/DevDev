import type { CalendarDate, DateValue } from "@internationalized/date";
import { createCalendar } from "@internationalized/date";
import type { CalendarProps } from "@react-aria/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useCalendarState } from "@react-stately/calendar";
import { useMemo, useRef } from "react";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import { Heading } from "../../Heading";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";

const locale = "en-US"; // TODO use user's locale

export const Calendar = (props: CalendarProps<DateValue>) => {
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
  );

  const title = useLocalizedTitle(
    state.visibleRange.start,
    state.visibleRange.end,
    state.timeZone,
    "en-US",
  );

  return (
    <div {...calendarProps} ref={ref}>
      <div className="flex items-center p-[8px] border-b border-stroke">
        <CalendarButton
          {...prevButtonProps}
          icon={<TfiAngleLeft />}
          aria-label="Previous"
          className="w-[32px] h-[25px] p-0 text-tertiary [&>svg]:w-[15px] [&>svg]:h-[15px]"
        />

        <Heading
          as="h2"
          className="flex-1 text-center md:text-sm text-sm font-normal text-accent"
        >
          {title}
        </Heading>
        <CalendarButton
          {...nextButtonProps}
          icon={<TfiAngleRight />}
          aria-label="Next"
          className="w-[32px] h-[25px] p-0 text-tertiary [&>svg]:w-[15px] [&>svg]:h-[15px]"
        />
      </div>
      <div className="p-[8px]">
        <CalendarGrid state={state} />
      </div>
    </div>
  );
};

function useLocalizedTitle(
  startDate: CalendarDate,
  endDate: CalendarDate,
  timeZone: string,
  locale: string,
) {
  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    });
  }, [locale]);

  return dateFormatter.format(startDate.toDate(timeZone));
}
