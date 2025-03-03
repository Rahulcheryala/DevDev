import { cn } from '@zeak/react'
import React, { useState } from 'react'
import { Label } from '@zeak/react'
import { Popover, PopoverContent, PopoverTrigger } from '@zeak/react'
import { Calendar } from '@zeak/react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Input } from '@zeak/react'



export default function OnDate() {
    const [date, setDate] = useState<Date >(new Date())
    const [time, setTime] = useState<string >("")
  return (
      <div className="flex flex-col gap-6 self-stretch flex-1 h-full justify-center  rounded-zeak">
          <div className="flex flex-col gap-3  ">
            <Label className="text-[14px] font-semibold tracking-[0px] text-secondary">End Date</Label>
           
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center justify-between px-4  h-[56px] rounded-zeak gap-[10px]   bg-[#F7F7F8]",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "MM/dd/yyyy") : "MM/DD/YYYY"}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="text-[14px] font-semibold tracking-[0px] text-secondary">End Time</Label>
            <div className="relative">
              <Input
                type="time"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="HH:MM:SS"
                className="bg-[#F7F7F8] pr-10 h-[56px]"
              />
            </div>
          </div>

          
      </div>
  )
}
