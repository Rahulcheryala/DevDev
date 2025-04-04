"use client"

import * as React from "react"

import { DayPicker, useDayPicker } from "react-day-picker"

import { cn } from "@zeak/react"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
   
   
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      
      classNames={{
        today:"text-white bg-blue-500  rounded-[12px ",
        selected:"text-white bg-[#007AF5] rounded-[12px] ",
        root:"w-[560px] rounded-[12px] p-0 ",
        chevron:"",
        button_next:"absolute right-4 ",
        button_previous:"absolute left-4 ",
        years_dropdown:"",
        months: "",
        month: "w-full  ",
        month_grid:"p-0 w-full ",
        month_caption: "hidden ",
        week: "",
        weeks:"w-full  bg-[rgba(232,_232,_232,_0.20)]  w-[560px]   ",
        weekdays:"w-full  bg-[rgba(232,_232,_232,_0.40)] px-6 mb-6  w-[560px] ",
        weekday:"text-[#475467] text-[14px] font-normal p-4",
        nav: "flex  w-full p-6 bg-white rounded-t-[12px]   ",
        nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        day_button:"w-9 h-14   rounded-[12px] text-center  ",
        day: cn(" p-0 font-normal text-center rounded-[12px] max-w-9 mx-auto  ",
        ),
        ...classNames,
      }}
     
      components={{
     
       
     
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
