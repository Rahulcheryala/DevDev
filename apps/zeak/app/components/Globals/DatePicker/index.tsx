"use client";

import { Calendar } from "./Calendar";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsUpDown } from "lucide-react";
import { useDayPicker } from "react-day-picker";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@zeak/react";
import { Command, CommandGroup, CommandItem } from "@zeak/react";
import { ScrollArea } from "@zeak/react";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  minValue?: Date;
  maxValue?: Date;
}

export default function DatePicker({ value, onChange, minValue, maxValue }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const today = new Date();
  const [month, setMonth] = useState(value || today);
  const [open, setOpen] = useState(false);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        month={month}
        onMonthChange={setMonth}
        disabled={minValue ? { before: minValue } : undefined}
        fromDate={minValue}
        toDate={maxValue}
        components={{
          Nav: () => {
            const { goToMonth } = useDayPicker();
            return (
              <div className="flex bg-white rounded-t-[12px] p-6 justify-between">
                <ChevronLeftIcon
                  onClick={() => goToMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                  className="w-4 h-4 cursor-pointer"
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="text-[14px] flex items-center gap-1 font-medium uppercase cursor-pointer">
                      {format(month, "MMM-yyyy")}
                      <ChevronsUpDown className="w-4 h-4" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <ScrollArea className="h-48">
                      <Command>
                        <CommandGroup heading="Select Month-Year">
                          {Array.from({ length: 360 }, (_, i) => {
                            const date = new Date(today.getFullYear() - 30 + Math.floor(i / 12), i % 12, 1);
                            return (
                              <CommandItem
                                key={date.toISOString()}
                                className="hover:bg-gray-100 group hover:opacity-100"
                                onSelect={() => {
                                  setMonth(date);
                                  setOpen(false);
                                }}
                              >
                                <span className=" group-hover:text-black"> {format(date, "MMM-yyyy")}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
                <ChevronRightIcon
                  onClick={() => goToMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            );
          },
        }}
        footer={
          <div className="flex px-6 py-[14px] justify-between bg-white rounded-b-[12px] mt-6">
            <div className="flex items-center gap-2">
              <span className="text-[#101828] font-medium">
                {date && format(date, "MMM dd")},
              </span>
              <span>{date && format(date, "yyyy")}</span>
            </div>
            <button className="text-[#007AF5] text-[16px] font-medium">Select</button>
          </div>
        }
      />
    </div>
  );
}
